import React from 'react';
import Image from 'next/image';

interface GlemoLogoProps {
  variant?: 'color' | 'white';
  showLabel?: boolean;
  className?: string;
  width?: number;
}

export const GlemoLogo: React.FC<GlemoLogoProps> = ({
  variant = 'color',
  showLabel = true,
  className = '',
  width = 100,
}) => {
  const logoSrc =
    variant === 'white'
      ? '/images/brand/glemo-white.png'
      : '/images/brand/glemo-color.png';

  const labelColor = variant === 'white' ? 'text-white/60' : 'text-[#2C241F]/60';

  return (
    <div className={`inline-flex flex-col items-start select-none ${className}`}>
      {showLabel && (
        <span
          className={`font-body text-[9px] font-semibold tracking-[0.22em] uppercase ${labelColor} mb-1.5`}
        >
          APRESENTADO POR
        </span>
      )}
      <div className="relative">
        <Image
          src={logoSrc}
          alt="GlemO International"
          width={width}
          height={Math.round(width * 0.44)}
          className="object-contain h-auto"
        />
      </div>
    </div>
  );
};
