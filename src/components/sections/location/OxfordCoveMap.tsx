'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { DESTINATIONS } from './destinations';
import { EDITORIAL_MAP_STYLE_URL, applyEditorialPalette } from './MapStyle';
import { CustomMarkers } from './CustomMarkers';
import { ConnectionLines } from './ConnectionLines';

interface OxfordCoveMapProps {
  onMapReady?: () => void;
}

export const OxfordCoveMap: React.FC<OxfordCoveMapProps> = ({ onMapReady }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<maplibregl.Map | null>(null);

  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Function to project geographic [lng, lat] coordinates to screen pixels
  const updateScreenPositions = useCallback(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const newPositions: Record<string, { x: number; y: number }> = {};
    DESTINATIONS.forEach((dest) => {
      const point = map.project([dest.lng, dest.lat]);
      newPositions[dest.id] = { x: Math.round(point.x), y: Math.round(point.y) };
    });

    setPositions(newPositions);
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const isMobile = window.innerWidth < 768;

    // Initial fixed framing encompassing Greater Dubai (from DWC in south to DXB in north, coast to inland)
    const bounds: [number, number, number, number] = [55.10, 24.86, 55.40, 25.28]; // [sw.lng, sw.lat, ne.lng, ne.lat]

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: EDITORIAL_MAP_STYLE_URL,
      bounds: bounds,
      fitBoundsOptions: {
        padding: isMobile
          ? { top: 50, bottom: 50, left: 30, right: 30 }
          : { top: 80, bottom: 80, left: 80, right: 80 },
        duration: 0,
      },
      interactive: false, // 100% static map — no pan, zoom, pitch, or rotate
      attributionControl: false,
    });

    mapInstanceRef.current = map;

    map.on('load', () => {
      applyEditorialPalette(map);
      updateScreenPositions();
      setIsLoaded(true);
      if (onMapReady) onMapReady();
    });

    const handleResize = () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.resize();
        updateScreenPositions();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [updateScreenPositions, onMapReady]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#FAF9F6]">
      {/* 01. REAL VECTOR MAP CONTAINER (MAPLIBRE GL) */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* 02. OVERLAY LAYERS: LINES & MARKERS */}
      {isLoaded && (
        <>
          <ConnectionLines positions={positions} />
          <CustomMarkers positions={positions} />
        </>
      )}
    </div>
  );
};
