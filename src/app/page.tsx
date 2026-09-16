import { HeroNavigation } from '@/components/hero/HeroNavigation';
import { Hero } from '@/components/hero/Hero';
import { CinematicPreloader } from '@/components/preloader/CinematicPreloader';
import { MobileLeadSection } from '@/components/sections/MobileLeadSection';
import { ProductSection } from '@/components/sections/ArchitectureSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { AmenitiesSection } from '@/components/sections/AmenitiesSection';
import { FloorplansSection } from '@/components/sections/FloorplansSection';
import { PaymentPlanSection } from '@/components/sections/PaymentPlanSection';
import { LocationSection } from '@/components/sections/LocationSection';
import { InvestmentSection } from '@/components/sections/InvestmentSection';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-ivory text-charcoal">
      {/* 00. PRELOADER CINEMATOGRÁFICO */}
      <CinematicPreloader />

      {/* 01. BARRA DE NAVEGAÇÃO FIXA GLOBAL (SITE TODO) */}
      <HeroNavigation />

      {/* 02. SEÇÃO HERO OFICIAL */}
      <Hero />

      {/* SEÇÃO DEDICADA DE CADASTRO NO MOBILE (FULL SCREEN, SEM BORDAS) */}
      <MobileLeadSection />

      {/* SEÇÃO 02: O PRODUTO (OXFORD COVE BY IMAN) */}
      <ProductSection />

      {/* SEÇÃO 03: EXPERIÊNCIA / VÍDEO INSTITUCIONAL */}
      <ExperienceSection />

      {/* SEÇÃO 04: AMENITIES / DIFERENCIAIS */}
      <AmenitiesSection />

      {/* SEÇÃO 05: PLANTAS & UNIDADES */}
      <FloorplansSection />

      {/* SEÇÃO 06: LOCALIZAÇÃO */}
      <LocationSection />

      {/* SEÇÃO 07: INVESTIMENTO */}
      <InvestmentSection />

      {/* SEÇÃO 08: PLANO DE PAGAMENTO */}
      <PaymentPlanSection />

      {/* SEÇÃO 09: FINAL CTA (FECHAMENTO COM FORMULÁRIO MINIMALISTA INTEGRADO) */}
      <FinalCtaSection />

      {/* FOOTER INSTITUCIONAL */}
      <Footer />
    </main>
  );
}


