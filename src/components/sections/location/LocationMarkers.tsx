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
      {/* 01. OXFORD COVE PRIMARY ARCHITECTURAL BEACON */}
      <g
        id="marker-oxford-cove"
        transform={`translate(${oxfordCoords.x}, ${oxfordCoords.y})`}
        className="marker-element marker-oxford-cove"
        style={{ opacity: 0, transformOrigin: `${oxfordCoords.x}px ${oxfordCoords.y}px` }}
      >
        {/* Subtle Ambient Halo */}
        <circle
          r="26"
          fill="#C8B89A"
          fillOpacity="0.18"
          className="animate-pulse"
          style={{ animationDuration: '3s' }}
        />

        {/* Outer Precision Ring */}
        <circle
          r="14"
          fill="none"
          stroke="#806B54"
          strokeWidth="1.2"
          strokeOpacity="0.7"
          strokeDasharray="2 3"
        />

        {/* Crosshairs */}
        <line x1="-18" y1="0" x2="-6" y2="0" stroke="#806B54" strokeWidth="1" strokeOpacity="0.8" />
        <line x1="6" y1="0" x2="18" y2="0" stroke="#806B54" strokeWidth="1" strokeOpacity="0.8" />
        <line x1="0" y1="-18" x2="0" y2="-6" stroke="#806B54" strokeWidth="1" strokeOpacity="0.8" />
        <line x1="0" y1="6" x2="0" y2="18" stroke="#806B54" strokeWidth="1" strokeOpacity="0.8" />

        {/* Center Point */}
        <circle r="4.5" fill="#171815" stroke="#FAF9F6" strokeWidth="1.5" />
        <circle r="1.5" fill="#FAF9F6" />
      </g>

      {/* 02. DESTINATION MARKERS */}
      {destinationMarkers.map((dest) => (
        <g
          key={dest.id}
          id={`marker-${dest.id}`}
          data-order={dest.order}
          transform={`translate(${dest.coords.x}, ${dest.coords.y})`}
          className={`marker-element marker-${dest.id}`}
          style={{ opacity: 0, transformOrigin: `${dest.coords.x}px ${dest.coords.y}px` }}
        >
          {/* Subtle Ring */}
          <circle
            r="9"
            fill="none"
            stroke="#171815"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          {/* Solid Point */}
          <circle
            r="4"
            fill="#171815"
            stroke="#FAF9F6"
            strokeWidth="1.25"
          />
        </g>
      ))}
    </g>
  );
};
