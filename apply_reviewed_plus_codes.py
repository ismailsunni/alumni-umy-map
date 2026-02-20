"""
Apply manually reviewed Plus Codes from alumni_koordinat-plus-code-reviewed.csv
to the GeoJSON. Only processes entries where review == 'manual plus code'.

For each such entry:
1. Extract the Plus Code from the sumber_koordinat column
2. Geocode the location string (after the Plus Code) via Nominatim as reference
3. Recover full Plus Code and decode to lat/lng
4. If no Plus Code found, geocode the full address string
5. Update the GeoJSON with new coordinates
"""

import csv
import json
import re
import time

import requests
from openlocationcode import openlocationcode as olc

GEOJSON_PATH = 'Koordinat_Alumni_Lengkap_Redacted_corrected.geojson'
CSV_PATH = 'alumni_koordinat-plus-code-reviewed.csv'

PLUS_CODE_RE = re.compile(
    r'^([23456789CFGHJMPQRVWX]{2,8}\+[23456789CFGHJMPQRVWX]{2,7})',
    re.IGNORECASE
)

NOMINATIM_HEADERS = {'User-Agent': 'AlumniMapUMY/1.0 (educational project)'}


def geocode(query):
    """Geocode a location string using Nominatim. Returns (lat, lng) or None."""
    try:
        r = requests.get(
            'https://nominatim.openstreetmap.org/search',
            params={'q': query, 'format': 'json', 'limit': 1},
            headers=NOMINATIM_HEADERS,
            timeout=10
        )
        results = r.json()
        if results:
            return float(results[0]['lat']), float(results[0]['lon'])
    except Exception as e:
        print(f'    Geocode error for "{query}": {e}')
    return None


def resolve_entry(sumber_koordinat, stored_lat, stored_lng):
    """
    Returns (new_lat, new_lng, new_source) or None if unresolvable.
    """
    text = sumber_koordinat.strip()
    m = PLUS_CODE_RE.match(text)

    if m:
        plus_code = m.group(1).upper()
        location_str = text[m.end():].strip().lstrip(',').strip()

        # Geocode the location string for a better reference point
        ref_lat, ref_lng = stored_lat, stored_lng  # fallback
        if location_str:
            coords = geocode(location_str)
            time.sleep(1.1)  # Nominatim rate limit
            if coords:
                ref_lat, ref_lng = coords
                print(f'    Geocoded "{location_str}" → {ref_lat:.4f}, {ref_lng:.4f}')
            else:
                print(f'    Geocode failed for "{location_str}", using stored coords as reference')
        try:
            recovered = olc.recoverNearest(plus_code, ref_lat, ref_lng)
            decoded = olc.decode(recovered)
            return decoded.latitudeCenter, decoded.longitudeCenter, f'Plus Code {plus_code} ({recovered})'
        except Exception as e:
            print(f'    Plus Code recovery error: {e}')
            return None
    else:
        # No Plus Code — geocode the full address string
        print(f'    No Plus Code found, geocoding address: "{text[:60]}"')
        coords = geocode(text)
        time.sleep(1.1)
        if coords:
            return coords[0], coords[1], f'Geocoded from address'
        return None


def main():
    with open(GEOJSON_PATH) as f:
        geojson = json.load(f)

    # Build name → feature index map
    name_to_idx = {}
    for i, feature in enumerate(geojson['features']):
        name_to_idx[feature['properties']['nama'].strip()] = i

    fixed = []
    failed = []

    with open(CSV_PATH, newline='', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            if row.get('review', '').strip() != 'manual plus code':
                continue

            name = row['nama'].strip()
            sumber = row['sumber_koordinat'].strip()
            stored_lng = float(row['longitude'])
            stored_lat = float(row['latitude'])

            print(f'\n[{name}]')
            print(f'  Source: {sumber[:80]}')

            result = resolve_entry(sumber, stored_lat, stored_lng)
            if result is None:
                print(f'  FAILED to resolve')
                failed.append((name, sumber))
                continue

            new_lat, new_lng, new_source = result
            print(f'  {stored_lng:.6f}, {stored_lat:.6f} → {new_lng:.7f}, {new_lat:.7f}')

            idx = name_to_idx.get(name)
            if idx is None:
                # Try partial match
                for n, i in name_to_idx.items():
                    if name.lower() in n.lower() or n.lower() in name.lower():
                        idx = i
                        break

            if idx is None:
                print(f'  WARNING: name not found in GeoJSON')
                failed.append((name, 'not found in GeoJSON'))
                continue

            geojson['features'][idx]['geometry']['coordinates'] = [new_lng, new_lat]
            geojson['features'][idx]['properties']['sumber_koordinat'] = new_source
            fixed.append((name, (stored_lng, stored_lat), (new_lng, new_lat), new_source))

    with open(GEOJSON_PATH, 'w') as f:
        json.dump(geojson, f, indent=2, ensure_ascii=False)

    print(f'\n{"="*60}')
    print(f'DONE: {len(fixed)} fixed, {len(failed)} failed')
    if failed:
        print('\nFailed:')
        for name, reason in failed:
            print(f'  - {name}: {reason}')


if __name__ == '__main__':
    main()
