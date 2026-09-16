// =========================================================================
// LOCATION MAP — GEOGRAPHIC DATA & MATHEMATICAL PROJECTION
// Oxford Cove · Jumeirah Village Circle (District 11) · Dubai, UAE
// =========================================================================

export const WORLD_WIDTH = 2400;
export const WORLD_HEIGHT = 1350;

/**
 * Geographic Calibration Anchor Points for Dubai Projection
 * Calibrated across the 2400x1350 cartographic canvas.
 */
interface GeoAnchor {
  lat: number;
  lng: number;
  x: number;
  y: number;
}

const CALIBRATION_ANCHORS: GeoAnchor[] = [
  { lat: 25.06684, lng: 55.21101, x: 740, y: 960 },   // Oxford Cove (JVC District 11)
  { lat: 25.08050, lng: 55.14030, x: 420, y: 920 },   // Dubai Marina
  { lat: 25.11240, lng: 55.13900, x: 370, y: 670 },   // Palm Jumeirah
  { lat: 25.11810, lng: 55.20060, x: 860, y: 670 },   // Mall of the Emirates
  { lat: 25.10180, lng: 55.24420, x: 1040, y: 820 },  // Dubai Hills
  { lat: 25.19720, lng: 55.27440, x: 1360, y: 340 },  // Downtown Dubai / Burj Khalifa
  { lat: 25.25320, lng: 55.36570, x: 1980, y: 190 },  // Dubai International Airport (DXB)
  { lat: 24.89600, lng: 55.16140, x: 2040, y: 1140 }, // Al Maktoum International Airport (DWC)
];

/**
 * Converts WGS84 Latitude and Longitude into SVG World Space (2400x1350)
 * Uses bilinear interpolation across geographic anchors.
 */
export function geoToMapPosition(lat: number, lng: number): { x: number; y: number } {
  const exact = CALIBRATION_ANCHORS.find(
    (a) => Math.abs(a.lat - lat) < 0.0001 && Math.abs(a.lng - lng) < 0.0001
  );
  if (exact) return { x: exact.x, y: exact.y };

  let totalWeight = 0;
  let sumX = 0;
  let sumY = 0;

  for (const anchor of CALIBRATION_ANCHORS) {
    const dLat = lat - anchor.lat;
    const dLng = lng - anchor.lng;
    const distSq = dLat * dLat + dLng * dLng;

    if (distSq < 1e-9) {
      return { x: anchor.x, y: anchor.y };
    }

    const weight = 1 / Math.pow(distSq, 1.5);
    sumX += anchor.x * weight;
    sumY += anchor.y * weight;
    totalWeight += weight;
  }

  return {
    x: Math.round(sumX / totalWeight),
    y: Math.round(sumY / totalWeight),
  };
}

export interface LocationPoint {
  id: string;
  name: string;
  subname?: string;
  lat: number;
  lng: number;
  time?: string;
  order: number;
  isPrimary?: boolean;
}

export const OXFORD_COVE_LOCATION: LocationPoint = {
  id: 'oxford-cove',
  name: 'OXFORD COVE',
  subname: 'JVC · DISTRICT 11',
  lat: 25.06684,
  lng: 55.21101,
  order: 1,
  isPrimary: true,
};

export const DESTINATION_POINTS: LocationPoint[] = [
  OXFORD_COVE_LOCATION,
  {
    id: 'dubai-marina',
    name: 'DUBAI MARINA',
    lat: 25.0805,
    lng: 55.1403,
    time: 'APPROX. 18 MIN',
    order: 2,
  },
  {
    id: 'palm-jumeirah',
    name: 'PALM JUMEIRAH',
    lat: 25.1124,
    lng: 55.1390,
    time: 'APPROX. 20 MIN',
    order: 3,
  },
  {
    id: 'mall-of-the-emirates',
    name: 'MALL OF THE EMIRATES',
    lat: 25.1181,
    lng: 55.2006,
    time: 'APPROX. 15 MIN',
    order: 4,
  },
  {
    id: 'dubai-hills',
    name: 'DUBAI HILLS',
    lat: 25.1018,
    lng: 55.2442,
    time: 'APPROX. 12 MIN',
    order: 5,
  },
  {
    id: 'downtown-dubai',
    name: 'DOWNTOWN DUBAI',
    subname: 'BURJ KHALIFA',
    lat: 25.1972,
    lng: 55.2744,
    time: 'APPROX. 22 MIN',
    order: 6,
  },
  {
    id: 'dxb-airport',
    name: 'DUBAI INTERNATIONAL AIRPORT',
    subname: 'DXB',
    lat: 25.2532,
    lng: 55.3657,
    time: 'APPROX. 28 MIN',
    order: 7,
  },
  {
    id: 'dwc-airport',
    name: 'AL MAKTOUM INTERNATIONAL AIRPORT',
    subname: 'DWC',
    lat: 24.8960,
    lng: 55.1614,
    time: 'APPROX. 25 MIN',
    order: 8,
  },
];
