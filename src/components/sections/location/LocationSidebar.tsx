'use client';

import React, { useState } from 'react';
import { DESTINATIONS } from './destinations';
import { MapPin, ExternalLink, ChevronUp, ChevronDown } from 'lucide-react';

export const LocationSidebar: React.FC = () => {
  const [mobileExpanded, setMobileExpanded] = useState<boolean>(false);
  const destinationList = DESTINATIONS.filter((d) => !d.isPrimary);

  return (
    <>
      {/* ========================================================================= */}
      {/* DESKTOP SIDEBAR: COMPACT ELEGANT FLOATING PANEL (BOTTOM-LEFT / CENTER-LEFT) */}
      {/* ========================================================================= */}
      <div className="hidden sm:block absolute bottom-8 left-8 z-20 max-w-[290px] w-full pointer-events-auto select-none">
        <div className="bg-[#FAF9F6]/95 backdrop-blur-xl rounded-[20px] p-4.5 border border-[#24231F]/12 shadow-[0_16px_36px_rgba(20,25,22,0.12)] text-[#171815]">
          
          {/* HEADER */}
          <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#24231F]/8">
            <div>
              <span className="font-technical text-[9px] uppercase tracking-[0.24em] text-[#806B54] font-bold block">
                LOCALIZAÇÃO
              </span>
              <h3 className="font-display font-medium text-[17px] leading-tight text-[#171815]">
                JVC · District 11
              </h3>
            </div>
            <span className="font-technical text-[9px] font-bold text-[#1D3027] bg-[#1D3027]/10 px-2 py-0.5 rounded-full uppercase">
              DUBAI
            </span>
          </div>

          {/* SHORT EDITORIAL COPY */}
          <p className="font-body text-[11px] text-[#5A544C] leading-relaxed mb-3">
            Conexão direta às rodovias Al Khail (E44) e Sheikh Mohammed Bin Zayed (E311).
          </p>

          {/* COMPACT DESTINATIONS LIST */}
          <div className="space-y-1 mb-3 max-h-[190px] overflow-y-auto pr-1 scrollbar-none">
            {destinationList.map((dest) => (
              <div
                key={dest.id}
                className="flex items-center justify-between p-1.5 rounded-[8px] hover:bg-white/80 transition-colors"
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1D3027] shrink-0" />
                  <span className="font-body text-[11px] font-semibold text-[#171815] truncate">
                    {dest.name}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 text-right">
                  <span className="font-technical text-[9px] text-[#806B54] font-medium">
                    {dest.distance}
                  </span>
                  <span className="font-technical text-[9.5px] font-bold text-[#1D3027] bg-white border border-[#24231F]/10 px-1.5 py-0.5 rounded-full">
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
            className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-full bg-[#1D3027] hover:bg-[#28372D] text-[#FAF9F6] font-body text-[9.5px] font-semibold tracking-[0.14em] uppercase transition-all duration-300 shadow-sm group"
          >
            <MapPin className="w-3 h-3 text-champagne" />
            <span>ABRIR NO GOOGLE MAPS</span>
            <ExternalLink className="w-2.5 h-2.5 text-white/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE COLLAPSIBLE BOTTOM SHEET: LEAVES 85% OF SCREEN FREE FOR THE MAP     */}
      {/* ========================================================================= */}
      <div className="sm:hidden absolute bottom-3 left-3 right-3 z-20 pointer-events-auto select-none">
        <div className="bg-[#FAF9F6]/95 backdrop-blur-xl rounded-[18px] border border-[#24231F]/15 shadow-[0_12px_28px_rgba(20,25,22,0.15)] text-[#171815] overflow-hidden transition-all duration-300">
          
          {/* COMPACT BAR (ALWAYS VISIBLE) */}
          <div
            onClick={() => setMobileExpanded(!mobileExpanded)}
            className="flex items-center justify-between p-3 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-champagne animate-pulse" />
              <div>
                <span className="font-technical text-[9px] uppercase tracking-wider text-[#806B54] font-bold block leading-none">
                  JVC DISTRICT 11
                </span>
                <span className="font-display font-medium text-[13px] text-[#171815] leading-tight">
                  Oxford Cove · Dubai
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-technical text-[9px] font-semibold text-[#1D3027] bg-[#1D3027]/10 px-2 py-0.5 rounded-full uppercase">
                {mobileExpanded ? 'Fechar' : 'Ver Destinos'}
              </span>
              {mobileExpanded ? (
                <ChevronDown className="w-4 h-4 text-[#806B54]" />
              ) : (
                <ChevronUp className="w-4 h-4 text-[#806B54]" />
              )}
            </div>
          </div>

          {/* EXPANDED CONTENT (ONLY WHEN USER TAPS) */}
          {mobileExpanded && (
            <div className="px-3 pb-3 pt-1 border-t border-[#24231F]/8 animate-fade-in">
              <p className="font-body text-[11px] text-[#5A544C] leading-snug mb-2.5">
                Conexão direta às rodovias Al Khail (E44) e SMBZ (E311).
              </p>

              <div className="space-y-1 mb-2.5 max-h-[140px] overflow-y-auto pr-1">
                {destinationList.map((dest) => (
                  <div
                    key={dest.id}
                    className="flex items-center justify-between py-1 px-1.5 rounded-[6px] bg-white/60 text-[11px]"
                  >
                    <span className="font-semibold text-[#171815] truncate">
                      {dest.name}
                    </span>
                    <span className="font-technical font-bold text-[#1D3027] bg-white px-1.5 py-0.5 rounded-full text-[9px] border border-black/5">
                      {dest.time} · {dest.distance}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href="https://www.google.com/maps/place/25%C2%B003'57.9%22N+55%C2%B012'39.6%22E/@25.0799246,55.266574,10.79z/data=!4m4!3m3!8m2!3d25.066074!4d55.211007"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-full bg-[#1D3027] text-[#FAF9F6] font-body text-[9px] font-semibold tracking-wider uppercase shadow-sm"
              >
                <MapPin className="w-3 h-3 text-champagne" />
                <span>ABRIR NO GOOGLE MAPS</span>
              </a>
            </div>
          )}

        </div>
      </div>
    </>
  );
};
