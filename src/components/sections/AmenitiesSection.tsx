'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import type { GalleryViewerItem } from '@/components/ui/GalleryViewer';

const GalleryViewer = dynamic(
  () => import('@/components/ui/GalleryViewer').then((mod) => mod.GalleryViewer),
  { ssr: false }
);

export type CategoryFilter = 'TODOS' | 'EXTERIOR' | 'AMENITIES' | 'INTERIOR';

export interface GalleryItem {
  id: string;
  category: 'EXTERIOR' | 'AMENITIES' | 'INTERIOR';
  tag: string;
  title: string;
  description: string;
  image: string;
  spanDesktop: string;
  spanMobile: string;
  aspectRatio: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  // --- EXTERIOR ---
  {
    id: 'exterior-main',
    category: 'EXTERIOR',
    tag: 'THE ARCHITECTURE',
    title: 'Uma arquitetura para se reconhecer.',
    description: 'Linhas curvas, terraços generosos e uma proposta low-rise boutique definem a identidade do Oxford Cove.',
    image: '/images/amenities/12-exterior-main.jpg',
    spanDesktop: 'col-span-12 lg:col-span-8',
    spanMobile: 'col-span-12',
    aspectRatio: 'aspect-[16/10]',
  },
  {
    id: 'exterior-side',
    category: 'EXTERIOR',
    tag: 'FACHADA & TERRAÇOS',
    title: 'Integração com a paisagem.',
    description: 'Varandas amplas e jardineiras que conectam os ambientes internos à luz natural de Dubai.',
    image: '/images/amenities/13-exterior-side.jpg',
    spanDesktop: 'col-span-6 lg:col-span-4',
    spanMobile: 'col-span-6',
    aspectRatio: 'aspect-[4/3] lg:aspect-auto',
  },
  {
    id: 'exterior-aerial-01',
    category: 'EXTERIOR',
    tag: 'VISTA AÉREA & ROOFTOP',
    title: 'Escala humana em JVC District 11.',
    description: 'Posicionamento privilegiado em esquina com vista aberta e total privacidade.',
    image: '/images/amenities/14-exterior-aerial-01.jpg',
    spanDesktop: 'col-span-6 lg:col-span-4',
    spanMobile: 'col-span-6',
    aspectRatio: 'aspect-[4/3]',
  },
  {
    id: 'exterior-aerial-02',
    category: 'EXTERIOR',
    tag: 'LOCALIZAÇÃO & ENTORNO',
    title: 'Harmonia urbana e natureza.',
    description: 'Um refúgio residencial de baixa densidade no coração do crescimento planejado de Dubai.',
    image: '/images/amenities/15-exterior-aerial-02.jpg',
    spanDesktop: 'col-span-6 lg:col-span-4',
    spanMobile: 'col-span-6',
    aspectRatio: 'aspect-[4/3]',
  },

