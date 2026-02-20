"""
Fix the 72 entries where no !3d!4d pin was found in the URL.

Strategies (tried in order):
1. Extract Plus Code from URL (handles %2B-encoded plus in place names / q= params)
2. Follow URL with GET request (handles ?g_st= app links and share.google links)
   and extract !3d!4d from final URL
3. Mark as 'Needs manual review' if nothing works
"""

import json
import re
import time
from urllib.parse import unquote, urlparse, parse_qs

import requests
from openlocationcode import openlocationcode as olc

GEOJSON_PATH = 'Koordinat_Alumni_Lengkap_Redacted_corrected.geojson'
THRESHOLD_DEGREES = 0.01

# Plus Code character set: 23456789CFGHJMPQRVWX
PLUS_CODE_RE = re.compile(r'([23456789CFGHJMPQRVWX]{4,8}\+[23456789CFGHJMPQRVWX]{2,7})', re.IGNORECASE)

HEADERS = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36'}


def extract_plus_code_from_url(url):
    """Extract Plus Code from URL, handling %2B encoding."""
    decoded = unquote(url)  # %2B → +
    matches = PLUS_CODE_RE.findall(decoded)
    if matches:
        return matches[0].upper()

    # Also try: in q= params where + is a space, look for XXXX space YYY at start
    # e.g. q=9GVV 297 means originally 9GVV+297
    parsed = urlparse(url)
    q_params = parse_qs(parsed.query)
    q = q_params.get('q', [''])[0]
    if q:
        # q uses + as space, so look for pattern like "XXXX YYY" at start
        m = re.match(r'^([23456789CFGHJMPQRVWX]{4,8})\s([23456789CFGHJMPQRVWX]{2,7})\b', q, re.IGNORECASE)
        if m:
            return (m.group(1) + '+' + m.group(2)).upper()
    return None


def extract_pin_from_url(url):
    """Extract !3d!4d pin coordinates from a URL string."""
    m = re.search(r'!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)', url)
    if m:
        return float(m.group(1)), float(m.group(2))
    return None


def follow_get(url):
    """Follow URL with GET request (all redirects) and return final URL."""
    try:
        r = requests.get(url, allow_redirects=True, timeout=15, headers=HEADERS)
        return r.url
    except Exception as e:
        return f'ERROR: {e}'


def follow_head(url):
    """Follow URL with HEAD request (one hop) and return redirect location."""
    try:
        r = requests.head(url, allow_redirects=False, timeout=10)
        return r.headers.get('location', '')
    except Exception as e:
        return f'ERROR: {e}'


def already_has_pin(url):
    redirect = follow_head(url)
    return extract_pin_from_url(redirect) is not None


def main():
    with open(GEOJSON_PATH) as f:
        data = json.load(f)

    fixed = []
    needs_review = []

    for feature in data['features']:
        url = feature['properties'].get('alamat_kerja_url', '')
        if not url:
            continue

        name = feature['properties'].get('nama', 'Unknown')
        stored_lng, stored_lat = feature['geometry']['coordinates']

        # Skip entries already OK (have pin in redirect)
        redirect_url = follow_head(url)
        if redirect_url and not redirect_url.startswith('ERROR'):
            pin = extract_pin_from_url(redirect_url)
            if pin:
                pin_lat, pin_lng = pin
                diff = max(abs(stored_lat - pin_lat), abs(stored_lng - pin_lng))
                if diff <= THRESHOLD_DEGREES:
                    time.sleep(0.2)
                    continue  # Already correct

        # --- Strategy 1: Extract Plus Code from URL ---
        plus_code = extract_plus_code_from_url(url)
        if not plus_code and redirect_url and not redirect_url.startswith('ERROR'):
            plus_code = extract_plus_code_from_url(redirect_url)

        if plus_code:
            try:
                recovered = olc.recoverNearest(plus_code, stored_lat, stored_lng)
                decoded = olc.decode(recovered)
                new_lat = decoded.latitudeCenter
                new_lng = decoded.longitudeCenter
                feature['geometry']['coordinates'] = [new_lng, new_lat]
                feature['properties']['sumber_koordinat'] = f'Plus Code {plus_code} ({recovered})'
                fixed.append((name, 'plus_code', plus_code, (stored_lng, stored_lat), (new_lng, new_lat)))
                print(f'  [PLUS CODE] {name}: {plus_code} → [{new_lng:.7f}, {new_lat:.7f}]')
                time.sleep(0.2)
                continue
            except Exception as e:
                print(f'  [PLUS CODE ERROR] {name}: {e}')

        # --- Strategy 2: Follow with GET and extract !3d!4d ---
        final_url = follow_get(url)
        if final_url and not final_url.startswith('ERROR'):
            pin = extract_pin_from_url(final_url)
            if pin:
                pin_lat, pin_lng = pin
                diff = max(abs(stored_lat - pin_lat), abs(stored_lng - pin_lng))
                if diff > THRESHOLD_DEGREES:
                    # Also check viewport to confirm pin != viewport
                    vp_m = re.search(r'@(-?\d+\.\d+),(-?\d+\.\d+)', final_url)
                    is_viewport = False
                    if vp_m:
                        vp_lat, vp_lng = float(vp_m.group(1)), float(vp_m.group(2))
                        vp_diff = max(abs(stored_lat - vp_lat), abs(stored_lng - vp_lng))
                        is_viewport = vp_diff < 0.001
                    feature['geometry']['coordinates'] = [pin_lng, pin_lat]
                    feature['properties']['sumber_koordinat'] = 'Extracted from Google Maps URL (pin, GET)'
                    fixed.append((name, 'get_pin', None, (stored_lng, stored_lat), (pin_lng, pin_lat)))
                    vp_note = ' (was viewport)' if is_viewport else ''
                    print(f'  [GET PIN{vp_note}] {name}: [{stored_lng}, {stored_lat}] → [{pin_lng}, {pin_lat}]')
                else:
                    print(f'  [OK] {name}: already correct within threshold')
                time.sleep(0.2)
                continue

        # --- Strategy 3: Mark as needs manual review ---
        feature['properties']['sumber_koordinat'] = 'Needs manual review'
        needs_review.append((name, url))
        print(f'  [REVIEW] {name}: {url[:80]}')
        time.sleep(0.2)

    with open(GEOJSON_PATH, 'w') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f'\n{"="*60}')
    print(f'DONE')
    print(f'  Fixed (Plus Code): {sum(1 for x in fixed if x[1] == "plus_code")}')
    print(f'  Fixed (GET pin):   {sum(1 for x in fixed if x[1] == "get_pin")}')
    print(f'  Needs review:      {len(needs_review)}')
    if needs_review:
        print('\nNeeds manual review:')
        for name, url in needs_review:
            print(f'  - {name}: {url}')


if __name__ == '__main__':
    main()
