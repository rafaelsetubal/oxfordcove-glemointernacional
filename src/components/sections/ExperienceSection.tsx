'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Play, X } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

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

  const handlePlayClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="experiencia"
      className="relative w-full min-h-[75vh] lg:min-h-[85vh] flex items-center justify-center py-20 lg:py-28 overflow-hidden select-none bg-[#F5F2EB] border-t border-[#24231F]/8"
    >
      {/* 01. FULL-BLEED REAL WEBP BACKGROUND (OPTIMIZED) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/experience/experience-bg.webp"
          alt="Oxford Cove by IMAN — Atmosfera"
          fill
          quality={88}
          sizes="100vw"
          className="object-cover object-center select-none pointer-events-none"
        />
      </div>

      {/* 02. EDITORIAL & WIDESCREEN VIDEO CONTAINER */}
      <div
        className={`relative z-10 w-full container-master flex flex-col items-center text-center px-4 gpu-accel reveal-blur-init ${
          isInView ? 'reveal-blur-visible' : ''
        }`}
      >
        
        {/* TAG SUPERIOR */}
        <span className="font-body text-xs font-semibold tracking-widest uppercase text-[#8C8275] mb-2.5 block">
          CINEMA • CONCEITO • ATMOSFERA
        </span>

        {/* HEADLINE */}
        <h2 className="font-display font-normal text-[34px] sm:text-[44px] lg:text-[50px] leading-[1.08] text-[#1A1816] mb-3 max-w-2xl">
          O conceito Oxford Cove em movimento.
        </h2>

        {/* SUBTEXTO */}
        <p className="font-body text-[#6B6358] text-[14px] sm:text-[15.5px] leading-[1.60] max-w-[520px] mx-auto mb-8 sm:mb-10">
          Arquitetura inspirada na natureza e o ritmo de vida exclusivo de um endereço boutique em JVC.
        </p>

        {/* 03. WIDESCREEN HORIZONTAL VIDEO CONTAINER (16:9 / MAX-W 980PX) */}
        <div
          className="relative w-full max-w-[980px] mx-auto aspect-video rounded-[20px] overflow-hidden group cursor-pointer bg-black"
          style={{
            boxShadow: '0 30px 60px -15px rgba(20, 18, 16, 0.25)',
            border: '1px solid rgba(255, 255, 255, 0.60)',
          }}
          onClick={handlePlayClick}
        >
          {/* HORIZONTAL VIDEO TAG WITH PRELOAD NONE TO ELIMINATE 13MB INITIAL DOWNLOAD */}
          <video
            ref={videoRef}
            src="/video/oxford_cove_horizontal.mp4"
            playsInline
            preload="none"
            controls={isPlaying}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            className={`w-full h-full object-cover ${isPlaying ? 'block' : 'hidden'}`}
          >
            <track kind="captions" srcLang="pt" label="Português" />
          </video>

          {/* RESPONSIVE NEXT.JS OPTIMIZED POSTER IMAGE */}
          {!isPlaying && (
            <div className="absolute inset-0">
              <Image
                src="/images/product/oxford-cove-facade.webp"
                alt="Oxford Cove — Vídeo de Apresentação"
                fill
                quality={82}
                sizes="(max-width: 768px) 100vw, 980px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-base flex flex-col items-center justify-center gap-3.5">
                <button
                  type="button"
                  aria-label="Assistir ao vídeo institucional em widescreen"
                  className="w-[72px] h-[72px] sm:w-[84px] sm:h-[84px] rounded-full bg-white/25 group-hover:bg-white/35 backdrop-blur-xl border border-white/60 text-white flex items-center justify-center transition-all duration-base ease-luxury shadow-[0_8px_32px_rgba(0,0,0,0.30)] group-hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white text-white translate-x-0.5 transition-transform duration-base group-hover:translate-x-1" />
                </button>

                <span className="font-body text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-semibold text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                  ASSISTIR AO VÍDEO
                </span>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
