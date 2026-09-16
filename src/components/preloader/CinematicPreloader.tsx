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
      const heroEl = document.getElementById('hero-section');
      if (heroEl) {
        gsap.set(heroEl, { opacity: 1, filter: 'blur(0px)', scale: 1 });
      }
      setIsDone(true);
      return;
    }

    // 02. Preload & decode critical Hero background image in background
    let heroReady = false;
    const heroImage = new window.Image();
    heroImage.src = '/images/hero/hero-lifestyle.webp';
    if (heroImage.decode) {
      heroImage.decode().then(() => {
        heroReady = true;
      }).catch(() => {
        heroReady = true;
      });
    } else {
      heroImage.onload = () => {
        heroReady = true;
      };
    }

    // 03. GSAP Single Continuous Transition Engine
    const ctx = gsap.context(() => {
      const heroEl = document.getElementById('hero-section');

      // Set initial state on Hero behind the preloader (blur bridge)
      if (heroEl) {
        gsap.set(heroEl, {
          opacity: 0.85,
          filter: 'blur(6px)',
          scale: 1.015,
          transformOrigin: 'center center',
        });
      }

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

      // 0.0s - 1.15s: Elegant editorial mini progress line progresses smoothly
      masterTl.to(progressLineRef.current, {
        scaleX: 1,
        duration: 1.15,
        ease: 'power1.inOut',
      });

      // Brief 90ms pause to ensure Hero image decode is complete
      masterTl.to({}, { duration: 0.09 });

      // 1.24s - 1.85s: ONE CONTINUOUS SEAMLESS DISSOLVE & SHARPEN BRIDGE
      masterTl.addLabel('revealBridge');

      // Preloader gracefully dissolves away
      masterTl.to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.60,
          ease: 'power2.out',
        },
        'revealBridge'
      );

      // Hero simultaneously transitions from soft blur to pristine sharpness & scale 1.0
      if (heroEl) {
        masterTl.to(
          heroEl,
          {
            opacity: 1,
            filter: 'blur(0px)',
            scale: 1.0,
            duration: 0.68,
            ease: 'power2.out',
            clearProps: 'filter,transform',
          },
          'revealBridge'
        );
      }
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
        {/* LOGO OXFORD COVE */}
        <div className="relative w-[210px] sm:w-[260px] md:w-[290px] h-[76px] sm:h-[94px] md:h-[105px]">
          <Image
            src="/images/brand/logo-bronze.png"
            alt="Oxford Cove"
            fill
            priority
            className="object-contain"
          />
        </div>

        {/* 03. ULTRA-SLIM EDITORIAL PROGRESS LINE (NO TEXT, NO SPINNER, NO %) */}
        <div className="mt-6 sm:mt-7 w-[80px] sm:w-[100px] h-[1.5px] bg-[#806B54]/18 rounded-full overflow-hidden flex items-center justify-center">
          <div
            ref={progressLineRef}
            className="w-full h-full bg-[#806B54] rounded-full will-change-transform"
          />
        </div>
      </div>
    </div>
  );
};
