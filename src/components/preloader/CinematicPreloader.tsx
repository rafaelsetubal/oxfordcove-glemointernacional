'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

export const CinematicPreloader: React.FC = () => {
  const [isDone, setIsDone] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const progressLineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 01. Check for prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setIsDone(true);
      return;
    }

    // 02. GSAP Clean Dissolve Engine
    const ctx = gsap.context(() => {
      // Initial state of Preloader elements
      gsap.set(logoRef.current, {
        opacity: 1,
        y: 0,
      });

      gsap.set(progressLineRef.current, {
        scaleX: 0,
        transformOrigin: 'center center',
      });

      const masterTl = gsap.timeline({
        onComplete: () => {
          setIsDone(true);
        },
      });

      // 0.0s - 1.05s: Elegant editorial mini progress line progresses smoothly
      masterTl.to(progressLineRef.current, {
        scaleX: 1,
        duration: 1.05,
        ease: 'power1.inOut',
      });

      // Brief 80ms pause
      masterTl.to({}, { duration: 0.08 });

      // 1.13s - 1.65s: ONE CONTINUOUS SEAMLESS DISSOLVE
      // Preloader overlay gracefully dissolves away, revealing the ready Hero
      masterTl.to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.52,
          ease: 'power2.out',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (isDone) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      id="cinematic-preloader"
      className="fixed inset-0 z-[9999] w-screen h-[100svh] overflow-hidden bg-[#FAF8F5] select-none pointer-events-none flex flex-col items-center justify-center will-change-opacity"
      aria-hidden="true"
    >
      {/* 01. AMBIENT WARM EDITORIAL BACKGROUND */}
      <div className="absolute inset-0 bg-[#FAF8F5]" />

      {/* 02. CENTRAL LOGO & EDITORIAL MINI PROGRESS LINE */}
      <div
        ref={logoRef}
        className="relative z-10 flex flex-col items-center justify-center px-6"
      >
        {/* LOGO OXFORD COVE WITH OPTIMIZED SIZES & QUALITY */}
        <div className="relative w-[190px] sm:w-[240px] md:w-[270px] h-[68px] sm:h-[86px] md:h-[96px]">
          <Image
            src="/images/brand/logo-bronze.png"
            alt="Oxford Cove"
            fill
            priority
            quality={85}
            sizes="(max-width: 640px) 190px, 270px"
            className="object-contain"
          />
        </div>

        {/* 03. ULTRA-SLIM EDITORIAL PROGRESS LINE (NO TEXT, NO SPINNER, NO %) */}
        <div className="mt-5 sm:mt-6 w-[70px] sm:w-[90px] h-[1.5px] bg-[#806B54]/18 rounded-full overflow-hidden flex items-center justify-center">
          <div
            ref={progressLineRef}
            className="w-full h-full bg-[#806B54] rounded-full will-change-transform"
          />
        </div>
      </div>
    </div>
  );
};
