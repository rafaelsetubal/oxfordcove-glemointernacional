'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Sparkles, Bell } from 'lucide-react';
import { useLeadDrawer } from '@/components/form/PersistentLeadDrawer';

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
  textShadow?: string;
}

const TIMELINE_STEPS: TimelineStep[] = [
  {
    number: '01',
    percentage: '20%',
    title: 'ENTRADA',
    subtitle: 'Na reserva',
    textureSrc: '/images/payment-plan/05-marble-dark.webp',
    textColor: 'text-white',
    borderColor: 'border-white/25',
    shadowColor: 'shadow-[0_8px_20px_rgba(20,20,18,0.25)]',
    overlayClass: 'bg-black/35',
    textShadow: 'drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]',
  },
  {
    number: '02',
    percentage: '10%',
    title: 'EM ATÉ 90 DIAS',
    subtitle: 'Após a reserva',
    textureSrc: '/images/payment-plan/04-marble-light.webp',
    textColor: 'text-[#171815]',
    borderColor: 'border-[#24231F]/20',
    shadowColor: 'shadow-[0_8px_20px_rgba(20,20,18,0.10)]',
    overlayClass: 'bg-white/20',
    textShadow: 'drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]',
  },
  {
    number: '03',
    percentage: '10%',
    title: 'EM 40% DAS OBRAS',
    subtitle: 'Durante a construção',
    textureSrc: '/images/payment-plan/06-stone-texture.webp',
    textColor: 'text-[#171815]',
    borderColor: 'border-[#24231F]/20',
    shadowColor: 'shadow-[0_8px_20px_rgba(20,20,18,0.10)]',
    overlayClass: 'bg-black/10',
    textShadow: 'drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]',
  },
  {
    number: '04',
    percentage: '60%',
    title: 'NA ENTREGA DAS CHAVES',
    subtitle: 'Na conclusão da obra',
    textureSrc: '/images/payment-plan/07-water-texture.webp',
    textColor: 'text-white',
    borderColor: 'border-[#1D3027]/30',
    shadowColor: 'shadow-[0_8px_20px_rgba(29,48,39,0.30)]',
    overlayClass: 'bg-[#1D3027]/40',
    textShadow: 'drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]',
  },
];

