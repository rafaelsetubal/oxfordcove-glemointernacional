'use client';

import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, Layers, Home, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLeadDrawer } from '@/components/form/PersistentLeadDrawer';
import { GalleryViewer, GalleryViewerItem } from '@/components/ui/GalleryViewer';
import { useCurrency } from '@/context/CurrencyContext';

export type FloorplanViewMode = 'UNITS' | 'BUILDING';

export interface UnitFloorPlan {
  id: string;
  unit: string;
  typology: 'STUDIO' | '2 BEDROOM' | '2 BED + STUDY';
  typologyDisplay: string;
  floor: string;
  suiteArea: number; // sq.ft
  terraceArea: number; // sq.ft
  totalArea: number; // sq.ft
  imageSrc: string;
}

export interface BuildingFloorPlan {
  id: string;
  floorName: string;
  levelCode: string;
  description: string;
  imageSrc: string;
}

export interface TypologyCategory {
  key: 'STUDIO' | '2 BEDROOM' | '2 BED + STUDY';
  name: string;
  label: string;
  basePrice: number;
  startingArea: string;
  unitsCount: number;
  description: string;
}

export const TYPOLOGIES: TypologyCategory[] = [
  {
    key: 'STUDIO',
    name: 'Studio',
    label: 'STUDIO',
    basePrice: 679000,
    startingArea: 'A partir de 425 sq.ft',
    unitsCount: 14,
    description: 'Layouts inteligentes com aproveitamento integral dos espaços, terraços privativos e acabamento contemporâneo de alto padrão.',
  },
  {
    key: '2 BEDROOM',
    name: '2 Bedroom',
    label: '2 BEDROOM',
    basePrice: 1450000,
    startingArea: '1,181 sq.ft',
    unitsCount: 1,
    description: 'Espaços de convivência amplos, suíte master com closet, segundo dormitório privativo e amplo terraço contínuo.',
  },
  {
    key: '2 BED + STUDY',
    name: '2 Bed + Study',
    label: '2 BED + STUDY',
    basePrice: 1690000,
    startingArea: '1,503 sq.ft',
    unitsCount: 1,
    description: 'Configuração expandida com home office/estudo dedicado, living integrado e terraço panorâmico de 531 sq.ft.',
  },
];

export const BUILDING_FLOORPLANS: BuildingFloorPlan[] = [
  {
    id: 'floor-gf',
    floorName: 'Ground Floor',
    levelCode: 'GF',
    description: 'Acesso principal, lobby com pé-direito duplo, unidades exclusivas com terraços privativos e circulação integrada.',
    imageSrc: '/images/gf to 5tg floor plans/GF to 5TH Floor Plans-2 1.webp',
  },
  {
    id: 'floor-podium',
    floorName: 'P - Floor',
    levelCode: 'PODIUM',
    description: 'Pavimento de lazer e garagens com circulação reservada e acesso direto aos elevadores residenciais.',
    imageSrc: '/images/gf to 5tg floor plans/GF to 5TH Floor Plans-3 1.webp',
  },
  {
    id: 'floor-1st',
    floorName: 'First Floor',
    levelCode: '1ST FLOOR',
    description: 'Pavimento residencial tipo com distribuição equilibrada de studios e apartamentos de 2 dormitórios.',
    imageSrc: '/images/gf to 5tg floor plans/GF to 5TH Floor Plans-4 1.webp',
  },
  {
    id: 'floor-2nd',
    floorName: 'Second Floor',
    levelCode: '2ND FLOOR',
    description: 'Plantas residenciais otimizadas com vista desimpedida para os eixos arborizados de Jumeirah Village Circle.',
    imageSrc: '/images/gf to 5tg floor plans/GF to 5TH Floor Plans-5 1.webp',
  },
  {
    id: 'floor-3rd',
    floorName: 'Third Floor',
    levelCode: '3RD FLOOR',
    description: 'Pavimento intermediário de baixa densidade, proporcionando privacidade acústica e insolação favorável.',
    imageSrc: '/images/gf to 5tg floor plans/GF to 5TH Floor Plans-6 1.webp',
  },
  {
    id: 'floor-4th',
    floorName: 'Fourth Floor',
    levelCode: '4TH FLOOR',
    description: 'Nível elevado com amplas varandas e perspectiva privilegiada do skyline residencial circundante.',
    imageSrc: '/images/gf to 5tg floor plans/GF to 5TH Floor Plans-7 1.webp',
  },
  {
    id: 'floor-5th',
    floorName: 'Fifth Floor',
    levelCode: '5TH FLOOR',
    description: 'Último pavimento residencial, diretamente conectado ao rooftop com piscina de borda infinita e lounge.',
    imageSrc: '/images/gf to 5tg floor plans/GF to 5TH Floor Plans-8 1.webp',
  },
];

