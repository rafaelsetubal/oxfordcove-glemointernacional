'use client';

import React from 'react';
import { FixedLeadForm } from '@/components/form/FixedLeadForm';

export const MobileLeadSection: React.FC = () => {
  return (
    <section
      id="cadastro-mobile"
      className="md:hidden w-full bg-[#FAF9F6] text-[#24231F] py-14 px-5 sm:px-8 border-b border-[#24231F]/10 select-none"
    >
      <div className="max-w-md mx-auto">
        <FixedLeadForm
          mode="plain"
          title="Garanta sua prioridade."
          subtitle="ACESSO ANTECIPADO · PRÉ-LANÇAMENTO"
        />
      </div>
    </section>
  );
};
