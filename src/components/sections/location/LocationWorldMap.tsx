'use client';

import React from 'react';
import {
  WORLD_WIDTH,
  WORLD_HEIGHT,
  HIGHWAY_NETWORK,
} from './locationCoordinates';
import { LocationConnections } from './LocationConnections';
import { LocationMarkers } from './LocationMarkers';
import { LocationLabels } from './LocationLabels';

export const LocationWorldMap: React.FC = () => {
  return (
    <div className="relative w-full h-full bg-[#181614] overflow-hidden select-none">
      <svg
        viewBox={`0 0 ${WORLD_WIDTH} ${WORLD_HEIGHT}`}
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full block"
        style={{ width: '100%', height: '100%' }}
      >
        <defs>
          <radialGradient id="vignetteGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#181614" stopOpacity="0" />
            <stop offset="80%" stopColor="#181614" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#181614" stopOpacity="0.8" />
          </radialGradient>
        </defs>

        {/* 01. BASE CARTOGRAPHIC VISUAL LAYER (2400x1350) */}
        <image
          href="/images/location/dubai-cinematic-map.webp"
          x="0"
          y="0"
          width={WORLD_WIDTH}
          height={WORLD_HEIGHT}
          preserveAspectRatio="xMidYMid slice"
          className="opacity-95"
        />

        {/* 02. GEOGRAPHIC LAT/LNG REFERENCE GRID */}
        <g opacity="0.08" stroke="#FAF9F6" strokeWidth="0.75" strokeDasharray="3 6">
          <line x1="0" y1="337" x2="2400" y2="337" />
          <line x1="0" y1="675" x2="2400" y2="675" />
          <line x1="0" y1="1012" x2="2400" y2="1012" />
          <line x1="600" y1="0" x2="600" y2="1350" />
          <line x1="1200" y1="0" x2="1200" y2="1350" />
          <line x1="1800" y1="0" x2="1800" y2="1350" />
        </g>

        {/* 03. HIGHWAY NETWORK OVERLAY */}
        <g className="highway-network pointer-events-none opacity-40">
          {HIGHWAY_NETWORK.map((road) => (
            <g key={road.id}>
              <path
                d={road.path}
                fill="none"
                stroke="#C8B89A"
                strokeWidth="2.5"
                strokeOpacity="0.3"
                strokeLinecap="round"
              />
              <path
                d={road.path}
                fill="none"
                stroke="#FAF9F6"
                strokeWidth="1.25"
                strokeOpacity="0.6"
                strokeLinecap="round"
              />
            </g>
          ))}
        </g>

        {/* 04. PROGRESSIVE CONNECTION PATHS */}
        <LocationConnections />

        {/* 05. LOCATION MARKERS */}
        <LocationMarkers />

        {/* 06. WORLD-ANCHORED LABELS */}
        <LocationLabels />

        {/* 07. COMPASS ROSE (CORNER ANCHORED IN WORLD SPACE) */}
        <g transform="translate(2280, 1260)" opacity="0.5" className="pointer-events-none">
          <circle r="28" fill="#171815" fillOpacity="0.6" stroke="#C8B89A" strokeWidth="0.75" />
          <polygon points="0,-20 4,-4 0,-8 -4,-4" fill="#E5D7B7" />
          <polygon points="0,20 4,4 0,8 -4,4" fill="#5A544C" />
          <polygon points="20,0 4,4 8,0 4,-4" fill="#5A544C" />
          <polygon points="-20,0 -4,4 -8,0 -4,-4" fill="#5A544C" />
          <text x="0" y="-24" textAnchor="middle" fill="#FAF9F6" fontSize="8.5" fontWeight="700">
            N
          </text>
        </g>

        {/* 08. SUBTLE VIGNETTE */}
        <rect width={WORLD_WIDTH} height={WORLD_HEIGHT} fill="url(#vignetteGrad)" className="pointer-events-none" />
      </svg>
    </div>
  );
};