  // --- AMENITIES ---
  {
    id: 'rooftop-infinity-pool',
    category: 'AMENITIES',
    tag: 'ROOFTOP & LEISURE',
    title: 'Um novo ritmo para o seu tempo.',
    description: 'Piscina de borda infinita na cobertura com horizonte aberto para contemplar Dubai.',
    image: '/images/amenities/11-rooftop-infinity-pool.jpg',
    spanDesktop: 'col-span-12 lg:col-span-8',
    spanMobile: 'col-span-12',
    aspectRatio: 'aspect-[16/10]',
  },
  {
    id: 'leisure-pool',
    category: 'AMENITIES',
    tag: '38M LEISURE POOL',
    title: 'Águas e sol em escala generosa.',
    description: 'Piscina de lazer de 38 metros envolta em paisagismo tropical e privacidade.',
    image: '/images/amenities/03-leisure-pool.jpg',
    spanDesktop: 'col-span-6 lg:col-span-4',
    spanMobile: 'col-span-6',
    aspectRatio: 'aspect-[4/3]',
  },
  {
    id: 'sun-loungers',
    category: 'AMENITIES',
    tag: 'SUN LOUNGERS',
    title: 'Espaço de sol e descanso.',
    description: 'Deck com espreguiçadeiras e cabanas com acabamentos nobres e ambientação serena.',
    image: '/images/amenities/06-sun-loungers.jpg',
    spanDesktop: 'col-span-6 lg:col-span-4',
    spanMobile: 'col-span-6',
    aspectRatio: 'aspect-[4/3]',
  },
  {
    id: 'fitness-center',
    category: 'AMENITIES',
    tag: 'WELLNESS & FITNESS',
    title: 'Bem-estar que faz parte da rotina.',
    description: 'Academia completa com equipamentos de última geração e iluminação natural.',
    image: '/images/amenities/08-fitness-center.jpg',
    spanDesktop: 'col-span-6 lg:col-span-4',
    spanMobile: 'col-span-6',
    aspectRatio: 'aspect-[4/3]',
  },
  {
    id: 'clubhouse',
    category: 'AMENITIES',
    tag: 'CLUBHOUSE',
    title: 'Momentos que ganham outro significado.',
    description: 'Espaço reservado para encontros, trabalho remoto e celebrações entre moradores.',
    image: '/images/amenities/07-clubhouse.jpg',
    spanDesktop: 'col-span-6 lg:col-span-4',
    spanMobile: 'col-span-6',
    aspectRatio: 'aspect-[4/3]',
  },
  {
    id: 'outdoor-kids-area',
    category: 'AMENITIES',
    tag: 'OUTDOOR KIDS PLAY',
    title: 'Espaço ao ar livre para brincar.',
    description: 'Área infantil externa segura e lúdica cercada por verde.',
    image: '/images/amenities/05-outdoor-kids-area.jpg',
    spanDesktop: 'col-span-6 lg:col-span-4',
    spanMobile: 'col-span-6',
    aspectRatio: 'aspect-[4/3]',
  },
  {
    id: 'indoor-kids-area',
    category: 'AMENITIES',
    tag: 'INDOOR KIDS PLAY',
    title: 'Criatividade protegida.',
    description: 'Brinquedoteca interna climatizada com design educativo e acolhedor.',
    image: '/images/amenities/09-indoor-kids-area.jpg',
    spanDesktop: 'col-span-6 lg:col-span-4',
    spanMobile: 'col-span-6',
    aspectRatio: 'aspect-[4/3]',
  },
  {
    id: 'bbq-lounge',
    category: 'AMENITIES',
    tag: 'BBQ LOUNGE',
    title: 'Celebrações ao ar livre.',
    description: 'Espaço gourmet com churrasqueiras integradas e mesas para refeições ao ar livre.',
    image: '/images/amenities/10-bbq-lounge.jpg',
    spanDesktop: 'col-span-6 lg:col-span-4',
    spanMobile: 'col-span-6',
    aspectRatio: 'aspect-[4/3]',
  },
  {
    id: 'kids-pool',
    category: 'AMENITIES',
    tag: 'KIDS POOL',
    title: 'Piscina infantil dedicada.',
    description: 'Área aquática rasa com segurança e diversão para as crianças.',
    image: '/images/amenities/04-kids-pool.jpg',
    spanDesktop: 'col-span-6 lg:col-span-4',
    spanMobile: 'col-span-6',
    aspectRatio: 'aspect-[4/3]',
  },
  {
    id: 'amenity-deck',
    category: 'AMENITIES',
    tag: 'AMENITY DECK',
    title: 'Convivência em harmonia.',
    description: 'Deck central com múltiplos ambientes integrados de lazer e convivência.',
    image: '/images/amenities/01-amenity-deck.jpg',
    spanDesktop: 'col-span-12 lg:col-span-8',
    spanMobile: 'col-span-12',
    aspectRatio: 'aspect-[16/10]',
  },

