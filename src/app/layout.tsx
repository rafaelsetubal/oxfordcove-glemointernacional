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
  title: 'Oxford Cove by IMAN — Visual Foundation & Design Tokens',
  description: 'Editorial luxury, architectural precision, and nature-inspired design system for Oxford Cove by IMAN Developers, Dubai.',
};

import { LeadDrawerProvider } from '@/components/form/PersistentLeadDrawer';
import { CurrencyProvider } from '@/context/CurrencyContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${manrope.variable} ${dmMono.variable}`}>
      <body className="bg-ivory text-charcoal font-body antialiased selection:bg-olive selection:text-warm-white">
        <CurrencyProvider>
          <LeadDrawerProvider>
            {children}
          </LeadDrawerProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
