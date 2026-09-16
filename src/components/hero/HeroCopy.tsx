'use client';

import React from 'react';
import { HeroMetrics } from './HeroMetrics';
import { useCurrency, CurrencyDisclaimer } from '@/context/CurrencyContext';

export const HeroCopy: React.FC = () => {
  const { formatPrice } = useCurrency();

  return (
    <div className="flex flex-col select-none max-w-[560px]">
      {/* 01. TAG SUPERIOR */}
      <div className="mb-3 sm:mb-4">
        <span className="font-body text-[11px] sm:text-[11.5px] font-semibold tracking-widest uppercase text-[#D4C7B5] block">
          DUBAI EM OUTRO RITMO
        </span>
      </div>

      {/* 02. HEADLINE (Cormorant Garamond, SemiBold/Medium, #F8F5F0) */}
      <h1
        className="font-display font-medium text-[48px] sm:text-[62px] lg:text-[clamp(64px,5.8vw,88px)] leading-[0.92] tracking-[-0.035em] text-[#F8F5F0] drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]"
      >
        Entre antes
        <br />
        do mercado.
      </h1>

      {/* 03. SUBTÍTULO DE LOCALIZAÇÃO */}
      <div className="mt-3.5 sm:mt-4">
        <span className="font-display font-medium text-[22px] sm:text-[25px] lg:text-[28px] leading-tight text-[#FAF8F5] block">
          Oxford Cove by IMAN • Jumeirah Village Circle
        </span>
      </div>

      {/* 04. PARÁGRAFO DE APOIO (PROMESSA TANGÍVEL DE POSICIONAMENTO FINANCEIRO) */}
      <p
        className="font-body text-[14px] sm:text-[15px] leading-[1.60] text-[#EAE5DC] mt-3 sm:mt-4 mb-4 sm:mb-5 max-w-[480px]"
      >
        Acesso prioritário a um dos projetos boutique de maior potencial de valorização em JVC, com condições exclusivas de pré-lançamento.
      </p>

      {/* 05. INVESTMENT METRICS */}
      <div>
        <HeroMetrics />
        <CurrencyDisclaimer className="mt-2 text-white/70" />
      </div>

      {/* 06. MOBILE CONVERSION CTA BUTTON (REFINED CREAM/GOLD SHIMMER) */}
      <div className="md:hidden mt-6 sm:mt-8 flex flex-col items-stretch gap-2.5">
        <a
          href="#cadastro-mobile"
          className="relative w-full h-[52px] rounded-full bg-gradient-to-r from-[#F7F3EB] via-[#EFE7D8] to-[#E5D7B7] hover:from-[#FFFFFF] hover:via-[#F7F3EB] hover:to-[#EDE1C8] text-[#171815] font-body text-[11px] font-bold uppercase tracking-[0.14em] flex items-center justify-center gap-2.5 transition-all duration-300 shadow-[0_4px_22px_rgba(223,200,154,0.40)] hover:shadow-[0_6px_28px_rgba(223,200,154,0.60)] animate-pulse-gold overflow-hidden border border-[#D8C7A5]/60 active:scale-[0.98] cursor-pointer"
        >
          {/* GOLD SHIMMER OVERLAY */}
          <span className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/75 to-transparent pointer-events-none" />
          <span className="relative z-10 font-bold">GARANTIR MINHA PRIORIDADE NA TABELA</span>
          <svg className="relative z-10 w-4 h-4 stroke-[2]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </a>
        <div className="flex items-center justify-center gap-2 text-white/70 text-[10px] uppercase font-technical tracking-wider pt-0.5">
          <span>EOI {formatPrice(50000)}</span>
          <span>•</span>
          <span className="text-champagne font-semibold">100% REEMBOLSÁVEL</span>
        </div>
      </div>
    </div>
  );
};
