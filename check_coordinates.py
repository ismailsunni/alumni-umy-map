"""
Check all Google Maps URLs in the GeoJSON and verify that stored coordinates
match the actual place pin (not the viewport center).

The place pin is extracted from the !3d{lat}!4d{lng} pattern in the redirect URL.
"""

import json
import re
import time
import requests

GEOJSON_PATH = 'Koordinat_Alumni_Lengkap_Redacted_corrected.geojson'
THRESHOLD_DEGREES = 0.01  # ~1km, flag if difference exceeds this


def follow_redirect(url):
    """Follow a Google Maps short URL and return the final redirect location."""
    try:
        response = requests.head(url, allow_redirects=False, timeout=10)
        return response.headers.get('location', '')
    except Exception as e:
        return f'ERROR: {e}'


def extract_pin_coordinates(redirect_url):
    """
    Extract place pin coordinates from Google Maps redirect URL.
    The pin is in the !3d{lat}!4d{lng} pattern inside the data parameter.
    Returns (lat, lng) or None if not found.
    """
    match = re.search(r'!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)', redirect_url)
    if match:
        return float(match.group(1)), float(match.group(2))
    return None


def extract_viewport_coordinates(redirect_url):
    """
    Extract viewport center from Google Maps URL.
    The viewport is in the @{lat},{lng},{zoom}z pattern.
    Returns (lat, lng) or None if not found.
    """
    match = re.search(r'@(-?\d+\.\d+),(-?\d+\.\d+),\d+', redirect_url)
    if match:
        return float(match.group(1)), float(match.group(2))
    return None


def coord_diff(lat1, lng1, lat2, lng2):
    """Return max absolute difference in degrees between two coordinates."""
    return max(abs(lat1 - lat2), abs(lng1 - lng2))


def main():
    with open(GEOJSON_PATH) as f:
        data = json.load(f)

    features = data['features']
    total = sum(1 for f in features if f['properties'].get('alamat_kerja_url'))
    print(f'Checking {total} entries with Google Maps URLs...\n')

    issues = []
    ok_count = 0
    no_pin_count = 0
    error_count = 0

    for feature in features:
        url = feature['properties'].get('alamat_kerja_url', '')
        if not url:
            continue

        name = feature['properties'].get('nama', 'Unknown')
        stored_lng, stored_lat = feature['geometry']['coordinates']

        redirect_url = follow_redirect(url)

        if redirect_url.startswith('ERROR'):
            print(f'  [ERROR] {name}: {redirect_url}')
            error_count += 1
            time.sleep(0.5)
            continue

        pin = extract_pin_coordinates(redirect_url)
        viewport = extract_viewport_coordinates(redirect_url)

        if pin is None:
            print(f'  [NO PIN] {name}: no !3d!4d pattern found')
            print(f'           URL: {redirect_url[:120]}')
            no_pin_count += 1
            time.sleep(0.5)
            continue

        pin_lat, pin_lng = pin
        diff = coord_diff(stored_lat, stored_lng, pin_lat, pin_lng)

        if diff > THRESHOLD_DEGREES:
            # Also check if stored matches the viewport (common wrong pattern)
            viewport_match = ''
            if viewport:
                vp_lat, vp_lng = viewport
                vp_diff = coord_diff(stored_lat, stored_lng, vp_lat, vp_lng)
                if vp_diff < 0.0001:
                    viewport_match = ' (stored = viewport center!)'

            issues.append({
                'name': name,
                'stored': (stored_lng, stored_lat),
                'pin': (pin_lng, pin_lat),
                'diff': diff,
                'viewport_match': viewport_match,
                'url': url,
            })
            print(f'  [MISMATCH] {name}{viewport_match}')
            print(f'             Stored:  lng={stored_lng}, lat={stored_lat}')
            print(f'             Pin:     lng={pin_lng}, lat={pin_lat}')
            print(f'             Diff:    {diff:.6f} deg')
        else:
            ok_count += 1

        time.sleep(0.3)  # Be polite to Google's servers

    print(f'\n{"="*60}')
    print(f'SUMMARY')
    print(f'{"="*60}')
    print(f'  OK (within {THRESHOLD_DEGREES} deg): {ok_count}')
    print(f'  Mismatches:                  {len(issues)}')
    print(f'  No pin found:                {no_pin_count}')
    print(f'  Errors:                      {error_count}')
    print(f'  Total checked:               {total}')

    if issues:
        print(f'\nEntries needing correction:')
        for issue in issues:
            print(f'  - {issue["name"]}{issue["viewport_match"]}')
            print(f'    Pin: [{issue["pin"][0]}, {issue["pin"][1]}]')
            print(f'    URL: {issue["url"]}')


if __name__ == '__main__':
    main()
