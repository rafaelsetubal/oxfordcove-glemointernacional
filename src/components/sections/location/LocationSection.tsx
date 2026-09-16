'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const OxfordCoveMap = dynamic(
  () => import('./OxfordCoveMap').then((mod) => mod.OxfordCoveMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#FAF9F6] text-[#806B54]">
        <span className="font-technical text-[11px] font-semibold tracking-widest uppercase animate-pulse">
          Carregando mapa interativo de localização...
        </span>
      </div>
    ),
  }
);

export const LocationSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyContainerRef = useRef<HTMLDivElement>(null);
  const animationInitializedRef = useRef<boolean>(false);
  const [shouldMountMap, setShouldMountMap] = useState<boolean>(false);

  const initScrollAnimation = () => {
    if (!sectionRef.current || !stickyContainerRef.current) return;
    if (animationInitializedRef.current) return;
    animationInitializedRef.current = true;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set('.marker-element', { opacity: 1, scale: 1 });
        gsap.set('.route-path', { strokeDashoffset: 0 });
        return;
      }

      // Initial state: 100% clean map
      gsap.set('.marker-element', { opacity: 0 });
      gsap.set('#marker-oxford-cove', { opacity: 0, scale: 0.8 });

      // Master ScrollTrigger Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          pin: stickyContainerRef.current,
        },
      });

      // 01. 15% - 25%: OXFORD COVE
      tl.to(
        '#marker-oxford-cove',
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power2.out',
        },
        1.5
      );

      // 02. 25% - 35%: DUBAI MARINA
      tl.to(
        '.route-path-dubai-marina',
        {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: 'power1.inOut',
        },
        2.5
      );
      tl.to(
        '#marker-dubai-marina',
        {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        3.0
      );

      // 03. 35% - 45%: PALM JUMEIRAH
      tl.to(
        '.route-path-palm-jumeirah',
        {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: 'power1.inOut',
        },
        3.5
      );
      tl.to(
        '#marker-palm-jumeirah',
        {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        4.0
      );

      // 04. 45% - 55%: MALL OF THE EMIRATES
      tl.to(
        '.route-path-mall-of-the-emirates',
        {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: 'power1.inOut',
        },
        4.5
      );
      tl.to(
        '#marker-mall-of-the-emirates',
        {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        5.0
      );

      // 05. 55% - 65%: DUBAI HILLS
      tl.to(
        '.route-path-dubai-hills',
        {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: 'power1.inOut',
        },
        5.5
      );
      tl.to(
        '#marker-dubai-hills',
        {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        6.0
      );

      // 06. 65% - 75%: DOWNTOWN DUBAI / BURJ KHALIFA
      tl.to(
        '.route-path-downtown-dubai',
        {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: 'power1.inOut',
        },
        6.5
      );
      tl.to(
        '#marker-downtown-dubai',
        {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        7.0
      );

      // 07. 75% - 85%: DXB AIRPORT
      tl.to(
        '.route-path-dxb-airport',
        {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: 'power1.inOut',
        },
        7.5
      );
      tl.to(
        '#marker-dxb-airport',
        {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        8.0
      );

      // 08. 85% - 95%: DWC AIRPORT
      tl.to(
        '.route-path-dwc-airport',
        {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: 'power1.inOut',
        },
        8.5
      );
      tl.to(
        '#marker-dwc-airport',
        {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        9.0
      );
    }, sectionRef);

    return () => ctx.revert();
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldMountMap(true);
          observer.disconnect();
        }
      },
      { rootMargin: '600px 0px' }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (shouldMountMap) {
      const timer = setTimeout(() => {
        initScrollAnimation();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [shouldMountMap]);

  return (
    <section
      id="localizacao"
      ref={sectionRef}
      className="relative w-full bg-[#FAF9F6] select-none"
      style={{
        height: '350vh', // 3.5x viewport height for smooth progressive scrub
      }}
    >
      {/* 100vh Sticky Viewport */}
      <div
        ref={stickyContainerRef}
        className="w-full h-screen h-[100dvh] overflow-hidden bg-[#FAF9F6]"
      >
        {shouldMountMap ? (
          <OxfordCoveMap onMapReady={() => initScrollAnimation()} />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#FAF9F6] text-[#806B54]">
            <span className="font-technical text-[11px] font-semibold tracking-widest uppercase">
              Localização · Oxford Cove JVC
            </span>
          </div>
        )}
      </div>
    </section>
  );
};
