'use client';

import React from 'react';
import { useCurrency, Currency } from '@/context/CurrencyContext';

interface CurrencyToggleProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export const CurrencyToggle: React.FC<CurrencyToggleProps> = ({
  className = '',
  variant = 'dark',
}) => {
  const { currency, setCurrency } = useCurrency();

  const options: { code: Currency; label: string }[] = [
    { code: 'AED', label: 'AED' },
    { code: 'USD', label: 'USD' },
    { code: 'BRL', label: 'BRL' },
  ];

  const isLight = variant === 'light';

  return (
    <div
      className={`inline-flex items-center p-0.5 rounded-full border transition-all duration-300 ${
        isLight
          ? 'bg-white/80 border-[#24231F]/15 shadow-sm'
          : 'bg-[#171815]/75 border-white/15 backdrop-blur-md shadow-md'
      } ${className}`}
      role="group"
      aria-label="Seletor de Moeda"
    >
      {options.map((opt) => {
        const isActive = currency === opt.code;
        return (
          <button
            key={opt.code}
            type="button"
            onClick={() => setCurrency(opt.code)}
            aria-pressed={isActive}
            className={`px-2.5 sm:px-3 py-1 rounded-full font-technical text-[10px] sm:text-[10.5px] font-bold tracking-[0.08em] transition-all duration-200 cursor-pointer ${
              isActive
                ? isLight
                  ? 'bg-[#1D3027] text-[#FAF9F6] shadow-sm'
                  : 'bg-champagne text-[#171815] shadow-sm font-extrabold'
                : isLight
                ? 'text-[#5A544C] hover:text-[#171815] hover:bg-black/5'
                : 'text-[#B5AEA4] hover:text-[#FAF9F6] hover:bg-white/5'
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};
