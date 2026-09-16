import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'warm' | 'ivory' | 'forest' | 'bordered';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'warm',
  padding = 'lg',
  hoverEffect = false,
}) => {
  const variantStyles = {
    warm: 'bg-warm-white border border-charcoal/[0.08] text-charcoal shadow-[0_4px_30px_rgba(23,24,21,0.03)]',
    ivory: 'bg-ivory border border-charcoal/[0.10] text-charcoal',
    forest: 'bg-forest text-warm-white border border-warm-white/10 shadow-[0_12px_40px_rgba(29,48,39,0.25)]',
    bordered: 'bg-transparent border border-charcoal/15 text-charcoal',
  }[variant];

  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4 md:p-5',
    md: 'p-6 md:p-8',
    lg: 'p-8 md:p-10',
    xl: 'p-10 md:p-12',
  }[padding];

  const hoverStyles = hoverEffect
    ? 'transition-all duration-base ease-luxury hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(23,24,21,0.06)] hover:border-charcoal/20'
    : '';

  return (
    <div
      className={`rounded-lg relative overflow-hidden ${variantStyles} ${paddingStyles} ${hoverStyles} ${className}`}
    >
      {children}
    </div>
  );
};
