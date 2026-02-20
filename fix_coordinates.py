"""
Automatically fix all entries where stored coordinates match the viewport center
instead of the actual place pin (!3d!4d pattern) from Google Maps URLs.
"""

import json
import re
import time
import requests

GEOJSON_PATH = 'Koordinat_Alumni_Lengkap_Redacted_corrected.geojson'
THRESHOLD_DEGREES = 0.01


def follow_redirect(url):
    try:
        response = requests.head(url, allow_redirects=False, timeout=10)
        return response.headers.get('location', '')
    except Exception as e:
        return f'ERROR: {e}'


def extract_pin_coordinates(redirect_url):
    match = re.search(r'!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)', redirect_url)
    if match:
        return float(match.group(1)), float(match.group(2))
    return None


def extract_viewport_coordinates(redirect_url):
    match = re.search(r'@(-?\d+\.\d+),(-?\d+\.\d+),\d+', redirect_url)
    if match:
        return float(match.group(1)), float(match.group(2))
    return None


def coord_diff(lat1, lng1, lat2, lng2):
    return max(abs(lat1 - lat2), abs(lng1 - lng2))


def main():
    with open(GEOJSON_PATH) as f:
        data = json.load(f)

    fixed = []
    skipped = []

    for feature in data['features']:
        url = feature['properties'].get('alamat_kerja_url', '')
        if not url:
            continue

        name = feature['properties'].get('nama', 'Unknown')
        stored_lng, stored_lat = feature['geometry']['coordinates']

        redirect_url = follow_redirect(url)
        if redirect_url.startswith('ERROR'):
            skipped.append((name, f'redirect error: {redirect_url}'))
            time.sleep(0.5)
            continue

        pin = extract_pin_coordinates(redirect_url)
        if pin is None:
            time.sleep(0.3)
            continue

        pin_lat, pin_lng = pin
        diff = coord_diff(stored_lat, stored_lng, pin_lat, pin_lng)

        if diff <= THRESHOLD_DEGREES:
            time.sleep(0.3)
            continue

        # Confirm stored coords match viewport (not some other error)
        viewport = extract_viewport_coordinates(redirect_url)
        if viewport:
            vp_lat, vp_lng = viewport
            vp_diff = coord_diff(stored_lat, stored_lng, vp_lat, vp_lng)
            if vp_diff > 0.001:
                skipped.append((name, f'stored coords do not match viewport either, skipping (diff={diff:.4f})'))
                time.sleep(0.3)
                continue

        # Apply fix
        feature['geometry']['coordinates'] = [pin_lng, pin_lat]
        feature['properties']['sumber_koordinat'] = 'Extracted from Google Maps URL (pin)'
        fixed.append((name, (stored_lng, stored_lat), (pin_lng, pin_lat), diff))
        print(f'  [FIXED] {name}')
        print(f'          {stored_lng}, {stored_lat} → {pin_lng}, {pin_lat}')

        time.sleep(0.3)

    with open(GEOJSON_PATH, 'w') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f'\n{"="*60}')
    print(f'DONE: {len(fixed)} fixed, {len(skipped)} skipped')
    if skipped:
        print('Skipped:')
        for name, reason in skipped:
            print(f'  - {name}: {reason}')


if __name__ == '__main__':
    main()
