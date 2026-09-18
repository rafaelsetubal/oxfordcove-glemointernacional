import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope, DM_Mono } from 'next/font/google';
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from '@/lib/site';
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
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
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
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: SITE_TITLE,
    description:
      'Acesso prioritário a um dos projetos boutique de maior potencial de valorização em JVC, Dubai. Condições exclusivas de pré-lançamento.',
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/images/og/oxford-cove-og.jpg',
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
    images: ['/images/og/oxford-cove-og.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: process.env.BING_SITE_VERIFICATION
    ? { other: { 'msvalidate.01': process.env.BING_SITE_VERIFICATION } }
    : undefined,
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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10000] focus:rounded-md focus:bg-[#171815] focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-white focus:shadow-xl"
        >
          Pular para o conteúdo principal
        </a>
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
