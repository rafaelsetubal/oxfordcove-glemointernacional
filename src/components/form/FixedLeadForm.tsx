'use client';

import React, { useState, useId } from 'react';
import { X, Lock, CheckCircle2, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { GlemoLogo } from '@/components/ui/GlemoLogo';

export interface LeadFormData {
  name: string;
  phone: string;
  email: string;
  interest: string;
}

interface LeadFormProps {
  mode?: 'inline' | 'drawer' | 'modal' | 'plain';
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
    { value: 'studio', label: 'Studio (A partir de AED 679K)' },
    { value: '1-quarto', label: '1 quarto' },
    { value: '1-quarto-escritorio', label: '1 quarto + escritório' },
    { value: '2-quartos', label: '2 quartos' },
    { value: '2-quartos-escritorio', label: '2 quartos + escritório' },
    { value: 'duplex', label: 'Duplex' },
    { value: 'loja', label: 'Loja comercial' },
    { value: 'avaliando', label: 'Ainda estou avaliando' },
  ];

  const content = (
    <div className="flex flex-col text-[#2C241F] select-none w-full">
      {/* 01. INSTITUTIONAL SIGNATURE: GLEMO INTERNATIONAL */}
      <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#2C241F]/10">
        <GlemoLogo variant="color" width={90} showLabel={true} />
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#2C241F]/60 hover:text-[#2C241F] transition-colors rounded-full hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-olive cursor-pointer"
            aria-label="Fechar formulário"
          >
            <X className="w-4 h-4 stroke-[1.5]" />
          </button>
        )}
      </div>

      {/* 02. EDITORIAL HEADER */}
      <div>
        <span className="font-body text-[9.5px] font-semibold uppercase tracking-[0.22em] text-[#806B54] block">
          {subtitle}
        </span>
        <h3 className="font-display font-normal text-[26px] sm:text-[28px] leading-[0.94] text-[#2C241F] mt-0.5">
          {title}
        </h3>
      </div>

      {/* 03. EOI SUPPORTING LINE */}
      <div className="mt-1.5 mb-2.5 pb-2 border-b border-[#2C241F]/10">
        <span className="font-body text-[9px] font-semibold uppercase tracking-[0.08em] text-[#2C241F]/80 block">
          EOI DE AED 50.000 · <span className="text-[#1D3027] font-bold">100% REEMBOLSÁVEL</span>
        </span>
      </div>

      {submitted ? (
        <div className="py-6 text-center flex flex-col items-center justify-center animate-fadeIn">
          <div className="w-10 h-10 rounded-full bg-olive/15 text-olive flex items-center justify-center mb-2.5">
            <CheckCircle2 className="w-5 h-5 stroke-[1.5]" />
          </div>
          <h4 className="font-display text-xl text-[#2C241F] mb-1">
            Prioridade Registrada
          </h4>
          <p className="font-body text-[11.5px] text-[#2C241F]/80 max-w-[240px] leading-relaxed mb-4">
            Um Private Advisor da IMAN Developers & GlemO entrará em contato via WhatsApp.
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="font-body text-[11.5px] text-olive underline font-semibold hover:text-forest cursor-pointer"
          >
            Registrar outro interesse
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-2.5">
          {/* NOME COMPLETO */}
          <div className="flex flex-col">
            <label
              htmlFor={nameId}
              className="font-body text-[9.5px] font-semibold tracking-wide uppercase text-[#2C241F]/80 mb-0.5"
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
              className={`w-full h-[42px] sm:h-[44px] px-4 rounded-full bg-white/90 border border-[#2C241F]/15 text-[#2C241F] placeholder:text-[#2C241F]/40 font-body text-[12.5px] font-medium transition-all duration-fast focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive focus:bg-white ${
                errors.name ? 'border-red-600/80 ring-1 ring-red-600/30' : ''
              }`}
            />
            {errors.name && (
              <span id={`${nameId}-error`} className="flex items-center gap-1 font-body text-[9.5px] text-red-700 font-medium pt-0.5 px-2">
                <AlertCircle className="w-2.5 h-2.5 shrink-0" /> {errors.name}
              </span>
            )}
          </div>

          {/* WHATSAPP */}
          <div className="flex flex-col">
            <label
              htmlFor={phoneId}
              className="font-body text-[9.5px] font-semibold tracking-wide uppercase text-[#2C241F]/80 mb-0.5 px-1"
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
              className={`w-full h-[42px] sm:h-[44px] px-4 rounded-full bg-white/90 border border-[#2C241F]/15 text-[#2C241F] placeholder:text-[#2C241F]/40 font-body text-[12.5px] font-medium transition-all duration-fast focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive focus:bg-white ${
                errors.phone ? 'border-red-600/80 ring-1 ring-red-600/30' : ''
              }`}
            />
            {errors.phone && (
              <span id={`${phoneId}-error`} className="flex items-center gap-1 font-body text-[9.5px] text-red-700 font-medium pt-0.5 px-2">
                <AlertCircle className="w-2.5 h-2.5 shrink-0" /> {errors.phone}
              </span>
            )}
          </div>

          {/* E-MAIL */}
          <div className="flex flex-col">
            <label
              htmlFor={emailId}
              className="font-body text-[9.5px] font-semibold tracking-wide uppercase text-[#2C241F]/80 mb-0.5 px-1"
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
              className={`w-full h-[42px] sm:h-[44px] px-4 rounded-full bg-white/90 border border-[#2C241F]/15 text-[#2C241F] placeholder:text-[#2C241F]/40 font-body text-[12.5px] font-medium transition-all duration-fast focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive focus:bg-white ${
                errors.email ? 'border-red-600/80 ring-1 ring-red-600/30' : ''
              }`}
            />
            {errors.email && (
              <span id={`${emailId}-error`} className="flex items-center gap-1 font-body text-[9.5px] text-red-700 font-medium pt-0.5 px-2">
                <AlertCircle className="w-2.5 h-2.5 shrink-0" /> {errors.email}
              </span>
            )}
          </div>

          {/* TENHO INTERESSE EM */}
          <div className="flex flex-col">
            <label
              htmlFor={interestId}
              className="font-body text-[9.5px] font-semibold tracking-wide uppercase text-[#2C241F]/80 mb-0.5 px-1"
            >
              Tenho interesse em...
            </label>
            <div className="relative">
              <select
                id={interestId}
                value={formData.interest}
                onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                className="w-full h-[42px] sm:h-[44px] px-4 pr-9 rounded-full bg-white/90 border border-[#2C241F]/15 text-[#2C241F] font-body text-[12.5px] font-medium transition-all duration-fast focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive focus:bg-white appearance-none cursor-pointer"
              >
                {interestOptions.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-[#FAF9F6] text-[#2C241F]">
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#2C241F]/60">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* CREAM / GOLD SHIMMERING CTA BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="relative w-full h-[48px] sm:h-[50px] mt-2 rounded-full bg-gradient-to-r from-[#F7F3EB] via-[#EFE7D8] to-[#E5D7B7] hover:from-[#FFFFFF] hover:via-[#F7F3EB] hover:to-[#EDE1C8] text-[#171815] font-body text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.14em] flex items-center justify-center gap-2 transition-all duration-base ease-luxury shadow-[0_4px_22px_rgba(223,200,154,0.40)] hover:shadow-[0_6px_28px_rgba(223,200,154,0.60)] hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#806B54] overflow-hidden disabled:opacity-75 disabled:cursor-not-allowed group cursor-pointer animate-pulse-gold border border-[#D8C7A5]/50"
          >
            {/* SHIMMER EFFECT OVERLAY */}
            <span className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none" />
            
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin text-[#171815]" />
            ) : (
              <>
                <span className="relative z-10 font-bold">ACESSAR TABELA DE PRÉ-LANÇAMENTO</span>
                <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-base ease-luxury group-hover:translate-x-1 stroke-[2]" />
              </>
            )}
          </button>

          {/* MICROCOPY WITH LOCK */}
          <div className="flex items-start justify-center gap-1.5 pt-0.5 text-center text-[#2C241F]/65">
            <Lock className="w-2.5 h-2.5 text-[#2C241F]/55 shrink-0 mt-0.5 stroke-[1.5]" />
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

  // Default: inline
  return (
    <div className={`w-[305px] max-w-[315px] rounded-[24px] p-5 sm:p-5.5 apple-glass ${className}`}>
      {content}
    </div>
  );
};

export const FixedLeadForm = LeadForm;

