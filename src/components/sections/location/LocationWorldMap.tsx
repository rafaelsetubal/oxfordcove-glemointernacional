'use client';

import React, { useMemo } from 'react';
import {
  WORLD_WIDTH,
  WORLD_HEIGHT,
  OXFORD_COVE_COORDS,
  DESTINATIONS,
  ROAD_ARTERIES,
  Destination,
} from './locationCoordinates';

interface LocationWorldMapProps {
  currentPhase: number;
  selectedDestinationId: string | null;
  onSelectDestination: (id: string) => void;
  transformStyle?: React.CSSProperties;
}

export const LocationWorldMap: React.FC<LocationWorldMapProps> = ({
  currentPhase,
  selectedDestinationId,
  onSelectDestination,
  transformStyle,
}) => {
  // Filter destinations revealed up to current phase
  const visibleDestinations = useMemo(() => {
    return DESTINATIONS.filter((d) => d.phase <= currentPhase);
  }, [currentPhase]);

  // Generate dynamic connection paths from Oxford Cove to visible destinations
  const connectionArcs = useMemo(() => {
    return visibleDestinations
      .filter((d) => !d.isPrimary)
      .map((d) => {
        const startX = OXFORD_COVE_COORDS.x;
        const startY = OXFORD_COVE_COORDS.y;
        const endX = d.mapX;
        const endY = d.mapY;

        // Quadratic control point with slight curved deflection for aesthetic elegance
        const midX = (startX + endX) / 2;
        const midY = (startY + endY) / 2;
        const dx = endX - startX;
        const dy = endY - startY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Perpendicular offset based on distance
        const curvature = dist * 0.12;
        const ctrlX = midX - (dy / (dist || 1)) * curvature;
        const ctrlY = midY + (dx / (dist || 1)) * curvature;

        return {
          id: d.id,
          path: `M ${startX} ${startY} Q ${ctrlX} ${ctrlY} ${endX} ${endY}`,
          destination: d,
          distance: dist,
        };
      });
  }, [visibleDestinations]);

  return (
    <div className="relative w-full h-full overflow-hidden select-none bg-[#1F1B18]">
      {/* MAP SVG CONTAINER WITH DYNAMIC CAMERA TRANSFORM */}
      <div
        className="w-full h-full will-change-transform transition-transform duration-700 ease-out"
        style={transformStyle}
      >
        <svg
          viewBox={`0 0 ${WORLD_WIDTH} ${WORLD_HEIGHT}`}
          className="w-full h-full object-cover"
          style={{ width: '100%', height: '100%' }}
        >
          <defs>
            {/* GRADIENT DEFINITIONS */}
            <radialGradient id="beaconGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#E5D7B7" stopOpacity="0.85" />
              <stop offset="40%" stopColor="#B7A489" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#B7A489" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FAF9F6" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#E5D7B7" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#B7A489" stopOpacity="0.2" />
            </linearGradient>

            <filter id="badgeShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.5" />
            </filter>

            <filter id="glowEffect" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* 01. BASE MAP RASTER (DUBAI 2400x1350 WEBP) */}
          <image
            href="/images/location/dubai-cinematic-map.webp"
            x="0"
            y="0"
            width={WORLD_WIDTH}
            height={WORLD_HEIGHT}
            preserveAspectRatio="xMidYMid slice"
            className="opacity-95"
          />

          {/* 02. CARTOGRAPHIC LAT/LNG GRID OVERLAY */}
          <g opacity="0.12" stroke="#FAF9F6" strokeWidth="0.8" strokeDasharray="4 8">
            <line x1="0" y1="337" x2="2400" y2="337" />
            <line x1="0" y1="675" x2="2400" y2="675" />
            <line x1="0" y1="1012" x2="2400" y2="1012" />
            <line x1="600" y1="0" x2="600" y2="1350" />
            <line x1="1200" y1="0" x2="1200" y2="1350" />
            <line x1="1800" y1="0" x2="1800" y2="1350" />
          </g>

          {/* 03. HIGHWAY NETWORK ARTERIES (GLOWING PATHS) */}
          <g className="road-arteries">
            {ROAD_ARTERIES.map((road) => (
              <g key={road.id}>
                {/* Glow Backdrop */}
                <path
                  d={road.path}
                  fill="none"
                  stroke="#FAF9F6"
                  strokeWidth={road.strokeWidth + 3}
                  strokeOpacity="0.08"
                  strokeLinecap="round"
                />
                {/* Main Vector Artery */}
                <path
                  d={road.path}
                  fill="none"
                  stroke="#E5D7B7"
                  strokeWidth={road.strokeWidth}
                  strokeOpacity="0.35"
                  strokeDasharray={road.id.startsWith('e') ? 'none' : '6 4'}
                  strokeLinecap="round"
                />
              </g>
            ))}
          </g>

          {/* 04. DYNAMIC CONNECTION ARCS (CURVED LINES FROM OXFORD COVE) */}
          <g className="connection-arcs">
            {connectionArcs.map((arc) => {
              const isSelected = selectedDestinationId === arc.id;
              return (
                <g key={arc.id} className="transition-opacity duration-500">
                  {/* Outer Glow */}
                  <path
                    d={arc.path}
                    fill="none"
                    stroke={isSelected ? '#FAF9F6' : '#E5D7B7'}
                    strokeWidth={isSelected ? 4 : 2}
                    strokeOpacity={isSelected ? 0.9 : 0.4}
                    strokeLinecap="round"
                  />
                  {/* Animated Dashed Pulse */}
                  <path
                    d={arc.path}
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth={isSelected ? 2.5 : 1.5}
                    strokeDasharray="6 8"
                    className="animate-pulse"
                    strokeOpacity={isSelected ? 1 : 0.7}
                  />
                </g>
              );
            })}
          </g>

          {/* 05. OXFORD COVE PRIMARY BEACON (PULSING GOLD RADAR) */}
          <g transform={`translate(${OXFORD_COVE_COORDS.x}, ${OXFORD_COVE_COORDS.y})`}>
            {/* Outer radar wave 1 */}
            <circle
              r="48"
              fill="none"
              stroke="#E5D7B7"
              strokeWidth="1.2"
              opacity="0.35"
              className="animate-ping"
              style={{ animationDuration: '3s' }}
            />
            {/* Outer radar wave 2 */}
            <circle
              r="28"
              fill="none"
              stroke="#E5D7B7"
              strokeWidth="1.5"
              opacity="0.6"
              className="animate-pulse"
            />
            {/* Radiant glow area */}
            <circle r="36" fill="url(#beaconGlow)" />

            {/* Inner Core */}
            <circle r="9" fill="#E5D7B7" stroke="#171815" strokeWidth="2.5" />
            <circle r="4" fill="#171815" />

            {/* Architectural Beacon Flag / Pin Tag */}
            <g transform="translate(18, -42)" filter="url(#badgeShadow)">
              {/* Pin Badge Frame */}
              <rect
                x="0"
                y="0"
                width="210"
                height="44"
                rx="22"
                fill="#171815"
                stroke="#E5D7B7"
                strokeWidth="1.8"
              />
              {/* Beacon Tag Content */}
              <circle cx="22" cy="22" r="6" fill="#E5D7B7" className="animate-pulse" />
              <text
                x="38"
                y="19"
                fill="#FAF9F6"
                fontFamily="sans-serif"
                fontSize="12.5"
                fontWeight="700"
                letterSpacing="0.08em"
              >
                OXFORD COVE
              </text>
              <text
                x="38"
                y="33"
                fill="#E5D7B7"
                fontFamily="sans-serif"
                fontSize="9.5"
                fontWeight="600"
                letterSpacing="0.14em"
              >
                JVC · DISTRICT 11
              </text>
            </g>
          </g>

          {/* 06. DESTINATION PINS & TRAVEL TIME BADGES */}
          <g className="destination-markers">
            {visibleDestinations
              .filter((d) => !d.isPrimary)
              .map((d) => {
                const isSelected = selectedDestinationId === d.id;
                const badgeWidth = d.travelTime ? 170 : 130;

                return (
                  <g
                    key={d.id}
                    transform={`translate(${d.mapX}, ${d.mapY})`}
                    className="cursor-pointer transition-transform duration-300 hover:scale-110"
                    onClick={() => onSelectDestination(d.id)}
                  >
                    {/* Ripple on selected */}
                    {isSelected && (
                      <circle
                        r="24"
                        fill="none"
                        stroke="#FAF9F6"
                        strokeWidth="1.5"
                        opacity="0.8"
                        className="animate-ping"
                      />
                    )}

                    {/* Pin Center Marker */}
                    <circle
                      r="6"
                      fill={isSelected ? '#FAF9F6' : '#28372D'}
                      stroke={isSelected ? '#171815' : '#E5D7B7'}
                      strokeWidth="2"
                    />

                    {/* Destination Pill Badge */}
                    <g
                      transform={`translate(${d.mapX > 1600 ? -badgeWidth - 12 : 12}, -18)`}
                      filter="url(#badgeShadow)"
                    >
                      <rect
                        x="0"
                        y="0"
                        width={badgeWidth}
                        height="36"
                        rx="18"
                        fill={isSelected ? '#FAF9F6' : '#1D2520'}
                        fillOpacity={isSelected ? 0.95 : 0.88}
                        stroke={isSelected ? '#171815' : 'rgba(255,255,255,0.25)'}
                        strokeWidth={isSelected ? 1.5 : 1}
                      />

                      {/* Travel Time Badge (Gold Pill inside) */}
                      <rect
                        x="6"
                        y="6"
                        width="46"
                        height="24"
                        rx="12"
                        fill={isSelected ? '#171815' : '#E5D7B7'}
                      />
                      <text
                        x="29"
                        y="22"
                        textAnchor="middle"
                        fill={isSelected ? '#FAF9F6' : '#171815'}
                        fontFamily="sans-serif"
                        fontSize="10"
                        fontWeight="700"
                      >
                        {d.travelTime.replace(' min', 'm')}
                      </text>

                      {/* Destination Label */}
                      <text
                        x="58"
                        y="22"
                        fill={isSelected ? '#171815' : '#FAF9F6'}
                        fontFamily="sans-serif"
                        fontSize="10.5"
                        fontWeight="600"
                        letterSpacing="0.02em"
                      >
                        {d.name.length > 15 ? d.name.slice(0, 14) + '…' : d.name}
                      </text>
                    </g>
                  </g>
                );
              })}
          </g>

          {/* 07. COMPASS ROSE & MAP ATTRIBUTION (BOTTOM-RIGHT) */}
          <g transform="translate(2260, 1260)" opacity="0.7">
            <circle r="36" fill="#171815" fillOpacity="0.8" stroke="#E5D7B7" strokeWidth="1" />
            <polygon points="0,-26 6,-6 0,-10 -6,-6" fill="#E5D7B7" />
            <polygon points="0,26 6,6 0,10 -6,6" fill="#5A544C" />
            <polygon points="26,0 6,6 10,0 6,-6" fill="#5A544C" />
            <polygon points="-26,0 -6,6 -10,0 -6,-6" fill="#5A544C" />
            <text x="0" y="-30" textAnchor="middle" fill="#FAF9F6" fontSize="10" fontWeight="700">
              N
            </text>
          </g>

          {/* 08. SCALE BAR */}
          <g transform="translate(80, 1280)" opacity="0.8">
            <rect x="0" y="0" width="180" height="24" rx="4" fill="#171815" fillOpacity="0.75" />
            <line x1="20" y1="12" x2="160" y2="12" stroke="#FAF9F6" strokeWidth="1.5" />
            <line x1="20" y1="6" x2="20" y2="18" stroke="#FAF9F6" strokeWidth="1.5" />
            <line x1="90" y1="8" x2="90" y2="16" stroke="#FAF9F6" strokeWidth="1" />
            <line x1="160" y1="6" x2="160" y2="18" stroke="#FAF9F6" strokeWidth="1.5" />
            <text x="20" y="38" fill="#FAF9F6" fontSize="9" fontWeight="600">0</text>
            <text x="85" y="38" fill="#FAF9F6" fontSize="9" fontWeight="600">5 km</text>
            <text x="150" y="38" fill="#FAF9F6" fontSize="9" fontWeight="600">10 km</text>
          </g>
        </svg>
      </div>
    </div>
  );
};