  // --- INTERIOR ---
  {
    id: 'double-height-lobby',
    category: 'INTERIOR',
    tag: 'DOUBLE-HEIGHT LOBBY',
    title: 'A experiência começa na chegada.',
    description: 'Lobby imponente com pé-direito duplo, pedras nobres e recepção dedicada.',
    image: '/images/amenities/02-double-height-lobby.jpg',
    spanDesktop: 'col-span-12 lg:col-span-8',
    spanMobile: 'col-span-12',
    aspectRatio: 'aspect-[16/10]',
  },
  {
    id: 'interior-living-room',
    category: 'INTERIOR',
    tag: 'LIVING & RESIDÊNCIA',
    title: 'Amplitude e acabamento impecável.',
    description: 'Salas integradas com marcenaria sob medida e iluminação contemporânea.',
    image: '/images/amenities/16-interior-living-room.jpg',
    spanDesktop: 'col-span-6 lg:col-span-4',
    spanMobile: 'col-span-6',
    aspectRatio: 'aspect-[4/3]',
  },
  {
    id: 'interior-bedroom',
    category: 'INTERIOR',
    tag: 'MASTER BEDROOM',
    title: 'Privacidade e serenidade.',
    description: 'Suítes confortáveis com janelas do piso ao teto e paleta de tons minerais.',
    image: '/images/amenities/17-interior-bedroom-01.jpg',
    spanDesktop: 'col-span-6 lg:col-span-4',
    spanMobile: 'col-span-6',
    aspectRatio: 'aspect-[4/3]',
  },
  {
    id: 'interior-bathroom',
    category: 'INTERIOR',
    tag: 'BATHROOM SUITE',
    title: 'Design e sofisticação mineral.',
    description: 'Banheiros revestidos com louças de padrão internacional e acabamento em bronze.',
    image: '/images/amenities/18-interior-bathroom.jpg',
    spanDesktop: 'col-span-6 lg:col-span-4',
    spanMobile: 'col-span-6',
    aspectRatio: 'aspect-[4/3]',
  },
];

const FILTER_OPTIONS: { label: string; value: CategoryFilter }[] = [
  { label: 'TODOS', value: 'TODOS' },
  { label: 'EXTERIOR', value: 'EXTERIOR' },
  { label: 'AMENITIES', value: 'AMENITIES' },
  { label: 'INTERIOR', value: 'INTERIOR' },
];

