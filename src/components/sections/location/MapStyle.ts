// =========================================================================
// MAPLIBRE GL CUSTOM EDITORIAL REAL ESTATE STYLE
// Oxford Cove · JVC · Dubai
// =========================================================================

import type { StyleSpecification } from 'maplibre-gl';

/**
 * Editorial real estate map style for Dubai
 * Off-white/cream background, soft teal water, muted landcover, beige/neutral roads, no commercial POI noise.
 */
export const EDITORIAL_MAP_STYLE_URL = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';

/**
 * Custom style layer overrides applied after style load
 * to achieve the exact editorial luxury palette requested.
 */
export function applyEditorialPalette(map: any) {
  try {
    // Background
    if (map.getLayer('background')) {
      map.setPaintProperty('background', 'background-color', '#FAF9F6');
    }

    // Water
    const waterLayers = ['water', 'waterway', 'water_shadow'];
    waterLayers.forEach((layerId) => {
      if (map.getLayer(layerId)) {
        map.setPaintProperty(layerId, 'fill-color', '#CCE2E4');
        map.setPaintProperty(layerId, 'fill-opacity', 0.9);
      }
    });

    // Green areas / Parks / Landcover
    const greenLayers = ['landcover_wood', 'landcover_grass', 'park', 'landuse_park', 'landuse_residential'];
    greenLayers.forEach((layerId) => {
      if (map.getLayer(layerId)) {
        map.setPaintProperty(layerId, 'fill-color', '#EBF1EB');
        map.setPaintProperty(layerId, 'fill-opacity', 0.6);
      }
    });

    // Secondary Roads
    const roadLayers = ['road_minor', 'road_secondary_tertiary', 'road_trunk_primary'];
    roadLayers.forEach((layerId) => {
      if (map.getLayer(layerId)) {
        map.setPaintProperty(layerId, 'line-color', '#E8E4DC');
      }
    });

    // Highways / Motorways
    if (map.getLayer('road_motorway')) {
      map.setPaintProperty('road_motorway', 'line-color', '#D9D2C4');
      map.setPaintProperty('road_motorway', 'line-width', 2);
    }

    // Hide commercial POIs and noise
    const poiLayers = ['poi', 'poi_label', 'poi_transit', 'transit_label'];
    poiLayers.forEach((layerId) => {
      if (map.getLayer(layerId)) {
        map.setLayoutProperty(layerId, 'visibility', 'none');
      }
    });
  } catch (err) {
    // Non-fatal if specific layer name differs in sub-version
    console.warn('Custom palette override note:', err);
  }
}
