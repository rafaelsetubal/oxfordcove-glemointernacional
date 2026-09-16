'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export const Footer: React.FC = () => {
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

  return (
    <footer className="w-full bg-[#FAF9F6] text-[#24231F] border-t border-[#24231F]/10 py-9 sm:py-11 select-none">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        
        {/* ========================================================================= */}
        {/* ROW 01: BRAND SIGNATURE (3 ENLARGED, BALANCED LOGOS IN A LUXURY ROW)      */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-7 sm:gap-10 pb-7 sm:pb-8">
          
          {/* LOGO 1: OXFORD COVE (PROMINENT SIGNATURE) */}
          <div className="relative h-8 sm:h-9 w-[160px] sm:w-[185px]">
            <Image
              src="/images/brand/logo-bronze.png"
              alt="Oxford Cove"
              fill
              className="object-contain object-center sm:object-left"
            />
          </div>

          {/* LOGO 2: IMAN DEVELOPERS */}
          <div className="relative h-7 sm:h-8 w-[135px] sm:w-[155px]">
            <Image
              src="/images/brand/imandevelopers-charcoal.png"
              alt="IMAN Developers"
              fill
              className="object-contain object-center"
            />
          </div>

          {/* LOGO 3: GLEMO INTERNATIONAL */}
          <div className="relative h-7 sm:h-8 w-[140px] sm:w-[160px]">
            <Image
              src="/images/brand/glemo-color.png"
              alt="glemO international"
              fill
              className="object-contain object-center sm:object-right"
            />
          </div>

        </div>

        {/* THIN HORIZONTAL DIVIDER LINE */}
        <div className="w-full h-px bg-[#24231F]/10 mb-6" />

        {/* ========================================================================= */}
        {/* ROW 02: LOCATION & LEGAL LINKS (COMPACT COMPOSITION)                      */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left font-body text-[12px] sm:text-[12.5px] text-[#5A544C] mb-4">
          <div>
            Jumeirah Village Circle · District 11 · Dubai, UAE
          </div>
          <div className="flex items-center gap-3 text-[#5A544C]">
            <button
              type="button"
              onClick={() => setLegalModal('privacy')}
              className="hover:text-[#171815] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => setLegalModal('terms')}
              className="hover:text-[#171815] transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ROW 03: COPYRIGHT (DISCRETE LUXURY BROCHURE BACK-COVER SIGNATURE)         */}
        {/* ========================================================================= */}
        <div className="text-center sm:text-left font-body text-[11px] text-[#8C8477]">
          © 2026 Oxford Cove. All rights reserved.
        </div>

      </div>

      {/* COMPACT LEGAL MODAL */}
      {legalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-[#FAF9F6] text-[#24231F] rounded-2xl p-6 sm:p-8 shadow-2xl border border-[#24231F]/15 relative">
            <h3 className="font-display text-2xl font-normal text-[#171815] mb-3">
              {legalModal === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
            </h3>
            <p className="font-body text-[13px] text-[#5A544C] leading-relaxed mb-6">
              {legalModal === 'privacy'
                ? 'Os dados coletados destinam-se exclusivamente ao atendimento consultivo sobre o empreendimento Oxford Cove por consultores autorizados da IMAN Developers & glemO international. Não compartilhamos suas informações com terceiros.'
                : 'As imagens e materiais são de caráter informativo sobre o pré-lançamento do empreendimento Oxford Cove em Dubai. Valores, disponibilidades e condições comerciais estão sujeitos a confirmação junto à incorporadora.'}
            </p>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setLegalModal(null)}
                className="px-6 py-2 rounded-full bg-[#171815] text-[#FAF9F6] font-body text-[11px] font-semibold uppercase tracking-wider hover:bg-[#28372D] transition-colors cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
