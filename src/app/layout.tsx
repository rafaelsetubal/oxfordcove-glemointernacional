import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope, DM_Mono } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://oxfordcove.vercel.app'),
  title: 'Oxford Cove by IMAN | glemO internacional',
  description:
    'Invista no Oxford Cove em Dubai com a glemO internacional. Empreendimento residencial boutique em JVC com condições exclusivas de pré-lançamento e alto potencial de valorização.',
  keywords: [
    'Oxford Cove',
    'IMAN Developers',
    'glemO internacional',
    'Dubai Real Estate',
    'Investimento Dubai',
    'Jumeirah Village Circle',
    'JVC Dubai',
    'Imóveis em Dubai',
    'Pré-lançamento Dubai',
  ],
  authors: [{ name: 'glemO internacional' }],
  openGraph: {
    title: 'Oxford Cove by IMAN | glemO internacional',
    description:
      'Acesso prioritário a um dos projetos boutique de maior potencial de valorização em JVC, Dubai. Condições exclusivas de pré-lançamento.',
    url: 'https://oxfordcove.vercel.app',
    siteName: 'Oxford Cove — glemO internacional',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/images/hero/hero-lifestyle.webp',
        width: 1200,
        height: 630,
        alt: 'Oxford Cove by IMAN Developers — glemO internacional',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oxford Cove by IMAN | glemO internacional',
    description:
      'Acesso prioritário ao pré-lançamento exclusivo do Oxford Cove em JVC, Dubai.',
    images: ['/images/hero/hero-lifestyle.webp'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { LeadDrawerProvider } from '@/components/form/PersistentLeadDrawer';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${manrope.variable} ${dmMono.variable}`}>
      <body className="bg-ivory text-charcoal font-body antialiased selection:bg-olive selection:text-warm-white">
        <SmoothScrollProvider>
          <CurrencyProvider>
            <LeadDrawerProvider>
              {children}
            </LeadDrawerProvider>
          </CurrencyProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
