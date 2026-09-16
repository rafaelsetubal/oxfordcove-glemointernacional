'use client';

import React from 'react';
import { Globe } from 'lucide-react';
import { useCurrency, Currency } from '@/context/CurrencyContext';

export const FloatingCurrencyWidget: React.FC = () => {
  const { currency, setCurrency } = useCurrency();

  const options: { code: Currency; label: string }[] = [
    { code: 'AED', label: 'AED' },
    { code: 'USD', label: 'USD' },
    { code: 'BRL', label: 'BRL' },
  ];

  return (
    <aside
      aria-label="Conversor de Moeda Flutuante"
      className="fixed bottom-5 left-4 sm:bottom-7 sm:left-7 z-[9999] animate-fadeIn"
      style={{
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <div className="flex items-center gap-2 p-1.5 sm:p-2 rounded-full bg-[#171815]/95 backdrop-blur-[16px] border border-[#B7A489]/40 shadow-[0_10px_35px_rgba(0,0,0,0.45)] text-white select-none transition-all duration-300 hover:border-[#B7A489]/80 hover:shadow-[0_12px_42px_rgba(0,0,0,0.55)]">
        
        {/* ICON & LABEL */}
        <div className="flex items-center gap-1.5 pl-2 pr-1 sm:pr-1.5 text-champagne">
          <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[1.75]" />
          <span className="hidden sm:inline-block font-technical text-[10px] font-bold tracking-[0.14em] uppercase text-[#EDE8DF]">
            MOEDA
          </span>
        </div>

        {/* CURRENCY BUTTONS */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-full border border-white/10">
          {options.map((opt) => {
            const isActive = currency === opt.code;
            return (
              <button
                key={opt.code}
                type="button"
                onClick={() => setCurrency(opt.code)}
                aria-pressed={isActive}
                className={`px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full font-technical text-[11px] sm:text-[11.5px] font-bold tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#D8C7A5] to-[#B7A489] text-[#171815] shadow-md font-extrabold scale-105'
                    : 'text-[#D1CCC3] hover:text-white hover:bg-white/10'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

      </div>
    </aside>
  );
};
