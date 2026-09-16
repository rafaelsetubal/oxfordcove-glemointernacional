// =========================================================================
// CINEMATIC SCROLL MAP — COORDINATES, PROJECTIONS & DESTINATION DATA
// Oxford Cove · Jumeirah Village Circle (District 11) · Dubai, UAE
// =========================================================================

export const WORLD_WIDTH = 2400;
export const WORLD_HEIGHT = 1350;

/**
 * Coordinate projection calibration based on the 2400x1350 Dubai geographical map.
 * Oxford Cove is in JVC District 11 (25.06684 N, 55.21101 E).
 */
export interface MapPoint {
  x: number;
  y: number;
}

export interface Destination {
  id: string;
  name: string;
  category: 'DISTRICT' | 'LANDMARK' | 'LEISURE' | 'AIRPORT' | 'RETAIL' | 'BEACH';
  travelTime: string; // e.g. "17 min"
  travelDistance?: string; // e.g. "14 km"
  lat: number;
  lng: number;
  mapX: number;
  mapY: number;
  phase: 1 | 2 | 3 | 4; // Reveal phase in scroll sequence
  description: string;
  isPrimary?: boolean;
}

// Fixed calibrated coordinates for pixel-perfect alignment in 2400x1350 map space
export const OXFORD_COVE_COORDS: MapPoint = {
  x: 730,
  y: 960,
};

export const DESTINATIONS: Destination[] = [
  {
    id: 'oxford-cove',
    name: 'Oxford Cove',
    category: 'DISTRICT',
    travelTime: '0 min',
    travelDistance: 'JVC District 11',
    lat: 25.06684,
    lng: 55.21101,
    mapX: 730,
    mapY: 960,
    phase: 1,
    description: 'Residencial boutique de luxo no coração do District 11, JVC.',
    isPrimary: true,
  },
  {
    id: 'circle-mall',
    name: 'Circle Mall (JVC)',
    category: 'RETAIL',
    travelTime: '3 min',
    travelDistance: '1.8 km',
    lat: 25.0592,
    lng: 55.2078,
    mapX: 760,
    mapY: 980,
    phase: 1,
    description: 'Shopping center central de JVC com mais de 80 lojas, cafés e restaurantes.',
  },
  {
    id: 'dubai-hills-mall',
    name: 'Dubai Hills Mall',
    category: 'RETAIL',
    travelTime: '12 min',
    travelDistance: '11 km',
    lat: 25.1018,
    lng: 55.2442,
    mapX: 1040,
    mapY: 820,
    phase: 2,
    description: 'Um dos maiores centros de compras, gastronomia e lazer de Dubai.',
  },
  {
    id: 'mall-of-the-emirates',
    name: 'Mall of the Emirates',
    category: 'RETAIL',
    travelTime: '15 min',
    travelDistance: '13 km',
    lat: 25.1181,
    lng: 55.2006,
    mapX: 860,
    mapY: 670,
    phase: 2,
    description: 'Ícone mundial de varejo de luxo, moda e entretenimento (Ski Dubai).',
  },
  {
    id: 'dubai-marina',
    name: 'Dubai Marina & JBR',
    category: 'BEACH',
    travelTime: '18 min',
    travelDistance: '14 km',
    lat: 25.0805,
    lng: 55.1403,
    mapX: 420,
    mapY: 920,
    phase: 3,
    description: 'Vida noturna cosmopolita, iates, calçadões à beira-mar e alta gastronomia.',
  },
  {
    id: 'bluewaters',
    name: 'Bluewaters Island & Ain Dubai',
    category: 'LEISURE',
    travelTime: '17 min',
    travelDistance: '15 km',
    lat: 25.0792,
    lng: 55.1215,
    mapX: 340,
    mapY: 950,
    phase: 3,
    description: 'Ilha icônica de luxo, restaurantes estrelados e a maior roda-gigante do mundo.',
  },
  {
    id: 'palm-jumeirah',
    name: 'Palm Jumeirah',
    category: 'BEACH',
    travelTime: '20 min',
    travelDistance: '16 km',
    lat: 25.1124,
    lng: 55.1390,
    mapX: 370,
    mapY: 670,
    phase: 3,
    description: 'O arquipélago artificial mais famoso do planeta com resorts ultra-exclusivos.',
  },
  {
    id: 'burj-al-arab',
    name: 'Burj Al Arab',
    category: 'LANDMARK',
    travelTime: '20 min',
    travelDistance: '17 km',
    lat: 25.1412,
    lng: 55.1852,
    mapX: 740,
    mapY: 530,
    phase: 3,
    description: 'O primeiro hotel 7 estrelas do mundo e símbolo incontestável de Dubai.',
  },
  {
    id: 'downtown-dubai',
    name: 'Downtown Dubai & Burj Khalifa',
    category: 'LANDMARK',
    travelTime: '22 min',
    travelDistance: '21 km',
    lat: 25.1972,
    lng: 55.2744,
    mapX: 1360,
    mapY: 340,
    phase: 3,
    description: 'O centro global de negócios, Dubai Mall, Dubai Opera e o edifício mais alto do mundo.',
  },
  {
    id: 'difc',
    name: 'DIFC (Financial Centre)',
    category: 'DISTRICT',
    travelTime: '24 min',
    travelDistance: '23 km',
    lat: 25.2144,
    lng: 55.2818,
    mapX: 1420,
    mapY: 280,
    phase: 3,
    description: 'Principal hub financeiro internacional do Oriente Médio.',
  },
  {
    id: 'dxb-airport',
    name: 'Dubai International Airport (DXB)',
    category: 'AIRPORT',
    travelTime: '28 min',
    travelDistance: '32 km',
    lat: 25.2532,
    lng: 55.3657,
    mapX: 1980,
    mapY: 190,
    phase: 4,
    description: 'O aeroporto com maior tráfego internacional de passageiros do mundo.',
  },
  {
    id: 'dwc-airport',
    name: 'Al Maktoum Int. Airport (DWC)',
    category: 'AIRPORT',
    travelTime: '25 min',
    travelDistance: '28 km',
    lat: 24.8960,
    lng: 55.1614,
    mapX: 2040,
    mapY: 1140,
    phase: 4,
    description: 'O futuro mega-aeroporto de Dubai com investimento de AED 128 bilhões.',
  },
];

