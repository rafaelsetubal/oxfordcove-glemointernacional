'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Map } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { DESTINATIONS } from './destinations';
import { EDITORIAL_MAP_STYLE } from './MapStyle';
import { CustomMarkers } from './CustomMarkers';
import { ConnectionLines } from './ConnectionLines';
import { LocationSidebar } from './LocationSidebar';

interface OxfordCoveMapProps {
  onMapReady?: () => void;
}

export const OxfordCoveMap: React.FC<OxfordCoveMapProps> = ({ onMapReady }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);

  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Project geographic [lng, lat] coordinates to screen pixels
  const updateScreenPositions = useCallback(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    try {
      const newPositions: Record<string, { x: number; y: number }> = {};
      let allValid = true;

      DESTINATIONS.forEach((dest) => {
        const point = map.project([dest.lng, dest.lat]);
        if (point && typeof point.x === 'number' && typeof point.y === 'number') {
          newPositions[dest.id] = { x: Math.round(point.x), y: Math.round(point.y) };
        } else {
          allValid = false;
        }
      });

      if (allValid && Object.keys(newPositions).length === DESTINATIONS.length) {
        setPositions(newPositions);
        setIsLoaded(true);
      }
    } catch (err) {
      console.warn('Position update warning:', err);
    }
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const isMobile = window.innerWidth < 768;

    try {
      const map = new Map({
        container: mapContainerRef.current,
        style: EDITORIAL_MAP_STYLE,
        center: [55.25, 25.09],
        zoom: isMobile ? 9.5 : 10.4,
        interactive: false, // 100% static map — no pan, zoom, pitch, or rotate
        attributionControl: false,
      });

      mapInstanceRef.current = map;

      map.on('load', () => {
        updateScreenPositions();
        if (onMapReady) onMapReady();
      });

      map.on('render', () => {
        updateScreenPositions();
      });

      map.on('idle', () => {
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
      console.error('Error initializing map:', err);
    }
  }, [updateScreenPositions, onMapReady]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#FAF9F6]">
      {/* 01. MAPLIBRE GL CONTAINER (ESRI WORLD LIGHT GRAY CANVAS — ZERO WATERMARK, ZERO API KEY) */}
      <div
        ref={mapContainerRef}
        className="absolute inset-0 w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />

      {/* 02. OVERLAYS: SVG CONNECTION LINES & CUSTOM PINS */}
      {isLoaded && (
        <>
          <ConnectionLines positions={positions} />
          <CustomMarkers positions={positions} />
        </>
      )}

      {/* 03. SIDE LEGEND WITH CONTENT, TIMES, AND DISTANCES */}
      <LocationSidebar />
    </div>
  );
};