export const AmenitiesSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('TODOS');
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isInView, setIsInView] = useState<boolean>(false);
  const sectionRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
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

  // Filtered items for display and navigation
  const filteredItems = useMemo(() => {
    return selectedCategory === 'TODOS'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const displayedItems = useMemo(() => {
    return isExpanded ? filteredItems : filteredItems.slice(0, 8);
  }, [isExpanded, filteredItems]);

  // Transform to GalleryViewerItem format
  const viewerItems: GalleryViewerItem[] = useMemo(() => {
    return filteredItems.map((item) => ({
      id: item.id,
      image: item.image,
      title: item.title,
      tag: item.tag,
      description: item.description,
    }));
  }, [filteredItems]);

  return (
    <section
      ref={sectionRef}
      id="amenities"
      className="defer-render relative w-full bg-[#F4F1EA] text-[#24231F] py-20 lg:py-28 border-t border-[#24231F]/8 select-none"
    >
      <div
        className={`container-master px-4 sm:px-6 lg:px-8 gpu-accel reveal-blur-init ${
          isInView ? 'reveal-blur-visible' : ''
        }`}
      >
        
        {/* ========================================================================= */}
        {/* 01. EDITORIAL HEADER                                                      */}
        {/* ========================================================================= */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14">
          <span className="font-body text-[11px] sm:text-[11.5px] font-semibold tracking-[0.28em] uppercase text-[#705B44] mb-2.5 block">
            AMENITIES
          </span>
          <h2 className="font-display font-normal text-[36px] sm:text-[46px] lg:text-[52px] leading-[1.08] text-[#1A1816] mb-3.5 max-w-2xl">
            Tudo o que faz parte do viver.
          </h2>
          <p className="font-body text-[#5A544C] text-[14px] sm:text-[15.5px] leading-[1.60] max-w-xl mx-auto font-normal">
            Espaços pensados para transformar a rotina em uma experiência residencial completa.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 02. CATEGORY FILTERS (TODOS · EXTERIOR · AMENITIES · INTERIOR)            */}
        {/* ========================================================================= */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-10 sm:mb-12 overflow-x-auto no-scrollbar py-1">
          {FILTER_OPTIONS.map((option) => {
            const isSelected = selectedCategory === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  setSelectedCategory(option.value);
                  setIsExpanded(false);
                  setFullscreenIndex(null);
                }}
                className={`font-body text-[11px] sm:text-[12px] font-semibold tracking-[0.20em] uppercase px-4 sm:px-5 py-2 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${
                  isSelected
                    ? 'bg-[#1A1816] text-[#FAF9F6] shadow-sm'
                    : 'bg-transparent text-[#6B6358] hover:text-[#1A1816] hover:bg-[#24231F]/5'
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* 03. EDITORIAL GRID (4 COLS ON DESKTOP · 8 IMAGES INITIALLY)               */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6 transition-all duration-500">
          {displayedItems.map((item) => {
            const fullIndex = filteredItems.findIndex((fi) => fi.id === item.id);
            const formatNumber = String((fullIndex >= 0 ? fullIndex : 0) + 1).padStart(2, '0');

            return (
              <div
                key={item.id}
                onClick={() => setFullscreenIndex(fullIndex >= 0 ? fullIndex : 0)}
                className={`group relative w-full aspect-[4/3] rounded-[14px] sm:rounded-[18px] overflow-hidden bg-black/5 border border-[#24231F]/8 transition-all duration-500 ease-luxury cursor-pointer shadow-sm hover:shadow-[0_16px_36px_rgba(20,18,16,0.12)] gpu-accel reveal-blur-init ${
                  isInView ? 'reveal-blur-visible' : ''
                }`}
                style={{ transitionDelay: `${(displayedItems.indexOf(item) % 4) * 100 + 100}ms` }}
              >
                {/* IMAGE WITH OPTIMIZED SIZES */}
                <Image
                  src={item.image}
                  alt={`${item.title} — Oxford Cove`}
                  fill
                  quality={85}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover object-center transition-transform duration-700 ease-luxury group-hover:scale-[1.03]"
                />

                {/* DISCREET HOVER OVERLAY & MICRO-IDENTIFICATION */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex flex-col justify-between p-3.5 sm:p-5">
                  <span className="font-technical text-[10px] font-semibold tracking-[0.20em] uppercase text-champagne self-end bg-black/40 px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                    {formatNumber}
                  </span>

                  <div>
                    <span className="font-body text-[10px] sm:text-[11.5px] font-semibold tracking-[0.20em] uppercase text-white drop-shadow-sm block mb-0.5">
                      {item.tag}
                    </span>
                    <span className="font-display text-[14px] sm:text-[16.5px] text-[#FAF9F6]/95 font-normal leading-tight line-clamp-1">
                      {item.title}
                    </span>
                  </div>
                </div>

                {/* MOBILE PERMANENT LABEL */}
                <div className="sm:hidden absolute bottom-2 left-2 bg-black/55 backdrop-blur-sm px-2 py-0.5 rounded-md max-w-[85%]">
                  <span className="font-body text-[8.5px] font-semibold tracking-[0.14em] uppercase text-white truncate block">
                    {item.tag}
                  </span>
                </div>

              </div>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* EXPAND / COLLAPSE BUTTON ("VER MAIS" / "VER MENOS")                       */}
        {/* ========================================================================= */}
        {filteredItems.length > 8 && (
          <div className="flex justify-center mt-10 sm:mt-14">
            {!isExpanded ? (
              <button
                type="button"
                onClick={() => setIsExpanded(true)}
                className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#1A1816] text-[#FAF9F6] font-body text-[11.5px] sm:text-[12px] font-semibold tracking-[0.22em] uppercase transition-all duration-300 hover:bg-[#806B54] hover:shadow-lg focus:outline-none cursor-pointer"
              >
                <span>VER TODAS AS ÁREAS DE LAZER ({filteredItems.length - 8})</span>
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setIsExpanded(false);
                  const el = document.getElementById('amenities');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-[#24231F]/25 bg-transparent text-[#24231F] font-body text-[11.5px] sm:text-[12px] font-semibold tracking-[0.22em] uppercase transition-all duration-300 hover:bg-[#24231F]/5 focus:outline-none cursor-pointer"
              >
                <span>VER MENOS</span>
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M5 15l7-7 7 7" />
                </svg>
              </button>
            )}
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* 04. SHARED FULLSCREEN IMMERSIVE IMAGE VIEWER                              */}
      {/* ========================================================================= */}
      {fullscreenIndex !== null && (
        <GalleryViewer
          items={viewerItems}
          currentIndex={fullscreenIndex}
          onClose={() => setFullscreenIndex(null)}
          onIndexChange={(idx) => setFullscreenIndex(idx)}
          showThumbnails={true}
        />
      )}
    </section>
  );
};
