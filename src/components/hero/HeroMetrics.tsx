import React from 'react';

export const HeroMetrics: React.FC = () => {
  const metrics = [
    { value: 'AED 679K+', label: 'A PARTIR DE' },
    { value: 'AED 50K', label: 'EOI REEMBOLSÁVEL' },
    { value: '40/60', label: 'PLANO DE PAGAMENTO' },
    { value: 'Q1 2029', label: 'ENTREGA PREVISTA' },
  ];

  return (
    <div className="mt-3 w-full max-w-[560px]">
      {/* BARRA HORIZONTAL DE VIDRO FOSCO ÚNICA */}
      <div
        className="rounded-[10px] shadow-[0_8px_32px_rgba(0,0,0,0.30)] w-full"
        style={{
          background: 'rgba(20, 18, 16, 0.60)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          padding: '14px 18px',
        }}
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-2 lg:gap-3 items-center">
          {metrics.map((item, index) => (
            <div
              key={item.label}
              className={`flex flex-col min-w-0 ${
                index !== 0 ? 'sm:border-l sm:border-white/15 sm:pl-3 lg:pl-4' : ''
              }`}
            >
              <span className="font-display text-[18px] sm:text-[19px] lg:text-[21px] xl:text-[22px] font-semibold leading-tight text-[#FFFFFF] tracking-tight whitespace-nowrap drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
                {item.value}
              </span>
              <span className="font-body text-[8px] sm:text-[8.5px] font-semibold uppercase tracking-[0.12em] text-[#C5BFB5] mt-0.5 whitespace-nowrap">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
