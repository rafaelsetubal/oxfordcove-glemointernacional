'use client';

import React, { useState, useId, useRef, useEffect } from 'react';
import { X, Lock, CheckCircle2, ArrowRight, AlertCircle, Loader2, ChevronDown, Check } from 'lucide-react';
import { GlemoLogo } from '@/components/ui/GlemoLogo';
import { useCurrency } from '@/context/CurrencyContext';

export interface LeadFormData {
  name: string;
  phone: string;
  email: string;
  interest: string;
}

interface LeadFormProps {
  mode?: 'inline' | 'drawer' | 'modal' | 'plain' | 'final-cta';
  onClose?: () => void;
  className?: string;
  title?: string;
  subtitle?: string;
}

export const LeadForm: React.FC<LeadFormProps> = ({
  mode = 'inline',
  onClose,
  className = '',
  title = 'Garanta sua prioridade.',
  subtitle = 'ACESSO ANTECIPADO',
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { formatPrice } = useCurrency();

  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    phone: '',
    email: '',
    interest: '1-quarto',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const nameId = useId();
  const phoneId = useId();
  const emailId = useId();
  const interestId = useId();

  // Fecha o dropdown ao clicar fora ou pressionar ESC
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDropdownOpen]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Insira seu nome completo.';
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      newErrors.phone = 'Insira seu WhatsApp com DDI.';
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Insira um e-mail válido.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      // Captura UTMs da URL se disponíveis
      let utms = {};
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        utms = {
          utm_source: params.get('utm_source') || undefined,
          utm_medium: params.get('utm_medium') || undefined,
          utm_campaign: params.get('utm_campaign') || undefined,
          utm_content: params.get('utm_content') || undefined,
          utm_term: params.get('utm_term') || undefined,
          gclid: params.get('gclid') || undefined,
          fbclid: params.get('fbclid') || undefined,
        };
      }

      const payload = {
        ...formData,
        utms,
        metadata: {
          pageUrl: typeof window !== 'undefined' ? window.location.href : '',
          referrer: typeof document !== 'undefined' ? document.referrer : '',
          formMode: mode,
        },
      };

      await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error('Erro ao enviar formulário:', err);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  const interestOptions = [
    { value: 'studio', label: `Studio (A partir de ${formatPrice(679000)})` },
    { value: '1-quarto', label: '1 quarto' },
    { value: '1-quarto-escritorio', label: '1 quarto + escritório' },
    { value: '2-quartos', label: '2 quartos' },
    { value: '2-quartos-escritorio', label: '2 quartos + escritório' },
    { value: 'duplex', label: 'Duplex' },
    { value: 'loja', label: 'Loja comercial' },
    { value: 'avaliando', label: 'Ainda estou avaliando' },
  ];

  const isFinalCta = mode === 'final-cta';

  const content = (
    <div className={`flex flex-col select-none w-full ${isFinalCta ? 'text-[#FAF8F5]' : 'text-[#2C241F]'}`}>
      {/* 01. INSTITUTIONAL SIGNATURE: GLEMO INTERNATIONAL */}
      <div className={`flex items-center justify-between ${isFinalCta ? 'pb-1.5 mb-2 border-b border-white/20' : 'pb-2 mb-2.5 border-b border-[#2C241F]/10'}`}>
        <GlemoLogo variant={isFinalCta ? 'white' : 'color'} width={isFinalCta ? 96 : 90} showLabel={true} />
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className={`p-1.5 transition-colors rounded-full hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-olive cursor-pointer ${isFinalCta ? 'text-white/70 hover:text-white' : 'text-[#2C241F]/60 hover:text-[#2C241F]'}`}
            aria-label="Fechar formulário"
          >
            <X className="w-4 h-4 stroke-[1.5]" />
          </button>
        )}
      </div>

      {/* 02. EDITORIAL HEADER */}
      <div>
        <span className={`font-body text-[9.5px] font-semibold uppercase tracking-[0.22em] block ${isFinalCta ? 'text-[#E5D7B7]' : 'text-[#705B44]'}`}>
          {subtitle}
        </span>
        <h2 className={`font-display font-normal ${isFinalCta ? 'text-[24px] sm:text-[26px] leading-tight text-[#FAF9F6]' : 'text-[26px] sm:text-[28px] leading-[0.94] text-[#2C241F]'} mt-0.5`}>
          {title}
        </h2>
      </div>

      {/* 03. EOI SUPPORTING LINE */}
      <div className={`${isFinalCta ? 'mt-1 mb-2 pb-1.5 border-b border-white/20' : 'mt-1.5 mb-2.5 pb-2 border-b border-[#2C241F]/10'}`}>
        <span className={`font-body text-[9px] font-semibold uppercase tracking-[0.08em] block ${isFinalCta ? 'text-[#FAF8F5]' : 'text-[#2C241F]/80'}`}>
          EOI DE {formatPrice(50000)} · <span className={isFinalCta ? 'text-champagne font-bold' : 'text-[#1D3027] font-bold'}>100% REEMBOLSÁVEL</span>
        </span>
      </div>

      {submitted ? (
        <div className={`py-6 text-center flex flex-col items-center justify-center animate-fadeIn ${isFinalCta ? 'bg-white/[0.04] rounded-2xl border border-white/10 p-6' : ''}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2.5 ${isFinalCta ? 'bg-white/10 text-champagne' : 'bg-olive/15 text-olive'}`}>
            <CheckCircle2 className="w-5 h-5 stroke-[1.5]" />
          </div>
          <h4 className={`font-display text-xl mb-1 ${isFinalCta ? 'text-[#FAF8F5]' : 'text-[#2C241F]'}`}>
            Prioridade Registrada
          </h4>
          <p className={`font-body text-[11.5px] max-w-[240px] leading-relaxed mb-4 ${isFinalCta ? 'text-[#D1CCC3]' : 'text-[#2C241F]/80'}`}>
            Um Private Advisor da IMAN Developers & glemO international entrará em contato via WhatsApp.
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className={`font-body text-[11.5px] underline font-semibold cursor-pointer ${isFinalCta ? 'text-champagne hover:text-white' : 'text-olive hover:text-forest'}`}
          >
            Registrar outro interesse
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className={`flex flex-col ${isFinalCta ? 'gap-3 sm:gap-3.5' : 'gap-2.5'}`}>
          {/* NOME COMPLETO */}
          <div className="flex flex-col">
            <label
              htmlFor={nameId}
              className={`font-body text-[10.5px] font-semibold tracking-wider uppercase mb-0.5 ${isFinalCta ? 'text-[#FAF9F6]' : 'text-[#2C241F]/80'}`}
            >
              Nome completo
            </label>
            <input
              id={nameId}
              type="text"
              placeholder="Digite seu nome"
              required
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? `${nameId}-error` : undefined}
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: '' });
              }}
              className={
                isFinalCta
                  ? `w-full h-[42px] sm:h-[44px] px-0 bg-transparent border-0 border-b border-white/45 focus:border-[#E5D7B7] text-[#FAF9F6] placeholder:text-white/60 font-body text-[13px] font-medium transition-colors focus:outline-none ${
                      errors.name ? 'border-red-400' : ''
                    }`
                  : `w-full h-[42px] sm:h-[44px] px-4 rounded-full bg-white/90 border border-[#2C241F]/15 text-[#2C241F] placeholder:text-[#2C241F]/40 font-body text-[12.5px] font-medium transition-all duration-fast focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive focus:bg-white ${
                      errors.name ? 'border-red-600/80 ring-1 ring-red-600/30' : ''
                    }`
              }
            />
            {errors.name && (
              <span id={`${nameId}-error`} className={`flex items-center gap-1 font-body text-[9.5px] font-medium pt-0.5 ${isFinalCta ? 'text-red-300' : 'text-red-700 px-2'}`}>
                <AlertCircle className="w-2.5 h-2.5 shrink-0" /> {errors.name}
              </span>
            )}
          </div>

          {/* WHATSAPP */}
          <div className="flex flex-col">
            <label
              htmlFor={phoneId}
              className={`font-body text-[10.5px] font-semibold tracking-wider uppercase mb-0.5 ${isFinalCta ? 'text-[#FAF9F6]' : 'text-[#2C241F]/80 px-1'}`}
            >
              WhatsApp
            </label>
            <input
              id={phoneId}
              type="tel"
              placeholder="+55 (11) 99999-9999"
              required
              aria-required="true"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? `${phoneId}-error` : undefined}
              value={formData.phone}
              onChange={(e) => {
                setFormData({ ...formData, phone: e.target.value });
                if (errors.phone) setErrors({ ...errors, phone: '' });
              }}
              className={
                isFinalCta
                  ? `w-full h-[42px] sm:h-[44px] px-0 bg-transparent border-0 border-b border-white/45 focus:border-[#E5D7B7] text-[#FAF9F6] placeholder:text-white/60 font-body text-[13px] font-medium transition-colors focus:outline-none ${
                      errors.phone ? 'border-red-400' : ''
                    }`
                  : `w-full h-[42px] sm:h-[44px] px-4 rounded-full bg-white/90 border border-[#2C241F]/15 text-[#2C241F] placeholder:text-[#2C241F]/40 font-body text-[12.5px] font-medium transition-all duration-fast focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive focus:bg-white ${
                      errors.phone ? 'border-red-600/80 ring-1 ring-red-600/30' : ''
                    }`
              }
            />
            {errors.phone && (
              <span id={`${phoneId}-error`} className={`flex items-center gap-1 font-body text-[9.5px] font-medium pt-0.5 ${isFinalCta ? 'text-red-300' : 'text-red-700 px-2'}`}>
                <AlertCircle className="w-2.5 h-2.5 shrink-0" /> {errors.phone}
              </span>
            )}
          </div>

          {/* E-MAIL */}
          <div className="flex flex-col">
            <label
              htmlFor={emailId}
              className={`font-body text-[10.5px] font-semibold tracking-wider uppercase mb-0.5 ${isFinalCta ? 'text-[#FAF9F6]' : 'text-[#2C241F]/80 px-1'}`}
            >
              E-mail
            </label>
            <input
              id={emailId}
              type="email"
              placeholder="seu@email.com"
              required
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? `${emailId}-error` : undefined}
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: '' });
              }}
              className={
                isFinalCta
                  ? `w-full h-[42px] sm:h-[44px] px-0 bg-transparent border-0 border-b border-white/45 focus:border-[#E5D7B7] text-[#FAF9F6] placeholder:text-white/60 font-body text-[13px] font-medium transition-colors focus:outline-none ${
                      errors.email ? 'border-red-400' : ''
                    }`
                  : `w-full h-[42px] sm:h-[44px] px-4 rounded-full bg-white/90 border border-[#2C241F]/15 text-[#2C241F] placeholder:text-[#2C241F]/40 font-body text-[12.5px] font-medium transition-all duration-fast focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive focus:bg-white ${
                      errors.email ? 'border-red-600/80 ring-1 ring-red-600/30' : ''
                    }`
              }
            />
            {errors.email && (
              <span id={`${emailId}-error`} className={`flex items-center gap-1 font-body text-[9.5px] font-medium pt-0.5 ${isFinalCta ? 'text-red-300' : 'text-red-700 px-2'}`}>
                <AlertCircle className="w-2.5 h-2.5 shrink-0" /> {errors.email}
              </span>
            )}
          </div>

          {/* TENHO INTERESSE EM */}
          {/* TENHO INTERESSE EM (CUSTOM LUXURY DROPDOWN) */}
          <div className="flex flex-col relative" ref={dropdownRef}>
            <label
              id={`${interestId}-label`}
              className={`font-body text-[10.5px] font-semibold tracking-wider uppercase mb-0.5 ${isFinalCta ? 'text-[#FAF9F6]' : 'text-[#2C241F]/80 px-1'}`}
            >
              Tenho interesse em...
            </label>

            {/* TRIGGER BUTTON (ROUNDED PILL) */}
            <button
              type="button"
              id={interestId}
              aria-haspopup="listbox"
              aria-expanded={isDropdownOpen}
              aria-labelledby={`${interestId}-label ${interestId}`}
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className={
                isFinalCta
                  ? 'w-full h-[42px] sm:h-[44px] px-0 pr-2 bg-transparent border-0 border-b border-white/45 focus:border-[#E5D7B7] text-[#FAF9F6] font-body text-[13px] font-medium transition-colors focus:outline-none flex items-center justify-between text-left cursor-pointer group'
                  : 'w-full h-[42px] sm:h-[44px] px-4 pr-3.5 rounded-full bg-white/90 hover:bg-white border border-[#2C241F]/15 text-[#2C241F] font-body text-[12.5px] font-medium transition-all duration-fast focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive flex items-center justify-between text-left shadow-sm cursor-pointer group'
              }
            >
              <span className="truncate pr-2 font-medium">
                {interestOptions.find((opt) => opt.value === formData.interest)?.label || 'Selecione uma tipologia'}
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
                  isDropdownOpen ? 'rotate-180' : 'rotate-0'
                } ${isFinalCta ? 'text-white/80' : 'text-[#2C241F]/60'}`}
              />
            </button>

            {/* FLOATING CUSTOM ROUNDED LUXURY MENU (100% SOLID CREME) */}
            {isDropdownOpen && (
              <div
                role="listbox"
                tabIndex={-1}
                className={`absolute z-50 left-0 right-0 top-full mt-1.5 p-1.5 rounded-[16px] max-h-[260px] overflow-y-auto scrollbar-thin shadow-[0_20px_40px_rgba(0,0,0,0.28)] border ${
                  isFinalCta
                    ? 'bg-[#192720] border-white/20 text-[#FAF9F6]'
                    : 'bg-[#FAF8F5] border-[#2C241F]/20 text-[#171815]'
                }`}
                style={{ opacity: 1 }}
              >
                <div className="space-y-0.5">
                  {interestOptions.map((opt) => {
                    const isSelected = formData.interest === opt.value;
                    return (
                      <div
                        key={opt.value}
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => {
                          setFormData({ ...formData, interest: opt.value });
                          setIsDropdownOpen(false);
                        }}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-[10px] text-[12px] sm:text-[12.5px] font-body transition-colors duration-150 cursor-pointer ${
                          isSelected
                            ? isFinalCta
                              ? 'bg-[#FAF9F6] text-[#171815] font-bold shadow-sm'
                              : 'bg-[#1D3027] text-white font-bold shadow-sm'
                            : isFinalCta
                            ? 'hover:bg-white/10 text-[#FAF9F6] font-medium'
                            : 'hover:bg-[#EAE5DC] text-[#171815] font-medium'
                        }`}
                      >
                        <span className="truncate pr-2">{opt.label}</span>
                        {isSelected && (
                          <Check
                            className={`w-3.5 h-3.5 shrink-0 ${
                              isFinalCta ? 'text-[#171815]' : 'text-white'
                            }`}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* CTA BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={
              isFinalCta
                ? 'relative w-full h-[52px] min-h-[52px] mt-2 sm:mt-2.5 rounded-full bg-[#FAF9F6] hover:bg-white text-[#14221A] font-body text-[11px] sm:text-[11.5px] font-bold uppercase tracking-[0.14em] flex items-center justify-center gap-2.5 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] disabled:opacity-75 disabled:cursor-not-allowed group cursor-pointer'
                : 'relative w-full h-[48px] sm:h-[50px] mt-2 rounded-full bg-[#28372D] hover:bg-[#1D3027] text-[#FAF9F6] font-body text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.14em] flex items-center justify-center gap-2 transition-all duration-base ease-luxury shadow-[0_4px_18px_rgba(40,55,45,0.28)] hover:shadow-[0_6px_26px_rgba(29,48,39,0.40)] hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#28372D] overflow-hidden disabled:opacity-75 disabled:cursor-not-allowed group cursor-pointer border border-[#28372D]/40'
            }
          >
            {!isFinalCta && (
              <span className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
            )}
            
            {loading ? (
              <Loader2 className={`w-4 h-4 animate-spin ${isFinalCta ? 'text-[#14221A]' : 'text-[#FAF9F6]'}`} />
            ) : (
              <>
                <span className="relative z-10 font-bold tracking-[0.12em]">GARANTIR MINHA PRIORIDADE NA TABELA</span>
                <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-base ease-luxury group-hover:translate-x-1 stroke-[2]" />
              </>
            )}
          </button>

          {/* MICROCOPY WITH LOCK */}
          <div className={`flex items-start justify-center gap-1.5 pt-0.5 text-center ${isFinalCta ? 'text-[#FAF8F5]/75' : 'text-[#2C241F]/65'}`}>
            <Lock className={`w-2.5 h-2.5 shrink-0 mt-0.5 stroke-[1.5] ${isFinalCta ? 'text-[#FAF8F5]/65' : 'text-[#2C241F]/55'}`} />
            <span className="font-body text-[8.5px] leading-[1.3] max-w-[250px]">
              Seus dados estão seguros e serão usados apenas para contato sobre o empreendimento.
            </span>
          </div>
        </form>
      )}
    </div>
  );

  if (mode === 'drawer') {
    return content;
  }

  if (mode === 'plain') {
    return (
      <div className={`w-full ${className}`}>
        {content}
      </div>
    );
  }

  if (mode === 'modal') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/50 backdrop-blur-sm animate-fadeIn">
        <div className={`w-[320px] max-w-[340px] rounded-[24px] p-5 sm:p-6 apple-glass ${className}`}>
          {content}
        </div>
      </div>
    );
  }

  if (mode === 'final-cta') {
    return (
      <div
        className={`w-full max-w-[440px] sm:max-w-[460px] mx-auto bg-transparent border-0 p-0 transition-all ${className}`}
      >
        {content}
      </div>
    );
  }

  // Default: inline
  return (
    <div className={`w-[305px] max-w-[315px] rounded-[24px] p-5 sm:p-5.5 apple-glass ${className}`}>
      {content}
    </div>
  );
};

export const FixedLeadForm = LeadForm;

