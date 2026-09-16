'use client';

import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import {
  WORLD_WIDTH,
  WORLD_HEIGHT,
  CINEMATIC_PHASES,
  DESTINATIONS,
  CameraPhase,
} from './locationCoordinates';
import { LocationWorldMap } from './LocationWorldMap';
import { MapPin, Navigation, Compass, ExternalLink, ChevronRight, ChevronLeft } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const LocationSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  const [currentPhaseIndex, setCurrentPhaseIndex] = useState<number>(0);
  const [selectedDestinationId, setSelectedDestinationId] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Detect mobile viewport
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentPhase: CameraPhase = CINEMATIC_PHASES[currentPhaseIndex] || CINEMATIC_PHASES[0];

  // GSAP ScrollTrigger setup
  useEffect(() => {
    if (!containerRef.current || !stickyRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: stickyRef.current,
        scrub: 0.6,
        onUpdate: (self) => {
          const p = self.progress;
          setProgress(p);

          // Map scroll progress to 4 phases: [0-0.25) -> Phase 0, [0.25-0.5) -> Phase 1, [0.5-0.75) -> Phase 2, [0.75-1.0] -> Phase 3
          const phaseIdx = Math.min(
            CINEMATIC_PHASES.length - 1,
            Math.floor(p * CINEMATIC_PHASES.length)
          );
          setCurrentPhaseIndex(phaseIdx);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Compute camera transform based on current phase and screen aspect ratio
  const cameraTransformStyle = useMemo<React.CSSProperties>(() => {
    const { targetX, targetY, scale } = currentPhase;

    // Mobile specific scale adjustments
    const effectiveScale = isMobile ? Math.max(1.0, scale * 1.15) : scale;

    // Compute center shift offset from standard 2400x1350 center (1200, 675)
    const offsetX = ((1200 - targetX) / 1200) * 45 * (effectiveScale - 0.7);
    const offsetY = ((675 - targetY) / 675) * 45 * (effectiveScale - 0.7);

    return {
      transform: `scale(${effectiveScale}) translate(${offsetX}%, ${offsetY}%)`,
      transformOrigin: '50% 50%',
    };
  }, [currentPhase, isMobile]);

  // Handle phase jump click
  const handleJumpToPhase = useCallback((phaseIdx: number) => {
    setCurrentPhaseIndex(phaseIdx);
    if (!containerRef.current) return;

    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight;
    const targetScroll = containerTop + (phaseIdx / (CINEMATIC_PHASES.length - 1)) * (containerHeight - window.innerHeight);

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  }, []);

  // Filter destinations for the active phase carousel / quick list
  const activePhaseDestinations = useMemo(() => {
    return DESTINATIONS.filter((d) => d.phase <= currentPhase.phase);
  }, [currentPhase.phase]);

  return (
    <section
      id="localizacao"
      ref={containerRef}
      className="relative w-full bg-[#171815] text-[#FAF9F6] select-none"
      style={{ height: '350vh' }} // 3.5x viewport height for smooth scroll scrub
    >
      {/* STICKY FULLSCREEN VIEWPORT FRAME */}
      <div
        ref={stickyRef}
        className="w-full h-screen h-[100dvh] flex flex-col justify-between overflow-hidden relative"
      >
        {/* ========================================================================= */}
        {/* 01. FULL MAP RENDER CONTAINER (SVG + RASTER WORLD)                        */}
        {/* ========================================================================= */}
        <div className="absolute inset-0 z-0">
          <LocationWorldMap
            currentPhase={currentPhase.phase}
            selectedDestinationId={selectedDestinationId}
            onSelectDestination={(id) => setSelectedDestinationId(id)}
            transformStyle={cameraTransformStyle}
          />
          {/* Subtle vignette overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#171815]/90 via-transparent to-[#171815]/60 pointer-events-none" />
          <div className="hidden lg:block absolute inset-y-0 left-0 w-[45%] bg-gradient-to-r from-[#171815]/95 via-[#171815]/60 to-transparent pointer-events-none" />
        </div>

        {/* ========================================================================= */}
        {/* 02. TOP NAVIGATION HUD & PHASE CONTROLS                                    */}
        {/* ========================================================================= */}
        <div className="relative z-20 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 pt-6 sm:pt-8 flex items-center justify-between pointer-events-auto">
          {/* Brand & Section Tag */}
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-champagne animate-pulse" />
            <div>
              <span className="font-technical text-[10px] sm:text-[11px] font-semibold tracking-[0.24em] uppercase text-champagne block">
                LOCATION · CINEMATIC MAP
              </span>
              <span className="font-body text-[12px] sm:text-[13px] text-[#D1CCC3] hidden sm:inline">
                Oxford Cove · JVC District 11, Dubai
              </span>
            </div>
          </div>

          {/* Phase Quick Selector Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-[#171815]/80 backdrop-blur-md p-1 sm:p-1.5 rounded-full border border-white/10 shadow-lg">
            {CINEMATIC_PHASES.map((p, idx) => {
              const isActive = currentPhaseIndex === idx;
              return (
                <button
                  key={p.phase}
                  type="button"
                  onClick={() => handleJumpToPhase(idx)}
                  className={`px-3 sm:px-4 py-1.5 rounded-full font-technical text-[10px] sm:text-[11px] font-medium tracking-wider uppercase transition-all duration-300 ${
                    isActive
                      ? 'bg-champagne text-[#171815] font-semibold shadow-sm'
                      : 'text-[#B5AEA4] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="sm:hidden">{p.phase}</span>
                  <span className="hidden sm:inline">{`0${p.phase} ${p.tag.split('&')[0].trim()}`}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 03. MAIN EDITORIAL CONTENT HUD (DESKTOP: FLOATING LEFT / MOBILE: BOTTOM)  */}
        {/* ========================================================================= */}
        <div className="relative z-20 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 my-auto pointer-events-none flex flex-col justify-end lg:justify-center">
          <div className="max-w-[440px] xl:max-w-[480px] bg-[#171815]/85 lg:bg-[#171815]/75 backdrop-blur-xl p-6 sm:p-8 rounded-[24px] border border-white/10 shadow-2xl pointer-events-auto transition-all duration-500">
            
            {/* Phase Badge & Progress Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <span className="font-technical text-[10px] uppercase tracking-[0.2em] text-champagne font-semibold">
                {currentPhase.label} · {currentPhase.tag}
              </span>
              <div className="w-20 h-1 bg-white/15 rounded-full overflow-hidden">
                <div
                  className="h-full bg-champagne transition-all duration-300 rounded-full"
                  style={{ width: `${((currentPhaseIndex + 1) / CINEMATIC_PHASES.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Title & Subtitle */}
            <h2 className="font-display font-medium text-[26px] sm:text-[34px] leading-[1.08] text-[#FAF9F6] mb-2 tracking-tight">
              {currentPhase.title}
            </h2>
            <p className="font-body text-champagne text-[13px] sm:text-[14px] font-medium mb-3">
              {currentPhase.subtitle}
            </p>

            {/* Description */}
            <p className="font-body text-[#D1CCC3] text-[12.5px] sm:text-[13.5px] leading-relaxed mb-6 font-normal">
              {currentPhase.description}
            </p>

            {/* Top Destinations Grid for this Phase */}
            <div className="grid grid-cols-2 gap-3 pb-6 border-b border-white/10 mb-6">
              {activePhaseDestinations.slice(0, 4).map((dest) => (
                <div
                  key={dest.id}
                  onClick={() => setSelectedDestinationId(dest.id)}
                  className={`p-2.5 rounded-[12px] border cursor-pointer transition-all duration-200 ${
                    selectedDestinationId === dest.id
                      ? 'bg-champagne text-[#171815] border-champagne'
                      : 'bg-white/5 hover:bg-white/10 border-white/5 text-[#FAF9F6]'
                  }`}
                >
                  <div className="font-display text-[18px] sm:text-[20px] font-light leading-none mb-0.5">
                    {dest.travelTime}
                  </div>
                  <div
                    className={`font-body text-[10.5px] uppercase tracking-wider truncate ${
                      selectedDestinationId === dest.id ? 'text-[#171815] font-semibold' : 'text-[#B5AEA4]'
                    }`}
                  >
                    {dest.name}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Action Links */}
            <div className="flex items-center justify-between gap-3">
              <a
                href="https://www.google.com/maps/place/25%C2%B003'57.9%22N+55%C2%B012'39.6%22E/@25.0799246,55.266574,10.79z/data=!4m4!3m3!8m2!3d25.066074!4d55.211007"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-champagne hover:text-[#171815] text-[#FAF9F6] border border-white/15 transition-all duration-300 font-body text-[10.5px] font-semibold tracking-[0.16em] uppercase group"
              >
                <MapPin className="w-3.5 h-3.5 text-champagne group-hover:text-[#171815] transition-colors" />
                <span>GOOGLE MAPS</span>
                <ExternalLink className="w-3 h-3 text-white/50 group-hover:text-[#171815]" />
              </a>

              <div className="font-technical text-[10px] text-[#B5AEA4] uppercase tracking-wider hidden sm:block">
                SCROLL TO EXPLORE
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* 04. BOTTOM SCROLL TRACK INDICATOR                                         */}
        {/* ========================================================================= */}
        <div className="relative z-20 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 pb-6 flex items-center justify-between text-[#B5AEA4] font-technical text-[10.5px] pointer-events-auto">
          <div className="flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-champagne animate-spin-slow" />
            <span>GEO-COORDINATES: 25.06684° N, 55.21101° E</span>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <span>SCROLL PROGRESS</span>
            <div className="w-24 h-1 bg-white/15 rounded-full overflow-hidden">
              <div
                className="h-full bg-champagne transition-all duration-100"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <span>{Math.round(progress * 100)}%</span>
          </div>
        </div>

      </div>
    </section>
  );
};
