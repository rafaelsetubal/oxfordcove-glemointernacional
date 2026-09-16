// =========================================================================
// MAPLIBRE GL CUSTOM EDITORIAL REAL ESTATE STYLE
// Oxford Cove · JVC · Dubai
// =========================================================================

import type { StyleSpecification } from 'maplibre-gl';

/**
 * Self-contained editorial real estate map style for Dubai.
 * Uses high-performance Carto Light NoLabels tiles (real OpenStreetMap geodata)
 * with an off-white/cream background, subtle water, and zero commercial POI noise.
 */
export const EDITORIAL_MAP_STYLE: StyleSpecification = {
  version: 8,
  name: 'Oxford Cove Editorial Dubai',
  sources: {
    'carto-light': {
      type: 'raster',
      tiles: [
        'https://a.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}.png',
        'https://b.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}.png',
        'https://c.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}.png',
        'https://d.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}.png',
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
      id: 'carto-light-layer',
      type: 'raster',
      source: 'carto-light',
      minzoom: 0,
      maxzoom: 19,
      paint: {
        'raster-opacity': 0.95,
        'raster-saturation': -0.15,
        'raster-contrast': 0.05,
      },
    },
  ],
};
