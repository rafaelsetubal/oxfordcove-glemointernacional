// =========================================================================
// MAPLIBRE GL CUSTOM EDITORIAL REAL ESTATE STYLE
// Oxford Cove · JVC · Dubai
// =========================================================================

export const EDITORIAL_MAP_STYLE_URL = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';

/**
 * Safe palette styling that never throws errors
 */
export function applyEditorialPalette(map: any) {
  try {
    if (!map || !map.isStyleLoaded()) return;

    // Water layer
    if (map.getLayer('water')) {
      map.setPaintProperty('water', 'fill-color', '#CCE2E4');
    }

    // Hide commercial POI symbols and transit clutter
    const layers = map.getStyle()?.layers || [];
    layers.forEach((layer: any) => {
      if (
        layer.type === 'symbol' &&
        (layer.id.startsWith('poi') || layer.id.startsWith('transit') || layer.id.includes('housenumber'))
      ) {
        map.setLayoutProperty(layer.id, 'visibility', 'none');
      }
    });
  } catch (err) {
    console.warn('Style customization note:', err);
  }
}
