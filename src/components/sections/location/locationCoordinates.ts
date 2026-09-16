// =========================================================================
// CINEMATIC SCROLL MAP — GEOGRAPHIC DATA & MATHEMATICAL PROJECTION
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

// 4 Primary Triangulation Anchors across Dubai Metropolitan Territory
const CALIBRATION_ANCHORS: GeoAnchor[] = [
  { lat: 25.06684, lng: 55.21101, x: 740, y: 960 },   // Oxford Cove (JVC District 11)
  { lat: 25.19720, lng: 55.27440, x: 1360, y: 340 },  // Burj Khalifa (Downtown Dubai)
  { lat: 25.11240, lng: 55.13900, x: 370, y: 670 },   // Palm Jumeirah (Trunk/Gateway)
  { lat: 25.25320, lng: 55.36570, x: 1980, y: 190 },  // Dubai International Airport (DXB)
  { lat: 24.89600, lng: 55.16140, x: 2040, y: 1140 }, // Al Maktoum Int Airport (DWC)
  { lat: 25.08050, lng: 55.14030, x: 420, y: 920 },   // Dubai Marina
  { lat: 25.11810, lng: 55.20060, x: 860, y: 670 },   // Mall of the Emirates
  { lat: 25.10180, lng: 55.24420, x: 1040, y: 820 },  // Dubai Hills
  { lat: 24.96080, lng: 55.15110, x: 780, y: 1180 },  // Expo City Dubai
];

/**
 * Converts WGS84 Latitude and Longitude into SVG World Space (2400x1350)
 * Uses bilinear interpolation across geographic anchors.
 */
export function geoToMapPosition(lat: number, lng: number): { x: number; y: number } {
  // Direct match if matches an exact anchor
  const exact = CALIBRATION_ANCHORS.find(
    (a) => Math.abs(a.lat - lat) < 0.0001 && Math.abs(a.lng - lng) < 0.0001
  );
  if (exact) return { x: exact.x, y: exact.y };

  // Weighted inverse-distance interpolation based on triangulation anchors
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
  phase: 1 | 2 | 3 | 4;
  isPrimary?: boolean;
}

export const OXFORD_COVE_LOCATION: LocationPoint = {
  id: 'oxford-cove',
  name: 'OXFORD COVE',
  subname: 'JVC · DISTRICT 11',
  lat: 25.06684,
  lng: 55.21101,
  order: 1,
  phase: 1,
  isPrimary: true,
};

export const DESTINATION_POINTS: LocationPoint[] = [
  OXFORD_COVE_LOCATION,
  {
    id: 'palm-jumeirah',
    name: 'PALM JUMEIRAH',
    lat: 25.1124,
    lng: 55.1390,
    time: 'APPROX. 20 MIN',
    order: 2,
    phase: 2,
  },
  {
    id: 'dubai-marina',
    name: 'DUBAI MARINA',
    lat: 25.0805,
    lng: 55.1403,
    time: 'APPROX. 18 MIN',
    order: 3,
    phase: 2,
  },
  {
    id: 'mall-of-the-emirates',
    name: 'MALL OF THE EMIRATES',
    lat: 25.1181,
    lng: 55.2006,
    time: 'APPROX. 15 MIN',
    order: 4,
    phase: 3,
  },
  {
    id: 'dubai-hills',
    name: 'DUBAI HILLS',
    lat: 25.1018,
    lng: 55.2442,
    time: 'APPROX. 12 MIN',
    order: 5,
    phase: 3,
  },
  {
    id: 'downtown-dubai',
    name: 'DOWNTOWN DUBAI',
    subname: 'BURJ KHALIFA',
    lat: 25.1972,
    lng: 55.2744,
    time: 'APPROX. 22 MIN',
    order: 6,
    phase: 3,
  },
  {
    id: 'expo-city',
    name: 'EXPO CITY',
    lat: 24.9608,
    lng: 55.1511,
    time: 'APPROX. 15 MIN',
    order: 7,
    phase: 4,
  },
  {
    id: 'dxb-airport',
    name: 'DUBAI INTERNATIONAL AIRPORT',
    subname: 'DXB',
    lat: 25.2532,
    lng: 55.3657,
    time: 'APPROX. 28 MIN',
    order: 8,
    phase: 4,
  },
  {
    id: 'dwc-airport',
    name: 'AL MAKTOUM INTERNATIONAL AIRPORT',
    subname: 'DWC',
    lat: 24.8960,
    lng: 55.1614,
    time: 'APPROX. 25 MIN',
    order: 9,
    phase: 4,
  },
];

// Major Highway Arteries
export interface RoadNetwork {
  id: string;
  code: string;
  name: string;
  path: string;
}

export const HIGHWAY_NETWORK: RoadNetwork[] = [
  {
    id: 'e11',
    code: 'E11',
    name: 'SHEIKH ZAYED ROAD',
    path: 'M 250 1150 Q 500 850 820 560 T 1550 160',
  },
  {
    id: 'e44',
    code: 'E44',
    name: 'AL KHAIL ROAD',
    path: 'M 450 1200 Q 750 950 1060 760 T 1500 280',
  },
  {
    id: 'e311',
    code: 'E311',
    name: 'SHEIKH MOHAMMED BIN ZAYED ROAD',
    path: 'M 550 1300 Q 820 1020 1200 780 T 1800 290',
  },
  {
    id: 'd61',
    code: 'D61',
    name: 'HESSA STREET',
    path: 'M 320 850 Q 580 920 880 1040',
  },
];

// Camera framing keyframe presets
export interface CameraKeyframe {
  phase: 1 | 2 | 3 | 4;
  label: string;
  // Normalized center point [0..2400, 0..1350]
  targetX: number;
  targetY: number;
  scaleDesktop: number;
  scaleTablet: number;
  scaleMobile: number;
}

export const CAMERA_KEYFRAMES: CameraKeyframe[] = [
  {
    phase: 1,
    label: 'ORIGIN — OXFORD COVE & JVC',
    targetX: 740,
    targetY: 960,
    scaleDesktop: 2.4,
    scaleTablet: 2.8,
    scaleMobile: 3.4,
  },
  {
    phase: 2,
    label: 'COASTAL CORRIDOR — PALM JUMEIRAH & DUBAI MARINA',
    targetX: 560,
    targetY: 820,
    scaleDesktop: 1.8,
    scaleTablet: 2.1,
    scaleMobile: 2.5,
  },
  {
    phase: 3,
    label: 'CENTRAL DUBAI — MALL OF THE EMIRATES & DOWNTOWN',
    targetX: 1050,
    targetY: 580,
    scaleDesktop: 1.35,
    scaleTablet: 1.55,
    scaleMobile: 1.9,
  },
  {
    phase: 4,
    label: 'MACRO SCALE — DUBAI METROPOLIS, DXB & DWC',
    targetX: 1200,
    targetY: 675,
    scaleDesktop: 1.0,
    scaleTablet: 1.15,
    scaleMobile: 1.3,
  },
];
