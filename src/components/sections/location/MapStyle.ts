// =========================================================================
// MAPLIBRE GL CUSTOM EDITORIAL REAL ESTATE STYLE
// Oxford Cove · JVC · Dubai
// =========================================================================

import type { StyleSpecification } from 'maplibre-gl';

/**
 * Clean architectural map style for Dubai.
 * Uses Esri World Light Gray Canvas & OpenStreetMap geodata.
 * 100% Free, NO API key required, NO watermark.
 */
export const EDITORIAL_MAP_STYLE: StyleSpecification = {
  version: 8,
  name: 'Oxford Cove Editorial Map',
  sources: {
    'esri-light-gray': {
      type: 'raster',
      tiles: [
        'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      ],
      tileSize: 256,
      attribution: '',
    },
  },
  layers: [
    {
      id: 'background',
      type: 'background',
      paint: {
        'background-color': '#FAF9F6',
      },
    },
    {
      id: 'esri-light-gray-layer',
      type: 'raster',
      source: 'esri-light-gray',
      minzoom: 0,
      maxzoom: 18,
      paint: {
        'raster-opacity': 0.95,
        'raster-saturation': -0.15,
        'raster-contrast': 0.05,
      },
    },
  ],
};
