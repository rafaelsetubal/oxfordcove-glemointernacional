// =========================================================================
// DESTINATIONS & GEOGRAPHIC COORDINATES
// Oxford Cove · JVC · Dubai
// =========================================================================

export interface Destination {
  id: string;
  name: string;
  subname?: string;
  time: string;
  distance: string;
  lat: number;
  lng: number;
  revealOrder: number;
  isPrimary?: boolean;
  offset: 'nw' | 'sw' | 'ne' | 'se' | 'e' | 'w' | 'n' | 's';
}

export const OXFORD_COVE_LOCATION: Destination = {
  id: 'oxford-cove',
  name: 'OXFORD COVE',
  subname: 'JVC · DISTRICT 11',
  time: 'ORIGEM',
  distance: 'District 11',
  lat: 25.06684,
  lng: 55.21101,
  revealOrder: 1,
  isPrimary: true,
  offset: 'n',
};

export const DESTINATIONS: Destination[] = [
  OXFORD_COVE_LOCATION,
  {
    id: 'dubai-marina',
    name: 'Dubai Marina & JBR',
    time: '18 min',
    distance: '14 km',
    lat: 25.0805,
    lng: 55.1403,
    revealOrder: 2,
    offset: 'sw',
  },
  {
    id: 'palm-jumeirah',
    name: 'Palm Jumeirah',
    time: '20 min',
    distance: '16 km',
    lat: 25.1124,
    lng: 55.1390,
    revealOrder: 3,
    offset: 'nw',
  },
  {
    id: 'mall-of-the-emirates',
    name: 'Mall of the Emirates',
    time: '15 min',
    distance: '13 km',
    lat: 25.1181,
    lng: 55.2006,
    revealOrder: 4,
    offset: 'n',
  },
  {
    id: 'dubai-hills',
    name: 'Dubai Hills Mall',
    time: '12 min',
    distance: '11 km',
    lat: 25.1018,
    lng: 55.2425,
    revealOrder: 5,
    offset: 'se',
  },
  {
    id: 'downtown-dubai',
    name: 'Downtown & Burj Khalifa',
    subname: 'Dubai Mall',
    time: '22 min',
    distance: '21 km',
    lat: 25.1972,
    lng: 55.2744,
    revealOrder: 6,
    offset: 'e',
  },
  {
    id: 'dxb-airport',
    name: 'Dubai Intl Airport (DXB)',
    time: '28 min',
    distance: '32 km',
    lat: 25.2532,
    lng: 55.3657,
    revealOrder: 7,
    offset: 'w',
  },
  {
    id: 'dwc-airport',
    name: 'Al Maktoum Airport (DWC)',
    time: '25 min',
    distance: '28 km',
    lat: 24.8960,
    lng: 55.1614,
    revealOrder: 8,
    offset: 'e',
  },
];
