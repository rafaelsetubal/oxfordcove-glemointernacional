'use client';

import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { ArrowRight } from 'lucide-react';
import { LeadForm } from '@/components/form/FixedLeadForm';
import { useCurrency } from '@/context/CurrencyContext';
import { CurrencyToggle } from '@/components/ui/CurrencyToggle';

// CONTEXT FOR GLOBAL LEAD DRAWER TRIGGER
interface LeadDrawerContextType {
  openLeadDrawer: () => void;
  closeLeadDrawer: () => void;
  isDrawerOpen: boolean;
}

const LeadDrawerContext = createContext<LeadDrawerContextType>({
  openLeadDrawer: () => {},
  closeLeadDrawer: () => {},
  isDrawerOpen: false,
});

export const useLeadDrawer = () => useContext(LeadDrawerContext);

export const LeadDrawerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showFloatingCta, setShowFloatingCta] = useState(false);
  const [isFinalSectionVisible, setIsFinalSectionVisible] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const { formatPrice } = useCurrency();

  const openLeadDrawer = () => setIsOpen(true);
  const closeLeadDrawer = () => {
    setIsOpen(false);
    if (triggerRef.current) {
      triggerRef.current.focus();
    }
  };

  // Detect when user scrolls past the Hero (e.g. scrollY > windowHeight * 0.75)
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const windowHeight = window.innerHeight;
      setShowFloatingCta(scrollPos > windowHeight * 0.75);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Detect when Final CTA or Footer enters the viewport (~15-20% threshold)
  useEffect(() => {
    const handleIntersection: IntersectionObserverCallback = (entries) => {
      let isVisible = false;
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.12) {
          isVisible = true;
        }
      });
      setIsFinalSectionVisible(isVisible);
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: [0, 0.12, 0.25, 0.5],
    });

    const finalCta = document.getElementById('final-cta');
    const footer = document.querySelector('footer');

    if (finalCta) observer.observe(finalCta);
    if (footer) observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeLeadDrawer();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const shouldShowFloatingCta = showFloatingCta && !isFinalSectionVisible && !isOpen;
  const shouldShowCurrencyToggle = !isFinalSectionVisible;

  return (
    <LeadDrawerContext.Provider value={{ openLeadDrawer, closeLeadDrawer, isDrawerOpen: isOpen }}>
      {children}

      {/* 01. DESKTOP FLOATING CONTROLS (BOTTOM-RIGHT - ABOVE CONVERSION CTA) */}
      <div className="hidden xl:flex fixed bottom-8 right-8 z-40 flex-col items-end gap-2.5 pointer-events-none">
        {/* DESKTOP FLOATING CURRENCY TOGGLE (FADES OUT IN FINAL CTA / FOOTER) */}
        <div
          className={`transition-all duration-base ease-luxury shadow-[0_8px_24px_rgba(0,0,0,0.25)] rounded-full ${
            shouldShowCurrencyToggle
              ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
              : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
          }`}
        >
          <CurrencyToggle variant="dark" />
        </div>

        {/* DESKTOP FLOATING CTA (ONLY WHEN SCROLLED PAST HERO AND NOT IN FINAL CTA / FOOTER) */}
        <div
          className={`transition-all duration-base ease-luxury ${
            shouldShowFloatingCta
              ? 'opacity-100 translate-y-0 pointer-events-auto scale-100'
              : 'opacity-0 translate-y-6 pointer-events-none scale-95'
          }`}
        >
          <button
            ref={triggerRef}
            type="button"
            onClick={openLeadDrawer}
            className="h-[52px] px-6 rounded-pill bg-[#28372D] hover:bg-[#1D3027] text-[#FAF9F6] font-body text-[11px] font-semibold tracking-[0.12em] uppercase flex items-center gap-2.5 transition-all duration-base ease-luxury shadow-[0_12px_36px_rgba(20,25,20,0.28)] hover:shadow-[0_16px_44px_rgba(20,25,20,0.36)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#28372D] cursor-pointer"
          >
            <span>QUERO INVESTIR COM PRIORIDADE</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-base ease-luxury group-hover:translate-x-1 stroke-[1.5]" />
          </button>
        </div>
      </div>

      {/* 02. MOBILE FIXED BOTTOM BAR (Only when scrolled past Hero & not in Final CTA/Footer) */}
      <div
        style={{ paddingBottom: 'max(14px, env(safe-area-inset-bottom, 14px))' }}
        className={`xl:hidden fixed bottom-0 left-0 w-full z-40 bg-[#28372D] text-[#FAF9F6] px-5 pt-3 flex items-center justify-between shadow-[0_-8px_30px_rgba(23,24,21,0.18)] transition-all duration-base ease-luxury ${
          shouldShowFloatingCta
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col">
          <span className="font-body text-[9px] uppercase font-semibold tracking-[0.20em] text-[#B7A489]">
            ACESSO ANTECIPADO
          </span>
          <span className="font-technical text-[11px] font-medium text-[#FAF9F6]">
            EOI {formatPrice(50000)} · 100% REEMBOLSÁVEL
          </span>
        </div>

        <button
          type="button"
          onClick={openLeadDrawer}
          className="h-10 px-5 rounded-full bg-[#FAF9F6] text-[#1D3027] font-body text-[11px] font-bold uppercase tracking-[0.10em] flex items-center gap-1.5 hover:bg-ivory transition-colors active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FAF9F6] cursor-pointer shadow-sm"
        >
          <span>QUERO INVESTIR COM PRIORIDADE</span>
          <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
        </button>
      </div>

      {/* 03. UNIFIED LEAD DRAWER (Right slide-over on Desktop, Bottom sheet on Mobile) */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="drawer-headline"
          className="fixed inset-0 z-50 flex justify-end items-end sm:items-stretch bg-charcoal/50 backdrop-blur-sm animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLeadDrawer();
          }}
        >
          {/* DESKTOP LATERAL DRAWER / MOBILE BOTTOM SHEET */}
          <div
            ref={drawerRef}
            className="w-full sm:w-[400px] md:w-[420px] max-h-[95vh] sm:max-h-full sm:h-full bg-[rgba(250,249,246,0.97)] backdrop-blur-[24px] rounded-t-[24px] sm:rounded-none sm:border-l border-[#2C241F]/10 p-6 sm:p-7 overflow-y-auto shadow-[0_0_80px_rgba(20,20,18,0.22)] flex flex-col justify-between animate-slideUp sm:animate-slideLeft"
          >
            <div>
              {/* MOBILE HANDLE BAR */}
              <div className="sm:hidden w-10 h-1 bg-[#2C241F]/20 rounded-full mx-auto mb-4" />

              {/* EXACT SAME UNIFIED LEAD FORM */}
              <LeadForm mode="drawer" onClose={closeLeadDrawer} />
            </div>
          </div>
        </div>
      )}
    </LeadDrawerContext.Provider>
  );
};
