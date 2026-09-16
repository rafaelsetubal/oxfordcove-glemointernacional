import React from 'react';
import { HeroMetrics } from './HeroMetrics';

export const HeroCopy: React.FC = () => {
  return (
    <div className="flex flex-col select-none max-w-[560px] animate-fadeIn">
      {/* 01. TAG SUPERIOR */}
      <span className="font-body text-[11px] sm:text-[11.5px] font-semibold tracking-widest uppercase text-[#D4C7B5] mb-3 sm:mb-4 block">
        DUBAI EM OUTRO RITMO
      </span>

      {/* 02. HEADLINE (Cormorant Garamond, SemiBold/Medium, #F8F5F0) */}
      <h1 className="font-display font-medium text-[48px] sm:text-[62px] lg:text-[clamp(64px,5.8vw,88px)] leading-[0.92] tracking-[-0.035em] text-[#F8F5F0] drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]">
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
      <p className="font-body text-[14px] sm:text-[15px] leading-[1.60] text-[#EAE5DC] mt-3 sm:mt-4 mb-4 sm:mb-5 max-w-[480px]">
        Acesso prioritário a um dos projetos boutique de maior potencial de valorização em JVC, com condições exclusivas de pré-lançamento.
      </p>

      {/* 06. INVESTMENT METRICS */}
      <HeroMetrics />
    </div>
  );
};
