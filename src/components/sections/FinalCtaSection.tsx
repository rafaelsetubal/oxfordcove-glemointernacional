'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FixedLeadForm } from '@/components/form/FixedLeadForm';

export const FinalCtaSection: React.FC = () => {
  const [isInView, setIsInView] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.12 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="final-cta"
      className="defer-render relative w-full min-h-[100svh] flex items-center justify-center py-16 sm:py-20 lg:py-24 overflow-hidden select-none bg-[#14221A]"
    >
      {/* 01. FULL-BLEED ARCHITECTURAL PHOTOGRAPHY (PROTAGONIST, CRISP & VISIBLE) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/final-cta/final-cta-balcony.webp"
          alt="Oxford Cove by IMAN Developers — Arquitetura e Terraços"
          fill
          priority={false}
          quality={92}
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* 02. SUBTLE OVERALL SCRIM — ARCHITECTURE FULLY VISIBLE & CRISP */}
        <div className="absolute inset-0 bg-[#0E1813]/35 pointer-events-none" />

        {/* TOP SEAMLESS AMBIENT TRANSITION */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#FAF9F6]/20 to-transparent pointer-events-none" />

        {/* 03. ART DIRECTION TRANSITION: GRADUAL LUXURY FADE TO WARM CREAM FOOTER */}
        <div className="absolute inset-x-0 bottom-0 h-40 sm:h-52 bg-gradient-to-t from-[#FAF9F6] via-[#FAF9F6]/80 via-[#FAF9F6]/25 to-transparent pointer-events-none z-[1]" />
      </div>

      {/* 04. EDITORIAL FORM FLOATING WITH LOCALIZED ATMOSPHERIC READING HALO */}
      <div
        className={`relative z-10 w-full max-w-[430px] sm:max-w-[450px] mx-auto px-5 sm:px-6 gpu-accel reveal-blur-init ${
          isInView ? 'reveal-blur-visible' : ''
        }`}
      >
        {/* LOCALIZED ATMOSPHERIC READING HALO (520–640PX WIDE, ZERO CARD EDGES, SOFT FADE) */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] sm:w-[640px] h-[640px] sm:h-[720px] -z-10 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(10, 18, 14, 0.76) 0%, rgba(10, 18, 14, 0.50) 45%, rgba(10, 18, 14, 0.15) 70%, transparent 100%)',
            filter: 'blur(28px)',
          }}
        />

        <FixedLeadForm
          mode="final-cta"
          title="Garanta sua prioridade."
          subtitle="ACESSO ANTECIPADO"
        />
      </div>
    </section>
  );
};
