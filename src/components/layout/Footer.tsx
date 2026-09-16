'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export const Footer: React.FC = () => {
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

  return (
    <footer className="w-full bg-[#FAF9F6] text-[#24231F] py-8 sm:py-10 select-none">
      <div className="max-w-[860px] mx-auto px-5 sm:px-8 text-center flex flex-col items-center">
        
        {/* ========================================================================= */}
        {/* 01. BRAND SIGNATURE GROUP (3 CENTERED LOGOS WITH BALANCED PROPORTIONS)   */}
        {/* ========================================================================= */}
        <div className="flex flex-wrap items-center justify-center gap-7 sm:gap-10 md:gap-14 mb-5 sm:mb-6">
          
          {/* LOGO 1: OXFORD COVE */}
          <div className="relative h-8 sm:h-9 w-[150px] sm:w-[170px] flex items-center justify-center">
            <Image
              src="/images/brand/logo-bronze.png"
              alt="Oxford Cove"
              fill
              className="object-contain object-center"
            />
          </div>

          {/* LOGO 2: IMAN DEVELOPERS */}
          <div className="relative h-7 sm:h-8 w-[125px] sm:w-[145px] flex items-center justify-center">
            <Image
              src="/images/brand/imandevelopers-charcoal.png"
              alt="IMAN Developers"
              fill
              className="object-contain object-center"
            />
          </div>

          {/* LOGO 3: GLEMO INTERNATIONAL */}
          <div className="relative h-7 sm:h-8 w-[130px] sm:w-[150px] flex items-center justify-center">
            <Image
              src="/images/brand/glemo-color.png"
              alt="glemO international"
              fill
              className="object-contain object-center"
            />
          </div>

        </div>

        {/* 02. DISCRETE CENTERED DIVIDER */}
        <div className="w-24 sm:w-32 h-px bg-[#24231F]/12 mb-4 sm:mb-5" />

        {/* 03. LOCATION */}
        <div className="font-body text-[12px] sm:text-[12.5px] text-[#5A544C] mb-2 leading-tight">
          Jumeirah Village Circle · District 11 · Dubai, UAE
        </div>

        {/* 04. LEGAL LINKS */}
        <div className="flex items-center justify-center gap-3 font-body text-[11.5px] text-[#5A544C] mb-3.5">
          <button
            type="button"
            onClick={() => setLegalModal('privacy')}
            className="hover:text-[#171815] transition-colors cursor-pointer"
          >
            Privacy Policy
          </button>
          <span className="text-[#5A544C]/50">·</span>
          <button
            type="button"
            onClick={() => setLegalModal('terms')}
            className="hover:text-[#171815] transition-colors cursor-pointer"
          >
            Terms & Conditions
          </button>
        </div>

        {/* 05. COPYRIGHT SIGNATURE */}
        <div className="font-body text-[11px] text-[#8C8477]">
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
