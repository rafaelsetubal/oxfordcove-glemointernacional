'use client';

import React, { forwardRef } from 'react';
import { LocationWorldMap } from './LocationWorldMap';

interface LocationViewportProps {
  // Pure pass-through
}

export const LocationViewport = forwardRef<HTMLDivElement, LocationViewportProps>(
  (props, ref) => {
    return (
      <div className="sticky top-0 w-full h-screen h-[100dvh] overflow-hidden bg-[#181614] select-none">
        {/* ========================================================================= */}
        {/* 01. CAMERA CONTAINER (CONTROLLED VIA GSAP TRANSFORM)                      */}
        {/* ========================================================================= */}
        <div
          ref={ref}
          className="absolute inset-0 w-full h-full will-change-transform"
          style={{
            transformOrigin: '50% 50%',
          }}
        >
          <LocationWorldMap />
        </div>

        {/* ========================================================================= */}
        {/* 02. MINIMAL ARCHITECTURAL VIEWPORT HEADER                                 */}
        {/* ========================================================================= */}
        <div className="absolute top-6 left-6 sm:top-10 sm:left-12 z-20 pointer-events-none">
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5D7B7]" />
            <span className="font-technical text-[10px] sm:text-[11px] font-semibold tracking-[0.28em] uppercase text-[#E5D7B7]">
              LOCATION
            </span>
          </div>
          <div className="font-body text-[12px] sm:text-[13px] tracking-[0.14em] uppercase text-[#FAF9F6]/80">
            JVC · DISTRICT 11 · DUBAI
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 03. MINIMAL SCROLL DISCOVERY HINT (BOTTOM LEFT)                           */}
        {/* ========================================================================= */}
        <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-12 z-20 pointer-events-none">
          <span className="font-technical text-[9px] sm:text-[10px] tracking-[0.24em] uppercase text-[#C8B89A]/60">
            25.06684° N · 55.21101° E
          </span>
        </div>
      </div>
    );
  }
);

LocationViewport.displayName = 'LocationViewport';
