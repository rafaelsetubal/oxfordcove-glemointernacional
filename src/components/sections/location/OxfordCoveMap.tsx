'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { Map } from 'maplibre-gl';
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
  const mapInstanceRef = useRef<Map | null>(null);

  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Function to project geographic [lng, lat] coordinates to screen pixels
  const updateScreenPositions = useCallback(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    try {
      const newPositions: Record<string, { x: number; y: number }> = {};
      let valid = true;

      DESTINATIONS.forEach((dest) => {
        const point = map.project([dest.lng, dest.lat]);
        if (point && typeof point.x === 'number' && typeof point.y === 'number') {
          newPositions[dest.id] = { x: Math.round(point.x), y: Math.round(point.y) };
        } else {
          valid = false;
        }
      });

      if (valid) {
        setPositions(newPositions);
        setIsLoaded(true);
      }
    } catch (err) {
      console.warn('Error calculating screen positions:', err);
    }
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const isMobile = window.innerWidth < 768;

    try {
      const map = new Map({
        container: mapContainerRef.current,
        style: EDITORIAL_MAP_STYLE_URL,
        center: [55.24, 25.08],
        zoom: isMobile ? 9.5 : 10.4,
        interactive: false, // 100% static map — no pan, zoom, pitch, or rotate
        attributionControl: false,
      });

      mapInstanceRef.current = map;

      map.on('load', () => {
        applyEditorialPalette(map);
        updateScreenPositions();
        if (onMapReady) onMapReady();
      });

      map.on('render', () => {
        updateScreenPositions();
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
    } catch (err) {
      console.error('Failed to initialize MapLibre GL:', err);
    }
  }, [updateScreenPositions, onMapReady]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#FAF9F6]">
      {/* 01. IMMEDIATE BASE MAP VISUAL (GUARANTEES ZERO BLANK SCREEN) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <Image
          src="/images/location/dubai-cinematic-map.webp"
          alt="Dubai Geographic Map"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-90"
        />
      </div>

      {/* 02. REAL VECTOR MAP CONTAINER (MAPLIBRE GL) */}
      <div
        ref={mapContainerRef}
        className="absolute inset-0 w-full h-full z-[1]"
        style={{ width: '100%', height: '100%' }}
      />

      {/* 03. OVERLAY LAYERS: LINES & MARKERS */}
      {isLoaded && (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-[10]">
          <ConnectionLines positions={positions} />
          <CustomMarkers positions={positions} />
        </div>
      )}
    </div>
  );
};
