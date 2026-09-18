'use client';

import React, { useEffect } from 'react';

export const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Only run Lenis inertia on desktop pointer devices to preserve 0 TBT on mobile
    const isTouchDevice =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 1024);

    if (isTouchDevice) {
      return;
    }

    let cancelled = false;
    let dispose: (() => void) | undefined;

    const initializeDesktopScroll = async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import('lenis'),
        import('gsap'),
        import('gsap/dist/ScrollTrigger'),
      ]);

      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.9,
        infinite: false,
      });

      lenis.on('scroll', ScrollTrigger.update);

      const updateLenis = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(updateLenis);
      gsap.ticker.lagSmoothing(0);

      dispose = () => {
        gsap.ticker.remove(updateLenis);
        lenis.destroy();
      };
    };

    void initializeDesktopScroll();

    return () => {
      cancelled = true;
      dispose?.();
    };
  }, []);

  return <>{children}</>;
};
