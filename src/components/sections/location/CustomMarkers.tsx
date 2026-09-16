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
        return '-translate-x-1/2 -translate-y-full -mt-2.5';
      case 's':
        return '-translate-x-1/2 translate-y-2.5';
      case 'w':
        return '-translate-x-full -translate-y-1/2 -ml-2.5';
      case 'e':
      default:
        return 'translate-x-2.5 -translate-y-1/2';
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
          <div className="relative w-[44px] sm:w-[52px] h-[44px] sm:h-[52px] drop-shadow-[0_8px_16px_rgba(20,25,22,0.25)]">
            <Image
              src="/images/location/oxford-cove-pin.png"
              alt="Oxford Cove — JVC District 11"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Location Badge */}
          <div className="mt-0.5 px-2.5 py-0.5 rounded-full bg-[#1D3027] text-[#FAF9F6] border border-[#FAF9F6]/30 shadow-sm flex items-center gap-1 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-champagne animate-pulse" />
            <span className="font-technical text-[8.5px] sm:text-[9.5px] font-bold tracking-[0.14em] uppercase">
              OXFORD COVE · DISTRICT 11
            </span>
          </div>
        </div>
      )}

      {/* 02. DESTINATION MARKERS (DOT + COMPACT FROSTED PILL BADGE) */}
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
            <div className="relative flex items-center justify-center w-3.5 h-3.5 shrink-0 z-10">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1D3027] ring-1.5 ring-white shadow-sm" />
              <span className="absolute w-1 h-1 rounded-full bg-[#E5D7B7]" />
            </div>

            {/* Frosted Glass Floating Badge */}
            <div
              className={`absolute ${offsetClass} px-2.5 py-1 rounded-full bg-[#FAF9F6]/95 backdrop-blur-md border border-[#24231F]/15 shadow-[0_4px_12px_rgba(20,25,22,0.10)] flex items-center gap-1.5 whitespace-nowrap`}
            >
              <span className="font-body text-[10.5px] sm:text-[11.5px] font-bold tracking-[0.03em] text-[#171815]">
                {dest.name}
              </span>
              <span className="font-technical text-[9px] sm:text-[9.5px] font-bold text-[#806B54] bg-[#806B54]/10 px-1.5 py-0.5 rounded-full uppercase">
                {dest.time}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
