// =========================================================================
// DESTINATIONS & GEOGRAPHIC COORDINATES
// Oxford Cove · JVC · Dubai
// =========================================================================

export interface Destination {
  id: string;
  name: string;
  subname?: string;
  lat: number;
  lng: number;
  revealOrder: number;
  isPrimary?: boolean;
}

export const OXFORD_COVE_LOCATION: Destination = {
  id: 'oxford-cove',
  name: 'OXFORD COVE',
  subname: 'JVC · DISTRICT 11',
  lat: 25.06684,
  lng: 55.21101,
  revealOrder: 1,
  isPrimary: true,
};

export const DESTINATIONS: Destination[] = [
  OXFORD_COVE_LOCATION,
  {
    id: 'dubai-marina',
    name: 'Dubai Marina',
    lat: 25.0805,
    lng: 55.1403,
    revealOrder: 2,
  },
  {
    id: 'palm-jumeirah',
    name: 'Palm Jumeirah',
    lat: 25.1124,
    lng: 55.1390,
    revealOrder: 3,
  },
  {
    id: 'mall-of-the-emirates',
    name: 'Mall of the Emirates',
    lat: 25.1181,
    lng: 55.2006,
    revealOrder: 4,
  },
  {
    id: 'dubai-hills',
    name: 'Dubai Hills',
    lat: 25.1018,
    lng: 55.2425,
    revealOrder: 5,
  },
  {
    id: 'downtown-dubai',
    name: 'Downtown / Burj Khalifa',
    lat: 25.1972,
    lng: 55.2744,
    revealOrder: 6,
  },
  {
    id: 'dxb-airport',
    name: 'DXB Airport',
    lat: 25.2532,
    lng: 55.3657,
    revealOrder: 7,
  },
  {
    id: 'dwc-airport',
    name: 'DWC Airport',
    lat: 24.8960,
    lng: 55.1614,
    revealOrder: 8,
  },
];
