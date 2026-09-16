'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Sparkles, Bell } from 'lucide-react';
import { useLeadDrawer } from '@/components/form/PersistentLeadDrawer';
import { useCurrency } from '@/context/CurrencyContext';

interface TimelineStep {
  number: string;
  percentage: string;
  title: string;
  subtitle: string;
  textureSrc: string;
  textColor: string;
  borderColor: string;
  shadowColor: string;
  overlayClass?: string;
}

const TIMELINE_STEPS: TimelineStep[] = [
  {
    number: '01',
    percentage: '20%',
    title: 'DOWN PAYMENT',
    subtitle: 'No booking',
    textureSrc: '/images/payment-plan/05-marble-dark.webp',
    textColor: 'text-white',
    borderColor: 'border-white/20',
    shadowColor: 'shadow-[0_10px_25px_rgba(20,20,18,0.22)]',
    overlayClass: 'bg-black/20',
  },
  {
    number: '02',
    percentage: '10%',
    title: 'WITHIN 90 DAYS',
    subtitle: 'After booking',
    textureSrc: '/images/payment-plan/04-marble-light.webp',
    textColor: 'text-[#171815]',
    borderColor: 'border-[#24231F]/15',
    shadowColor: 'shadow-[0_10px_25px_rgba(20,20,18,0.08)]',
    overlayClass: 'bg-white/10',
  },
  {
    number: '03',
    percentage: '10%',
    title: 'AT 40% CONSTRUCTION',
    subtitle: 'During construction',
    textureSrc: '/images/payment-plan/06-stone-texture.webp',
    textColor: 'text-[#171815]',
    borderColor: 'border-[#24231F]/15',
    shadowColor: 'shadow-[0_10px_25px_rgba(20,20,18,0.08)]',
    overlayClass: 'bg-black/5',
  },
  {
    number: '04',
    percentage: '60%',
    title: 'ON HANDOVER',
    subtitle: 'Upon completion',
    textureSrc: '/images/payment-plan/07-water-texture.webp',
    textColor: 'text-[#FAF9F6]',
    borderColor: 'border-[#1D3027]/25',
    shadowColor: 'shadow-[0_10px_25px_rgba(29,48,39,0.25)]',
    overlayClass: 'bg-[#1D3027]/25',
  },
];

