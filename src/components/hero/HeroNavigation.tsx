'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { useCurrency } from '@/context/CurrencyContext';
import { CurrencyToggle } from '@/components/ui/CurrencyToggle';

interface HeroNavigationProps {
  onCtaClick?: () => void;
  activeSection?: string;
}

export const HeroNavigation: React.FC<HeroNavigationProps> = ({ onCtaClick, activeSection }) => {
  const { formatPrice } = useCurrency();

  const scrollToHeroForm = () => {
    if (onCtaClick) {
      onCtaClick();
      return;
    }
    const formElement = document.getElementById('hero-lead-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
      const firstInput = formElement.querySelector('input') as HTMLInputElement | null;
      if (firstInput) firstInput.focus();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCta = scrollToHeroForm;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let scrollTimeout: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 60);

      // Always visible when at the top
      if (currentY < 80) {
        setIsNavbarVisible(true);
        lastY = currentY;
        return;
      }

      // Softly dissolve navbar with blur when actively scrolling
      if (Math.abs(currentY - lastY) > 6) {
        setIsNavbarVisible(false);
      }

      // Debounce: reveal smoothly in crisp focus when user pauses scrolling
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsNavbarVisible(true);
      }, 450);

      lastY = currentY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Reveal immediately if mouse approaches top of window
      if (e.clientY < 70) {
        setIsNavbarVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
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
      {/* 01. TOP GRADIENT PROTECTION OVER HERO */}
      <div
        className={`fixed top-0 left-0 w-full h-[90px] pointer-events-none z-40 transition-opacity duration-base ease-luxury ${
          isScrolled || !isNavbarVisible ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          background:
            'linear-gradient(180deg, rgba(10, 10, 10, 0.50) 0%, rgba(10, 10, 10, 0) 100%)',
        }}
      />

      {/* 02. FIXED HEADER WITH LUXURY BLUR REVEAL / DISSOLVE TRANSITION */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transform transition-all duration-500 ease-luxury will-change-transform will-change-filter ${
          isNavbarVisible
            ? 'translate-y-0 opacity-100 filter blur(0px)'
            : '-translate-y-3 opacity-0 filter blur(6px) pointer-events-none'
        } ${
          isScrolled
            ? 'h-[68px] md:h-[72px] bg-[rgba(18,16,14,0.85)] backdrop-blur-[12px] border-b border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.25)]'
            : 'h-[80px] md:h-[92px] bg-transparent border-b border-transparent'
        }`}
      >
        <div className="container-master h-full flex items-center justify-between">
          {/* BRAND LOGO */}
          <div className="flex items-center">
            <BrandLogo
              variant="white"
              size="sm"
              showSubtitle={true}
              href="/"
            />
          </div>

          {/* DESKTOP MENU */}
          <nav className="hidden xl:flex items-center gap-6 lg:gap-7">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`font-body text-[11px] font-medium tracking-[0.18em] uppercase transition-colors duration-fast relative py-1.5 cursor-pointer ${
                    isScrolled
                      ? isActive
                        ? 'text-champagne font-semibold'
                        : 'text-[#EDE8DF]/85 hover:text-[#FAF9F6]'
                      : isActive
                      ? 'text-white font-semibold'
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className={`absolute bottom-0 left-0 w-full h-px ${
                        isScrolled ? 'bg-champagne' : 'bg-white'
                      }`}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* CTA IN HEADER */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handleCta}
              className="relative hidden lg:inline-flex items-center justify-center gap-2 h-[40px] px-5 rounded-full bg-gradient-to-r from-[#F7F3EB] via-[#EFE7D8] to-[#E5D7B7] hover:from-[#FFFFFF] hover:via-[#F7F3EB] hover:to-[#EDE1C8] text-[#171815] font-body text-[10px] sm:text-[10.5px] font-bold tracking-[0.14em] uppercase transition-all duration-base ease-luxury shadow-[0_2px_18px_rgba(223,200,154,0.38)] hover:shadow-[0_4px_24px_rgba(223,200,154,0.58)] hover:scale-[1.02] active:scale-[0.98] border border-[#D8C7A5]/60 overflow-hidden group cursor-pointer animate-pulse-gold"
            >
              <span className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/75 to-transparent pointer-events-none" />
              <span className="relative z-10 font-bold">QUERO INVESTIR COM PRIORIDADE</span>
              <ArrowRight className="relative z-10 w-3.5 h-3.5 transition-transform duration-base ease-luxury group-hover:translate-x-1 stroke-[2]" />
            </button>

            {/* MOBILE HAMBURGER BUTTON */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-white transition-colors cursor-pointer"
              aria-label="Menu"
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

      {/* MOBILE DRAWER OVERLAY */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#171815]/95 backdrop-blur-2xl xl:hidden pt-24 pb-10 px-6 flex flex-col justify-between animate-fadeIn text-warm-white">
          <div className="flex justify-between items-center pb-4 border-b border-white/10">
            <BrandLogo variant="white" size="sm" showSubtitle={true} href="/" />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-white cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-6 h-6 stroke-[1.5]" />
            </button>
          </div>

          <div className="flex items-center justify-between py-3.5 border-b border-white/10">
            <span className="font-technical text-[10.5px] uppercase tracking-wider text-champagne font-semibold">
              MOEDA / CURRENCY:
            </span>
            <CurrencyToggle variant="dark" />
          </div>

          <nav className="flex flex-col gap-4 divide-y divide-white/10 my-auto">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-display text-2xl font-normal text-white hover:text-champagne transition-colors pt-3.5 first:pt-0 cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-4 pt-6 border-t border-white/10 mt-6">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                handleCta();
              }}
              className="relative w-full h-12 rounded-full bg-gradient-to-r from-[#F7F3EB] via-[#EFE7D8] to-[#E5D7B7] text-[#171815] font-body text-[11px] uppercase font-bold tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(223,200,154,0.35)] overflow-hidden active:scale-[0.98] transition-all"
            >
              <span className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none" />
              <span className="relative z-10 font-bold">QUERO INVESTIR COM PRIORIDADE</span>
              <ArrowRight className="relative z-10 w-4 h-4 stroke-[2]" />
            </button>
            <span className="font-body text-center text-[11px] text-white/70">
              EOI DE {formatPrice(50000)} · 100% REEMBOLSÁVEL
            </span>
          </div>
        </div>
      )}
    </>
  );
};
