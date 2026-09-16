'use client';

import React from 'react';
import {
  OXFORD_COVE_LOCATION,
  DESTINATION_POINTS,
  geoToMapPosition,
} from './locationCoordinates';

export const LocationLabels: React.FC = () => {
  const oxfordCoords = geoToMapPosition(
    OXFORD_COVE_LOCATION.lat,
    OXFORD_COVE_LOCATION.lng
  );

  const destinationLabels = DESTINATION_POINTS.filter((p) => !p.isPrimary).map(
    (dest) => ({
      ...dest,
      coords: geoToMapPosition(dest.lat, dest.lng),
    })
  );

  return (
    <g className="location-labels pointer-events-none select-none">
      <defs>
        {/* Subtle text halo for pristine readability on light or textured map areas */}
        <filter id="textHalo" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#FAF9F6" floodOpacity="0.85" />
        </filter>
      </defs>

      {/* 01. OXFORD COVE PRIMARY LABEL */}
      <g
        id="label-oxford-cove"
        transform={`translate(${oxfordCoords.x}, ${oxfordCoords.y})`}
        className="label-element label-oxford-cove"
        style={{ opacity: 0 }}
        filter="url(#textHalo)"
      >
        <g transform="translate(18, -10)">
          {/* Main Title */}
          <text
            x="0"
            y="0"
            fill="#171815"
            fontFamily="sans-serif"
            fontSize="13"
            fontWeight="800"
            letterSpacing="0.16em"
          >
            {OXFORD_COVE_LOCATION.name}
          </text>
          {/* Subtitle / District */}
          <text
            x="0"
            y="15"
            fill="#806B54"
            fontFamily="sans-serif"
            fontSize="9.5"
            fontWeight="700"
            letterSpacing="0.22em"
          >
            {OXFORD_COVE_LOCATION.subname}
          </text>
        </g>
      </g>

      {/* 02. DESTINATIONS LABELS */}
      {destinationLabels.map((dest) => {
        const isRightAligned = dest.coords.x > 1650;
        const offsetX = isRightAligned ? -14 : 14;
        const textAnchor = isRightAligned ? 'end' : 'start';

        return (
          <g
            key={dest.id}
            id={`label-${dest.id}`}
            data-order={dest.order}
            transform={`translate(${dest.coords.x}, ${dest.coords.y})`}
            className={`label-element label-${dest.id}`}
            style={{ opacity: 0 }}
            filter="url(#textHalo)"
          >
            <g transform={`translate(${offsetX}, -8)`}>
              {/* Destination Name */}
              <text
                x="0"
                y="0"
                textAnchor={textAnchor}
                fill="#171815"
                fontFamily="sans-serif"
                fontSize="11"
                fontWeight="700"
                letterSpacing="0.12em"
              >
                {dest.name}
              </text>

              {/* Travel Time & Subname */}
              <text
                x="0"
                y="14"
                textAnchor={textAnchor}
                fill="#5A544C"
                fontFamily="sans-serif"
                fontSize="9"
                fontWeight="600"
                letterSpacing="0.18em"
              >
                {dest.time}
                {dest.subname && ` · ${dest.subname}`}
              </text>
            </g>
          </g>
        );
      })}
    </g>
  );
};
