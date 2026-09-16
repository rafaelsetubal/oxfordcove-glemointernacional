'use client';

import React from 'react';
import Image from 'next/image';
import { DESTINATIONS, OXFORD_COVE_LOCATION } from './destinations';

export interface MarkerScreenPosition {
  id: string;
  x: number;
  y: number;
}

interface CustomMarkersProps {
  positions: Record<string, { x: number; y: number }>;
}

export const CustomMarkers: React.FC<CustomMarkersProps> = ({ positions }) => {
  const oxfordPos = positions[OXFORD_COVE_LOCATION.id];

  const destinationList = DESTINATIONS.filter((d) => !d.isPrimary);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 select-none overflow-hidden">
      {/* 01. OXFORD COVE PROPRIETARY PIN MARKER */}
      {oxfordPos && (
        <div
          id="marker-oxford-cove"
          className="marker-element marker-oxford-cove absolute will-change-transform"
          style={{
            left: `${oxfordPos.x}px`,
            top: `${oxfordPos.y}px`,
            transform: 'translate(-50%, -100%) scale(0.8)',
            opacity: 0,
            transformOrigin: '50% 100%',
          }}
        >
          <div className="relative w-[46px] sm:w-[54px] h-[46px] sm:h-[54px] drop-shadow-[0_8px_16px_rgba(20,25,22,0.25)]">
            <Image
              src="/images/location/oxford-cove-pin.png"
              alt="Oxford Cove — JVC District 11"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}

      {/* 02. DESTINATION MARKERS (SMALL DOT + MINIMAL LABEL) */}
      {destinationList.map((dest) => {
        const pos = positions[dest.id];
        if (!pos) return null;

        // Determine label placement based on screen position to avoid edge clipping
        const isRightEdge = pos.x > (typeof window !== 'undefined' ? window.innerWidth * 0.75 : 800);

        return (
          <div
            key={dest.id}
            id={`marker-${dest.id}`}
            data-order={dest.revealOrder}
            className={`marker-element marker-${dest.id} absolute flex items-center will-change-transform ${
              isRightEdge ? 'flex-row-reverse -translate-x-full' : 'flex-row'
            }`}
            style={{
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              transform: isRightEdge ? 'translate(-100%, -50%)' : 'translate(0%, -50%)',
              opacity: 0,
            }}
          >
            {/* Small Circular Dot */}
            <div className="relative flex items-center justify-center w-4 h-4 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#171815] ring-2 ring-white/90 shadow-sm" />
            </div>

            {/* Discreet Elegant Label */}
            <div className={`px-2 py-0.5 whitespace-nowrap ${isRightEdge ? 'text-right' : 'text-left'}`}>
              <span className="font-body text-[11px] sm:text-[12.5px] font-semibold tracking-[0.06em] text-[#171815] text-shadow-sm">
                {dest.name}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
