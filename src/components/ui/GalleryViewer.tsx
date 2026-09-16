'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

export interface GalleryViewerSpec {
  label: string;
  value: string;
}

export interface GalleryViewerItem {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
  tag?: string;
  description?: string;
  specs?: GalleryViewerSpec[];
  ctaText?: string;
  onCtaClick?: () => void;
}

export interface GalleryViewerProps {
  items: GalleryViewerItem[];
  currentIndex: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
  showThumbnails?: boolean;
}

export const GalleryViewer: React.FC<GalleryViewerProps> = ({
  items,
  currentIndex,
  onClose,
  onIndexChange,
  showThumbnails = true,
}) => {
  const thumbScrollRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < items.length;
  const activeItem = isOpen ? items[currentIndex] : null;

  const prevSlide = useCallback(() => {
    if (currentIndex === null || items.length === 0) return;
    const newIdx = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    onIndexChange(newIdx);
  }, [currentIndex, items.length, onIndexChange]);

  const nextSlide = useCallback(() => {
    if (currentIndex === null || items.length === 0) return;
    const newIdx = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
    onIndexChange(newIdx);
  }, [currentIndex, items.length, onIndexChange]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, prevSlide, nextSlide]);

  // Auto-scroll active thumbnail into view
  useEffect(() => {
    if (currentIndex !== null && thumbScrollRef.current) {
      const activeThumb = thumbScrollRef.current.children[currentIndex] as HTMLElement;
      if (activeThumb) {
        activeThumb.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest',
        });
      }
    }
  }, [currentIndex]);

  // Swipe gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!isOpen || !activeItem) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={activeItem.title}
      className="fixed inset-0 z-[9999] bg-[#0E100D] text-white flex flex-col justify-between select-none overflow-y-auto lg:overflow-hidden animate-[fadeIn_0.25s_ease-out]"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* ========================================================================= */}
      {/* 01. TOP BAR: BRAND LOGOS + CLOSE BUTTON                                   */}
      {/* ========================================================================= */}
      <header className="relative w-full px-6 sm:px-10 lg:px-14 py-4 sm:py-5 min-h-[64px] sm:min-h-[72px] flex items-center justify-between z-20 shrink-0 border-b border-white/[0.08] bg-[#0E100D]/90 backdrop-blur-sm">
        {/* LOGOS: OXFORD COVE + GLEMO INTERNATIONAL (CENTERED ON DESKTOP) */}
        <div className="flex items-center gap-3.5 sm:gap-6 md:absolute md:left-1/2 md:-translate-x-1/2 md:top-1/2 md:-translate-y-1/2">
          <div className="relative h-7 sm:h-8 md:h-9 lg:h-10 w-32 sm:w-44 md:w-52 lg:w-56">
            <Image
              src="/images/brand/logo-white.png"
              alt="Oxford Cove by IMAN"
              fill
              className="object-contain object-left md:object-center"
              unoptimized
            />
          </div>
          <span className="w-px h-4 sm:h-5 md:h-6 bg-white/20" />
          <div className="relative h-5 sm:h-6 md:h-7 lg:h-8 w-24 sm:w-32 md:w-36 lg:w-40 opacity-90 hover:opacity-100 transition-opacity">
            <Image
              src="/images/brand/glemo-white.png"
              alt="glemO International"
              fill
              className="object-contain object-left md:object-center"
              unoptimized
            />
          </div>
        </div>

        {/* CLOSE BUTTON */}
        <div className="ml-auto flex items-center">
          <button
            type="button"
            onClick={onClose}
            className="group flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300 focus:outline-none cursor-pointer py-1"
            aria-label="Fechar galeria"
          >
            <span className="font-body text-[11px] sm:text-[12px] font-semibold tracking-[0.22em] uppercase text-white/80 group-hover:text-white">
              FECHAR
            </span>
            <span className="text-xl font-light text-white/70 group-hover:text-white transition-transform duration-300 group-hover:rotate-90 leading-none">
              ×
            </span>
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 02. MAIN STAGE (CONTAINED PROTAGONIST IMAGE + LATERAL ARROWS)              */}
      {/* ========================================================================= */}
      <main className="relative w-full flex-1 min-h-[45vh] max-h-[62vh] lg:max-h-[66vh] flex items-center justify-center px-4 sm:px-14 my-auto">
        {/* PREV ARROW */}
        {items.length > 1 && (
          <button
            type="button"
            onClick={prevSlide}
            className="group absolute left-2 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-4 text-white/60 hover:text-white transition-colors duration-300 focus:outline-none cursor-pointer bg-black/30 sm:bg-transparent rounded-full backdrop-blur-sm sm:backdrop-blur-none"
            aria-label="Item anterior"
          >
            <ChevronLeft className="w-7 h-7 sm:w-10 sm:h-10 transform transition-transform duration-300 group-hover:-translate-x-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" />
          </button>
        )}

        {/* HERO IMAGE CONTAINER */}
        <div className="relative w-full h-full max-w-6xl flex items-center justify-center p-2">
          <Image
            src={activeItem.image}
            alt={`${activeItem.title} — Oxford Cove`}
            fill
            priority
            quality={100}
            unoptimized
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-contain object-center transition-opacity duration-300 ease-out"
          />
        </div>

        {/* NEXT ARROW */}
        {items.length > 1 && (
          <button
            type="button"
            onClick={nextSlide}
            className="group absolute right-2 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-4 text-white/60 hover:text-white transition-colors duration-300 focus:outline-none cursor-pointer bg-black/30 sm:bg-transparent rounded-full backdrop-blur-sm sm:backdrop-blur-none"
            aria-label="Próximo item"
          >
            <ChevronRight className="w-7 h-7 sm:w-10 sm:h-10 transform transition-transform duration-300 group-hover:translate-x-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" />
          </button>
        )}
      </main>

      {/* ========================================================================= */}
      {/* 03. FOOTER: SPECS / INFO / CTA + OPTIONAL THUMBNAILS                     */}
      {/* ========================================================================= */}
      <footer className="w-full bg-[#111310] border-t border-white/[0.08] px-6 sm:px-10 lg:px-14 py-4 sm:py-5 z-20 shrink-0">
        <div className="max-w-6xl mx-auto flex flex-col space-y-3">
          
          {/* TOP INFO ROW & CTA */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* LEFT: IDENTIFICATION & TITLE */}
            <div className="flex flex-col space-y-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="font-technical text-[11px] sm:text-[12px] font-semibold tracking-[0.24em] text-champagne uppercase">
                  {String(currentIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                </span>
                {activeItem.tag && (
                  <>
                    <span className="text-white/25 text-xs">·</span>
                    <span className="font-body text-[11px] sm:text-[12px] font-semibold tracking-[0.20em] uppercase text-[#EAE5DC]">
                      {activeItem.tag}
                    </span>
                  </>
                )}
                {activeItem.subtitle && (
                  <>
                    <span className="text-white/25 text-xs">·</span>
                    <span className="font-body text-[11px] sm:text-[12px] text-white/70">
                      {activeItem.subtitle}
                    </span>
                  </>
                )}
              </div>

              <h3 className="font-display font-normal text-[22px] sm:text-[28px] lg:text-[32px] text-[#FAF9F6] leading-[1.14] tracking-tight">
                {activeItem.title}
              </h3>

              {activeItem.description && (
                <p className="font-body text-[13px] sm:text-[14px] text-[#DED8CC] leading-relaxed max-w-2xl font-normal">
                  {activeItem.description}
                </p>
              )}
            </div>

            {/* RIGHT: SPECS & CTA (FOR FLOORPLANS / UNITS) */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 shrink-0 pt-2 md:pt-0">
              {activeItem.specs && activeItem.specs.length > 0 && (
                <div className="flex items-center gap-3 sm:gap-5 bg-white/[0.04] border border-white/[0.08] px-4 py-2 rounded-xl">
                  {activeItem.specs.map((spec, sIdx) => (
                    <div key={sIdx} className="flex items-baseline gap-1.5">
                      <span className="font-technical text-[10px] sm:text-[11px] uppercase tracking-wider text-champagne font-semibold">
                        {spec.label}:
                      </span>
                      <span className="font-technical text-[12px] sm:text-[13px] font-medium text-white tracking-wide">
                        {spec.value}
                      </span>
                      {sIdx < activeItem.specs!.length - 1 && (
                        <span className="text-white/20 ml-2">|</span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {activeItem.ctaText && activeItem.onCtaClick && (
                <button
                  type="button"
                  onClick={activeItem.onCtaClick}
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-champagne hover:bg-[#E5D7B7] text-[#111310] font-body text-[10.5px] sm:text-[11px] font-semibold tracking-[0.18em] uppercase transition-all shadow-md hover:shadow-lg cursor-pointer"
                >
                  <span>{activeItem.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>

          {/* OPTIONAL THUMBNAILS ROW */}
          {showThumbnails && items.length > 1 && (
            <div
              ref={thumbScrollRef}
              className="w-full overflow-x-auto no-scrollbar flex items-center gap-2 pt-2 border-t border-white/[0.06]"
            >
              {items.map((item, idx) => {
                const isCurrent = currentIndex === idx;
                return (
                  <button
                    key={`thumb-${item.id}-${idx}`}
                    type="button"
                    onClick={() => onIndexChange(idx)}
                    className={`relative shrink-0 w-16 sm:w-20 aspect-[16/10] rounded-[6px] overflow-hidden transition-all duration-300 focus:outline-none cursor-pointer bg-black/40 ${
                      isCurrent
                        ? 'ring-[1.5px] ring-champagne opacity-100 scale-105'
                        : 'opacity-40 hover:opacity-85'
                    }`}
                    aria-label={`Ver ${item.title}`}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      quality={60}
                      unoptimized
                      sizes="80px"
                      className="object-cover object-center"
                    />
                  </button>
                );
              })}
            </div>
          )}

        </div>
      </footer>
    </div>
  );
};