export const PaymentPlanSection: React.FC = () => {
  const { openLeadDrawer } = useLeadDrawer();
  const [isInView, setIsInView] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement | null>(null);

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

  return (
    <section
      ref={sectionRef}
      id="payment-plan"
      className="relative w-full bg-[#FAF8F5] text-[#24231F] py-14 sm:py-16 lg:py-20 select-none overflow-hidden border-t border-[#24231F]/10"
    >
      {/* ========================================================================= */}
      {/* 01. SUBTLE BACKGROUND LAYERS (DISCRETE MATERIALITY, NEVER DISTRACTING)    */}
      {/* ========================================================================= */}

      {/* ARCHITECTURAL BACKGROUND TEXTURE (SUBTLE DEPTH) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-multiply overflow-hidden">
        <Image
          src="/images/payment-plan/02-architectural-background.webp"
          alt=""
          fill
          className="object-cover object-center"
          aria-hidden="true"
        />
      </div>

      {/* PALM SHADOW PROJECTION (NATURAL ORGANIC SHADOW ON CORNER) */}
      <div className="absolute -left-16 -top-16 w-[320px] sm:w-[440px] h-[320px] sm:h-[440px] pointer-events-none opacity-15 mix-blend-multiply select-none">
        <Image
          src="/images/payment-plan/08-palm-shadow.webp"
          alt=""
          fill
          className="object-contain"
          aria-hidden="true"
        />
      </div>

      {/* PALM OVERLAY (TOP-RIGHT DECORATION - DISCRETE) */}
      <div className="hidden lg:block absolute -right-20 top-0 w-[380px] h-[400px] pointer-events-none opacity-25 select-none">
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
      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* TOP SPLIT: HEADLINE / COPY (LEFT) & HERO BALCONY PHOTOGRAPHY (RIGHT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center mb-10 sm:mb-12">
          
          {/* LEFT: EDITORIAL COPY (2 LINES IN DESKTOP, REDUCED VERTICAL FOOTPRINT) */}
          <div
            className={`lg:col-span-7 flex flex-col justify-center gpu-accel reveal-blur-init ${
              isInView ? 'reveal-blur-visible' : ''
            }`}
          >
            <span className="font-body text-[11px] sm:text-[11.5px] font-semibold tracking-[0.28em] uppercase text-[#806B54] mb-2.5 block">
              PLANO DE PAGAMENTO
            </span>
            <h2 className="font-display font-normal text-[32px] sm:text-[40px] lg:text-[46px] leading-[1.08] text-[#171815] tracking-tight max-w-xl">
              Um plano pensado<br className="hidden sm:inline" /> para acompanhar a construção.
            </h2>
            <p className="font-body text-[#5A544C] text-[14px] sm:text-[15.5px] leading-[1.55] mt-3 font-normal max-w-lg">
              Condições flexíveis para você investir com segurança e tranquilidade em cada etapa do projeto.
            </p>
          </div>

          {/* RIGHT: ARCHITECTURAL HERO BALCONY PHOTOGRAPHY (COMPACT & PROPORTIONATE) */}
          <div
            className={`lg:col-span-5 gpu-accel reveal-blur-init ${
              isInView ? 'reveal-blur-visible' : ''
            }`}
            style={{ transitionDelay: '150ms' }}
          >
            <div className="relative w-full h-[190px] sm:h-[220px] lg:h-[240px] rounded-[18px] sm:rounded-[22px] overflow-hidden border border-[#24231F]/10 shadow-[0_10px_30px_rgba(36,35,31,0.05)]">
              <Image
                src="/images/payment-plan/01-hero-balcony.webp"
                alt="Oxford Cove — Terraço e Vista Arquitetônica"
                fill
                quality={90}
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 03. PAYMENT TIMELINE (HORIZONTAL ON DESKTOP · VERTICAL ON MOBILE)         */}
        {/* ========================================================================= */}
        <div
          className={`mb-10 sm:mb-12 transition-all duration-700 delay-300 ease-out ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          
          {/* DESKTOP / TABLET TIMELINE (HORIZONTAL - COMPACT & HIGH CONTRAST) */}
          <div className="hidden md:block relative max-w-[1080px] mx-auto">
            
            {/* CONTINUOUS CONNECTING LINE BEHIND CIRCLES */}
            <div className="absolute top-[68px] left-[70px] right-[70px] h-[1.5px] bg-[#24231F]/20 z-0" />

            <div className="relative z-10 grid grid-cols-4 gap-6 lg:gap-8">
              {TIMELINE_STEPS.map((step, idx) => (
                <div
                  key={step.number}
                  className={`flex flex-col items-center text-center group gpu-accel reveal-blur-init ${
                    isInView ? 'reveal-blur-visible' : ''
                  }`}
                  style={{
                    transitionDelay: `${idx * 120 + 200}ms`,
                  }}
                >
                  {/* STEP NUMBER BADGE */}
                  <span className="font-technical text-[11px] font-bold text-[#806B54] tracking-widest uppercase mb-2 block">
                    {step.number}
                  </span>

                  {/* MATERIAL TEXTURED CIRCLE WITH PROMINENT PERCENTAGE */}
                  <div
                    className={`relative w-[124px] h-[124px] lg:w-[134px] lg:h-[134px] rounded-full flex items-center justify-center border ${step.borderColor} ${step.shadowColor} overflow-hidden transition-all duration-300 group-hover:scale-105`}
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
                    
                    {/* PERCENTAGE HTML TEXT (+25% LARGER WITH HIGH CONTRAST) */}
                    <span
                      className={`relative z-10 font-display text-[38px] lg:text-[44px] font-medium leading-none ${step.textColor} ${step.textShadow || ''}`}
                    >
                      {step.percentage}
                    </span>
                  </div>

                  {/* LABELS (LARGER, TIGHTER TRACKING, CLEAR WCAG CONTRAST) */}
                  <div className="mt-4">
                    <h3 className="font-body text-[13px] lg:text-[14px] font-bold tracking-[0.08em] uppercase text-[#171815] leading-snug">
                      {step.title}
                    </h3>
                    <p className="font-body text-[12.5px] sm:text-[13px] text-[#5A544C] mt-0.5 font-medium">
                      {step.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MOBILE TIMELINE (VERTICAL CONNECTING LINE) */}
          <div className="md:hidden relative pl-4 max-w-sm mx-auto">
            
            {/* VERTICAL CONNECTING LINE */}
            <div className="absolute top-[40px] bottom-[40px] left-[47px] w-[1.5px] bg-[#24231F]/20 z-0" />

            <div className="relative z-10 space-y-6">
              {TIMELINE_STEPS.map((step, idx) => (
                <div
                  key={step.number}
                  className={`flex items-center gap-4 gpu-accel reveal-blur-init ${
                    isInView ? 'reveal-blur-visible' : ''
                  }`}
                  style={{
                    transitionDelay: `${idx * 100 + 150}ms`,
                  }}
                >
                  
                  {/* MATERIAL TEXTURED CIRCLE */}
                  <div
                    className={`relative shrink-0 w-[66px] h-[66px] rounded-full flex items-center justify-center border ${step.borderColor} ${step.shadowColor} overflow-hidden`}
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
                      className={`relative z-10 font-display text-[22px] font-medium leading-none ${step.textColor} ${step.textShadow || ''}`}
                    >
                      {step.percentage}
                    </span>
                  </div>

                  {/* COPY */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-technical text-[10px] font-bold text-[#806B54] tracking-wider uppercase">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="font-body text-[13px] font-bold tracking-[0.08em] uppercase text-[#171815] leading-snug">
                      {step.title}
                    </h3>
                    <p className="font-body text-[12.5px] text-[#5A544C] mt-0.5 font-medium">
                      {step.subtitle}
                    </p>
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 04. EOI PANEL (UNIFIED LUXURY EDITORIAL BLOCK · FIXED AED 50,000)         */}
        {/* ========================================================================= */}
        <div
          className={`relative w-full rounded-[22px] sm:rounded-[26px] p-6 sm:p-8 lg:p-10 text-[#FAF9F6] overflow-hidden shadow-[0_16px_44px_rgba(29,48,39,0.22)] bg-[#192720] gpu-accel reveal-blur-init ${
            isInView ? 'reveal-blur-visible' : ''
          }`}
          style={{ transitionDelay: '350ms' }}
        >
          {/* MARBLE DARK BACKGROUND TEXTURE INTEGRATION */}
          <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none">
            <Image
              src="/images/payment-plan/05-marble-dark.webp"
              alt=""
              fill
              className="object-cover object-center"
              aria-hidden="true"
            />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* LEFT: EOI VALUE & TITLE (FIXED TO EXACT AED 50,000 WITHOUT CONVERSION) */}
            <div className="lg:col-span-4 lg:pr-6 lg:border-r border-white/15">
              <span className="font-technical text-[10.5px] sm:text-[11px] uppercase tracking-[0.24em] text-champagne block mb-1.5 font-semibold">
                EXPRESSÃO DE INTERESSE (EOI)
              </span>
              <div className="font-display text-[36px] sm:text-[44px] lg:text-[48px] font-medium text-white leading-none mb-2 tracking-tight">
                AED 50,000
              </div>
              <div className="space-y-0.5 font-body text-[12.5px] sm:text-[13px] text-[#D1CCC3]">
                <p className="font-semibold text-white/95">100% Reembolsável</p>
                <p className="text-[#D1CCC3]/80">Acesso prioritário no pré-lançamento</p>
              </div>
            </div>

            {/* CENTER: 3 DISCRETE LINEAR BENEFITS */}
            <div className="lg:col-span-5 space-y-3 lg:px-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-champagne shrink-0 mt-0.5 stroke-[1.75]" />
                <span className="font-body text-[13px] sm:text-[13.5px] text-[#FAF9F6]/95 leading-snug">
                  100% reembolsável até a alocação da unidade
                </span>
              </div>

              <div className="flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-champagne shrink-0 mt-0.5 stroke-[1.75]" />
                <span className="font-body text-[13px] sm:text-[13.5px] text-[#FAF9F6]/95 leading-snug">
                  Prioridade na escolha das melhores plantas
                </span>
              </div>

              <div className="flex items-start gap-3">
                <Bell className="w-4 h-4 text-champagne shrink-0 mt-0.5 stroke-[1.75]" />
                <span className="font-body text-[13px] sm:text-[13.5px] text-[#FAF9F6]/95 leading-snug">
                  Atualizações e book técnico em primeira mão
                </span>
              </div>
            </div>

            {/* RIGHT: CTA BUTTON WITH EXPANDED CLICKABLE AREA */}
            <div className="lg:col-span-3 flex flex-col items-start lg:items-end justify-center lg:pl-4 lg:border-l border-white/15">
              <span className="font-technical text-[9.5px] sm:text-[10px] uppercase tracking-[0.20em] text-[#B7A489] block mb-0.5">
                PRÓXIMO PASSO
              </span>
              <span className="font-body text-[12px] text-[#D1CCC3] block mb-3">
                Registre seu interesse
              </span>

              <button
                type="button"
                onClick={openLeadDrawer}
                className="w-full sm:w-auto min-h-[48px] h-[50px] inline-flex items-center justify-center gap-3 px-6 sm:px-7 rounded-full bg-[#FAF9F6] hover:bg-white text-[#171815] font-body text-[10.5px] sm:text-[11px] font-bold tracking-[0.14em] uppercase transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer group"
              >
                <span>GARANTIR MINHA ESCOLHA DE UNIDADE</span>
                <span className="w-7 h-7 rounded-full bg-[#171815] text-white flex items-center justify-center transition-transform group-hover:translate-x-1 shrink-0">
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
