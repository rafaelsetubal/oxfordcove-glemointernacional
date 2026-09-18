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
  const positionsRef = useRef<Record<string, { x: number; y: number }>>({});
  const mapReadyNotifiedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);

  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

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
        const previousPositions = positionsRef.current;
        const hasChanged = DESTINATIONS.some((dest) => {
          const previous = previousPositions[dest.id];
          const next = newPositions[dest.id];
          return !previous || previous.x !== next.x || previous.y !== next.y;
        });

        if (!hasChanged) return;

        positionsRef.current = newPositions;
        setPositions(newPositions);
        setIsLoaded(true);
      }
    } catch (err) {
      console.warn('Position update warning:', err);
    }
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // 01. WebGL Support Verification
    const checkWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        return !!(
          window.WebGLRenderingContext &&
          (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
        );
      } catch (e) {
        return false;
      }
    };

    if (!checkWebGL()) {
      console.warn('WebGL is not supported in this environment.');
      setHasError(true);
      return;
    }

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

      const schedulePositionUpdate = () => {
        if (animationFrameRef.current !== null) return;
        animationFrameRef.current = window.requestAnimationFrame(() => {
          animationFrameRef.current = null;
          updateScreenPositions();
        });
      };

      map.on('error', (e) => {
        console.error('MapLibre error:', e);
        // Only set error if critical style or rendering failure
        if (e.error?.message?.includes('WebGL') || e.error?.message?.includes('Context')) {
          setHasError(true);
        }
      });

      map.on('load', () => {
        schedulePositionUpdate();
      });

      map.on('render', () => {
        schedulePositionUpdate();
      });

      map.on('idle', () => {
        schedulePositionUpdate();
      });

      const handleResize = () => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.resize();
          schedulePositionUpdate();
        }
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (animationFrameRef.current !== null) {
          window.cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
        map.remove();
        mapInstanceRef.current = null;
      };
    } catch (err) {
      console.error('Error initializing map:', err);
      setHasError(true);
    }
  }, [updateScreenPositions]);

  // Notify parent once markers and connection lines are mounted in the DOM
  useEffect(() => {
    if (
      isLoaded &&
      !mapReadyNotifiedRef.current &&
      Object.keys(positions).length >= DESTINATIONS.length
    ) {
      mapReadyNotifiedRef.current = true;
      const timer = setTimeout(() => {
        onMapReady?.();
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, positions, onMapReady]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#FAF9F6]">
      {/* 01. MAPLIBRE GL CONTAINER (ESRI WORLD LIGHT GRAY CANVAS — ZERO WATERMARK, ZERO API KEY) */}
      <div
        ref={mapContainerRef}
        className="absolute inset-0 w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />

      {/* FALLBACK IF WEBGL FAILS */}
      {hasError && (
        <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-[#F3EFE8] z-10">
          <iframe
            title="Mapa Oxford Cove Dubai JVC"
            src="https://maps.google.com/maps?q=Jumeirah+Village+Circle+Dubai&t=&z=11&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0 opacity-75 grayscale contrast-125"
            loading="lazy"
          />
        </div>
      )}

      {/* 02. OVERLAYS: SVG CONNECTION LINES & CUSTOM PINS */}
      {isLoaded && !hasError && (
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
