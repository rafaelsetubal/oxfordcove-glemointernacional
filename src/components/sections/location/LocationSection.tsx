'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

type GsapContext = { revert: () => void };

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
  const animationCtxRef = useRef<GsapContext | null>(null);
  const animationInitializedRef = useRef(false);
  const retryTimerRef = useRef<number | null>(null);
  const [shouldMountMap, setShouldMountMap] = useState<boolean>(false);

  const initScrollAnimation = useCallback(async () => {
    if (animationInitializedRef.current) return;
    if (!sectionRef.current || !stickyContainerRef.current) return;

    // Check if markers exist in DOM before attaching GSAP ScrollTrigger
    const markerOxford = sectionRef.current.querySelector('#marker-oxford-cove');
    if (!markerOxford) {
      // Retry in 100ms if React has not finished painting DOM
      retryTimerRef.current = window.setTimeout(() => void initScrollAnimation(), 100);
      return;
    }

    const [{ gsap }, { ScrollTrigger }] = await Promise.all([
      import('gsap'),
      import('gsap/dist/ScrollTrigger'),
    ]);

    if (!sectionRef.current || !stickyContainerRef.current || animationInitializedRef.current) return;

    gsap.registerPlugin(ScrollTrigger);
    animationInitializedRef.current = true;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    animationCtxRef.current = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set('.marker-element', { opacity: 1, scale: 1 });
        gsap.set('.route-path', { strokeDashoffset: 0 });
        return;
      }

      // Initial state: 100% clean map
      gsap.set('.marker-element', { opacity: 0 });
      gsap.set('#marker-oxford-cove', { opacity: 0, scale: 0.8 });
      gsap.set('.route-path', {
        strokeDashoffset: (i, target) => {
          return target.getAttribute('stroke-dasharray') || 500;
        },
      });

      // Master ScrollTrigger Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          pin: stickyContainerRef.current,
          invalidateOnRefresh: true,
        },
      });

      // 01. 10% - 20%: OXFORD COVE
      tl.to(
        '#marker-oxford-cove',
        {
          opacity: 1,
          scale: 1,
          duration: 1.0,
          ease: 'power2.out',
        },
        0.5
      );

      // 02. 20% - 30%: DUBAI MARINA
      tl.to(
        '.route-path-dubai-marina',
        {
          strokeDashoffset: 0,
          duration: 1.0,
          ease: 'power1.inOut',
        },
        1.5
      );
      tl.to(
        '#marker-dubai-marina',
        {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        2.0
      );

      // 03. 30% - 40%: PALM JUMEIRAH
      tl.to(
        '.route-path-palm-jumeirah',
        {
          strokeDashoffset: 0,
          duration: 1.0,
          ease: 'power1.inOut',
        },
        2.5
      );
      tl.to(
        '#marker-palm-jumeirah',
        {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        3.0
      );

      // 04. 40% - 50%: MALL OF THE EMIRATES
      tl.to(
        '.route-path-mall-of-the-emirates',
        {
          strokeDashoffset: 0,
          duration: 1.0,
          ease: 'power1.inOut',
        },
        3.5
      );
      tl.to(
        '#marker-mall-of-the-emirates',
        {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        4.0
      );

      // 05. 50% - 60%: DUBAI HILLS
      tl.to(
        '.route-path-dubai-hills',
        {
          strokeDashoffset: 0,
          duration: 1.0,
          ease: 'power1.inOut',
        },
        4.5
      );
      tl.to(
        '#marker-dubai-hills',
        {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        5.0
      );

      // 06. 60% - 70%: DOWNTOWN DUBAI / BURJ KHALIFA
      tl.to(
        '.route-path-downtown-dubai',
        {
          strokeDashoffset: 0,
          duration: 1.0,
          ease: 'power1.inOut',
        },
        5.5
      );
      tl.to(
        '#marker-downtown-dubai',
        {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        6.0
      );

      // 07. 70% - 80%: DXB AIRPORT
      tl.to(
        '.route-path-dxb-airport',
        {
          strokeDashoffset: 0,
          duration: 1.0,
          ease: 'power1.inOut',
        },
        6.5
      );
      tl.to(
        '#marker-dxb-airport',
        {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        7.0
      );

      // 08. 80% - 90%: DWC AIRPORT
      tl.to(
        '.route-path-dwc-airport',
        {
          strokeDashoffset: 0,
          duration: 1.0,
          ease: 'power1.inOut',
        },
        7.5
      );
      tl.to(
        '#marker-dwc-airport',
        {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        8.0
      );

      ScrollTrigger.refresh();
    }, sectionRef);
  }, []);

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
    return () => {
      if (retryTimerRef.current !== null) {
        window.clearTimeout(retryTimerRef.current);
      }
      if (animationCtxRef.current) {
        animationCtxRef.current.revert();
      }
      animationInitializedRef.current = false;
    };
  }, []);

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
          <OxfordCoveMap onMapReady={initScrollAnimation} />
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
