'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { PrimaryButton } from '@/components/ui/Button';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { useCurrency } from '@/context/CurrencyContext';
import { CurrencyToggle } from '@/components/ui/CurrencyToggle';

interface NavigationProps {
  onCtaClick?: () => void;
  activeSection?: string;
}

export const Navigation: React.FC<NavigationProps> = ({ onCtaClick, activeSection }) => {
  const { formatPrice } = useCurrency();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'O PROJETO', href: '#projeto' },
    { label: 'EXPERIÊNCIA', href: '#experiencia' },
    { label: 'AMENITIES', href: '#amenities' },
    { label: 'PLANTAS', href: '#plantas' },
    { label: 'LOCALIZAÇÃO', href: '#localizacao' },
    { label: 'INVESTIMENTO', href: '#investimento' },
    { label: 'PAGAMENTO', href: '#payment-plan' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-base ease-luxury ${
          isScrolled
            ? 'bg-[rgba(250,249,246,0.92)] backdrop-blur-[12px] border-b border-charcoal/[0.08] shadow-[0_2px_20px_rgba(23,24,21,0.03)] h-[72px]'
            : 'bg-transparent border-b border-transparent h-[76px] md:h-[80px]'
        }`}
      >
        <div className="container-editorial h-full flex items-center justify-between">
          {/* BRAND LOGO */}
          <BrandLogo variant="charcoal" size="sm" showSubtitle={true} href="/" />

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden xl:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`font-body text-[12px] font-semibold tracking-nav uppercase transition-colors duration-fast ease-smooth relative py-1 cursor-pointer ${
                    isActive
                      ? 'text-forest'
                      : 'text-charcoal/70 hover:text-charcoal'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-px bg-forest" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* DESKTOP CTA & MOBILE HAMBURGER */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <PrimaryButton
                size="sm"
                onClick={onCtaClick}
                className="hidden lg:inline-flex"
              >
                QUERO INVESTIR COM PRIORIDADE
              </PrimaryButton>
            </div>

            {/* MOBILE MENU TOGGLE */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-charcoal hover:text-forest focus:outline-none transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 stroke-[1.5]" />
              ) : (
                <Menu className="w-6 h-6 stroke-[1.5]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[rgba(250,249,246,0.98)] backdrop-blur-xl xl:hidden pt-28 pb-10 px-6 flex flex-col justify-between animate-fadeIn">
          <div className="flex items-center justify-between py-3 border-b border-charcoal/10">
            <span className="font-technical text-[10.5px] uppercase tracking-wider text-[#806B54] font-semibold">
              MOEDA:
            </span>
            <CurrencyToggle variant="light" />
          </div>

          <nav className="flex flex-col gap-5 divide-y divide-charcoal/[0.08] my-auto">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-display text-2xl font-normal text-charcoal hover:text-forest transition-colors pt-4 first:pt-0"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-4 pt-6 border-t border-charcoal/10">
            <PrimaryButton
              fullWidth
              size="md"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onCtaClick) onCtaClick();
              }}
            >
              QUERO INVESTIR COM PRIORIDADE
            </PrimaryButton>
            <span className="font-body text-center text-xs text-charcoal/60">
              EOI DE {formatPrice(50000)} · 100% REEMBOLSÁVEL
            </span>
          </div>
        </div>
      )}
    </>
  );
};