// Major Highway Arteries (Curved Bezier Paths for visual connectivity)
export interface RoadArtery {
  id: string;
  name: string;
  code: string;
  path: string;
  strokeWidth: number;
}

export const ROAD_ARTERIES: RoadArtery[] = [
  {
    id: 'e44-al-khail',
    name: 'Al Khail Road',
    code: 'E44',
    path: 'M 450 1200 Q 750 950 1060 760 T 1500 280',
    strokeWidth: 3.5,
  },
  {
    id: 'e311-smbz',
    name: 'Sheikh Mohammed Bin Zayed Rd',
    code: 'E311',
    path: 'M 550 1300 Q 820 1020 1200 780 T 1800 290',
    strokeWidth: 3.5,
  },
  {
    id: 'e11-szr',
    name: 'Sheikh Zayed Road',
    code: 'E11',
    path: 'M 250 1150 Q 500 850 820 560 T 1550 160',
    strokeWidth: 4,
  },
  {
    id: 'd61-hessa',
    name: 'Hessa Street',
    code: 'D61',
    path: 'M 320 850 Q 580 920 880 1040',
    strokeWidth: 2.5,
  },
  {
    id: 'd63-al-qudra',
    name: 'Al Qudra Road',
    code: 'D63',
    path: 'M 720 1060 Q 1100 1180 1600 1280',
    strokeWidth: 2,
  },
];

// Cinematic Scroll Phases Configuration
export interface CameraPhase {
  phase: number;
  label: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  targetX: number; // ViewBox Center X in 2400x1350 space
  targetY: number; // ViewBox Center Y
  scale: number;   // Zoom factor
  destinations: string[]; // Destination IDs to highlight
}

export const CINEMATIC_PHASES: CameraPhase[] = [
  {
    phase: 1,
    label: 'FASE 01',
    tag: 'JVC & DISTRICT 11',
    title: 'O Epicentro Local',
    subtitle: 'Oxford Cove no coração do District 11',
    description: 'Imersão no traçado planejado de Jumeirah Village Circle, com acesso imediato a parques, Circle Mall e conveniências a passos de casa.',
    targetX: 740,
    targetY: 960,
    scale: 2.6,
    destinations: ['oxford-cove', 'circle-mall'],
  },
  {
    phase: 2,
    label: 'FASE 02',
    tag: 'ARTÉRIAS & CONECTIVIDADE',
    title: 'Acesso Rápido às Principais Vias',
    subtitle: 'Conexão direta com E44, E311 e Hessa St',
    description: 'Posicionamento estratégico entre as três maiores rodovias de Dubai, permitindo deslocamento fluído e sem gargalos para qualquer direção.',
    targetX: 860,
    targetY: 860,
    scale: 1.85,
    destinations: ['oxford-cove', 'circle-mall', 'dubai-hills-mall', 'mall-of-the-emirates'],
  },
  {
    phase: 3,
    label: 'FASE 03',
    tag: 'DUBAI METROPOLITANA',
    title: 'Da Costa ao Burj Khalifa',
    subtitle: '15 a 22 minutos dos maiores cartões-postais',
    description: 'A poucos minutos das praias de Palm Jumeirah e Dubai Marina, até o centro financeiro em Downtown Dubai e DIFC.',
    targetX: 950,
    targetY: 650,
    scale: 1.35,
    destinations: [
      'oxford-cove',
      'dubai-marina',
      'bluewaters',
      'palm-jumeirah',
      'burj-al-arab',
      'downtown-dubai',
      'difc',
    ],
  },
  {
    phase: 4,
    label: 'FASE 04',
    tag: 'ESCALA GLOBAL & FUTURO',
    title: 'Conexão com o Mundo',
    subtitle: 'Posicionamento central entre DXB e DWC',
    description: 'Equidistante do aeroporto DXB atual e do colossal Al Maktoum International (DWC), ancorando a valorização imobiliária a longo prazo.',
    targetX: 1200,
    targetY: 675,
    scale: 1.0,
    destinations: [
      'oxford-cove',
      'palm-jumeirah',
      'downtown-dubai',
      'dxb-airport',
      'dwc-airport',
    ],
  },
];
