'use client';

import React, { useState, useEffect, useRef } from 'react';

interface RentRange {
  type: string;
  min: string;
  max: string;
  roi?: string;
}

const RENTAL_DATA: RentRange[] = [
  {
    type: 'STUDIO',
    min: 'AED 95K',
    max: 'AED 100K / YEAR',
    roi: '~ 18% – 20% ROI',
  },
  {
    type: '1 BEDROOM',
    min: 'AED 140K',
    max: 'AED 160K / YEAR',
  },
  {
    type: '2 BEDROOM',
    min: 'AED 245K',
    max: 'AED 250K / YEAR',
  },
];

const INSIGHTS = [
  {
    number: '01',
    title: 'VALORIZAÇÃO',
    description: 'Histórico de crescimento em JVC.',
  },
  {
    number: '02',
    title: 'LIQUIDEZ',
    description: 'Mercado residencial ativo.',
  },
  {
    number: '03',
    title: 'DEMANDA',
    description: 'Localização + produto + execução.',
  },
];

export const InvestmentSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'VALORIZACAO' | 'ALUGUEL'>('VALORIZACAO');
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
      id="investimento"
      className="relative w-full bg-[#F5F2EC] text-[#24231F] py-20 lg:py-28 border-t border-[#24231F]/10 select-none overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
        
        {/* ========================================================================= */}
        {/* 01. EDITORIAL HEADER                                                      */}
        {/* ========================================================================= */}
        <div className="mb-12 sm:mb-16 pb-8 border-b border-[#24231F]/10">
          <div>
            <span className="font-body text-[11px] sm:text-[11.5px] font-semibold tracking-[0.28em] uppercase text-[#705B44] mb-3 block">
              INVESTIMENTO
            </span>
            <h2 className="font-display font-normal text-[38px] sm:text-[48px] lg:text-[56px] leading-[1.04] text-[#171815] tracking-tight">
              UM HISTÓRICO<br />
              QUE COMPROVA.
            </h2>
            <p className="font-body text-[#5A544C] text-[14px] sm:text-[15.5px] leading-[1.60] mt-3 font-normal">
              Oxford 212. Mesmo construtor. Mesma região. Um caso real.
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE CONTROLS (TABS FOR MOBILE & DESKTOP SWITCHING)                */}
        {/* ========================================================================= */}
        <div className="flex items-center justify-between mb-8 sm:mb-10">
          <div className="inline-flex p-1 rounded-full bg-[#EAE5DC] border border-[#24231F]/8">
            <button
              type="button"
              onClick={() => setActiveTab('VALORIZACAO')}
              className={`px-5 sm:px-6 py-2 rounded-full font-body text-[11px] sm:text-[12px] font-semibold tracking-[0.20em] uppercase transition-all duration-300 cursor-pointer ${
                activeTab === 'VALORIZACAO'
                  ? 'bg-[#1D3027] text-[#FAF9F6] shadow-sm'
                  : 'text-[#6B6358] hover:text-[#171815]'
              }`}
            >
              VALORIZAÇÃO
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('ALUGUEL')}
              className={`px-5 sm:px-6 py-2 rounded-full font-body text-[11px] sm:text-[12px] font-semibold tracking-[0.20em] uppercase transition-all duration-300 cursor-pointer ${
                activeTab === 'ALUGUEL'
                  ? 'bg-[#1D3027] text-[#FAF9F6] shadow-sm'
                  : 'text-[#6B6358] hover:text-[#171815]'
              }`}
            >
              ALUGUEL
            </button>
          </div>

          <span className="hidden sm:inline-block font-technical text-[11px] tracking-[0.15em] uppercase text-[#806B54]">
            DADOS REAIS · OXFORD 212 · JVC
          </span>
        </div>

        {/* ========================================================================= */}
        {/* 02. MAIN INTERACTIVE VISUALIZATION AREA                                   */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mb-16 sm:mb-20">
          
          {/* LEFT GRAPH / BARS PANEL (8 COLS) */}
          <div className="lg:col-span-8 bg-[#FAF8F5] p-6 sm:p-10 rounded-[20px] sm:rounded-[24px] border border-[#24231F]/8 shadow-[0_10px_30px_rgba(36,35,31,0.03)] flex flex-col justify-between min-h-[380px]">
            
            {activeTab === 'VALORIZACAO' ? (
              /* TAB 1: VALORIZAÇÃO HISTÓRICA GRAPH (CLEAN SINGLE CURVE WITHOUT FAKE MILESTONE DOTS) */
              <div className="w-full flex flex-col h-full justify-between">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="font-body text-[10.5px] sm:text-[11px] font-semibold tracking-[0.22em] uppercase text-[#806B54] block mb-1">
                      VALORIZAÇÃO HISTÓRICA
                    </span>
                    <span className="font-technical text-[11.5px] sm:text-[12.5px] text-[#5A544C]">
                      OXFORD 212 · JVC · DUBAI
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-display text-[26px] sm:text-[32px] font-normal text-[#171815] leading-none block">
                      AED 980K
                    </span>
                    <span className="font-technical text-[10px] sm:text-[11px] text-[#806B54] uppercase tracking-wider">
                      FEV 2025 · REVENDA
                    </span>
                  </div>
                </div>

                {/* SVG GRAPH */}
                <div className="relative w-full h-[220px] sm:h-[280px] my-4">
                  <svg
                    viewBox="0 0 600 280"
                    className="w-full h-full overflow-visible"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Background subtle grid lines */}
                    <line x1="60" y1="60" x2="540" y2="60" stroke="#24231F" strokeOpacity="0.06" strokeDasharray="4 4" />
                    <line x1="60" y1="140" x2="540" y2="140" stroke="#24231F" strokeOpacity="0.06" strokeDasharray="4 4" />
                    <line x1="60" y1="220" x2="540" y2="220" stroke="#24231F" strokeOpacity="0.10" />

                    {/* Vertical guidelines */}
                    <line x1="70" y1="60" x2="70" y2="220" stroke="#24231F" strokeOpacity="0.06" strokeDasharray="4 4" />
                    <line x1="530" y1="60" x2="530" y2="220" stroke="#24231F" strokeOpacity="0.06" strokeDasharray="4 4" />

                    {/* Area under curve gradient */}
                    <defs>
                      <linearGradient id="curveArea" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#1D3027" stopOpacity="0.12" />
                        <stop offset="100%" stopColor="#1D3027" stopOpacity="0.00" />
                      </linearGradient>
                    </defs>

                    {/* Filled Area */}
                    <path
                      d="M 70 220 C 200 218, 360 160, 530 60 L 530 220 L 70 220 Z"
                      fill="url(#curveArea)"
                      className={`transition-opacity duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}
                    />

                    {/* The Clean Organic Single Growth Curve */}
                    <path
                      d="M 70 220 C 200 218, 360 160, 530 60"
                      stroke="#1D3027"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray="600"
                      strokeDashoffset={isInView ? '0' : '600'}
                      className="transition-all duration-1000 ease-out"
                    />

                    {/* START POINT (MAI 2022) */}
                    <g>
                      <circle cx="70" cy="220" r="8" fill="#171815" />
                      <circle cx="70" cy="220" r="3.5" fill="#FAF8F5" />
                    </g>

                    {/* END POINT (FEV 2025) */}
                    <g>
                      <circle cx="530" cy="60" r="10" fill="#1D3027" />
                      <circle cx="530" cy="60" r="4.5" fill="#B7A489" />
                      {/* Pulse animation ring */}
                      <circle
                        cx="530"
                        cy="60"
                        r="16"
                        stroke="#1D3027"
                        strokeWidth="1.5"
                        opacity="0.35"
                        className="animate-ping"
                      />
                    </g>
                  </svg>

                  {/* START POINT TOOLTIP (MAI 2022) */}
                  <div className="absolute left-1 sm:left-4 bottom-14 sm:bottom-16 bg-[#171815] text-[#FAF8F5] px-3.5 py-2.5 rounded-lg shadow-md border border-white/10 pointer-events-none text-left">
                    <span className="font-technical text-[9.5px] sm:text-[10px] font-semibold text-champagne block uppercase tracking-wider">
                      MAI 2022
                    </span>
                    <span className="font-body text-[10.5px] sm:text-[11.5px] font-normal text-white/80 block">
                      Compra
                    </span>
                    <span className="font-display text-[15px] sm:text-[17px] font-medium text-white block leading-tight">
                      AED 420K
                    </span>
                  </div>

                  {/* END POINT TOOLTIP (FEV 2025) */}
                  <div className="absolute right-1 sm:right-4 top-1 sm:top-2 bg-[#1D3027] text-[#FAF8F5] px-4 py-3 rounded-lg shadow-lg border border-white/10 text-right">
                    <span className="font-technical text-[10px] sm:text-[10.5px] font-semibold text-champagne block uppercase tracking-wider">
                      FEV 2025
                    </span>
                    <span className="font-body text-[11px] sm:text-[12px] font-normal text-white/80 block">
                      Revenda
                    </span>
                    <span className="font-display text-[17px] sm:text-[19px] font-semibold text-white block leading-tight">
                      AED 980K
                    </span>
                  </div>
                </div>

                {/* X-AXIS LABELS */}
                <div className="flex items-center justify-between pt-3 border-t border-[#24231F]/8 font-technical text-[11px] sm:text-[12px] text-[#6B6358] tracking-widest uppercase">
                  <span>MAI 2022</span>
                  <span className="hidden sm:inline-block text-[#806B54]/70">COMPRA → REVENDA (33 MESES)</span>
                  <span>FEV 2025</span>
                </div>
              </div>
            ) : (
              /* TAB 2: MERCADO DE ALUGUEL */
              <div className="w-full flex flex-col h-full justify-between">
                <div className="mb-6">
                  <span className="font-body text-[10.5px] sm:text-[11px] font-semibold tracking-[0.22em] uppercase text-[#806B54] block mb-1">
                    MERCADO DE ALUGUEL
                  </span>
                  <span className="font-technical text-[11.5px] sm:text-[12.5px] text-[#5A544C]">
                    DADOS REAIS · OXFORD 212 · JVC
                  </span>
                </div>

                {/* HORIZONTAL RANGE BARS */}
                <div className="space-y-6 sm:space-y-8 my-auto">
                  {RENTAL_DATA.map((item, idx) => (
                    <div key={item.type} className="group">
                      <div className="flex items-baseline justify-between mb-2">
                        <span className="font-body text-[11.5px] sm:text-[13px] font-semibold tracking-[0.18em] uppercase text-[#171815]">
                          {item.type}
                        </span>
                        {item.roi && (
                          <span className="font-technical text-[11.5px] sm:text-[12.5px] font-semibold text-[#1D3027] bg-[#1D3027]/8 px-2.5 py-0.5 rounded-full">
                            {item.roi}
                          </span>
                        )}
                      </div>

                      {/* Custom Range Track */}
                      <div className="relative w-full h-8 sm:h-9 bg-[#EAE5DC] rounded-full overflow-hidden flex items-center px-4 justify-between border border-[#24231F]/8">
                        {/* Progressive Fill */}
                        <div
                          className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#1D3027]/90 to-[#28372D] rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: isInView ? `${(idx + 1) * 30 + 10}%` : '0%',
                          }}
                        />

                        {/* Minimum Value */}
                        <span className="relative z-10 font-display text-[14px] sm:text-[16px] font-semibold text-white drop-shadow-sm">
                          {item.min}
                        </span>

                        {/* Range indicator line */}
                        <div className="relative z-10 hidden sm:flex items-center gap-1.5 opacity-60 text-white">
                          <span className="w-8 h-px bg-white" />
                          <span className="font-technical text-[10px] tracking-widest uppercase">FAIXA ANUAL</span>
                          <span className="w-8 h-px bg-white" />
                        </div>

                        {/* Maximum Value */}
                        <span className="relative z-10 font-display text-[14px] sm:text-[16px] font-semibold text-[#171815] group-hover:text-white transition-colors duration-300">
                          {item.max}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#24231F]/8 font-body text-[11.5px] text-[#6B6358]">
                  * Faixas de locação anual praticadas no empreendimento Oxford 212.
                </div>
              </div>
            )}

          </div>

          {/* RIGHT SIDE STATS PANEL (+133% ROI OU RESUMO DE LOCAÇÃO CONECTADO AO TOGGLE) */}
          <div className="lg:col-span-4 bg-[#1D3027] text-[#FAF9F6] p-6 sm:p-10 rounded-[20px] sm:rounded-[24px] flex flex-col justify-between relative overflow-hidden shadow-xl min-h-[380px]">
            {/* Background luxury subtle texture */}
            <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-[#B7A489]/10 blur-3xl pointer-events-none" />

            {activeTab === 'VALORIZACAO' ? (
              /* ESTADO 1: VALORIZAÇÃO (REDUZIDO, ELEGANTE E LEVE) */
              <div className="flex flex-col justify-between h-full">
                <div>
                  <span className="font-body text-[11px] font-semibold tracking-[0.24em] uppercase text-champagne mb-2 block">
                    HISTÓRICO REAL
                  </span>
                  
                  {/* +133% HERO NUMBER */}
                  <div className="font-display text-[60px] sm:text-[76px] lg:text-[84px] font-light leading-[0.92] text-[#FAF9F6] tracking-tight mb-2">
                    +133%
                  </div>
                  <span className="font-body text-[11.5px] sm:text-[12px] font-semibold tracking-[0.22em] uppercase text-[#D1CCC3] block mb-6">
                    VALORIZAÇÃO HISTÓRICA
                  </span>

                  {/* DIVIDER */}
                  <div className="w-full h-px bg-white/15 mb-6" />

                  {/* APPRECIATION PROGRESSION */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-display text-[20px] sm:text-[24px] font-normal text-white block leading-none">
                          AED 420K
                        </span>
                        <span className="font-body text-[10px] sm:text-[10.5px] text-[#B5AEA4] uppercase tracking-wider">
                          Compra · Mai 2022
                        </span>
                      </div>
                      <span className="text-champagne font-light text-lg">→</span>
                      <div className="text-right">
                        <span className="font-display text-[20px] sm:text-[24px] font-normal text-white block leading-none">
                          AED 980K
                        </span>
                        <span className="font-body text-[10px] sm:text-[10.5px] text-[#B5AEA4] uppercase tracking-wider">
                          Revenda · Fev 2025
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CAPITAL GAIN BOX AT BOTTOM */}
                <div className="pt-6 border-t border-white/15 mt-6">
                  <span className="font-display text-[28px] sm:text-[34px] font-normal text-champagne block leading-none mb-1">
                    AED 560K
                  </span>
                  <span className="font-body text-[11px] sm:text-[11.5px] font-semibold tracking-[0.16em] uppercase text-[#FAF9F6] block">
                    GANHO DE CAPITAL
                  </span>
                  <span className="font-body text-[11px] text-[#B5AEA4] italic mt-0.5 block">
                    Em menos de 3 anos de ciclo.
                  </span>
                </div>
              </div>
            ) : (
              /* ESTADO 2: ALUGUEL */
              <div className="flex flex-col justify-between h-full">
                <div>
                  <span className="font-body text-[11px] font-semibold tracking-[0.24em] uppercase text-champagne mb-2 block">
                    MERCADO DE ALUGUEL
                  </span>
                  
                  {/* ROI STAT FOR STUDIOS */}
                  <div className="font-display text-[54px] sm:text-[68px] lg:text-[76px] font-light leading-[0.92] text-[#FAF9F6] tracking-tight mb-2">
                    18–20%
                  </div>
                  <span className="font-body text-[11.5px] sm:text-[12px] font-semibold tracking-[0.22em] uppercase text-[#D1CCC3] block mb-6">
                    ROI HISTÓRICO · STUDIOS
                  </span>

                  {/* DIVIDER */}
                  <div className="w-full h-px bg-white/15 mb-6" />

                  <div className="space-y-3 font-body text-[13px] text-[#EDE8DF]">
                    <span className="font-semibold text-champagne uppercase tracking-wider block text-[11px]">
                      ESTRUTURA DE LOCAÇÃO
                    </span>
                    <p className="leading-relaxed text-[#D1CCC3]">
                      Alta atratividade para locatários de média e longa permanência em JVC District 11.
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/15 mt-6">
                  <span className="font-technical text-[11.5px] text-champagne block uppercase tracking-wider">
                    STUDIO · 1 BEDROOM · 2 BEDROOM
                  </span>
                  <span className="font-body text-[11px] text-[#B5AEA4] block mt-1">
                    Locação residencial em ritmo contínuo.
                  </span>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* ========================================================================= */}
        {/* 03. O QUE ISSO MOSTRA? (3 PILARES VISUAIS DE LARGURA COMPLETA)            */}
        {/* ========================================================================= */}
        <div className="pt-14 sm:pt-20 border-t border-[#24231F]/10">
          
          {/* HEADER */}
          <div className="mb-10 sm:mb-14">
            <span className="font-body text-[11px] font-semibold tracking-[0.24em] uppercase text-[#806B54] block mb-2">
              TESE DE INVESTIMENTO
            </span>
            <h3 className="font-display font-normal text-[32px] sm:text-[42px] text-[#171815] leading-[1.08] tracking-tight">
              O que isso mostra?
            </h3>
            <p className="font-body text-[#5A544C] text-[14px] sm:text-[15.5px] mt-2 font-normal">
              Mais do que números isolados, um histórico de consistência em JVC.
            </p>
          </div>

          {/* 3 VISUAL PILLARS (DESKTOP: 3 COLS WITH SUTLE VERTICAL DIVIDERS; MOBILE: STACKED) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 border-y border-[#24231F]/10 py-10 sm:py-12 mb-12 sm:mb-16">
            
            {/* PILAR 01 */}
            <div className="md:pr-8 lg:pr-12 md:border-r border-[#24231F]/10 flex flex-col justify-between">
              <div>
                <span className="font-technical text-[11.5px] sm:text-[12px] font-semibold text-[#806B54] tracking-wider block mb-3">
                  01
                </span>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-display text-[46px] sm:text-[54px] font-light leading-none text-[#1D3027] tracking-tight">
                    +133%
                  </span>
                </div>
                <span className="font-body text-[11px] sm:text-[12px] font-bold tracking-[0.22em] uppercase text-[#171815] block mb-2">
                  VALORIZAÇÃO
                </span>
              </div>
              <p className="font-body text-[13.5px] sm:text-[14px] text-[#5A544C] leading-relaxed mt-2">
                Histórico de crescimento em JVC.
              </p>
            </div>

            {/* PILAR 02 */}
            <div className="md:px-8 lg:px-12 md:border-r border-[#24231F]/10 flex flex-col justify-between">
              <div>
                <span className="font-technical text-[11.5px] sm:text-[12px] font-semibold text-[#806B54] tracking-wider block mb-3">
                  02
                </span>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-display text-[30px] sm:text-[36px] font-light leading-none text-[#1D3027] tracking-tight">
                    AED 95K–100K
                  </span>
                </div>
                <span className="font-body text-[11px] sm:text-[12px] font-bold tracking-[0.22em] uppercase text-[#171815] block mb-2">
                  ALUGUEL
                </span>
              </div>
              <p className="font-body text-[13.5px] sm:text-[14px] text-[#5A544C] leading-relaxed mt-2">
                Mercado de locação ativo.
              </p>
            </div>

            {/* PILAR 03 */}
            <div className="md:pl-8 lg:pl-12 flex flex-col justify-between">
              <div>
                <span className="font-technical text-[11.5px] sm:text-[12px] font-semibold text-[#806B54] tracking-wider block mb-3">
                  03
                </span>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-display text-[46px] sm:text-[54px] font-light leading-none text-[#1D3027] tracking-wider">
                    JVC
                  </span>
                </div>
                <span className="font-body text-[11px] sm:text-[12px] font-bold tracking-[0.22em] uppercase text-[#171815] block mb-2">
                  DEMANDA
                </span>
              </div>
              <p className="font-body text-[13.5px] sm:text-[14px] text-[#5A544C] leading-relaxed mt-2">
                Localização + produto + execução.
              </p>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* CONCLUSÃO (FAIXA FULL-WIDTH EM VERDE MUITO ESCURO, SEM CARDS/SOMBRAS)     */}
          {/* ========================================================================= */}
          <div className="w-full bg-[#16251E] text-[#FAF9F6] py-12 sm:py-16 px-6 sm:px-12 rounded-[14px] text-center flex flex-col items-center justify-center mb-8">
            <h4 className="font-display text-[36px] sm:text-[46px] lg:text-[52px] font-normal leading-tight text-[#FAF9F6] mb-4 tracking-tight">
              NÃO É SORTE.
            </h4>
            <div className="font-display text-[20px] sm:text-[24px] italic text-[#B7A489] flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6">
              <span>É produto.</span>
              <span className="hidden sm:inline opacity-40 font-normal">·</span>
              <span>É localização.</span>
              <span className="hidden sm:inline opacity-40 font-normal">·</span>
              <span>É execução.</span>
            </div>
          </div>

          {/* LEGAL DISCLAIMER */}
          <div className="text-center pt-2">
            <p className="font-body text-[11px] sm:text-[11.5px] text-[#5A544C] font-normal max-w-2xl mx-auto leading-normal">
              Resultados históricos do empreendimento Oxford 212 referem-se a transações reais e não garantem performance ou rentabilidade futura para o Oxford Cove.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};