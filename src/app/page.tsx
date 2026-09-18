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
import { ProjectFactsSection } from '@/components/sections/ProjectFactsSection';
import { PROJECT_FAQ } from '@/data/projectFacts';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site';

export default function Home() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'glemO internacional',
        url: SITE_URL,
        logo: `${SITE_URL}/images/brand/glemo-color.png`,
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#developer`,
        name: 'IMAN Developers',
        url: 'https://www.imandevelopers.com/',
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: 'pt-BR',
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'ApartmentComplex',
        '@id': `${SITE_URL}/#oxford-cove`,
        name: 'Oxford Cove by IMAN',
        description: SITE_DESCRIPTION,
        image: `${SITE_URL}/images/og/oxford-cove-og.jpg`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Jumeirah Village Circle',
          addressRegion: 'Dubai',
          addressCountry: 'AE',
        },
        developer: { '@id': `${SITE_URL}/#developer` },
      },
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: 'Oxford Cove by IMAN em JVC, Dubai',
        description: SITE_DESCRIPTION,
        inLanguage: 'pt-BR',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#oxford-cove` },
        dateModified: '2026-09-17',
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/#faq`,
        mainEntity: PROJECT_FAQ.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main id="main-content" tabIndex={-1} className="min-h-screen bg-ivory text-charcoal focus:outline-none">
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

      {/* FATOS CONSOLIDADOS, FONTE OFICIAL E FAQ */}
      <ProjectFactsSection />

      {/* FOOTER INSTITUCIONAL */}
      <Footer />
      </main>
    </>
  );
}
