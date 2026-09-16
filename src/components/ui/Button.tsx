'use strict';
import React from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'forest';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  arrow?: boolean | 'up';
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  arrow = true,
  href,
  className = '',
  children,
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-body uppercase text-[13px] font-semibold tracking-btn transition-all duration-base ease-luxury cursor-pointer select-none group relative overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-olive focus-visible:ring-offset-2';

  const sizeStyles = {
    sm: 'h-10 px-4 py-2 text-[12px] rounded-full gap-2',
    md: 'h-[48px] md:h-[52px] px-6 py-3.5 rounded-full gap-2.5',
    lg: 'h-[56px] px-8 py-4 text-[14px] rounded-full gap-3',
  };

  const variantStyles = {
    primary:
      'bg-olive text-warm-white hover:bg-forest hover:shadow-[0_4px_20px_rgba(40,55,45,0.18)] active:scale-[0.99] disabled:bg-stone/50 disabled:text-charcoal/40 disabled:cursor-not-allowed',
    secondary:
      'bg-transparent border border-charcoal/20 text-charcoal hover:border-charcoal hover:bg-warm-white/60 active:scale-[0.99] disabled:border-charcoal/10 disabled:text-charcoal/30 disabled:cursor-not-allowed',
    forest:
      'bg-forest text-warm-white hover:bg-olive hover:shadow-[0_4px_20px_rgba(29,48,39,0.25)] active:scale-[0.99] disabled:bg-stone/50 disabled:text-charcoal/40',
    ghost:
      'bg-transparent text-charcoal hover:text-olive hover:bg-stone/20 active:scale-[0.99]',
  };

  const widthStyle = fullWidth ? 'w-full' : '';
  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`;

  const renderIcon = () => {
    if (!arrow) return null;
    if (arrow === 'up') {
      return (
        <ArrowUpRight className="w-4 h-4 transition-transform duration-base ease-luxury group-hover:translate-x-0.5 group-hover:-translate-y-0.5 stroke-[1.5]" />
      );
    }
    return (
      <ArrowRight className="w-4 h-4 transition-transform duration-base ease-luxury group-hover:translate-x-1 stroke-[1.5]" />
    );
  };

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        <span>{children}</span>
        {renderIcon()}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} disabled={disabled} {...props}>
      <span>{children}</span>
      {renderIcon()}
    </button>
  );
};

export const PrimaryButton: React.FC<ButtonProps> = (props) => (
  <Button variant="primary" {...props} />
);

export const SecondaryButton: React.FC<ButtonProps> = (props) => (
  <Button variant="secondary" {...props} />
);
