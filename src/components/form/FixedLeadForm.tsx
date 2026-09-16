'use client';

import React, { useState, useId } from 'react';
import { X, Lock, CheckCircle2, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 450);
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
      <div className={`flex items-center justify-between pb-2 mb-2.5 border-b ${isFinalCta ? 'border-white/15' : 'border-[#2C241F]/10'}`}>
        <GlemoLogo variant={isFinalCta ? 'white' : 'color'} width={90} showLabel={true} />
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
        <span className={`font-body text-[9.5px] font-semibold uppercase tracking-[0.22em] block ${isFinalCta ? 'text-[#D4C7B5]' : 'text-[#705B44]'}`}>
          {subtitle}
        </span>
        <h2 className={`font-display font-normal text-[26px] sm:text-[28px] leading-[0.94] mt-0.5 ${isFinalCta ? 'text-[#FAF8F5]' : 'text-[#2C241F]'}`}>
          {title}
        </h2>
      </div>

      {/* 03. EOI SUPPORTING LINE */}
      <div className={`mt-1.5 mb-2.5 pb-2 border-b ${isFinalCta ? 'border-white/15' : 'border-[#2C241F]/10'}`}>
        <span className={`font-body text-[9px] font-semibold uppercase tracking-[0.08em] block ${isFinalCta ? 'text-[#FAF8F5]/85' : 'text-[#2C241F]/80'}`}>
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
        <form onSubmit={handleSubmit} noValidate className={`flex flex-col ${isFinalCta ? 'gap-4 sm:gap-4.5' : 'gap-2.5'}`}>
          {/* NOME COMPLETO */}
          <div className="flex flex-col">
            <label
              htmlFor={nameId}
              className={`font-body text-[10px] font-semibold tracking-wider uppercase mb-1 ${isFinalCta ? 'text-[#FAF9F6]' : 'text-[#2C241F]/80'}`}
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
                  ? `w-full h-[46px] sm:h-[48px] px-0 bg-transparent border-0 border-b border-white/35 focus:border-[#E5D7B7] text-[#FAF9F6] placeholder:text-white/45 font-body text-[13px] font-medium transition-colors focus:outline-none ${
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
              className={`font-body text-[10px] font-semibold tracking-wider uppercase mb-1 ${isFinalCta ? 'text-[#FAF9F6]' : 'text-[#2C241F]/80 px-1'}`}
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
                  ? `w-full h-[46px] sm:h-[48px] px-0 bg-transparent border-0 border-b border-white/35 focus:border-[#E5D7B7] text-[#FAF9F6] placeholder:text-white/45 font-body text-[13px] font-medium transition-colors focus:outline-none ${
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
              className={`font-body text-[10px] font-semibold tracking-wider uppercase mb-1 ${isFinalCta ? 'text-[#FAF9F6]' : 'text-[#2C241F]/80 px-1'}`}
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
                  ? `w-full h-[46px] sm:h-[48px] px-0 bg-transparent border-0 border-b border-white/35 focus:border-[#E5D7B7] text-[#FAF9F6] placeholder:text-white/45 font-body text-[13px] font-medium transition-colors focus:outline-none ${
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
          <div className="flex flex-col">
            <label
              htmlFor={interestId}
              className={`font-body text-[10px] font-semibold tracking-wider uppercase mb-1 ${isFinalCta ? 'text-[#FAF9F6]' : 'text-[#2C241F]/80 px-1'}`}
            >
              Tenho interesse em...
            </label>
            <div className="relative">
              <select
                id={interestId}
                value={formData.interest}
                onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                className={
                  isFinalCta
                    ? 'w-full h-[46px] sm:h-[48px] px-0 pr-8 bg-transparent border-0 border-b border-white/35 focus:border-[#E5D7B7] text-[#FAF9F6] font-body text-[13px] font-medium transition-colors focus:outline-none appearance-none cursor-pointer'
                    : 'w-full h-[42px] sm:h-[44px] px-4 pr-9 rounded-full bg-white/90 border border-[#2C241F]/15 text-[#2C241F] font-body text-[12.5px] font-medium transition-all duration-fast focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive focus:bg-white appearance-none cursor-pointer'
                }
              >
                {interestOptions.map((opt) => (
                  <option key={opt.value} value={opt.value} className={isFinalCta ? 'bg-[#14221A] text-[#FAF9F6]' : 'bg-[#FAF9F6] text-[#2C241F]'}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className={`absolute top-1/2 -translate-y-1/2 pointer-events-none ${isFinalCta ? 'right-0 text-[#FAF9F6]/70' : 'right-3.5 text-[#2C241F]/60'}`}>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* CTA BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={
              isFinalCta
                ? 'relative w-full h-[52px] min-h-[52px] mt-3 rounded-full bg-[#FAF9F6] hover:bg-white text-[#14221A] font-body text-[11px] sm:text-[11.5px] font-bold uppercase tracking-[0.14em] flex items-center justify-center gap-2.5 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] disabled:opacity-75 disabled:cursor-not-allowed group cursor-pointer'
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
          <div className={`flex items-start justify-center gap-1.5 pt-0.5 text-center ${isFinalCta ? 'text-[#FAF8F5]/70' : 'text-[#2C241F]/65'}`}>
            <Lock className={`w-2.5 h-2.5 shrink-0 mt-0.5 stroke-[1.5] ${isFinalCta ? 'text-[#FAF8F5]/60' : 'text-[#2C241F]/55'}`} />
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

