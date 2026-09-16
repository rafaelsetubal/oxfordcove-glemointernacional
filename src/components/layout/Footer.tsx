'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export const Footer: React.FC = () => {
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

  return (
    <footer className="w-full bg-[#FAF9F6] text-[#24231F] border-t border-[#24231F]/10 pt-16 pb-12 sm:pt-20 sm:pb-16 select-none">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* ========================================================================= */}
        {/* 01. THREE INSTITUTIONAL LOGOS (BALANCED VISUAL PRESENCE)                  */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 sm:gap-12 pb-12 sm:pb-16 border-b border-[#24231F]/10">
          
          {/* LOGO 1: OXFORD COVE */}
          <div className="flex flex-col items-center sm:items-start space-y-1.5">
            <span className="font-technical text-[9px] uppercase tracking-[0.24em] text-[#705B44] font-semibold">
              EMPREENDIMENTO
            </span>
            <div className="relative h-7 w-40 sm:w-44">
              <Image
                src="/images/brand/logo-bronze.png"
                alt="Oxford Cove"
                fill
                className="object-contain object-center sm:object-left"
              />
            </div>
          </div>

          {/* LOGO 2: IMAN DEVELOPERS */}
          <div className="flex flex-col items-center space-y-1.5">
            <span className="font-technical text-[9px] uppercase tracking-[0.24em] text-[#705B44] font-semibold">
              DESENVOLVIMENTO
            </span>
            <div className="relative h-7 w-40 sm:w-44">
              <Image
                src="/images/brand/imandevelopers-charcoal.png"
                alt="IMAN Developers"
                fill
                className="object-contain object-center"
              />
            </div>
          </div>

          {/* LOGO 3: GLEMO INTERNATIONAL */}
          <div className="flex flex-col items-center sm:items-end space-y-1.5">
            <span className="font-technical text-[9px] uppercase tracking-[0.24em] text-[#705B44] font-semibold">
              APRESENTAÇÃO INTERNACIONAL
            </span>
            <div className="relative h-7 w-36 sm:w-40">
              <Image
                src="/images/brand/glemo-color.png"
                alt="glemO international"
                fill
                className="object-contain object-center sm:object-right"
              />
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 02. FOOTER CONTEXT COLUMNS                                                */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 py-12 sm:py-14 border-b border-[#24231F]/10 text-center sm:text-left">
          
          {/* COL 1: OXFORD COVE LOCATION */}
          <div className="flex flex-col space-y-2">
            <span className="font-display font-medium text-[17px] text-[#171815] tracking-tight">
              OXFORD COVE
            </span>
            <div className="font-body text-[13px] text-[#5A544C] leading-relaxed">
              <p>Jumeirah Village Circle</p>
              <p>District 11 · Dubai, UAE</p>
            </div>
          </div>

          {/* COL 2: INFORMAÇÕES LEGAIS */}
          <div className="flex flex-col space-y-2">
            <span className="font-technical text-[10px] uppercase tracking-[0.20em] text-[#705B44] font-semibold">
              INFORMAÇÕES LEGAIS
            </span>
            <div className="flex flex-col space-y-1.5">
              <button
                type="button"
                onClick={() => setLegalModal('privacy')}
                className="font-body text-[13px] text-[#5A544C] hover:text-[#171815] transition-colors cursor-pointer text-center sm:text-left"
              >
                Privacy Policy
              </button>
              <button
                type="button"
                onClick={() => setLegalModal('terms')}
                className="font-body text-[13px] text-[#5A544C] hover:text-[#171815] transition-colors cursor-pointer text-center sm:text-left"
              >
                Terms & Conditions
              </button>
            </div>
          </div>

          {/* COL 3: DESENVOLVIMENTO */}
          <div className="flex flex-col space-y-2">
            <span className="font-technical text-[10px] uppercase tracking-[0.20em] text-[#705B44] font-semibold">
              DESENVOLVIMENTO
            </span>
            <div className="font-body text-[13px] text-[#5A544C] leading-relaxed">
              <p className="font-semibold text-[#171815]">IMAN DEVELOPERS</p>
              <p className="text-[12px] text-[#7A7267]">Award-Winning Boutique Developer em Dubai</p>
            </div>
          </div>

          {/* COL 4: APRESENTAÇÃO INTERNACIONAL */}
          <div className="flex flex-col space-y-2">
            <span className="font-technical text-[10px] uppercase tracking-[0.20em] text-[#705B44] font-semibold">
              APRESENTAÇÃO INTERNACIONAL
            </span>
            <div className="font-body text-[13px] text-[#5A544C] leading-relaxed">
              <p className="font-bold text-[#171815]">glemO international</p>
              <p className="text-[12px] text-[#7A7267]">Atendimento consultivo e assessoria privada</p>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 03. COMPLIANCE & LEGAL DISCLAIMER                                         */}
        {/* ========================================================================= */}
        <div className="py-6 text-center">
          <p className="font-body text-[11px] sm:text-[11.5px] text-[#7A7267] font-normal leading-normal max-w-3xl mx-auto">
            As imagens são meramente ilustrativas e sujeitas a alteração. Condições de pré-lançamento, valores e disponibilidades estão sujeitos a confirmação junto à incorporadora.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 04. FOOTER BOTTOM: COPYRIGHT & SIGNATURE                                  */}
        {/* ========================================================================= */}
        <div className="pt-6 border-t border-[#24231F]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          
          <span className="font-body text-[11.5px] text-[#5A544C]">
            © 2026 Oxford Cove. All rights reserved.
          </span>

          <span className="font-body text-[11.5px] text-[#5A544C]">
            International presentation by <strong className="font-bold text-[#171815]">glemO international</strong>
          </span>

        </div>

      </div>

      {/* LEGAL MODAL (PRIVACY POLICY & TERMS) */}
      {legalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-[#FAF9F6] text-[#24231F] rounded-2xl p-6 sm:p-8 shadow-2xl border border-[#24231F]/15 relative">
            <h3 className="font-display text-2xl font-normal text-[#171815] mb-4">
              {legalModal === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
            </h3>
            <p className="font-body text-[13px] text-[#5A544C] leading-relaxed mb-6">
              {legalModal === 'privacy'
                ? 'Os dados coletados neste site destinam-se exclusivamente ao atendimento consultivo sobre o empreendimento Oxford Cove por consultores autorizados. Não compartilhamos suas informações com terceiros para outros fins comerciais.'
                : 'As informações e materiais apresentados são de caráter informativo sobre o pré-lançamento do empreendimento Oxford Cove em Dubai. Valores, metragens e disponibilidades estão sujeitos a confirmação junto à incorporadora.'}
            </p>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setLegalModal(null)}
                className="px-6 py-2.5 rounded-full bg-[#171815] text-[#FAF9F6] font-body text-[11px] font-semibold uppercase tracking-wider hover:bg-[#28372D] transition-colors cursor-pointer"
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
