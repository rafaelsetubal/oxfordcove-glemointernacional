'use client';

import React from 'react';
import Image from 'next/image';
import { HeroNavigation } from './HeroNavigation';
import { HeroCopy } from './HeroCopy';
import { FixedLeadForm } from '@/components/form/FixedLeadForm';

export const Hero: React.FC = () => {
  return (
    <section
      id="hero-section"
      className="relative w-full min-h-[100svh] flex flex-col justify-between overflow-hidden bg-ivory select-none will-change-[filter,transform,opacity]"
    >
      {/* 01. HERO BACKGROUND IMAGE (OFFICIAL HIGH-RES WEBP ASSET - FULL BLEED) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero-lifestyle.webp"
          alt="Oxford Cove by IMAN Developers - Official Architectural Rendering"
          fill
          priority
          quality={82}
          sizes="(max-width: 768px) 100vw, 100vw"
          className="object-cover object-[52%_center] sm:object-center select-none"
        />

        {/* 02. DESKTOP/TABLET DIRECTIONAL SCRIM OVERLAY (LEFT COLUMN ONLY) */}
        <div
          className="hidden md:block absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, rgba(10, 9, 8, 0.82) 0%, rgba(10, 9, 8, 0.55) 45%, rgba(10, 9, 8, 0.15) 65%, transparent 78%)',
          }}
        />

        {/* 03. MOBILE DIRECTIONAL CONTRAST SCRIM */}
        <div
          className="md:hidden absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(10, 9, 8, 0.85) 0%, rgba(10, 9, 8, 0.60) 55%, rgba(10, 9, 8, 0.25) 80%, transparent 100%)',
          }}
        />
      </div>

      {/* 04. HERO MINIMALIST NAVIGATION WITH TOP GRADIENT */}
      <HeroNavigation />

      {/* 05. GLOBAL 12-COLUMN MASTER GRID LAYOUT (RAISED BASELINE BY AN ADDITIONAL ~20PX) */}
      <div className="relative z-10 w-full container-master pt-[80px] sm:pt-[90px] lg:pt-[95px] pb-[100px] lg:pb-[75px] my-auto">
        <div className="grid-master items-center">
          {/* LEFT 5 COLUMNS: EDITORIAL COPY & METRICS */}
          <div className="col-span-4 sm:col-span-8 lg:col-span-7 xl:col-span-5 flex flex-col justify-center -translate-y-5 lg:-translate-y-7">
            <HeroCopy />
          </div>

          {/* RIGHT 3.5 COLUMNS: COMPACT APPLE GLASS LEAD FORM (DESKTOP & TABLET ONLY) */}
          <div
            id="hero-lead-form"
            className="hidden md:flex col-span-4 sm:col-span-8 lg:col-span-5 xl:col-span-4 xl:col-start-9 justify-center xl:justify-end mt-8 xl:mt-0 -translate-y-5 lg:-translate-y-7"
          >
            <FixedLeadForm mode="inline" />
          </div>
        </div>
      </div>
    </section>
  );
};
