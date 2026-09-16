'use client';

import React, { useState, useId } from 'react';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export const FinalCtaSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const nameId = useId();
  const phoneId = useId();

  const validate = () => {
    const newErrors: { name?: string; phone?: string } = {};
    if (!name.trim()) {
      newErrors.name = 'Por favor, insira seu nome completo.';
    }
    if (!phone.trim() || phone.length < 8) {
      newErrors.phone = 'Por favor, insira seu WhatsApp com DDI.';
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

  return (
    <section
      id="final-cta"
      className="relative w-full bg-[#14221A] text-[#FAF8F5] py-24 sm:py-32 lg:py-36 overflow-hidden select-none"
    >
      {/* 01. SUBTLE ARCHITECTURAL DEPTH TEXTURE (BALCONY ASSET WITH LOW OPACITY & VIGNETTE) */}
      <div className="absolute inset-0 pointer-events-none opacity-10 mix-blend-luminosity overflow-hidden">
        <Image
          src="/images/payment-plan/01-hero-balcony.webp"
          alt=""
          fill
          quality={80}
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden="true"
        />
      </div>

      {/* DIRECTIONAL VIGNETTE GRADIENT (DARK CENTER & EDGES FOR TOTAL LEGIBILITY) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(20, 34, 26, 0.75) 0%, rgba(20, 34, 26, 0.96) 65%, #14221A 100%)',
        }}
      />

      {/* 02. MAIN CONTAINER & HIERARCHY */}
      <div className="relative z-10 max-w-[760px] mx-auto px-5 sm:px-8 text-center flex flex-col items-center">
        
        {/* OVERLINE */}
        <span className="font-body text-[11px] sm:text-[12px] font-semibold tracking-[0.28em] uppercase text-[#B7A489] mb-4 block">
          OXFORD COVE
        </span>

        {/* HEADLINE */}
        <h2 className="font-display font-normal text-[38px] sm:text-[52px] lg:text-[60px] leading-[1.04] text-[#FAF8F5] tracking-tight max-w-xl">
          Seu próximo endereço<br />em Dubai.
        </h2>

        {/* SUPPORTING COPY */}
        <p className="font-body text-[#D1CCC3] text-[14.5px] sm:text-[16px] leading-[1.65] font-normal max-w-lg mt-4 sm:mt-5 mb-10 sm:mb-12">
          Registre seu interesse e receba as condições de pré-lançamento, disponibilidade e próximos passos.
        </p>

        {/* 03. EMBEDDED MINIMALIST FORM (INTEGRATED DIRECTLY INTO FOREST GREEN BACKGROUND) */}
        <div className="w-full max-w-[440px]">
          {submitted ? (
            <div className="py-8 px-6 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col items-center text-center animate-fadeIn">
              <div className="w-11 h-11 rounded-full bg-white/10 text-champagne flex items-center justify-center mb-3">
                <CheckCircle2 className="w-6 h-6 stroke-[1.5] text-[#B7A489]" />
              </div>
              <h3 className="font-display text-2xl text-white mb-1.5 font-normal">
                Prioridade Registrada
              </h3>
              <p className="font-body text-[13px] text-[#D1CCC3] leading-relaxed max-w-[300px]">
                Um Private Advisor da IMAN Developers & glemO international entrará em contato via WhatsApp.
              </p>
              <button
                type="button"
                onClick={() => {
                  setName('');
                  setPhone('');
                  setSubmitted(false);
                }}
                className="font-body text-[11.5px] text-[#B7A489] underline font-semibold mt-4 hover:text-white cursor-pointer"
              >
                Registrar outro interesse
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6 text-left">
              {/* NOME COMPLETO (FINE UNDERLINE) */}
              <div className="flex flex-col">
                <label htmlFor={nameId} className="sr-only">
                  Nome completo
                </label>
                <input
                  id={nameId}
                  type="text"
                  placeholder="Nome completo"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  className={`w-full bg-transparent border-0 border-b pb-2.5 pt-1 text-[14px] sm:text-[15px] font-body text-[#FAF8F5] placeholder:text-[#FAF8F5]/40 focus:outline-none transition-colors ${
                    errors.name
                      ? 'border-red-400 text-red-100'
                      : 'border-[#FAF8F5]/25 focus:border-[#B7A489]'
                  }`}
                />
                {errors.name && (
                  <span className="flex items-center gap-1 font-body text-[10.5px] text-red-300 pt-1.5">
                    <AlertCircle className="w-3 h-3 shrink-0" /> {errors.name}
                  </span>
                )}
              </div>

              {/* WHATSAPP / TELEFONE (FINE UNDERLINE) */}
              <div className="flex flex-col">
                <label htmlFor={phoneId} className="sr-only">
                  WhatsApp / Telefone com DDI
                </label>
                <input
                  id={phoneId}
                  type="tel"
                  placeholder="WhatsApp / Telefone com DDI (+55 ...)"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors({ ...errors, phone: undefined });
                  }}
                  className={`w-full bg-transparent border-0 border-b pb-2.5 pt-1 text-[14px] sm:text-[15px] font-body text-[#FAF8F5] placeholder:text-[#FAF8F5]/40 focus:outline-none transition-colors ${
                    errors.phone
                      ? 'border-red-400 text-red-100'
                      : 'border-[#FAF8F5]/25 focus:border-[#B7A489]'
                  }`}
                />
                {errors.phone && (
                  <span className="flex items-center gap-1 font-body text-[10.5px] text-red-300 pt-1.5">
                    <AlertCircle className="w-3 h-3 shrink-0" /> {errors.phone}
                  </span>
                )}
              </div>

              {/* CTA BUTTON */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full min-h-[48px] h-[52px] rounded-full bg-[#FAF9F6] hover:bg-white text-[#14221A] font-body text-[11px] sm:text-[11.5px] font-bold uppercase tracking-[0.16em] inline-flex items-center justify-center gap-3 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer group"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin text-[#14221A]" />
                  ) : (
                    <>
                      <span>REGISTER YOUR INTEREST</span>
                      <span className="w-7 h-7 rounded-full bg-[#14221A] text-white flex items-center justify-center transition-transform group-hover:translate-x-1 shrink-0">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </>
                  )}
                </button>
              </div>

              {/* SECONDARY INFORMATION */}
              <div className="text-center pt-1">
                <span className="font-technical text-[11px] sm:text-[11.5px] text-[#B7A489] tracking-wider uppercase">
                  EOI AED 50,000 · Fully refundable
                </span>
              </div>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
