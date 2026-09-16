'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Building2, MapPin, LayoutGrid } from 'lucide-react';

export const ProductSection: React.FC = () => {
  const scrollToHeroForm = () => {
    const formElement = document.getElementById('hero-lead-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
      const firstInput = formElement.querySelector('input') as HTMLInputElement | null;
      if (firstInput) firstInput.focus();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="projeto"
      className="relative w-full min-h-[90svh] lg:min-h-[100svh] flex items-center py-20 lg:py-28 overflow-hidden bg-[#F5F2EB] select-none border-t border-[#24231F]/8"
    >
      {/* 01. FULL-BLEED BACKGROUND IMAGE (SEAMLESS IMMERSIVE COVER) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/product/oxford-cove-facade.png"
          alt="Oxford Cove by IMAN Developers — Fachada Oficial e Arquitetura em JVC Dubai"
          fill
          priority
          quality={100}
          unoptimized
          sizes="100vw"
          className="object-cover object-[78%_center] sm:object-[72%_center] md:object-[68%_center] lg:object-right select-none"
        />

        {/* 02. DESKTOP/TABLET SEAMLESS FADE OVERLAY (EXTENDED OPAQUE ZONE TO 50%) */}
        <div
          className="hidden md:block absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, #F5F2EB 0%, #F5F2EB 50%, rgba(245, 242, 235, 0.96) 62%, rgba(245, 242, 235, 0.45) 78%, transparent 92%)',
          }}
        />

        {/* 03. MOBILE SEAMLESS FADE OVERLAY */}
        <div
          className="md:hidden absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, #F5F2EB 0%, #F5F2EB 58%, rgba(245, 242, 235, 0.92) 78%, rgba(245, 242, 235, 0.35) 92%, transparent 100%)',
          }}
        />
      </div>

      {/* 04. EDITORIAL CONTENT BLOCK (MAX 530PX ANCHORED ON SOLID OPAQUE ZONE) */}
      <div className="relative z-10 w-full container-master">
        <div className="max-w-[530px] flex flex-col justify-center space-y-5 lg:space-y-6">
          
          {/* LOGO OXFORD COVE & OVERLINE TAG */}
          <div className="flex flex-col items-start gap-2 pb-0.5">
            <Image
              src="/images/brand/logo-bronze.png"
              alt="Oxford Cove"
              width={135}
              height={58}
              className="w-[110px] sm:w-[125px] lg:w-[135px] h-auto object-contain select-none"
              priority
            />
            <div className="flex items-center gap-2 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-bronze" />
              <span className="font-body text-[9.5px] sm:text-[10px] font-semibold tracking-[0.24em] uppercase text-bronze">
                THE BOUTIQUE CONCEPT · JVC DISTRICT 11
              </span>
            </div>
          </div>

          {/* HEADLINE PRINCIPAL */}
          <h2 className="font-display font-normal text-[32px] sm:text-[38px] xl:text-[44px] leading-[1.08] tracking-[-0.02em] text-[#1A1816]">
            A escassez do conceito boutique em uma cidade dominada por arranha-céus.
          </h2>

          {/* COPY ORIENTADA A BENEFÍCIOS E LIQUIDEZ (ENTRELINHA 1.72 AUMENTADA) */}
          <p className="font-body text-[14px] sm:text-[14.5px] leading-[1.72] text-[#5A544C] font-normal">
            Enquanto o mercado constrói torres massivas, o Oxford Cove aposta na baixa densidade: apenas 5 pavimentos residenciais assinados pela IMAN. Um ativo desenhado para atrair locatários qualificados que pagam prêmio por silêncio, design contemporâneo e conveniência no District 11.
          </p>

          {/* 05. GRID DAS 4 MÉTRICAS TÉCNICAS (GRADE 2x2 COM BORDAS DIVISÓRIAS #E2DDD5) */}
          <div className="grid grid-cols-2 border-t border-[#E2DDD5] pt-5 gap-y-5 gap-x-5 sm:gap-x-6">
            {/* 01. GABARITO EXCLUSIVO */}
            <div className="flex flex-col space-y-1">
              <span className="font-body text-[9px] sm:text-[9.5px] font-semibold tracking-[0.18em] uppercase text-bronze">
                01. GABARITO EXCLUSIVO
              </span>
              <span className="font-technical text-[14px] sm:text-[15px] font-bold text-[#1A1816] uppercase tracking-tight">
                B + G + P + 5
              </span>
              <p className="font-body text-[11.5px] leading-[1.48] text-[#5A544C]">
                Baixa densidade, elevadores sem espera e privacidade comunitária preservada.
              </p>
            </div>

            {/* 02. LOCALIZAÇÃO TÁTICA */}
            <div className="flex flex-col space-y-1 border-l border-[#E2DDD5] pl-4 sm:pl-5">
              <span className="font-body text-[9px] sm:text-[9.5px] font-semibold tracking-[0.18em] uppercase text-bronze">
                02. LOCALIZAÇÃO TÁTICA
              </span>
              <span className="font-technical text-[14px] sm:text-[15px] font-bold text-[#1A1816] uppercase tracking-tight">
                District 11 · JVC
              </span>
              <p className="font-body text-[11.5px] leading-[1.48] text-[#5A544C]">
                Uma das zonas mais consolidadas e procuradas para locação premium residencial.
              </p>
            </div>

            {/* 03. TIPOLOGIAS INTELIGENTES */}
            <div className="flex flex-col space-y-1 border-t border-[#E2DDD5] pt-4">
              <span className="font-body text-[9px] sm:text-[9.5px] font-semibold tracking-[0.18em] uppercase text-bronze">
                03. TIPOLOGIAS INTELIGENTES
              </span>
              <span className="font-technical text-[14px] sm:text-[15px] font-bold text-[#1A1816] uppercase tracking-tight">
                Studios a 2BR Duplex
              </span>
              <p className="font-body text-[11.5px] leading-[1.48] text-[#5A544C]">
                De 388 a 2.159 sq.ft., com plantas desenhadas para maximizar espaço e luz natural.
              </p>
            </div>

            {/* 04. ASSINATURA & SOLIDEZ */}
            <div className="flex flex-col space-y-1 border-t border-l border-[#E2DDD5] pt-4 pl-4 sm:pl-5">
              <span className="font-body text-[9px] sm:text-[9.5px] font-semibold tracking-[0.18em] uppercase text-bronze">
                04. ASSINATURA & SOLIDEZ
              </span>
              <span className="font-technical text-[14px] sm:text-[15px] font-bold text-[#1A1816] uppercase tracking-tight">
                IMAN Developers
              </span>
              <p className="font-body text-[11.5px] leading-[1.48] text-[#5A544C]">
                Histórico impecável de pontualidade na entrega e acabamentos de categoria internacional.
              </p>
            </div>
          </div>

          {/* 06. BOTÃO PRINCIPAL ÚNICO (DARK CONTRASTANTE) */}
          <div className="pt-2">
            <button
              type="button"
              onClick={scrollToHeroForm}
              className="h-[48px] sm:h-[50px] px-8 rounded-[8px] bg-[#28372D] hover:bg-[#1D3027] text-[#FAF9F6] font-body text-[10.5px] sm:text-[11px] font-semibold uppercase tracking-[0.12em] inline-flex items-center gap-2.5 transition-all duration-base ease-luxury shadow-[0_4px_18px_rgba(40,55,45,0.20)] hover:shadow-[0_8px_26px_rgba(29,48,39,0.28)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] group cursor-pointer"
            >
              <span>RECEBER BOOK TÉCNICO E DISPONIBILIDADES</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-base ease-luxury group-hover:translate-x-1 stroke-[1.5]" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export const DubaiMarketSection = ProductSection;
export const ArchitectureSection = ProductSection;


