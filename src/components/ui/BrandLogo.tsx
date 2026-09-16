import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface BrandLogoProps {
  variant?: 'charcoal' | 'bronze' | 'white';
  showSubtitle?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  href?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'charcoal',
  showSubtitle = true,
  size = 'md',
  className = '',
  href = '/',
}) => {
  const logoSrc = {
    charcoal: '/images/brand/logo-charcoal.png',
    bronze: '/images/brand/logo-bronze.png',
    white: '/images/brand/logo-white.png',
  }[variant];

  const sizeDimensions = {
    sm: { width: 110, height: 50, subtitle: 'text-[8px] tracking-[0.24em]' },
    md: { width: 140, height: 64, subtitle: 'text-[9px] tracking-[0.24em]' },
    lg: { width: 180, height: 82, subtitle: 'text-[11px] tracking-[0.26em]' },
    xl: { width: 240, height: 110, subtitle: 'text-[12px] tracking-[0.28em]' },
  }[size];

  const subtitleColors = {
    charcoal: 'text-bronze',
    bronze: 'text-bronze',
    white: 'text-champagne',
  }[variant];

  const content = (
    <div className={`inline-flex flex-col items-center justify-center select-none group ${className}`}>
      <div className="relative">
        <Image
          src={logoSrc}
          alt="Oxford Cove by IMAN"
          width={sizeDimensions.width}
          height={sizeDimensions.height}
          className="object-contain h-auto transition-transform duration-base ease-luxury group-hover:scale-[1.02]"
          priority
        />
      </div>
      {showSubtitle && (
        <span
          className={`font-body font-semibold uppercase ${sizeDimensions.subtitle} ${subtitleColors} -mt-1`}
        >
          BY IMAN DEVELOPERS
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex">
        {content}
      </Link>
    );
  }

  return content;
};
