'use client';

import React from 'react';
import Image from 'next/image';
import { DESTINATIONS, OXFORD_COVE_LOCATION, Destination } from './destinations';

interface CustomMarkersProps {
  positions: Record<string, { x: number; y: number }>;
}

export const CustomMarkers: React.FC<CustomMarkersProps> = ({ positions }) => {
  const oxfordPos = positions[OXFORD_COVE_LOCATION.id];
  const destinationList = DESTINATIONS.filter((d) => !d.isPrimary);

  // Helper for directional positioning to ensure zero overlapping
  const getOffsetClasses = (offset: Destination['offset']) => {
    switch (offset) {
      case 'nw':
        return '-translate-x-full -translate-y-full -mt-2 -ml-2';
      case 'sw':
        return '-translate-x-full translate-y-1 -ml-2';
      case 'ne':
        return 'translate-x-2 -translate-y-full -mt-2';
      case 'se':
        return 'translate-x-2 translate-y-1';
      case 'n':
        return '-translate-x-1/2 -translate-y-full -mt-3';
      case 's':
        return '-translate-x-1/2 translate-y-3';
      case 'w':
        return '-translate-x-full -translate-y-1/2 -ml-3';
      case 'e':
      default:
        return 'translate-x-3 -translate-y-1/2';
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-10 select-none overflow-hidden">
      {/* 01. OXFORD COVE PROPRIETARY PIN MARKER */}
      {oxfordPos && (
        <div
          id="marker-oxford-cove"
          className="marker-element marker-oxford-cove absolute will-change-transform flex flex-col items-center"
          style={{
            left: `${oxfordPos.x}px`,
            top: `${oxfordPos.y}px`,
            transform: 'translate(-50%, -100%) scale(0.8)',
            opacity: 0,
            transformOrigin: '50% 100%',
          }}
        >
          {/* Main Pin Asset */}
          <div className="relative w-[52px] sm:w-[62px] h-[52px] sm:h-[62px] drop-shadow-[0_10px_20px_rgba(20,25,22,0.30)]">
            <Image
              src="/images/location/oxford-cove-pin.png"
              alt="Oxford Cove — JVC District 11"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Location Badge */}
          <div className="mt-1 px-3 py-1 rounded-full bg-[#1D3027] text-[#FAF9F6] border border-[#FAF9F6]/30 shadow-md flex items-center gap-1.5 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-champagne animate-pulse" />
            <span className="font-technical text-[9.5px] sm:text-[10.5px] font-bold tracking-[0.14em] uppercase">
              OXFORD COVE · DISTRICT 11
            </span>
          </div>
        </div>
      )}

      {/* 02. DESTINATION MARKERS (DOT + FROSTED PILL BADGE) */}
      {destinationList.map((dest) => {
        const pos = positions[dest.id];
        if (!pos) return null;

        const offsetClass = getOffsetClasses(dest.offset);

        return (
          <div
            key={dest.id}
            id={`marker-${dest.id}`}
            data-order={dest.revealOrder}
            className={`marker-element marker-${dest.id} absolute flex items-center will-change-transform`}
            style={{
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              transform: 'translate(-50%, -50%)',
              opacity: 0,
            }}
          >
            {/* Center Anchor Dot */}
            <div className="relative flex items-center justify-center w-4 h-4 shrink-0 z-10">
              <span className="w-3 h-3 rounded-full bg-[#1D3027] ring-2 ring-white shadow-md" />
              <span className="absolute w-1 h-1 rounded-full bg-[#E5D7B7]" />
            </div>

            {/* Frosted Glass Floating Badge */}
            <div
              className={`absolute ${offsetClass} px-3 py-1.5 rounded-full bg-[#FAF9F6]/95 backdrop-blur-md border border-[#24231F]/15 shadow-[0_6px_16px_rgba(20,25,22,0.12)] flex items-center gap-2 whitespace-nowrap`}
            >
              <span className="font-body text-[11.5px] sm:text-[12.5px] font-bold tracking-[0.04em] text-[#171815]">
                {dest.name}
              </span>
              <span className="font-technical text-[10px] sm:text-[10.5px] font-semibold text-[#806B54] bg-[#806B54]/10 px-2 py-0.5 rounded-full uppercase">
                {dest.time}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
