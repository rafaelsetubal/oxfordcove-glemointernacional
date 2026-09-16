import React from 'react';

interface SectionLabelProps {
  number?: string | number;
  label: string;
  className?: string;
  theme?: 'light' | 'dark' | 'bronze';
  layout?: 'stacked' | 'inline';
}

export const SectionLabel: React.FC<SectionLabelProps> = ({
  number,
  label,
  className = '',
  theme = 'light',
  layout = 'stacked',
}) => {
  const formattedNumber =
    typeof number === 'number' ? String(number).padStart(2, '0') : number;

  const themeClasses = {
    light: {
      number: 'text-bronze/90',
      label: 'text-charcoal/80',
      divider: 'bg-charcoal/15',
    },
    dark: {
      number: 'text-champagne',
      label: 'text-warm-white/80',
      divider: 'bg-warm-white/20',
    },
    bronze: {
      number: 'text-bronze',
      label: 'text-bronze',
      divider: 'bg-bronze/30',
    },
  }[theme];

  if (layout === 'inline') {
    return (
      <div className={`inline-flex items-center gap-3 font-body text-meta uppercase font-semibold tracking-eyebrow select-none ${className}`}>
        {formattedNumber && (
          <>
            <span className={themeClasses.number}>{formattedNumber}</span>
            <span className={`w-3 h-px ${themeClasses.divider}`} aria-hidden="true" />
          </>
        )}
        <span className={themeClasses.label}>{label}</span>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-1 select-none font-body uppercase ${className}`}>
      {formattedNumber && (
        <span className={`text-[11px] font-semibold tracking-widest ${themeClasses.number}`}>
          {formattedNumber}
        </span>
      )}
      <span className={`text-meta font-semibold tracking-eyebrow ${themeClasses.label}`}>
        {label}
      </span>
    </div>
  );
};
