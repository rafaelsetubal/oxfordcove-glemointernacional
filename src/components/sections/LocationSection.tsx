import React from 'react';
import Image from 'next/image';

const MAIN_DESTINATIONS = [
  { time: '17', unit: 'min', name: 'Bluewaters Island' },
  { time: '20', unit: 'min', name: 'Palm Jumeirah' },
  { time: '20', unit: 'min', name: 'Mall of the Emirates' },
  { time: '25', unit: 'min', name: 'Dubai Mall' },
];

export const LocationSection: React.FC = () => {
  return (
    <section
      id="localizacao"
      className="relative w-full bg-[#3B342F] text-[#FAF9F6] border-t border-white/[0.08] select-none"
    >
      {/* ========================================================================= */}
      {/* DESKTOP LAYOUT: 100vh FULL-BLEED MAP WITH LEFT CONTENT INTEGRATION        */}
      {/* ========================================================================= */}
      <div className="hidden lg:relative lg:flex lg:w-full lg:min-h-screen lg:h-screen lg:min-h-[750px] lg:max-h-[1050px] items-center overflow-hidden">
        
        {/* FULL MAP AS BACKGROUND VISUAL */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/location/location-map.png"
            alt="Mapa de Localização — Oxford Cove by IMAN em Jumeirah Village Circle (JVC), Dubai"
            fill
            priority
            quality={100}
            unoptimized
            className="object-cover object-right"
          />
          {/* Subtle gradient on extreme left to ensure text contrast on ultra-wide screens */}
          <div className="absolute inset-y-0 left-0 w-[45%] bg-gradient-to-r from-[#3B342F] via-[#3B342F]/75 to-transparent pointer-events-none" />
        </div>

        {/* CONTENT COLUMN OVER THE DARK WATER NEGATIVE SPACE (~38% WIDTH) */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-10 xl:px-16">
          <div className="max-w-[420px] xl:max-w-[460px]">
            {/* OVERLINE / SECTION TAG */}
            <span className="font-body text-[11px] xl:text-[11.5px] font-semibold tracking-[0.28em] uppercase text-champagne mb-3 block">
              LOCALIZAÇÃO
            </span>

            {/* TITLE */}
            <h2 className="font-display font-normal text-[36px] xl:text-[44px] leading-[1.08] text-[#FAF9F6] mb-5 tracking-tight">
              NO CORAÇÃO DE DUBAI.<br />
              CONECTADO AO QUE IMPORTA.
            </h2>

            {/* INTRODUCTORY PARAGRAPHS */}
            <div className="font-body text-[#D1CCC3] text-[14px] xl:text-[14.5px] leading-[1.65] font-normal space-y-3 mb-8">
              <p>
                Jumeirah Village Circle combina a tranquilidade de uma comunidade planejada com acesso aos principais destinos de Dubai.
              </p>
              <p>
                No District 11, Oxford Cove coloca você perto de uma rotina completa — e conectado ao restante da cidade.
              </p>
            </div>

            {/* 2-COLUMN DISTANCES GRID */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-7 pt-6 border-t border-white/15 mb-8">
              {MAIN_DESTINATIONS.map((dest) => (
                <div key={dest.name} className="flex flex-col">
                  <span className="font-display text-[36px] xl:text-[40px] font-light leading-none text-[#FAF9F6] mb-1.5">
                    {dest.time}{' '}
                    <span className="font-body text-[14px] xl:text-[15px] font-normal text-champagne lowercase">
                      {dest.unit}
                    </span>
                  </span>
                  <span className="font-body text-[11.5px] font-medium tracking-[0.08em] uppercase text-[#B5AEA4] leading-tight">
                    {dest.name}
                  </span>
                </div>
              ))}
            </div>

            {/* GOOGLE MAPS CTA BUTTON */}
            <div>
              <a
                href="https://www.google.com/maps/place/25%C2%B003'57.9%22N+55%C2%B012'39.6%22E/@25.0799246,55.266574,10.79z/data=!4m4!3m3!8m2!3d25.066074!4d55.211007?entry=ttu&g_ep=EgoyMDI2MDkxMy4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-white/10 hover:bg-[#B7A489] hover:text-[#171815] text-[#FAF9F6] border border-white/20 transition-all duration-300 font-body text-[11px] xl:text-[11.5px] font-semibold tracking-[0.20em] uppercase group"
              >
                <svg className="w-3.5 h-3.5 text-champagne group-hover:text-[#171815] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="9" r="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>ABRIR NO GOOGLE MAPS</span>
                <svg className="w-3 h-3 text-white/50 group-hover:text-[#171815] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* MOBILE LAYOUT: DEDICATED VERTICAL COMPOSITION                             */}
      {/* ========================================================================= */}
      <div className="lg:hidden w-full px-5 sm:px-8 py-16 sm:py-20 flex flex-col gap-8">
        
        {/* 1. CONTENT HEADER */}
        <div>
          <span className="font-body text-[10.5px] sm:text-[11px] font-semibold tracking-[0.28em] uppercase text-champagne mb-2.5 block">
            LOCALIZAÇÃO
          </span>
          <h2 className="font-display font-normal text-[32px] sm:text-[38px] leading-[1.10] text-[#FAF9F6] mb-4 tracking-tight">
            NO CORAÇÃO DE DUBAI.<br />
            CONECTADO AO QUE IMPORTA.
          </h2>
          <div className="font-body text-[#D1CCC3] text-[14px] sm:text-[15px] leading-[1.60] font-normal space-y-2.5">
            <p>
              Jumeirah Village Circle combina a tranquilidade de uma comunidade planejada com acesso aos principais destinos de Dubai.
            </p>
            <p>
              No District 11, Oxford Cove coloca você perto de uma rotina completa — e conectado ao restante da cidade.
            </p>
          </div>
        </div>

        {/* 2. MAIN DISTANCES LIST / COMPACT GRID */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-6 border-t border-white/15">
          {MAIN_DESTINATIONS.map((dest) => (
            <div key={dest.name} className="flex flex-col">
              <span className="font-display text-[28px] sm:text-[34px] font-light leading-none text-[#FAF9F6] mb-1">
                {dest.time}{' '}
                <span className="font-body text-[13px] font-normal text-champagne lowercase">
                  {dest.unit}
                </span>
              </span>
              <span className="font-body text-[10.5px] sm:text-[11.5px] font-medium tracking-[0.08em] uppercase text-[#B5AEA4] leading-tight">
                {dest.name}
              </span>
            </div>
          ))}
        </div>

        {/* 3. MAP BLOCK (RESPONSIVE CROP FOCUSED ON PALM JUMEIRAH, COAST & OXFORD COVE) */}
        <div className="relative w-full h-[300px] sm:h-[380px] rounded-[18px] overflow-hidden border border-white/10 shadow-lg bg-[#2E2824]">
          <Image
            src="/images/location/location-map.png"
            alt="Mapa Oxford Cove — JVC Dubai"
            fill
            priority
            quality={100}
            unoptimized
            className="object-cover object-[78%_center]"
          />
        </div>

        {/* 4. GOOGLE MAPS CTA BUTTON (MOBILE) */}
        <div>
          <a
            href="https://www.google.com/maps/place/25%C2%B003'57.9%22N+55%C2%B012'39.6%22E/@25.0799246,55.266574,10.79z/data=!4m4!3m3!8m2!3d25.066074!4d55.211007?entry=ttu&g_ep=EgoyMDI2MDkxMy4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white/10 active:bg-[#B7A489] text-[#FAF9F6] border border-white/20 font-body text-[11px] font-semibold tracking-[0.20em] uppercase group"
          >
            <svg className="w-3.5 h-3.5 text-champagne" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="9" r="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>ABRIR NO GOOGLE MAPS</span>
            <svg className="w-3 h-3 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

