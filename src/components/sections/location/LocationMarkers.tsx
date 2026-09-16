'use client';

import React from 'react';
import {
  OXFORD_COVE_LOCATION,
  DESTINATION_POINTS,
  geoToMapPosition,
} from './locationCoordinates';

export const LocationMarkers: React.FC = () => {
  const oxfordCoords = geoToMapPosition(
    OXFORD_COVE_LOCATION.lat,
    OXFORD_COVE_LOCATION.lng
  );

  const destinationMarkers = DESTINATION_POINTS.filter((p) => !p.isPrimary).map(
    (dest) => ({
      ...dest,
      coords: geoToMapPosition(dest.lat, dest.lng),
    })
  );

  return (
    <g className="location-markers pointer-events-none">
      {/* 01. OXFORD COVE PRIMARY ARCHITECTURAL BEACON (PHASE 1) */}
      <g
        id="marker-oxford-cove"
        transform={`translate(${oxfordCoords.x}, ${oxfordCoords.y})`}
        className="marker-oxford-cove"
      >
        {/* Subtle Ambient Halo */}
        <circle
          r="32"
          fill="#E5D7B7"
          fillOpacity="0.12"
          className="animate-pulse"
          style={{ animationDuration: '4s' }}
        />

        {/* Outer Precision Ring */}
        <circle
          r="16"
          fill="none"
          stroke="#E5D7B7"
          strokeWidth="1"
          strokeOpacity="0.5"
          strokeDasharray="2 4"
        />

        {/* Crosshairs */}
        <line x1="-22" y1="0" x2="-8" y2="0" stroke="#E5D7B7" strokeWidth="0.75" strokeOpacity="0.6" />
        <line x1="8" y1="0" x2="22" y2="0" stroke="#E5D7B7" strokeWidth="0.75" strokeOpacity="0.6" />
        <line x1="0" y1="-22" x2="0" y2="-8" stroke="#E5D7B7" strokeWidth="0.75" strokeOpacity="0.6" />
        <line x1="0" y1="8" x2="0" y2="22" stroke="#E5D7B7" strokeWidth="0.75" strokeOpacity="0.6" />

        {/* Center Point */}
        <circle r="4.5" fill="#FAF9F6" stroke="#171815" strokeWidth="1.5" />
        <circle r="1.5" fill="#171815" />
      </g>

      {/* 02. DESTINATION MARKERS (PHASES 2, 3, 4) */}
      {destinationMarkers.map((dest) => (
        <g
          key={dest.id}
          id={`marker-${dest.id}`}
          data-phase={dest.phase}
          transform={`translate(${dest.coords.x}, ${dest.coords.y})`}
          className={`destination-marker marker-phase-${dest.phase}`}
          style={{ opacity: 0 }}
        >
          {/* Subtle Ring */}
          <circle
            r="10"
            fill="none"
            stroke="#FAF9F6"
            strokeWidth="0.75"
            strokeOpacity="0.3"
          />
          {/* Solid Point */}
          <circle
            r="3.5"
            fill="#E5D7B7"
            stroke="#171815"
            strokeWidth="1"
          />
        </g>
      ))}
    </g>
  );
};
