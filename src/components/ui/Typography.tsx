import React from 'react';

// DISPLAY HEADING
interface DisplayHeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'div';
  size?: 'xl' | 'lg' | 'md' | 'sm';
  children: React.ReactNode;
  className?: string;
  italic?: boolean;
  theme?: 'charcoal' | 'deep' | 'warm' | 'olive';
}

export const DisplayHeading: React.FC<DisplayHeadingProps> = ({
  as: Component = 'h2',
  size = 'md',
  children,
  className = '',
  italic = false,
  theme = 'charcoal',
}) => {
  const sizeClasses = {
    xl: 'text-display-xl font-normal leading-[0.92] tracking-display',
    lg: 'text-display-lg font-normal leading-[0.95] tracking-display',
    md: 'text-display-md font-normal leading-[0.98] tracking-display',
    sm: 'text-display-sm font-normal leading-[1.02] tracking-tight',
  }[size];

  const themeClasses = {
    charcoal: 'text-charcoal',
    deep: 'text-deep-charcoal',
    warm: 'text-warm-white',
    olive: 'text-forest',
  }[theme];

  const italicClass = italic ? 'italic' : '';

  return (
    <Component
      className={`font-display ${sizeClasses} ${themeClasses} ${italicClass} ${className}`}
    >
      {children}
    </Component>
  );
};

// BODY COPY
interface BodyCopyProps {
  as?: 'p' | 'div' | 'span';
  size?: 'lg' | 'md' | 'sm' | 'xs';
  children: React.ReactNode;
  className?: string;
  theme?: 'charcoal' | 'muted' | 'warm' | 'stone';
  weight?: 'normal' | 'medium' | 'semibold';
}

export const BodyCopy: React.FC<BodyCopyProps> = ({
  as: Component = 'p',
  size = 'md',
  children,
  className = '',
  theme = 'charcoal',
  weight = 'normal',
}) => {
  const sizeClasses = {
    lg: 'text-body-lg leading-[1.60]',
    md: 'text-body-md leading-[1.65]',
    sm: 'text-body-sm leading-[1.60]',
    xs: 'text-body-xs leading-[1.55]',
  }[size];

  const themeClasses = {
    charcoal: 'text-charcoal/90',
    muted: 'text-charcoal/70',
    warm: 'text-warm-white/90',
    stone: 'text-charcoal/60',
  }[theme];

  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
  }[weight];

  return (
    <Component
      className={`font-body ${sizeClasses} ${themeClasses} ${weightClasses} ${className}`}
    >
      {children}
    </Component>
  );
};

// EYEBROW / METADATA
interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  theme?: 'bronze' | 'charcoal' | 'warm' | 'olive';
}

export const Eyebrow: React.FC<EyebrowProps> = ({
  children,
  className = '',
  theme = 'bronze',
}) => {
  const themeClasses = {
    bronze: 'text-bronze',
    charcoal: 'text-charcoal/75',
    warm: 'text-warm-white/80',
    olive: 'text-olive',
  }[theme];

  return (
    <span
      className={`font-body text-meta font-semibold uppercase tracking-eyebrow ${themeClasses} ${className}`}
    >
      {children}
    </span>
  );
};

// TECHNICAL BADGE / DATA
interface TechnicalMetaProps {
  children: React.ReactNode;
  className?: string;
  theme?: 'default' | 'warm' | 'bronze';
}

export const TechnicalMeta: React.FC<TechnicalMetaProps> = ({
  children,
  className = '',
  theme = 'default',
}) => {
  const themeClasses = {
    default: 'text-charcoal/80 bg-stone/30 border-charcoal/10',
    warm: 'text-warm-white/90 bg-warm-white/10 border-warm-white/15',
    bronze: 'text-bronze bg-bronze/10 border-bronze/20',
  }[theme];

  return (
    <span
      className={`font-technical text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-sm border inline-flex items-center gap-1.5 ${themeClasses} ${className}`}
    >
      {children}
    </span>
  );
};
