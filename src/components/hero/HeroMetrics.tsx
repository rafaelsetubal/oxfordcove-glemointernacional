'use client';

import React from 'react';
import { useCurrency } from '@/context/CurrencyContext';

export const HeroMetrics: React.FC = () => {
  const { formatCompact } = useCurrency();

  const startingPrice = formatCompact(679000, { showPlus: true });
  const eoiPrice = formatCompact(50000, { showPlus: false });

  const metrics = [
    { value: startingPrice, label: 'A PARTIR DE' },
    { value: eoiPrice, label: 'EOI REEMBOLSÁVEL' },
    { value: '40/60', label: 'PLANO DE PAGAMENTO' },
    { value: 'Q1 2029', label: 'ENTREGA PREVISTA' },
  ];

  return (
    <div className="mt-3 w-full max-w-[480px]">
      {/* BARRA DE VIDRO FOSCO EM 2 LINHAS */}
      <div
        className="rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.30)] w-full"
        style={{
          background: 'rgba(20, 18, 16, 0.65)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          padding: '16px 20px',
        }}
      >
        <div className="grid grid-cols-2 gap-x-6 gap-y-3.5 items-center">
          {metrics.map((item, index) => {
            const isRightCol = index % 2 === 1;
            const isBottomRow = index >= 2;

            return (
              <div
                key={item.label}
                className={`flex flex-col min-w-0 ${
                  isRightCol ? 'border-l border-white/15 pl-5 sm:pl-6' : 'pr-2'
                } ${isBottomRow ? 'border-t border-white/10 pt-3' : ''}`}
              >
                <span className="font-body text-[19px] sm:text-[21px] font-bold leading-tight text-[#FFFFFF] tracking-tight whitespace-nowrap drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
                  {item.value}
                </span>
                <span className="font-body text-[10px] sm:text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[#C5BFB5] mt-1 whitespace-nowrap">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

