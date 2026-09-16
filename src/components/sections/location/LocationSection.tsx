'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { LocationViewport } from './LocationViewport';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const LocationSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        // Reduced motion: reveal all markers, labels and paths immediately
        gsap.set('.marker-element, .label-element', { opacity: 1, scale: 1 });
        gsap.set('.route-path', { strokeDashoffset: 0 });
        return;
      }

      // Initial state: Clean map, all overlay elements hidden
      gsap.set('.marker-element', { opacity: 0, scale: 0.8 });
      gsap.set('.label-element', { opacity: 0 });

      // Master ScrollTrigger Timeline
      // Total duration mapped proportionally across the 400vh scroll distance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
        },
      });

      // -------------------------------------------------------------
      // 01. OXFORD COVE (10% - 18% progress)
      // -------------------------------------------------------------
      tl.to(
        '.marker-oxford-cove',
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power2.out',
        },
        1.0
      );
      tl.to(
        '.label-oxford-cove',
        {
          opacity: 1,
          duration: 1.0,
          ease: 'power2.out',
        },
        1.2
      );

      // -------------------------------------------------------------
      // 02. DUBAI MARINA (20% - 32% progress)
      // -------------------------------------------------------------
      tl.to(
        '.route-path-dubai-marina',
        {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: 'power1.inOut',
        },
        2.2
      );
      tl.to(
        '.marker-dubai-marina',
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        2.8
      );
      tl.to(
        '.label-dubai-marina',
        {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        3.0
      );

      // -------------------------------------------------------------
      // 03. PALM JUMEIRAH (32% - 44% progress)
      // -------------------------------------------------------------
      tl.to(
        '.route-path-palm-jumeirah',
        {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: 'power1.inOut',
        },
        3.5
      );
      tl.to(
        '.marker-palm-jumeirah',
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        4.1
      );
      tl.to(
        '.label-palm-jumeirah',
        {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        4.3
      );

      // -------------------------------------------------------------
      // 04. MALL OF THE EMIRATES (45% - 56% progress)
      // -------------------------------------------------------------
      tl.to(
        '.route-path-mall-of-the-emirates',
        {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: 'power1.inOut',
        },
        4.8
      );
      tl.to(
        '.marker-mall-of-the-emirates',
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        5.4
      );
      tl.to(
        '.label-mall-of-the-emirates',
        {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        5.6
      );

      // -------------------------------------------------------------
      // 05. DUBAI HILLS (56% - 68% progress)
      // -------------------------------------------------------------
      tl.to(
        '.route-path-dubai-hills',
        {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: 'power1.inOut',
        },
        6.0
      );
      tl.to(
        '.marker-dubai-hills',
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        6.6
      );
      tl.to(
        '.label-dubai-hills',
        {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        6.8
      );

      // -------------------------------------------------------------
      // 06. DOWNTOWN DUBAI / BURJ KHALIFA (68% - 80% progress)
      // -------------------------------------------------------------
      tl.to(
        '.route-path-downtown-dubai',
        {
          strokeDashoffset: 0,
          duration: 1.6,
          ease: 'power1.inOut',
        },
        7.2
      );
      tl.to(
        '.marker-downtown-dubai',
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        7.9
      );
      tl.to(
        '.label-downtown-dubai',
        {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        8.1
      );

      // -------------------------------------------------------------
      // 07. DUBAI INTERNATIONAL AIRPORT (DXB) (80% - 92% progress)
      // -------------------------------------------------------------
      tl.to(
        '.route-path-dxb-airport',
        {
          strokeDashoffset: 0,
          duration: 1.6,
          ease: 'power1.inOut',
        },
        8.5
      );
      tl.to(
        '.marker-dxb-airport',
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        9.2
      );
      tl.to(
        '.label-dxb-airport',
        {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        9.4
      );

      // -------------------------------------------------------------
      // 08. AL MAKTOUM INTERNATIONAL AIRPORT (DWC) (92% - 100% progress)
      // -------------------------------------------------------------
      tl.to(
        '.route-path-dwc-airport',
        {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: 'power1.inOut',
        },
        9.8
      );
      tl.to(
        '.marker-dwc-airport',
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        10.4
      );
      tl.to(
        '.label-dwc-airport',
        {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        10.6
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="localizacao"
      ref={sectionRef}
      className="relative w-full bg-[#FAF9F6] text-[#171815] select-none"
      style={{
        height: '400vh', // 400vh scroll distance for smooth scrubbing
      }}
    >
      <LocationViewport />
    </section>
  );
};
