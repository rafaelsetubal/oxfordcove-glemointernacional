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
      {/* 01. OXFORD COVE PRIMARY LABEL (PHASE 1) */}
      <g
        id="label-oxford-cove"
        transform={`translate(${oxfordCoords.x}, ${oxfordCoords.y})`}
        className="label-oxford-cove"
      >
        <g transform="translate(18, -12)">
          {/* Main Title */}
          <text
            x="0"
            y="0"
            fill="#FAF9F6"
            fontFamily="inherit"
            fontSize="14"
            fontWeight="700"
            letterSpacing="0.16em"
          >
            {OXFORD_COVE_LOCATION.name}
          </text>
          {/* Subtitle / District */}
          <text
            x="0"
            y="15"
            fill="#E5D7B7"
            fontFamily="inherit"
            fontSize="10"
            fontWeight="500"
            letterSpacing="0.22em"
          >
            {OXFORD_COVE_LOCATION.subname}
          </text>
        </g>
      </g>

      {/* 02. DESTINATIONS LABELS (PHASES 2, 3, 4) */}
      {destinationLabels.map((dest) => {
        // Compute offset so label doesn't overlap marker or screen edges
        const isRightAligned = dest.coords.x > 1700;
        const offsetX = isRightAligned ? -14 : 14;
        const textAnchor = isRightAligned ? 'end' : 'start';

        return (
          <g
            key={dest.id}
            id={`label-${dest.id}`}
            data-phase={dest.phase}
            transform={`translate(${dest.coords.x}, ${dest.coords.y})`}
            className={`destination-label label-phase-${dest.phase}`}
            style={{ opacity: 0 }}
          >
            <g transform={`translate(${offsetX}, -8)`}>
              {/* Destination Name */}
              <text
                x="0"
                y="0"
                textAnchor={textAnchor}
                fill="#FAF9F6"
                fontFamily="inherit"
                fontSize="11.5"
                fontWeight="600"
                letterSpacing="0.12em"
              >
                {dest.name}
              </text>

              {/* Travel Time & Subname */}
              <text
                x="0"
                y="14"
                textAnchor={textAnchor}
                fill="#C8B89A"
                fontFamily="inherit"
                fontSize="9"
                fontWeight="500"
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
