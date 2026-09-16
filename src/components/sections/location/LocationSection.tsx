'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { LocationViewport } from './LocationViewport';
import { CAMERA_KEYFRAMES, WORLD_WIDTH, WORLD_HEIGHT } from './locationCoordinates';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const LocationSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !cameraRef.current) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Determine current viewport category
    const width = window.innerWidth;
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;

    const getScale = (kf: (typeof CAMERA_KEYFRAMES)[0]) => {
      if (isMobile) return kf.scaleMobile;
      if (isTablet) return kf.scaleTablet;
      return kf.scaleDesktop;
    };

    // Helper to calculate CSS translate3d based on target center (targetX, targetY)
    const getTransform = (kf: (typeof CAMERA_KEYFRAMES)[0]) => {
      const scale = getScale(kf);
      // Normalized shift from center (1200, 675)
      const shiftX = ((WORLD_WIDTH / 2 - kf.targetX) / (WORLD_WIDTH / 2)) * 40 * (scale - 0.85);
      const shiftY = ((WORLD_HEIGHT / 2 - kf.targetY) / (WORLD_HEIGHT / 2)) * 40 * (scale - 0.85);
      return {
        xPercent: shiftX,
        yPercent: shiftY,
        scale: scale,
      };
    };

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        // Static macro overview for reduced motion
        const finalKf = CAMERA_KEYFRAMES[3];
        const tf = getTransform(finalKf);
        gsap.set(cameraRef.current, {
          xPercent: tf.xPercent,
          yPercent: tf.yPercent,
          scale: tf.scale,
        });

        // Reveal all paths and labels
        gsap.set('.route-animated-path', { strokeDashoffset: 0 });
        gsap.set('.destination-marker, .destination-label', { opacity: 1 });
        return;
      }

      // Initial Camera State (Phase 1: Origin / Oxford Cove)
      const kf1 = getTransform(CAMERA_KEYFRAMES[0]);
      gsap.set(cameraRef.current, {
        xPercent: kf1.xPercent,
        yPercent: kf1.yPercent,
        scale: kf1.scale,
        transformOrigin: '50% 50%',
      });

      // Master ScrollTrigger Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
        },
      });

      const kf2 = getTransform(CAMERA_KEYFRAMES[1]);
      const kf3 = getTransform(CAMERA_KEYFRAMES[2]);
      const kf4 = getTransform(CAMERA_KEYFRAMES[3]);

      // -------------------------------------------------------------
      // SEGMENT 1: Transition to Phase 2 (Coastal Corridor)
      // -------------------------------------------------------------
      tl.to(
        cameraRef.current,
        {
          xPercent: kf2.xPercent,
          yPercent: kf2.yPercent,
          scale: kf2.scale,
          ease: 'power2.inOut',
          duration: 2,
        },
        'phase2'
      );

      // Animate Coastal Connections
      tl.to(
        '.route-phase-2 .route-animated-path',
        {
          strokeDashoffset: 0,
          ease: 'power1.inOut',
          duration: 1.5,
          stagger: 0.2,
        },
        'phase2'
      );

      // Reveal Coastal Markers & Labels
      tl.to(
        '.marker-phase-2, .label-phase-2',
        {
          opacity: 1,
          ease: 'power2.out',
          duration: 1,
          stagger: 0.15,
        },
        'phase2+=0.5'
      );

      // -------------------------------------------------------------
      // SEGMENT 2: Transition to Phase 3 (Central Dubai / Downtown)
      // -------------------------------------------------------------
      tl.to(
        cameraRef.current,
        {
          xPercent: kf3.xPercent,
          yPercent: kf3.yPercent,
          scale: kf3.scale,
          ease: 'power2.inOut',
          duration: 2,
        },
        'phase3'
      );

      // Animate Central Connections
      tl.to(
        '.route-phase-3 .route-animated-path',
        {
          strokeDashoffset: 0,
          ease: 'power1.inOut',
          duration: 1.5,
          stagger: 0.2,
        },
        'phase3'
      );

      // Reveal Central Markers & Labels
      tl.to(
        '.marker-phase-3, .label-phase-3',
        {
          opacity: 1,
          ease: 'power2.out',
          duration: 1,
          stagger: 0.15,
        },
        'phase3+=0.5'
      );

      // -------------------------------------------------------------
      // SEGMENT 3: Transition to Phase 4 (Macro Scale / DXB & DWC)
      // -------------------------------------------------------------
      tl.to(
        cameraRef.current,
        {
          xPercent: kf4.xPercent,
          yPercent: kf4.yPercent,
          scale: kf4.scale,
          ease: 'power2.inOut',
          duration: 2,
        },
        'phase4'
      );

      // Animate Airport Connections
      tl.to(
        '.route-phase-4 .route-animated-path',
        {
          strokeDashoffset: 0,
          ease: 'power1.inOut',
          duration: 1.5,
          stagger: 0.2,
        },
        'phase4'
      );

      // Reveal Airport Markers & Labels
      tl.to(
        '.marker-phase-4, .label-phase-4',
        {
          opacity: 1,
          ease: 'power2.out',
          duration: 1,
          stagger: 0.15,
        },
        'phase4+=0.5'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="localizacao"
      ref={sectionRef}
      className="relative w-full bg-[#181614] text-[#FAF9F6] select-none"
      style={{
        height: '400vh', // 400vh scroll track
      }}
    >
      <LocationViewport ref={cameraRef} />
    </section>
  );
};
