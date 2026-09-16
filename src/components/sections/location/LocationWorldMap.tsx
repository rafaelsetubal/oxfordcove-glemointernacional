'use client';

import React from 'react';
import {
  WORLD_WIDTH,
  WORLD_HEIGHT,
} from './locationCoordinates';
import { LocationConnections } from './LocationConnections';
import { LocationMarkers } from './LocationMarkers';
import { LocationLabels } from './LocationLabels';

export const LocationWorldMap: React.FC = () => {
  return (
    <div className="relative w-full h-full bg-[#FAF9F6] overflow-hidden select-none">
      <svg
        viewBox={`0 0 ${WORLD_WIDTH} ${WORLD_HEIGHT}`}
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full block"
        style={{ width: '100%', height: '100%' }}
      >
        {/* 01. BASE CARTOGRAPHIC RASTER LAYER (2400x1350) */}
        <image
          href="/images/location/dubai-cinematic-map.webp"
          x="0"
          y="0"
          width={WORLD_WIDTH}
          height={WORLD_HEIGHT}
          preserveAspectRatio="xMidYMid slice"
          className="opacity-100"
        />

        {/* 02. PROGRESSIVE CONNECTION PATHS */}
        <LocationConnections />

        {/* 03. LOCATION MARKERS */}
        <LocationMarkers />

        {/* 04. WORLD-ANCHORED LABELS */}
        <LocationLabels />
      </svg>
    </div>
  );
};
