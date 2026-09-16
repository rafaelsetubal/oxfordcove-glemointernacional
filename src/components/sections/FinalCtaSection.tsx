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
      className="relative w-full min-h-[100svh] flex items-center justify-center py-20 sm:py-24 lg:py-28 overflow-hidden select-none bg-[#14221A]"
    >
      {/* 01. FULL-BLEED ARCHITECTURAL PHOTOGRAPHY (PROTAGONIST, CRISP & VISIBLE) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/final-cta/final-cta-balcony.png"
          alt="Oxford Cove by IMAN Developers — Arquitetura e Terraços"
          fill
          priority={false}
          quality={88}
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* 02. SUBTLE OVERLAY WITH SOFT RADIAL CONTRAST HALO BEHIND FORM (NO VISIBLE BOX/CARD) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 50%, rgba(14, 24, 19, 0.82) 0%, rgba(14, 24, 19, 0.65) 45%, rgba(14, 24, 19, 0.35) 75%, rgba(14, 24, 19, 0.50) 100%)',
          }}
        />

        {/* TOP & BOTTOM SEAMLESS TRANSITIONS */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#FAF8F5] via-[#FAF8F5]/20 to-transparent pointer-events-none opacity-20" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#FAF9F6] via-[#FAF9F6]/30 to-transparent pointer-events-none" />
      </div>

      {/* 03. EDITORIAL FORM FLOATING DIRECTLY OVER ARCHITECTURE (ZERO CARD BACKGROUND) */}
      <div
        className={`relative z-10 w-full max-w-[440px] sm:max-w-[460px] mx-auto px-5 sm:px-6 transition-all duration-700 ease-luxury ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}
      >
        <FixedLeadForm
          mode="final-cta"
          title="Garanta sua prioridade."
          subtitle="ACESSO ANTECIPADO"
        />
      </div>
    </section>
  );
};
