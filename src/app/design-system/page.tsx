'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Building,
  Shield,
  Percent,
  MapPin,
  Waves,
  Sun,
  CheckCircle2,
  ArrowRight,
  Check,
  Globe
} from 'lucide-react';
import { PrimaryButton, SecondaryButton, Button } from '@/components/ui/Button';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Metric, MetricGroup } from '@/components/ui/Metric';
import {
  DisplayHeading,
  BodyCopy,
  Eyebrow,
  TechnicalMeta,
} from '@/components/ui/Typography';
import { Input, Select } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { FixedLeadForm } from '@/components/form/FixedLeadForm';
import { BrandLogo } from '@/components/ui/BrandLogo';

export default function DesignSystemPage() {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [showFixedDemo, setShowFixedDemo] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(text);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const colorPalettes = [
    {
      category: 'Primary Backgrounds',
      description: 'Superfícies principais. Ivory é o tom dominante de fundo da página.',
      colors: [
        { name: 'Ivory', hex: '#F4F1EA', var: '--color-ivory', text: 'dark', usage: 'Background dominante da LP' },
        { name: 'Warm White', hex: '#FAF9F6', var: '--color-warm-white', text: 'dark', usage: 'Superfícies elevadas, formulário, cards' },
        { name: 'Stone', hex: '#DED8CC', var: '--color-stone', text: 'dark', usage: 'Bordas e divisores neutros, badges' },
      ],
    },
    {
      category: 'Text & Editorial Hierarchy',
      description: 'Tipografia com alto contraste e elegância sem agressividade.',
      colors: [
        { name: 'Charcoal', hex: '#24231F', var: '--color-charcoal', text: 'light', usage: 'Cor principal de texto e subtítulos' },
        { name: 'Deep Charcoal', hex: '#171815', var: '--color-deep-charcoal', text: 'light', usage: 'Headlines de impacto e fundos solenes' },
      ],
    },
    {
      category: 'Nature & Architectural Tones',
      description: 'Verdes orgânicos inspirados no paisagismo e biofilia do projeto.',
      colors: [
        { name: 'Olive', hex: '#28372D', var: '--color-olive', text: 'light', usage: 'Principal cor de ação e CTAs primários' },
        { name: 'Forest', hex: '#1D3027', var: '--color-forest', text: 'light', usage: 'Blocos de investimento, EOI e alto impacto' },
      ],
    },
    {
      category: 'Accents & Craftsmanship',
      description: 'Metais nobres desaturados e discretos (nunca dourado brilhante ou neon).',
      colors: [
        { name: 'Bronze', hex: '#806B54', var: '--color-bronze', text: 'light', usage: 'Detalhes, números de seção, eyebrows' },
        { name: 'Champagne', hex: '#B7A489', var: '--color-champagne', text: 'dark', usage: 'Acentos secundários e fundos escuros' },
        { name: 'Water', hex: '#789B9A', var: '--color-water', text: 'dark', usage: 'Associações com piscina, lagoa e água' },
      ],
    },
    {
      category: 'Borders & Overlays',
      description: 'Linhas sutis e filtros de legibilidade arquitetônica.',
      colors: [
        { name: 'Border Standard', hex: 'rgba(36,35,31,0.14)', var: '--color-border', text: 'dark', usage: 'Bordas de cards e divisórias' },
        { name: 'Border Light', hex: 'rgba(36,35,31,0.08)', var: '--color-border-light', text: 'dark', usage: 'Linhas secundárias e tabelas' },
        { name: 'Overlay Dark', hex: 'rgba(23,24,21,0.42)', var: '--overlay-dark', text: 'light', usage: 'Filtro sobre fotografia hero/cinemática' },
        { name: 'Overlay Light', hex: 'rgba(244,241,234,0.72)', var: '--overlay-light', text: 'dark', usage: 'Filtro luminoso para legibilidade' },
      ],
    },
  ];

  const spacingTokens = [
    { token: '--space-1', value: '4px', usage: 'Micro gaps, alinhamento de ícones' },
    { token: '--space-2', value: '8px', usage: 'Padding interno de inputs, tags' },
    { token: '--space-3', value: '12px', usage: 'Espaçamento de labels e microcópias' },
    { token: '--space-4', value: '16px', usage: 'Margem de parágrafos, gutters mobile' },
    { token: '--space-5', value: '24px', usage: 'Padding de cards compactos, gutters desktop' },
    { token: '--space-6', value: '32px', usage: 'Padding de formulário, margens tablet' },
    { token: '--space-7', value: '48px', usage: 'Margens desktop 1280px, grupos de métricas' },
    { token: '--space-8', value: '64px', usage: 'Margens desktop 1440px' },
    { token: '--space-9', value: '80px', usage: 'Espaçamento entre sub-blocos' },
    { token: '--space-10', value: '120px', usage: 'Espaçamento entre seções (Tablet / Desktop)' },
    { token: '--space-11', value: '160px', usage: 'Espaçamento entre seções de grande impacto' },
  ];

  const radiusTokens = [
    { token: '--radius-sm', value: '4px', className: 'rounded-sm', usage: 'Botões primários e secundários, tags' },
    { token: '--radius-md', value: '8px', className: 'rounded-md', usage: 'Inputs, selects e campos de formulário' },
    { token: '--radius-lg', value: '16px', className: 'rounded-lg', usage: 'Cards editoriais e painéis de amenidades' },
    { token: '--radius-xl', value: '22px', className: 'rounded-[22px]', usage: 'FixedLeadForm floating container' },
    { token: '--radius-pill', value: '999px', className: 'rounded-pill', usage: 'Pílulas de status e micro-badges' },
  ];

  return (
    <div className="min-h-screen bg-ivory text-charcoal selection:bg-olive selection:text-warm-white pb-32">
      {/* FIXED DEMO OVERLAY IF TOGGLED */}
      {showFixedDemo && <FixedLeadForm mode="modal" onClose={() => setShowFixedDemo(false)} />}

      {/* STICKY TOP BAR */}
      <nav className="sticky top-0 z-30 bg-warm-white/90 backdrop-blur-md border-b border-charcoal/10 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-display text-lg font-normal text-charcoal hover:text-forest transition-colors">
            OXFORD COVE <span className="font-body text-[10px] text-bronze uppercase tracking-[0.2em] ml-1">DESIGN SYSTEM V1.0</span>
          </Link>
        </div>

        <div className="flex items-center gap-4 text-xs font-body">
          <button
            onClick={() => setShowFixedDemo(!showFixedDemo)}
            className={`px-3 py-1.5 rounded-sm border font-medium uppercase tracking-wider transition-all ${
              showFixedDemo
                ? 'bg-olive text-warm-white border-olive'
                : 'bg-warm-white text-charcoal border-charcoal/20 hover:border-charcoal'
            }`}
          >
            {showFixedDemo ? 'Fechar Fixed Form Live' : 'Testar Fixed Form Live'}
          </button>
          <a href="#tokens-brand" className="hidden md:inline-block text-charcoal/70 hover:text-charcoal transition-colors">Logos</a>
          <a href="#tokens-colors" className="hidden md:inline-block text-charcoal/70 hover:text-charcoal transition-colors">Cores</a>
          <a href="#tokens-typography" className="hidden md:inline-block text-charcoal/70 hover:text-charcoal transition-colors">Tipografia</a>
          <a href="#tokens-components" className="hidden md:inline-block text-charcoal/70 hover:text-charcoal transition-colors">Componentes</a>
          <a href="#tokens-form" className="hidden md:inline-block text-charcoal/70 hover:text-charcoal transition-colors">Formulário</a>
        </div>
      </nav>

      {/* HEADER HERO */}
      <header className="pt-20 pb-16 border-b border-charcoal/10 bg-gradient-to-b from-warm-white to-ivory">
        <div className="container-editorial">
          <SectionLabel number="00" label="FOUNDATION SPECIFICATION" className="mb-4" />
          <DisplayHeading as="h1" size="xl" className="max-w-4xl text-deep-charcoal mb-6">
            Visual Foundation & Design Tokens
          </DisplayHeading>
          <p className="font-body text-body-lg text-charcoal/80 max-w-3xl leading-relaxed mb-8">
            Sistema visual e tokens centrais para o projeto Oxford Cove by IMAN Developers. Baseado nos princípios de luxo editorial, arquitetura contemporânea, biofilia, inteligência de investimento em Dubai e silêncio visual cinematográfico.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-charcoal/10">
            <div>
              <span className="font-body text-meta text-bronze uppercase block mb-1">Direção Estética</span>
              <span className="font-body text-sm font-semibold text-charcoal">Editorial Luxury + Architecture</span>
            </div>
            <div>
              <span className="font-body text-meta text-bronze uppercase block mb-1">Grid Max Width</span>
              <span className="font-technical text-sm text-charcoal">1440px (12 Colunas)</span>
            </div>
            <div>
              <span className="font-body text-meta text-bronze uppercase block mb-1">Escala Base</span>
              <span className="font-technical text-sm text-charcoal">8px Modular Scale</span>
            </div>
            <div>
              <span className="font-body text-meta text-bronze uppercase block mb-1">Status</span>
              <span className="font-technical text-sm text-olive flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4" /> Token Engine Ready
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* CONTENT SECTIONS */}
      <div className="container-editorial pt-16 space-y-24">

        {/* 00. BRAND IDENTITY & OFFICIAL LOGOS */}
        <section id="tokens-brand" className="scroll-mt-20">
          <SectionLabel number="00" label="BRAND IDENTITY & LOGOTYPES" className="mb-3" />
          <DisplayHeading as="h2" size="lg" className="mb-3">
            Identidade & Logotipos Oficiais
          </DisplayHeading>
          <BodyCopy size="md" className="max-w-2xl mb-10 text-charcoal/75">
            As 3 versões oficiais do logotipo Oxford Cove sem fundo para aplicações editoriais, com sutis variações para fundos claros, médios e escuros.
          </BodyCopy>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-xl bg-warm-white border border-charcoal/10 flex flex-col items-center justify-between min-h-[220px] text-center">
              <span className="font-technical text-xs text-bronze uppercase block mb-4">Versão Charcoal (Padrão)</span>
              <div className="my-auto py-4">
                <BrandLogo variant="charcoal" size="lg" showSubtitle={true} />
              </div>
              <span className="font-body text-xs text-charcoal/60 mt-4">Para backgrounds Ivory e Warm White</span>
            </div>

            <div className="p-8 rounded-xl bg-stone/40 border border-charcoal/15 flex flex-col items-center justify-between min-h-[220px] text-center">
              <span className="font-technical text-xs text-bronze uppercase block mb-4">Versão Bronze / Nobre</span>
              <div className="my-auto py-4">
                <BrandLogo variant="bronze" size="lg" showSubtitle={true} />
              </div>
              <span className="font-body text-xs text-charcoal/60 mt-4">Para backgrounds Stone e materiais editoriais</span>
            </div>

            <div className="p-8 rounded-xl bg-forest border border-warm-white/10 flex flex-col items-center justify-between min-h-[220px] text-center">
              <span className="font-technical text-xs text-champagne uppercase block mb-4">Versão White (Dark / Forest)</span>
              <div className="my-auto py-4">
                <BrandLogo variant="white" size="lg" showSubtitle={true} />
              </div>
              <span className="font-body text-xs text-warm-white/60 mt-4">Para blocos de investimento Forest e fundos escuros</span>
            </div>
          </div>
        </section>

        {/* 01. COLOR TOKENS */}
        <section id="tokens-colors" className="scroll-mt-20">
          <SectionLabel number="01" label="COLOR TOKENS & PALETTE" className="mb-3" />
          <DisplayHeading as="h2" size="lg" className="mb-3">
            Cromática Arquitetônica
          </DisplayHeading>
          <BodyCopy size="md" className="max-w-2xl mb-10 text-charcoal/75">
            Cores orgânicas, quentes e minerais. Ivory lidera como atmosfera predominante, equilibrada por Warm White nas superfícies e Olive nas ações estratégicas.
          </BodyCopy>

          <div className="space-y-10">
            {colorPalettes.map((cat) => (
              <div key={cat.category} className="space-y-4">
                <div className="border-b border-charcoal/10 pb-2">
                  <h3 className="font-display text-2xl font-normal text-charcoal">{cat.category}</h3>
                  <p className="font-body text-xs text-charcoal/60">{cat.description}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {cat.colors.map((color) => (
                    <div
                      key={color.name}
                      onClick={() => copyToClipboard(color.hex)}
                      className="group cursor-pointer rounded-lg bg-warm-white border border-charcoal/10 overflow-hidden shadow-sm hover:shadow-md transition-all duration-fast"
                      title="Clique para copiar o valor HEX"
                    >
                      <div
                        className="h-28 w-full relative flex items-end p-3 transition-transform duration-base group-hover:scale-[1.02]"
                        style={{ backgroundColor: color.hex }}
                      >
                        <span className={`font-technical text-[10px] px-2 py-0.5 rounded-sm backdrop-blur-md ${
                          color.text === 'light' ? 'bg-black/40 text-white' : 'bg-white/70 text-charcoal'
                        }`}>
                          {color.hex}
                        </span>
                      </div>
                      <div className="p-4 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-body font-semibold text-sm text-charcoal">{color.name}</span>
                          <span className="font-technical text-[11px] text-bronze">
                            {copiedToken === color.hex ? 'Copiado!' : color.var}
                          </span>
                        </div>
                        <p className="font-body text-xs text-charcoal/65 leading-relaxed">{color.usage}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 02. TYPOGRAPHY & TYPE SCALE */}
        <section id="tokens-typography" className="scroll-mt-20">
          <SectionLabel number="02" label="TYPOGRAPHY SYSTEM" className="mb-3" />
          <DisplayHeading as="h2" size="lg" className="mb-3">
            Tipografia & Escala Fluida
          </DisplayHeading>
          <BodyCopy size="md" className="max-w-2xl mb-10 text-charcoal/75">
            Três famílias estritamente especializadas: Cormorant Garamond para títulos editoriais e números; Manrope para interfaces, corpo e botões; DM Mono para unidades monetárias e dados técnicos.
          </BodyCopy>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            <Card variant="warm" padding="md">
              <span className="font-technical text-xs text-bronze uppercase">Display Font</span>
              <h3 className="font-display text-3xl text-charcoal mt-2 mb-1">Cormorant Garamond</h3>
              <p className="font-body text-xs text-charcoal/65 leading-relaxed">
                Peso 400. Usado em Headlines da Hero, títulos de seções, números de métricas editoriais e frases de alto impacto.
              </p>
            </Card>

            <Card variant="warm" padding="md">
              <span className="font-technical text-xs text-bronze uppercase">Body & UI Font</span>
              <h3 className="font-body text-2xl font-semibold text-charcoal mt-2 mb-1">Manrope</h3>
              <p className="font-body text-xs text-charcoal/65 leading-relaxed">
                Pesos 400, 500, 600, 700. Usado no corpo editorial, formulários, botões, navegação e metadados.
              </p>
            </Card>

            <Card variant="warm" padding="md">
              <span className="font-technical text-xs text-bronze uppercase">Technical Data Font</span>
              <h3 className="font-technical text-2xl text-charcoal mt-2 mb-1">DM Mono</h3>
              <p className="font-body text-xs text-charcoal/65 leading-relaxed">
                Uso restrito: AED, SQ.FT, G+P+5, Q1 2029, metadados financeiros e prazos de entrega.
              </p>
            </Card>
          </div>
        </section>

        {/* 03. SPACING & GRID SYSTEM */}
        <section id="tokens-grid" className="scroll-mt-20">
          <SectionLabel number="03" label="SPACING & 12-COLUMN GRID" className="mb-3" />
          <DisplayHeading as="h2" size="lg" className="mb-3">
            Grid & Proporções Espaciais
          </DisplayHeading>
          <BodyCopy size="md" className="max-w-2xl mb-8 text-charcoal/75">
            Escala geométrica baseada em múltiplos de 8px. O grid editorial possui largura máxima de 1440px com 12 colunas no desktop, 8 no tablet e 4 no mobile.
          </BodyCopy>

          <div className="p-6 rounded-lg bg-warm-white border border-charcoal/10 space-y-6">
            <div className="flex items-center justify-between text-xs font-technical text-bronze">
              <span>VISUALIZAÇÃO DO GRID EDITORIAL (12 COLUNAS)</span>
              <span>MAX 1440PX · GUTTER 24PX</span>
            </div>

            <div className="grid grid-cols-12 gap-3 sm:gap-4 md:gap-6 py-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="h-20 bg-stone/40 border border-charcoal/10 rounded-sm flex flex-col items-center justify-center font-technical text-xs text-charcoal/60"
                >
                  <span className="font-semibold text-charcoal/80">COL {i + 1}</span>
                  <span className="text-[10px] hidden md:inline">8.33%</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 04. BASE COMPONENTS: BUTTONS, INPUTS, SECTION LABELS, METRICS */}
        <section id="tokens-components" className="scroll-mt-20">
          <SectionLabel number="04" label="BASE UI COMPONENTS" className="mb-3" />
          <DisplayHeading as="h2" size="lg" className="mb-3">
            Componentes Fundamentais
          </DisplayHeading>
          <BodyCopy size="md" className="max-w-2xl mb-10 text-charcoal/75">
            Componentes desacoplados, consumindo estritamente as variáveis de cor, borda, tipografia e curvas de transição.
          </BodyCopy>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card variant="warm" padding="md">
              <span className="font-technical text-xs text-bronze uppercase block mb-4">Button System</span>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3 items-center">
                  <PrimaryButton size="md">QUERO MINHA PRIORIDADE</PrimaryButton>
                  <SecondaryButton size="md">VER TODAS AS PLANTAS</SecondaryButton>
                </div>
              </div>
            </Card>

            <Card variant="warm" padding="md">
              <span className="font-technical text-xs text-bronze uppercase block mb-4">Section Labels & Badges</span>
              <div className="space-y-4">
                <SectionLabel number="01" label="O PROJETO & CONCEITO" />
                <SectionLabel number="02" label="AMENITIES EXCLUSIVAS" layout="inline" />
              </div>
            </Card>
          </div>
        </section>

        {/* 05. FORM COMPONENT SANDBOX */}
        <section id="tokens-form" className="scroll-mt-20">
          <SectionLabel number="05" label="LEAD FORM COMPONENT" className="mb-3" />
          <DisplayHeading as="h2" size="lg" className="mb-3">
            FixedLeadForm Apple Glass
          </DisplayHeading>
          <BodyCopy size="md" className="max-w-2xl mb-8 text-charcoal/75">
            O formulário é projetado como uma peça de vidro refinada (width 320px, blur 24px, 100% reembolsável em destaque).
          </BodyCopy>

          <div className="flex justify-center py-6 bg-gradient-to-r from-stone/20 to-warm-white/40 rounded-2xl border border-charcoal/10">
            <FixedLeadForm mode="inline" />
          </div>
        </section>

      </div>

      {/* FOOTER */}
      <footer className="mt-24 pt-12 pb-14 border-t border-charcoal/10 bg-[#171815] text-warm-white text-center">
        <div className="container-master flex flex-col items-center">
          <BrandLogo variant="white" size="md" showSubtitle={true} className="mb-4" />
          <p className="font-body text-xs text-white/60 max-w-md mx-auto mb-8">
            Fundação visual e Hero oficial do projeto Oxford Cove by IMAN Developers.
          </p>

          <div className="pt-6 border-t border-white/10 w-full max-w-md flex flex-col items-center">
            <span className="font-body text-[9px] uppercase tracking-[0.22em] text-champagne block mb-2">
              OPORTUNIDADE APRESENTADA POR
            </span>
            <div className="relative">
              <img
                src="/images/brand/glemo-white.png"
                alt="GlemO International"
                className="h-6 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
