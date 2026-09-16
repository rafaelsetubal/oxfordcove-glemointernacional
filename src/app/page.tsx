import { Hero } from '@/components/hero/Hero';
import { ProductSection } from '@/components/sections/ArchitectureSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { AmenitiesSection } from '@/components/sections/AmenitiesSection';
import { FloorplansSection } from '@/components/sections/FloorplansSection';
import { LocationSection } from '@/components/sections/LocationSection';
import { InvestmentSection } from '@/components/sections/InvestmentSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-ivory text-charcoal">
      {/* SEÇÃO 01: HERO OFICIAL */}
      <Hero />

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
    </main>
  );
}


