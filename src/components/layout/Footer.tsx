'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { GlemoLogo } from '@/components/ui/GlemoLogo';

export const Footer: React.FC = () => {
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

  return (
    <footer className="w-full bg-[#FAF9F6] text-[#24231F] border-t border-[#24231F]/10 py-16 sm:py-20 lg:py-24 select-none">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* ========================================================================= */}
        {/* 01. DESKTOP / TABLET TOP ROW (LEFT: ADDRESS | CENTER: LINKS | RIGHT: DEV) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 items-start pb-12 sm:pb-16 border-b border-[#24231F]/10 text-center md:text-left">
          
          {/* LEFT: PROJECT IDENTITY & ADDRESS */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start space-y-2">
            <span className="font-display font-medium text-[20px] sm:text-[22px] tracking-tight text-[#171815]">
              OXFORD COVE
            </span>
            <div className="font-body text-[13px] sm:text-[13.5px] text-[#5A544C] leading-relaxed">
              <p>Jumeirah Village Circle</p>
              <p>District 11 · Dubai, UAE</p>
            </div>
          </div>

          {/* CENTER: LEGAL LINKS */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start space-y-2.5">
            <span className="font-technical text-[10px] uppercase tracking-[0.20em] text-[#705B44] font-semibold block mb-0.5">
              INFORMAÇÕES LEGAIS
            </span>
            <button
              type="button"
              onClick={() => setLegalModal('privacy')}
              className="font-body text-[13px] sm:text-[13.5px] text-[#5A544C] hover:text-[#171815] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => setLegalModal('terms')}
              className="font-body text-[13px] sm:text-[13.5px] text-[#5A544C] hover:text-[#171815] transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
          </div>

          {/* RIGHT: DEVELOPER SIGNATURE */}
          <div className="md:col-span-3 flex flex-col items-center md:items-end space-y-2">
            <span className="font-technical text-[10px] uppercase tracking-[0.20em] text-[#705B44] font-semibold block mb-0.5">
              DESENVOLVIMENTO
            </span>
            <span className="font-body text-[13px] sm:text-[14px] font-bold tracking-[0.14em] uppercase text-[#171815]">
              IMAN DEVELOPERS
            </span>
            <span className="font-body text-[12px] text-[#6B6358]">
              Award-Winning Boutique Developer
            </span>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 02. COMPLIANCE & LEGAL NOTICE (DISCRETE SINGLE LINE)                       */}
        {/* ========================================================================= */}
        <div className="py-6 text-center">
          <p className="font-body text-[11px] sm:text-[11.5px] text-[#7A7267] font-normal leading-normal max-w-2xl mx-auto">
            As imagens são meramente ilustrativas e sujeitas a alteração. Condições de pré-lançamento e disponibilidade sujeitas a confirmação.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 03. BOTTOM ROW: COPYRIGHT & INSTITUTIONAL SIGNATURE                       */}
        {/* ========================================================================= */}
        <div className="pt-6 border-t border-[#24231F]/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          
          {/* COPYRIGHT */}
          <span className="font-body text-[11.5px] text-[#5A544C]">
            © 2026 Oxford Cove. All rights reserved.
          </span>

          {/* INSTITUTIONAL SIGNATURE (EXACT CASING: glemO international) */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-[#5A544C]">
            <span className="font-body text-[11.5px]">
              International presentation by
            </span>
            <span className="font-body text-[12px] font-bold tracking-[0.06em] text-[#171815]">
              glemO international
            </span>
          </div>

        </div>

      </div>

      {/* SIMPLE LEGAL MODAL (WHEN USER CLICKS PRIVACY POLICY OR TERMS) */}
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
