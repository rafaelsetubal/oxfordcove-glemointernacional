'use client';

import React from 'react';
import { DESTINATIONS } from './destinations';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';

export const LocationSidebar: React.FC = () => {
  const destinationList = DESTINATIONS.filter((d) => !d.isPrimary);

  return (
    <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-20 max-w-[340px] sm:max-w-[380px] w-[calc(100%-32px)] sm:w-auto pointer-events-auto">
      <div className="bg-[#FAF9F6]/95 backdrop-blur-xl rounded-[24px] p-5 sm:p-6 border border-[#24231F]/10 shadow-[0_20px_40px_rgba(20,25,22,0.12)] text-[#171815]">
        
        {/* HEADER */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#24231F]/8">
          <div>
            <span className="font-technical text-[10px] sm:text-[10.5px] uppercase tracking-[0.24em] text-[#806B54] font-bold block">
              LOCALIZAÇÃO
            </span>
            <h3 className="font-display font-medium text-[19px] sm:text-[22px] leading-tight text-[#171815]">
              JVC · District 11
            </h3>
          </div>
          <span className="font-technical text-[9.5px] font-semibold text-[#1D3027] bg-[#1D3027]/10 px-2.5 py-1 rounded-full uppercase">
            DUBAI, UAE
          </span>
        </div>

        {/* SHORT EDITORIAL DESCRIPTION */}
        <p className="font-body text-[12px] sm:text-[12.5px] text-[#5A544C] leading-relaxed mb-4">
          Posicionamento estratégico no centro geográfico de Dubai, com conexão direta às rodovias Al Khail (E44) e Sheikh Mohammed Bin Zayed (E311).
        </p>

        {/* DESTINATIONS LIST WITH DISTANCES & TIMES */}
        <div className="space-y-1.5 mb-4 max-h-[220px] sm:max-h-[260px] overflow-y-auto pr-1 scrollbar-none">
          {destinationList.map((dest) => (
            <div
              key={dest.id}
              className="group flex items-center justify-between p-2 rounded-[12px] hover:bg-white/80 transition-colors border border-transparent hover:border-[#24231F]/5"
            >
              <div className="flex items-center gap-2.5 truncate">
                <span className="w-2 h-2 rounded-full bg-[#1D3027] shrink-0" />
                <span className="font-body text-[12px] sm:text-[12.5px] font-semibold text-[#171815] truncate">
                  {dest.name}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0 text-right">
                <span className="font-technical text-[10px] text-[#806B54] font-medium hidden sm:inline">
                  {dest.distance}
                </span>
                <span className="font-technical text-[10.5px] font-bold text-[#1D3027] bg-[#FAF9F6] border border-[#24231F]/10 px-2 py-0.5 rounded-full">
                  {dest.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* GOOGLE MAPS EXTERNAL BUTTON */}
        <a
          href="https://www.google.com/maps/place/25%C2%B003'57.9%22N+55%C2%B012'39.6%22E/@25.0799246,55.266574,10.79z/data=!4m4!3m3!8m2!3d25.066074!4d55.211007"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-[#1D3027] hover:bg-[#28372D] text-[#FAF9F6] font-body text-[10.5px] font-semibold tracking-[0.16em] uppercase transition-all duration-300 shadow-sm group"
        >
          <MapPin className="w-3.5 h-3.5 text-champagne" />
          <span>ABRIR NO GOOGLE MAPS</span>
          <ExternalLink className="w-3 h-3 text-white/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>

      </div>
    </div>
  );
};