export const PaymentPlanSection: React.FC = () => {
  const { openLeadDrawer } = useLeadDrawer();
  const { formatPrice, currency, disclaimer } = useCurrency();
  const [isInView, setIsInView] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="payment-plan"
      className="relative w-full bg-[#FAF8F5] text-[#24231F] py-20 lg:py-28 select-none overflow-hidden border-t border-[#24231F]/10"
    >
      {/* ========================================================================= */}
      {/* 01. SUBTLE BACKGROUND LAYERS & MATERIAL DEPTH                             */}
      {/* ========================================================================= */}

      {/* ARCHITECTURAL BACKGROUND TEXTURE (SUBTLE DEPTH) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.07] mix-blend-multiply overflow-hidden">
        <Image
          src="/images/payment-plan/02-architectural-background.webp"
          alt=""
          fill
          className="object-cover object-center"
          aria-hidden="true"
        />
      </div>

      {/* PALM SHADOW PROJECTION (NATURAL ORGANIC SHADOW ON CORNER) */}
      <div className="absolute -left-12 -top-12 w-[340px] sm:w-[480px] h-[340px] sm:h-[480px] pointer-events-none opacity-25 mix-blend-multiply select-none">
        <Image
          src="/images/payment-plan/08-palm-shadow.webp"
          alt=""
          fill
          className="object-contain"
          aria-hidden="true"
        />
      </div>

      {/* PALM OVERLAY (TOP-RIGHT DECORATION - DISCRETE & NON-INTRUSIVE) */}
      <div className="hidden lg:block absolute -right-16 top-0 w-[420px] h-[460px] pointer-events-none opacity-40 select-none">
        <Image
          src="/images/payment-plan/03-palm-overlay.webp"
          alt=""
          fill
          className="object-contain object-top-right"
          aria-hidden="true"
        />
      </div>

      {/* ========================================================================= */}
      {/* 02. MAIN CONTAINER & EDITORIAL CONTENT                                    */}
      {/* ========================================================================= */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
        
        {/* TOP SPLIT: HEADLINE / COPY (LEFT) & HERO BALCONY PHOTOGRAPHY (RIGHT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center mb-16 sm:mb-20">
          
          {/* LEFT: EDITORIAL COPY */}
          <div
            className={`lg:col-span-7 flex flex-col justify-center transition-all duration-700 ease-out ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="font-body text-[11px] sm:text-[11.5px] font-semibold tracking-[0.28em] uppercase text-[#806B54] mb-3 block">
              PAYMENT PLAN
            </span>
            <h2 className="font-display font-normal text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.04] text-[#171815] tracking-tight max-w-xl">
              Um plano pensado<br />
              para acompanhar<br />
              a construção.
            </h2>
            <p className="font-body text-[#5A544C] text-[14.5px] sm:text-[16px] leading-[1.60] mt-4 font-normal max-w-lg">
              Condições flexíveis para você investir com segurança e tranquilidade em cada etapa do projeto.
            </p>
          </div>

          {/* RIGHT: ARCHITECTURAL HERO BALCONY PHOTOGRAPHY */}
          <div
            className={`lg:col-span-5 transition-all duration-700 delay-150 ease-out ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="relative w-full h-[240px] sm:h-[280px] lg:h-[320px] rounded-[20px] sm:rounded-[26px] overflow-hidden border border-[#24231F]/10 shadow-[0_12px_36px_rgba(36,35,31,0.06)]">
              <Image
                src="/images/payment-plan/01-hero-balcony.webp"
                alt="Oxford Cove — Terraço e Vista Arquitetônica"
                fill
                quality={90}
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 03. PAYMENT TIMELINE (HORIZONTAL ON DESKTOP · VERTICAL ON MOBILE)         */}
        {/* ========================================================================= */}
        <div
          className={`mb-16 sm:mb-20 transition-all duration-700 delay-300 ease-out ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          
          {/* DESKTOP / TABLET TIMELINE (HORIZONTAL) */}
          <div className="hidden md:block relative">
            
            {/* CONTINUOUS CONNECTING LINE BEHIND CIRCLES */}
            <div className="absolute top-[65px] left-[65px] right-[65px] h-[1.5px] bg-[#24231F]/15 z-0" />

            <div className="relative z-10 grid grid-cols-4 gap-4 lg:gap-8">
              {TIMELINE_STEPS.map((step, idx) => (
                <div
                  key={step.number}
                  className="flex flex-col items-center text-center group"
                  style={{
                    transitionDelay: `${idx * 100 + 200}ms`,
                  }}
                >
                  {/* STEP NUMBER BADGE */}
                  <span className="font-technical text-[10.5px] font-semibold text-[#806B54] tracking-widest uppercase mb-2 block">
                    {step.number}
                  </span>

                  {/* MATERIAL TEXTURED CIRCLE */}
                  <div
                    className={`relative w-[120px] h-[120px] lg:w-[130px] lg:h-[130px] rounded-full flex items-center justify-center border ${step.borderColor} ${step.shadowColor} overflow-hidden transition-transform duration-300 group-hover:scale-105`}
                  >
                    <Image
                      src={step.textureSrc}
                      alt=""
                      fill
                      className="object-cover object-center select-none"
                      aria-hidden="true"
                    />
                    {step.overlayClass && (
                      <div className={`absolute inset-0 ${step.overlayClass} pointer-events-none`} />
                    )}
                    
                    {/* PERCENTAGE HTML TEXT */}
                    <span
                      className={`relative z-10 font-display text-[32px] lg:text-[36px] font-medium leading-none ${step.textColor}`}
                    >
                      {step.percentage}
                    </span>
                  </div>

                  {/* LABELS */}
                  <div className="mt-5">
                    <h3 className="font-body text-[12px] lg:text-[12.5px] font-semibold tracking-[0.16em] uppercase text-[#171815]">
                      {step.title}
                    </h3>
                    <p className="font-body text-[12.5px] text-[#6B6358] mt-1 font-normal">
                      {step.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MOBILE TIMELINE (VERTICAL CONNECTING LINE) */}
          <div className="md:hidden relative pl-6">
            
            {/* VERTICAL CONNECTING LINE */}
            <div className="absolute top-[45px] bottom-[45px] left-[54px] w-[1.5px] bg-[#24231F]/15 z-0" />

            <div className="relative z-10 space-y-7">
              {TIMELINE_STEPS.map((step) => (
                <div key={step.number} className="flex items-center gap-5">
                  
                  {/* MATERIAL TEXTURED CIRCLE */}
                  <div
                    className={`relative shrink-0 w-[64px] h-[64px] rounded-full flex items-center justify-center border ${step.borderColor} ${step.shadowColor} overflow-hidden`}
                  >
                    <Image
                      src={step.textureSrc}
                      alt=""
                      fill
                      className="object-cover object-center select-none"
                      aria-hidden="true"
                    />
                    {step.overlayClass && (
                      <div className={`absolute inset-0 ${step.overlayClass} pointer-events-none`} />
                    )}
                    
                    <span
                      className={`relative z-10 font-display text-[20px] font-medium leading-none ${step.textColor}`}
                    >
                      {step.percentage}
                    </span>
                  </div>

                  {/* COPY */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-technical text-[9.5px] font-semibold text-[#806B54] tracking-wider uppercase">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="font-body text-[11.5px] font-semibold tracking-[0.14em] uppercase text-[#171815]">
                      {step.title}
                    </h3>
                    <p className="font-body text-[12px] text-[#6B6358] mt-0.5">
                      {step.subtitle}
                    </p>
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 04. EOI PANEL (UNIFIED LUXURY EDITORIAL BLOCK WITH MARBLE/DARK GREEN TONE) */}
        {/* ========================================================================= */}
        <div
          className={`relative w-full rounded-[24px] sm:rounded-[30px] p-7 sm:p-10 lg:p-12 text-[#FAF9F6] overflow-hidden shadow-[0_20px_50px_rgba(29,48,39,0.22)] bg-[#192720] transition-all duration-700 delay-450 ease-out ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {/* MARBLE DARK BACKGROUND TEXTURE INTEGRATION */}
          <div className="absolute inset-0 opacity-25 mix-blend-overlay pointer-events-none">
            <Image
              src="/images/payment-plan/05-marble-dark.webp"
              alt=""
              fill
              className="object-cover object-center"
              aria-hidden="true"
            />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* LEFT: EOI VALUE & TITLE */}
            <div className="lg:col-span-4 lg:pr-6 lg:border-r border-white/15">
              <span className="font-technical text-[10.5px] sm:text-[11px] uppercase tracking-[0.24em] text-champagne block mb-2 font-semibold">
                EXPRESSION OF INTEREST
              </span>
              <div className="font-display text-[32px] sm:text-[40px] font-normal text-white leading-none mb-2">
                {formatPrice(50000)}
              </div>
              <p className="font-body text-[12.5px] sm:text-[13px] text-[#D1CCC3] leading-relaxed">
                Fully refundable · Priority access during pre-launch
              </p>
              {currency !== 'AED' && (
                <p className="font-technical text-[10.5px] text-[#D1CCC3]/70 mt-1">
                  {disclaimer}
                </p>
              )}
            </div>

            {/* CENTER: 3 DISCRETE LINEAR BENEFITS */}
            <div className="lg:col-span-5 space-y-3 sm:space-y-3.5 lg:px-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-champagne shrink-0 mt-0.5 stroke-[1.5]" />
                <span className="font-body text-[13px] sm:text-[13.5px] text-[#FAF9F6]/90 leading-snug">
                  Fully refundable until unit allocation
                </span>
              </div>

              <div className="flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-champagne shrink-0 mt-0.5 stroke-[1.5]" />
                <span className="font-body text-[13px] sm:text-[13.5px] text-[#FAF9F6]/90 leading-snug">
                  Priority access to unit selection
                </span>
              </div>

              <div className="flex items-start gap-3">
                <Bell className="w-4 h-4 text-champagne shrink-0 mt-0.5 stroke-[1.5]" />
                <span className="font-body text-[13px] sm:text-[13.5px] text-[#FAF9F6]/90 leading-snug">
                  Be the first to receive project updates
                </span>
              </div>
            </div>

            {/* RIGHT: CTA BUTTON */}
            <div className="lg:col-span-3 flex flex-col items-start lg:items-end justify-center lg:pl-4 lg:border-l border-white/15">
              <span className="font-technical text-[9.5px] sm:text-[10px] uppercase tracking-[0.20em] text-[#B7A489] block mb-1">
                TAKE THE NEXT STEP
              </span>
              <span className="font-body text-[12px] text-[#D1CCC3] block mb-4">
                Register Your Interest
              </span>

              <button
                type="button"
                onClick={openLeadDrawer}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-7 py-3.5 rounded-full bg-[#FAF9F6] hover:bg-white text-[#171815] font-body text-[10.5px] sm:text-[11px] font-semibold tracking-[0.16em] uppercase transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer group"
              >
                <span>SECURE YOUR PLACE AT OXFORD COVE</span>
                <span className="w-7 h-7 rounded-full bg-[#171815] text-white flex items-center justify-center transition-transform group-hover:translate-x-1">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