export const REAL_UNIT_FLOORPLANS: UnitFloorPlan[] = [
  {
    id: 'studio-g01',
    unit: 'G01',
    typology: 'STUDIO',
    typologyDisplay: 'STUDIO',
    floor: 'GROUND FLOOR',
    suiteArea: 330,
    terraceArea: 96,
    totalArea: 426,
    imageSrc: '/images/plantas/61d695b6e4bf8e20be6218530e9e5eb2.webp',
  },
  {
    id: 'studio-g02',
    unit: 'G02',
    typology: 'STUDIO',
    typologyDisplay: 'STUDIO',
    floor: 'GROUND FLOOR',
    suiteArea: 330,
    terraceArea: 95,
    totalArea: 425,
    imageSrc: '/images/plantas/f70123997c1c7bba616a6e24e3b41208.webp',
  },
  {
    id: 'studio-g03',
    unit: 'G03',
    typology: 'STUDIO',
    typologyDisplay: 'STUDIO',
    floor: 'GROUND FLOOR',
    suiteArea: 330,
    terraceArea: 95,
    totalArea: 425,
    imageSrc: '/images/plantas/6d49d563a5049e727f23460e9066ea4f.webp',
  },
  {
    id: 'studio-g04',
    unit: 'G04',
    typology: 'STUDIO',
    typologyDisplay: 'STUDIO',
    floor: 'GROUND FLOOR',
    suiteArea: 330,
    terraceArea: 95,
    totalArea: 425,
    imageSrc: '/images/plantas/ebb9f3ef1debd4deccda868adc20715c.webp',
  },
  {
    id: 'studio-g05',
    unit: 'G05',
    typology: 'STUDIO',
    typologyDisplay: 'STUDIO',
    floor: 'GROUND FLOOR',
    suiteArea: 330,
    terraceArea: 95,
    totalArea: 425,
    imageSrc: '/images/plantas/578f15643af0259b9a7473545c990518.webp',
  },
  {
    id: 'studio-g06',
    unit: 'G06',
    typology: 'STUDIO',
    typologyDisplay: 'STUDIO',
    floor: 'GROUND FLOOR',
    suiteArea: 330,
    terraceArea: 95,
    totalArea: 425,
    imageSrc: '/images/plantas/42ebfd57384c2ca6d7c4e93bbd231ade.webp',
  },
  {
    id: 'studio-g07',
    unit: 'G07',
    typology: 'STUDIO',
    typologyDisplay: 'STUDIO',
    floor: 'GROUND FLOOR',
    suiteArea: 330,
    terraceArea: 95,
    totalArea: 425,
    imageSrc: '/images/plantas/17c466001842b0e4b4c63c0bbfb6cfe3.webp',
  },
  {
    id: 'studio-g08',
    unit: 'G08',
    typology: 'STUDIO',
    typologyDisplay: 'STUDIO',
    floor: 'GROUND FLOOR',
    suiteArea: 330,
    terraceArea: 95,
    totalArea: 425,
    imageSrc: '/images/plantas/3c4407fd813318fd4cc11d0b86c8d2f7.webp',
  },
  {
    id: 'studio-g09',
    unit: 'G09',
    typology: 'STUDIO',
    typologyDisplay: 'STUDIO',
    floor: 'GROUND FLOOR',
    suiteArea: 330,
    terraceArea: 95,
    totalArea: 425,
    imageSrc: '/images/plantas/fdaf5135e1109ab41440d031b82c01e4.webp',
  },
  {
    id: 'studio-g10',
    unit: 'G10',
    typology: 'STUDIO',
    typologyDisplay: 'STUDIO',
    floor: 'GROUND FLOOR',
    suiteArea: 330,
    terraceArea: 95,
    totalArea: 425,
    imageSrc: '/images/plantas/7a0a72269b3bddac25b992f4f109703b.webp',
  },
  {
    id: 'studio-g13',
    unit: 'G13',
    typology: 'STUDIO',
    typologyDisplay: 'STUDIO',
    floor: 'GROUND FLOOR',
    suiteArea: 330,
    terraceArea: 95,
    totalArea: 425,
    imageSrc: '/images/plantas/3b881fc0c3bbc84f78014bb21beef7dd.webp',
  },
  {
    id: 'studio-g14',
    unit: 'G14',
    typology: 'STUDIO',
    typologyDisplay: 'STUDIO',
    floor: 'GROUND FLOOR',
    suiteArea: 330,
    terraceArea: 95,
    totalArea: 425,
    imageSrc: '/images/plantas/a0240e51947ffb8132ee6ec09ea43294.webp',
  },
  {
    id: 'studio-g15',
    unit: 'G15',
    typology: 'STUDIO',
    typologyDisplay: 'STUDIO',
    floor: 'GROUND FLOOR',
    suiteArea: 330,
    terraceArea: 95,
    totalArea: 425,
    imageSrc: '/images/plantas/12625e2afdc056290a2152d7f2697857.webp',
  },
  {
    id: 'studio-g16',
    unit: 'G16',
    typology: 'STUDIO',
    typologyDisplay: 'STUDIO',
    floor: 'GROUND FLOOR',
    suiteArea: 330,
    terraceArea: 95,
    totalArea: 425,
    imageSrc: '/images/plantas/b5d329b6caeab9e606bdd8ed122dea7d.webp',
  },
  {
    id: '2br-g12',
    unit: 'G12',
    typology: '2 BEDROOM',
    typologyDisplay: '2 BEDROOM',
    floor: 'GROUND FLOOR',
    suiteArea: 895,
    terraceArea: 286,
    totalArea: 1181,
    imageSrc: '/images/plantas/2 b-r/29b9ea200cf2d969c1129e094e2d7c6f.webp',
  },
  {
    id: '2br-study-g11',
    unit: 'G11',
    typology: '2 BED + STUDY',
    typologyDisplay: '2 BEDROOM + STUDY',
    floor: 'GROUND FLOOR',
    suiteArea: 972,
    terraceArea: 531,
    totalArea: 1503,
    imageSrc: '/images/plantas/2 b-r/5dd99a4eb4ac3bc5c147d4827a64bd28.webp',
  },
];

