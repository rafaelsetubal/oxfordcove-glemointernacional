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
      {/* 01. FULL-BLEED BACKGROUND IMAGE (DESKTOP FULL BLEED / MOBILE LOWERED FOR FACADE HIGHLIGHT) */}
      <div className="absolute inset-x-0 bottom-0 top-[220px] sm:top-[250px] md:top-0 md:inset-0 z-0 overflow-hidden">
        <Image
          src="/images/product/oxford-cove-facade.webp"
          alt="Oxford Cove by IMAN Developers — Fachada Oficial e Arquitetura em JVC Dubai"
          fill
          quality={88}
          sizes="100vw"
          className="object-cover object-[76%_top] sm:object-[72%_center] md:object-[68%_center] lg:object-right select-none"
        />

        {/* 02. DESKTOP/TABLET SEAMLESS FADE OVERLAY (REDUCED BY 50% TO FULLY REVEAL THE FACADE) */}
        <div
          className="hidden md:block absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, #F5F2EB 0%, rgba(245, 242, 235, 0.95) 22%, rgba(245, 242, 235, 0.40) 38%, transparent 50%)',
          }}
        />

        {/* 03. MOBILE SEAMLESS FADE OVERLAY (SOFT INTEGRATION AT TOP, TRANSPARENT LOWER TO SHOW PRODUCT) */}
        <div
          className="md:hidden absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, #F5F2EB 0%, rgba(245, 242, 235, 0.88) 14%, rgba(245, 242, 235, 0.25) 32%, transparent 52%)',
          }}
        />
      </div>

      {/* 04. EDITORIAL CONTENT BLOCK (MAX 530PX ANCHORED ON SOLID OPAQUE ZONE) */}
      <div className="relative z-10 w-full container-master">
        <div className="max-w-[530px] flex flex-col justify-center space-y-5 lg:space-y-6">
          
          {/* LOGO OXFORD COVE & OVERLINE TAG */}
          <div className="flex flex-col space-y-2">
            <span className="font-body text-[10.5px] sm:text-[11px] font-semibold tracking-[0.24em] uppercase text-bronze">
              THE BOUTIQUE RESIDENCE
            </span>
            <div className="relative h-6 sm:h-7 w-48 sm:w-56">
              <Image
                src="/images/brand/logo-charcoal.png"
                alt="Oxford Cove"
                fill
                className="object-contain object-left"
              />
            </div>
          </div>

          {/* HEADLINE EDITORIAL PRINCIPAL */}
          <h2 className="font-display font-normal text-[36px] sm:text-[46px] lg:text-[52px] leading-[1.04] text-[#1A1816] tracking-tight">
            Design que respira.
            <br />
            Escala que acolhe.
          </h2>

          {/* TEXTO DE POSICIONAMENTO E CONCEITO */}
          <p className="font-body text-[#5A544C] text-[14px] sm:text-[15px] leading-[1.62] font-normal">
            Distante da densidade vertical dos arranha-céus, o Oxford Cove aposta em uma arquitetura horizontal contemporânea de 5 pavimentos. Linhas orgânicas, terraços sombreados e paisagismo integrado criam uma transição natural entre o pulsar cosmopolita de Dubai e a serenidade privada do lar.
          </p>

          {/* 05. GRID DE 4 ATRIBUTOS ESTRUTURAIS (FROSTED GLASS ON MOBILE TO PRESERVE BACKGROUND FEEL WITH MAXIMUM LEGIBILITY) */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-x-8 sm:gap-y-5 pt-3 sm:border-t sm:border-[#24231F]/10">
            {/* ATRIBUTO 1: TIPOLOGIA */}
            <div className="flex flex-col space-y-1 p-3 sm:p-0 rounded-xl sm:rounded-none bg-[#FAF9F6]/85 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none border border-[#24231F]/10 sm:border-none shadow-[0_2px_10px_rgba(36,35,31,0.04)] sm:shadow-none">
              <span className="font-body text-[8.5px] sm:text-[9.5px] font-semibold tracking-[0.18em] uppercase text-bronze">
                01. CONCEITO
              </span>
              <span className="font-technical text-[13px] sm:text-[15px] font-bold text-[#1A1816] uppercase tracking-tight">
                Low-Rise Boutique
              </span>
              <p className="font-body text-[11px] sm:text-[11.5px] leading-[1.45] text-[#5A544C]">
                Apenas 5 pavimentos residenciais em uma composição de baixa densidade e privacidade máxima.
              </p>
            </div>

            {/* ATRIBUTO 2: LOCALIZAÇÃO PRIVILEGIADA */}
            <div className="flex flex-col space-y-1 p-3 sm:p-0 rounded-xl sm:rounded-none bg-[#FAF9F6]/85 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none border border-[#24231F]/10 sm:border-none shadow-[0_2px_10px_rgba(36,35,31,0.04)] sm:shadow-none">
              <span className="font-body text-[8.5px] sm:text-[9.5px] font-semibold tracking-[0.18em] uppercase text-bronze">
                02. IMPLANTAÇÃO
              </span>
              <span className="font-technical text-[13px] sm:text-[15px] font-bold text-[#1A1816] uppercase tracking-tight">
                JVC District 11
              </span>
              <p className="font-body text-[11px] sm:text-[11.5px] leading-[1.45] text-[#5A544C]">
                Lote de esquina estrategicamente posicionado entre os parques centrais e os principais eixos viários.
              </p>
            </div>

            {/* ATRIBUTO 3: UNIDADES */}
            <div className="flex flex-col space-y-1 p-3 sm:p-0 rounded-xl sm:rounded-none bg-[#FAF9F6]/85 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none border border-[#24231F]/10 sm:border-none shadow-[0_2px_10px_rgba(36,35,31,0.04)] sm:shadow-none sm:border-t sm:border-l sm:border-[#E2DDD5] sm:pt-4 sm:pl-5">
              <span className="font-body text-[8.5px] sm:text-[9.5px] font-semibold tracking-[0.18em] uppercase text-bronze">
                03. TIPOLOGIAS
              </span>
              <span className="font-technical text-[13px] sm:text-[15px] font-bold text-[#1A1816] uppercase tracking-tight">
                Studios a Duplex
              </span>
              <p className="font-body text-[11px] sm:text-[11.5px] leading-[1.45] text-[#5A544C]">
                Plantas inteligentes projetadas para investidores exigentes e moradia premium em Dubai.
              </p>
            </div>

            {/* ATRIBUTO 4: INCORPORADORA */}
            <div className="flex flex-col space-y-1 p-3 sm:p-0 rounded-xl sm:rounded-none bg-[#FAF9F6]/85 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none border border-[#24231F]/10 sm:border-none shadow-[0_2px_10px_rgba(36,35,31,0.04)] sm:shadow-none sm:border-t sm:border-l sm:border-[#E2DDD5] sm:pt-4 sm:pl-5">
              <span className="font-body text-[8.5px] sm:text-[9.5px] font-semibold tracking-[0.18em] uppercase text-bronze">
                04. ASSINATURA & SOLIDEZ
              </span>
              <span className="font-technical text-[13px] sm:text-[15px] font-bold text-[#1A1816] uppercase tracking-tight">
                IMAN Developers
              </span>
              <p className="font-body text-[11px] sm:text-[11.5px] leading-[1.45] text-[#5A544C]">
                Histórico impecável de pontualidade na entrega e acabamentos de categoria internacional.
              </p>
            </div>
          </div>

          {/* 06. BOTÃO PRINCIPAL ÚNICO (DARK CONTRASTANTE - ROUNDED FULL) */}
          <div className="pt-2">
            <button
              type="button"
              onClick={scrollToHeroForm}
              className="w-full sm:w-auto h-[48px] sm:h-[50px] px-8 rounded-full bg-[#28372D] hover:bg-[#1D3027] text-[#FAF9F6] font-body text-[10.5px] sm:text-[11px] font-semibold uppercase tracking-[0.12em] inline-flex items-center justify-center gap-2.5 transition-all duration-base ease-luxury shadow-[0_4px_18px_rgba(40,55,45,0.20)] hover:shadow-[0_8px_26px_rgba(29,48,39,0.28)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] group cursor-pointer"
            >
              <span>QUERO O BOOK TÉCNICO COMPLETO</span>
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