const ITEMS_PER_PAGE = 3;

export const FloorplansSection: React.FC = () => {
  const [viewMode, setViewMode] = useState<FloorplanViewMode>('UNITS');
  const [activeTypologyKey, setActiveTypologyKey] = useState<'STUDIO' | '2 BEDROOM' | '2 BED + STUDY'>('STUDIO');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [showAll, setShowAll] = useState<boolean>(false);
  
  const [currentBuildingPage, setCurrentBuildingPage] = useState<number>(0);
  const [showAllBuilding, setShowAllBuilding] = useState<boolean>(false);

  // GalleryViewer state
  const [viewerItems, setViewerItems] = useState<GalleryViewerItem[]>([]);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  const { openLeadDrawer } = useLeadDrawer();
  const { formatPrice, currency, disclaimer } = useCurrency();

  // Active Typology Data
  const activeTypology = useMemo(() => {
    return TYPOLOGIES.find((t) => t.key === activeTypologyKey) || TYPOLOGIES[0];
  }, [activeTypologyKey]);

  // Filtered Unit Plans for active typology
  const filteredUnitPlans = useMemo(() => {
    return REAL_UNIT_FLOORPLANS.filter((plan) => plan.typology === activeTypologyKey);
  }, [activeTypologyKey]);

  // Total pages for active typology
  const totalPages = Math.ceil(filteredUnitPlans.length / ITEMS_PER_PAGE);

  // Visible plans in grid (3 items per page initially)
  const visibleUnitPlans = useMemo(() => {
    if (showAll || filteredUnitPlans.length <= ITEMS_PER_PAGE) {
      return filteredUnitPlans;
    }
    const start = currentPage * ITEMS_PER_PAGE;
    return filteredUnitPlans.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredUnitPlans, showAll, currentPage]);

  // Building Floor Plans Pagination (3 items per page initially)
  const totalBuildingPages = Math.ceil(BUILDING_FLOORPLANS.length / ITEMS_PER_PAGE);

  const visibleBuildingPlans = useMemo(() => {
    if (showAllBuilding || BUILDING_FLOORPLANS.length <= ITEMS_PER_PAGE) {
      return BUILDING_FLOORPLANS;
    }
    const start = currentBuildingPage * ITEMS_PER_PAGE;
    return BUILDING_FLOORPLANS.slice(start, start + ITEMS_PER_PAGE);
  }, [showAllBuilding, currentBuildingPage]);

  // Handle opening unit plan in GalleryViewer
  const handleOpenUnitPlan = useCallback((planIndex: number) => {
    const items: GalleryViewerItem[] = filteredUnitPlans.map((plan) => ({
      id: plan.id,
      image: plan.imageSrc,
      title: `Unidade ${plan.unit}`,
      subtitle: `${plan.typologyDisplay} · ${plan.floor}`,
      tag: 'UNIT PLAN',
      description: `Área Total: ${plan.totalArea} sq.ft | Suíte: ${plan.suiteArea} sq.ft | Terraço: ${plan.terraceArea} sq.ft`,
      specs: [
        { label: 'TOTAL', value: `${plan.totalArea} SQ.FT` },
        { label: 'SUÍTE', value: `${plan.suiteArea} SQ.FT` },
        { label: 'TERRAÇO', value: `${plan.terraceArea} SQ.FT` },
      ],
      ctaText: 'RESERVAR MINHA ESCOLHA DE UNIDADE',
      onCtaClick: () => {
        setViewerIndex(null);
        openLeadDrawer();
      },
    }));

    setViewerItems(items);
    setViewerIndex(planIndex);
  }, [filteredUnitPlans, openLeadDrawer]);

  // Handle opening building floor plan in GalleryViewer
  const handleOpenBuildingPlan = useCallback((floorIndex: number) => {
    const items: GalleryViewerItem[] = BUILDING_FLOORPLANS.map((floor) => ({
      id: floor.id,
      image: floor.imageSrc,
      title: floor.floorName,
      subtitle: `Implantação · ${floor.levelCode}`,
      tag: 'BUILDING FLOOR PLAN',
      description: floor.description,
      ctaText: 'RESERVAR MINHA ESCOLHA DE UNIDADE',
      onCtaClick: () => {
        setViewerIndex(null);
        openLeadDrawer();
      },
    }));

    setViewerItems(items);
    setViewerIndex(floorIndex);
  }, [openLeadDrawer]);

  return (
    <section
      id="plantas"
      className="relative w-full bg-[#FAF9F6] text-[#24231F] py-20 lg:py-28 border-t border-[#24231F]/10 select-none overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
        
        {/* ========================================================================= */}
        {/* 01. SECTION HEADER                                                        */}
        {/* ========================================================================= */}
        <div className="mb-10 sm:mb-12">
          <span className="font-body text-[11px] sm:text-[11.5px] font-semibold tracking-[0.28em] uppercase text-[#705B44] mb-3 block">
            PLANTAS
          </span>
          <h2 className="font-display font-normal text-[36px] sm:text-[46px] lg:text-[54px] leading-[1.04] text-[#171815] tracking-tight max-w-3xl">
            Encontre o espaço certo para você.
          </h2>
          <p className="font-body text-[#5A544C] text-[14.5px] sm:text-[16px] leading-[1.60] mt-3 font-normal max-w-2xl">
            Do studio ao duplex, conheça as configurações disponíveis no Oxford Cove.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 02. TOP MODE TOGGLE (PLANTAS POR UNIDADE / PLANTAS POR PAVIMENTO)          */}
        {/* ========================================================================= */}
        <div className="flex flex-wrap items-center gap-3 mb-10 pb-6 border-b border-[#24231F]/10">
          <button
            type="button"
            onClick={() => setViewMode('UNITS')}
            className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-body text-[11.5px] sm:text-[12px] font-semibold tracking-[0.18em] uppercase transition-all duration-300 cursor-pointer ${
              viewMode === 'UNITS'
                ? 'bg-[#171815] text-[#FAF9F6] shadow-md'
                : 'bg-white/80 text-[#5A544C] hover:text-[#171815] border border-[#24231F]/10 hover:border-[#24231F]/30'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>PLANTAS POR UNIDADE ({REAL_UNIT_FLOORPLANS.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('BUILDING')}
            className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-body text-[11.5px] sm:text-[12px] font-semibold tracking-[0.18em] uppercase transition-all duration-300 cursor-pointer ${
              viewMode === 'BUILDING'
                ? 'bg-[#171815] text-[#FAF9F6] shadow-md'
                : 'bg-white/80 text-[#5A544C] hover:text-[#171815] border border-[#24231F]/10 hover:border-[#24231F]/30'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>PAVIMENTOS DO EDIFÍCIO (GF - 5TH)</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* MODE A: UNIT PLANS (STUDIO · 2 BEDROOM · 2 BED + STUDY)                   */}
        {/* ========================================================================= */}
        {viewMode === 'UNITS' && (
          <div>
            {/* TYPOLOGY SUB-TABS */}
            <div className="border-b border-[#24231F]/10 mb-10 sm:mb-12 overflow-x-auto scrollbar-none">
              <div className="flex items-center gap-6 sm:gap-10 min-w-max">
                {TYPOLOGIES.map((t) => {
                  const isActive = activeTypologyKey === t.key;
                  return (
                    <button
                      key={t.key}
                      type="button"
                      onClick={() => {
                        setActiveTypologyKey(t.key);
                        setCurrentPage(0);
                        setShowAll(false);
                      }}
                      className={`relative py-3.5 font-body text-[12px] sm:text-[13px] font-semibold tracking-[0.20em] uppercase transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                        isActive
                          ? 'text-[#171815]'
                          : 'text-[#6B5742] hover:text-[#171815]'
                      }`}
                    >
                      <span>{t.label}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-technical ${
                        isActive ? 'bg-[#171815] text-white' : 'bg-black/5 text-[#5A544C]'
                      }`}>
                        {t.unitsCount}
                      </span>
                      {isActive && (
                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#171815]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* MAIN CONTENT: SIDEBAR + UNIT PLANS GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16 sm:mb-20">
              
              {/* LEFT SIDEBAR: COMMERCIAL SPECS FOR TYPOLOGY */}
              <div className="lg:col-span-3 flex flex-col justify-between space-y-8 lg:sticky lg:top-28">
                <div>
                  <h3 className="font-display font-normal text-[34px] sm:text-[40px] text-[#171815] leading-none mb-5">
                    {activeTypology.name}
                  </h3>

                  <div className="space-y-4 border-t border-b border-[#24231F]/10 py-5">
                    <div>
                      <span className="font-technical text-[10.5px] uppercase tracking-wider text-[#806B54] block">
                        VALOR ESTIMADO
                      </span>
                      <span className="font-display text-[20px] font-medium text-[#171815]">
                        A partir de {formatPrice(activeTypology.basePrice)}
                      </span>
                      {currency !== 'AED' && (
                        <span className="block text-[10.5px] font-technical text-[#8C8477] mt-0.5">
                          {disclaimer}
                        </span>
                      )}
                    </div>

                    <div>
                      <span className="font-technical text-[10.5px] uppercase tracking-wider text-[#806B54] block">
                        METRAGEM
                      </span>
                      <span className="font-technical text-[15px] font-semibold text-[#171815]">
                        {activeTypology.startingArea}
                      </span>
                    </div>

                    <div>
                      <span className="font-technical text-[10.5px] uppercase tracking-wider text-[#806B54] block">
                        CONFIGURAÇÕES
                      </span>
                      <span className="font-body text-[13.5px] text-[#5A544C]">
                        {activeTypology.unitsCount} {activeTypology.unitsCount === 1 ? 'layout disponível' : 'layouts disponíveis'}
                      </span>
                    </div>
                  </div>

                  <p className="font-body text-[13.5px] text-[#5A544C] leading-relaxed mt-5">
                    {activeTypology.description}
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={openLeadDrawer}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#1D3027] hover:bg-[#28372D] text-[#FAF9F6] font-body text-[11px] font-semibold tracking-[0.18em] uppercase transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    <span>VER UNIDADES DISPONÍVEIS AGORA</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* RIGHT: UNIT FLOORPLANS GRID */}
              <div className="lg:col-span-9" id="unit-plans-grid">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                  {visibleUnitPlans.map((plan, idx) => {
                    const fullIndex = filteredUnitPlans.findIndex((p) => p.id === plan.id);
                    return (
                      <div
                        key={plan.id}
                        onClick={() => handleOpenUnitPlan(fullIndex >= 0 ? fullIndex : idx)}
                        className="group relative bg-white rounded-[20px] p-6 border border-[#24231F]/10 hover:border-[#806B54]/40 transition-all duration-400 ease-luxury shadow-sm hover:shadow-[0_16px_36px_rgba(20,18,16,0.08)] cursor-pointer flex flex-col justify-between"
                      >
                        {/* CARD HEADER */}
                        <div className="flex items-center justify-between pb-4 border-b border-[#24231F]/8">
                          <div>
                            <span className="font-technical text-[10px] uppercase tracking-wider text-[#806B54] block">
                              UNIDADE
                            </span>
                            <h4 className="font-display font-medium text-[24px] text-[#171815] leading-none">
                              {plan.unit}
                            </h4>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="font-technical text-[11px] font-semibold text-[#171815] bg-[#FAF9F6] border border-[#24231F]/10 px-2.5 py-1 rounded-full">
                              {plan.totalArea} SQ.FT
                            </span>
                          </div>
                        </div>

                        {/* PLAN PREVIEW (CLEAN & CENTERED) */}
                        <div className="relative w-full h-[230px] my-5 flex items-center justify-center bg-[#FAF9F6] rounded-[14px] p-4 group-hover:bg-[#F3EFE8] transition-colors duration-300">
                          <Image
                            src={plan.imageSrc}
                            alt={`Planta da unidade ${plan.unit} — Oxford Cove`}
                            fill
                            quality={85}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                          />
                          
                          {/* QUICK EXPAND HOVER ICON */}
                          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 shadow-sm border border-black/5 flex items-center justify-center text-[#171815] opacity-0 group-hover:opacity-100 transition-opacity">
                            <Maximize2 className="w-4 h-4" />
                          </div>
                        </div>

                        {/* CARD FOOTER SPECS */}
                        <div>
                          <div className="grid grid-cols-2 gap-2 text-[11.5px] font-body text-[#5A544C] pt-2 border-t border-[#24231F]/8 mb-4">
                            <div>
                              <span className="text-[#806B54] block text-[9.5px] uppercase font-technical">SUÍTE</span>
                              <span className="font-semibold text-[#171815]">{plan.suiteArea} sq.ft</span>
                            </div>
                            <div>
                              <span className="text-[#806B54] block text-[9.5px] uppercase font-technical">TERRAÇO</span>
                              <span className="font-semibold text-[#171815]">{plan.terraceArea} sq.ft</span>
                            </div>
                          </div>

                          <div className="w-full inline-flex items-center justify-between text-[#806B54] group-hover:text-[#171815] font-body text-[11px] font-semibold tracking-[0.16em] uppercase transition-colors">
                            <span>VER PLANTA COMPLETA</span>
                            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* PAGINATION / EXPAND CONTROLS (3 ITEMS PER PAGE) */}
                {filteredUnitPlans.length > ITEMS_PER_PAGE && (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 pt-6 border-t border-[#24231F]/10">
                    <div className="font-technical text-[12px] text-[#806B54]">
                      Exibindo {visibleUnitPlans.length} de {filteredUnitPlans.length} unidades
                    </div>

                    <div className="flex items-center gap-3">
                      {!showAll && (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                            disabled={currentPage === 0}
                            className={`px-4 py-2 rounded-full font-body text-[11px] font-semibold tracking-wider uppercase border border-[#24231F]/15 transition-all ${
                              currentPage === 0
                                ? 'opacity-30 cursor-not-allowed'
                                : 'hover:bg-[#171815] hover:text-white cursor-pointer shadow-sm'
                            }`}
                          >
                            ANTERIOR
                          </button>
                          <span className="font-technical text-[12px] text-[#171815] px-2">
                            {currentPage + 1} / {totalPages}
                          </span>
                          <button
                            type="button"
                            onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
                            disabled={currentPage >= totalPages - 1}
                            className={`px-4 py-2 rounded-full font-body text-[11px] font-semibold tracking-wider uppercase border border-[#24231F]/15 transition-all ${
                              currentPage >= totalPages - 1
                                ? 'opacity-30 cursor-not-allowed'
                                : 'hover:bg-[#171815] hover:text-white cursor-pointer shadow-sm'
                            }`}
                          >
                            PRÓXIMO
                          </button>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => setShowAll(!showAll)}
                        className="px-5 py-2 rounded-full font-body text-[11px] font-semibold tracking-wider uppercase bg-[#171815] text-[#FAF9F6] hover:bg-[#28372D] transition-all cursor-pointer shadow-sm"
                      >
                        {showAll ? 'VER PAGINADO' : `VER TODAS (${filteredUnitPlans.length})`}
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODE B: BUILDING FLOOR PLANS (GF, PODIUM, 1ST - 5TH FLOOR)                */}
        {/* ========================================================================= */}
        {viewMode === 'BUILDING' && (
          <div className="mb-16 sm:mb-20" id="building-plans-grid">
            {/* GRID OF BUILDING PLANS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-1">
              {visibleBuildingPlans.map((floor, fIdx) => (
                <div
                  key={floor.id}
                  onClick={() => handleOpenBuildingPlan(showAllBuilding ? fIdx : currentBuildingPage * ITEMS_PER_PAGE + fIdx)}
                  className="group bg-white rounded-[20px] p-6 border border-[#24231F]/10 hover:border-[#806B54]/40 transition-all duration-400 ease-luxury shadow-sm hover:shadow-[0_16px_36px_rgba(20,18,16,0.08)] cursor-pointer flex flex-col justify-between"
                >
                  {/* HEADER */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#24231F]/8">
                    <div>
                      <span className="font-technical text-[10px] uppercase tracking-wider text-[#806B54] block">
                        PAVIMENTO
                      </span>
                      <h4 className="font-display font-medium text-[22px] sm:text-[24px] text-[#171815] leading-none">
                        {floor.floorName}
                      </h4>
                    </div>
                    <span className="font-technical text-[10.5px] font-semibold text-[#806B54] bg-[#806B54]/10 px-2.5 py-1 rounded-full uppercase">
                      {floor.levelCode}
                    </span>
                  </div>

                  {/* PREVIEW */}
                  <div className="relative w-full h-[220px] sm:h-[240px] my-5 flex items-center justify-center bg-[#FAF9F6] rounded-[14px] p-4 group-hover:bg-[#F3EFE8] transition-colors duration-300">
                    <Image
                      src={floor.imageSrc}
                      alt={`Implantação ${floor.floorName} — Oxford Cove`}
                      fill
                      quality={85}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 shadow-sm border border-black/5 flex items-center justify-center text-[#171815] opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>

                  {/* DESCRIPTION & CTA */}
                  <div>
                    <p className="font-body text-[12.5px] text-[#5A544C] leading-relaxed mb-4 line-clamp-2">
                      {floor.description}
                    </p>
                    <div className="w-full inline-flex items-center justify-between text-[#806B54] group-hover:text-[#171815] font-body text-[11px] font-semibold tracking-[0.16em] uppercase transition-colors pt-3 border-t border-[#24231F]/8">
                      <span>VER PLANTA DO PAVIMENTO</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CONTROLS BAR: PREV/NEXT ARROWS + VER MAIS BUTTON FOR BUILDING */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-[#24231F]/10">
              <div className="font-technical text-[12px] text-[#806B54]">
                {BUILDING_FLOORPLANS.length} pavimentos disponíveis {!showAllBuilding && totalBuildingPages > 1 && `· Página ${currentBuildingPage + 1} de ${totalBuildingPages}`}
              </div>

              <div className="flex items-center gap-3">
                {!showAllBuilding && totalBuildingPages > 1 && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setCurrentBuildingPage((p) => Math.max(0, p - 1))}
                      disabled={currentBuildingPage === 0}
                      aria-label="Pavimento anterior"
                      className={`px-4 py-2 rounded-full font-body text-[11px] font-semibold tracking-wider uppercase border border-[#24231F]/15 transition-all flex items-center gap-1.5 ${
                        currentBuildingPage > 0
                          ? 'bg-white hover:bg-[#171815] hover:text-white text-[#171815] cursor-pointer shadow-sm'
                          : 'opacity-30 cursor-not-allowed text-[#24231F]/40'
                      }`}
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>ANTERIOR</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCurrentBuildingPage((p) => Math.min(totalBuildingPages - 1, p + 1))}
                      disabled={currentBuildingPage >= totalBuildingPages - 1}
                      aria-label="Próximo pavimento"
                      className={`px-4 py-2 rounded-full font-body text-[11px] font-semibold tracking-wider uppercase border border-[#24231F]/15 transition-all flex items-center gap-1.5 ${
                        currentBuildingPage < totalBuildingPages - 1
                          ? 'bg-white hover:bg-[#171815] hover:text-white text-[#171815] cursor-pointer shadow-sm'
                          : 'opacity-30 cursor-not-allowed text-[#24231F]/40'
                      }`}
                    >
                      <span>PRÓXIMO</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setShowAllBuilding(!showAllBuilding);
                    if (showAllBuilding) {
                      const el = document.getElementById('building-plans-grid');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                  }}
                  className="px-5 py-2 rounded-full font-body text-[11px] font-semibold tracking-wider uppercase bg-[#171815] text-[#FAF9F6] hover:bg-[#28372D] transition-all cursor-pointer shadow-sm flex items-center gap-1.5"
                >
                  {showAllBuilding ? (
                    <>
                      <span>VER PAGINADO (3)</span>
                      <ChevronLeft className="w-3.5 h-3.5 rotate-90" />
                    </>
                  ) : (
                    <>
                      <span>VER TODOS ({BUILDING_FLOORPLANS.length})</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 04. EOI PRIORITY BANNER / DIRECT RESERVATION CALL                         */}
        {/* ========================================================================= */}
        <div className="w-full bg-[#1D3027] text-white rounded-[24px] sm:rounded-[32px] p-8 sm:p-12 lg:p-14 shadow-[0_20px_50px_rgba(29,48,39,0.25)] relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-champagne/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* LEFT: EDITORIAL COPY */}
            <div className="lg:col-span-7">
              <span className="font-technical text-[10.5px] sm:text-[11px] uppercase tracking-[0.26em] text-champagne block mb-3 font-semibold">
                PRIORIDADE DE ESCOLHA · PRÉ-LANÇAMENTO
              </span>
              <h3 className="font-display font-normal text-[30px] sm:text-[40px] leading-[1.08] text-[#FAF9F6] tracking-tight mb-3">
                Primeiro acesso às melhores unidades.
              </h3>
              <p className="font-body text-[#D1CCC3] text-[14px] sm:text-[15.5px] leading-relaxed max-w-xl font-normal">
                No lançamento, a escolha das melhores plantas acompanha rigorosamente a ordem cronológica de depósito da EOI (Expression of Interest).
              </p>
            </div>

            {/* RIGHT: EOI VALUES & ACTION CTA */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4 lg:pl-8 lg:border-l border-white/15">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-technical text-[16px] sm:text-[18px] font-semibold text-white tracking-wider">
                    EOI — {formatPrice(50000)}
                  </span>
                  <span className="font-technical text-[10px] text-white bg-white/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-semibold border border-white/20">
                    100% REEMBOLSÁVEL
                  </span>
                </div>
                <p className="font-body text-[12px] sm:text-[12.5px] text-[#B5AEA4] leading-relaxed">
                  Garante prioridade na alocação da unidade desejada antes da abertura pública de vendas.
                </p>
                {currency !== 'AED' && (
                  <p className="font-technical text-[11px] text-[#D1CCC3]/70 mt-1">
                    {disclaimer}
                  </p>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={openLeadDrawer}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#FAF9F6] hover:bg-white text-[#171815] font-body text-[11px] font-semibold tracking-[0.20em] uppercase transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer group"
                >
                  <span>RESERVAR MINHA ESCOLHA DE UNIDADE</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 05. SHARED FULLSCREEN GALLERY VIEWER (FOR FLOORPLANS & UNITS)             */}
      {/* ========================================================================= */}
      <GalleryViewer
        items={viewerItems}
        currentIndex={viewerIndex}
        onClose={() => setViewerIndex(null)}
        onIndexChange={(idx) => setViewerIndex(idx)}
        showThumbnails={viewerItems.length > 1}
      />
    </section>
  );
};
