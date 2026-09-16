import React from 'react';

interface MetricProps {
  value: string;
  prefix?: string;
  suffix?: string;
  label: string;
  sublabel?: string;
  theme?: 'light' | 'dark' | 'olive';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Metric: React.FC<MetricProps> = ({
  value,
  prefix,
  suffix,
  label,
  sublabel,
  theme = 'light',
  size = 'md',
  className = '',
}) => {
  const themeClasses = {
    light: {
      wrapper: 'text-charcoal',
      value: 'text-charcoal',
      prefix: 'text-bronze font-technical',
      label: 'text-charcoal/70',
      sublabel: 'text-charcoal/50',
      border: 'border-charcoal/10',
    },
    dark: {
      wrapper: 'text-warm-white',
      value: 'text-warm-white',
      prefix: 'text-champagne font-technical',
      label: 'text-warm-white/75',
      sublabel: 'text-warm-white/50',
      border: 'border-warm-white/15',
    },
    olive: {
      wrapper: 'text-forest',
      value: 'text-forest',
      prefix: 'text-olive font-technical',
      label: 'text-forest/70',
      sublabel: 'text-forest/50',
      border: 'border-forest/10',
    },
  }[theme];

  const sizeClasses = {
    sm: {
      valueText: 'text-3xl md:text-4xl',
      labelText: 'text-[11px]',
      gap: 'gap-1',
    },
    md: {
      valueText: 'text-4xl md:text-5xl lg:text-[54px]',
      labelText: 'text-meta',
      gap: 'gap-1.5',
    },
    lg: {
      valueText: 'text-5xl md:text-6xl lg:text-[68px]',
      labelText: 'text-xs',
      gap: 'gap-2',
    },
  }[size];

  return (
    <div className={`flex flex-col ${sizeClasses.gap} ${themeClasses.wrapper} ${className}`}>
      <div className="flex items-baseline gap-2 font-body font-bold leading-[0.95] tracking-tight">
        {prefix && (
          <span className={`text-sm md:text-base font-normal tracking-normal ${themeClasses.prefix}`}>
            {prefix}
          </span>
        )}
        <span className={`font-bold ${sizeClasses.valueText} ${themeClasses.value}`}>
          {value}
        </span>
        {suffix && (
          <span className={`text-sm md:text-base font-normal font-technical text-bronze`}>
            {suffix}
          </span>
        )}
      </div>

      <div className="flex flex-col pt-1">
        <span className={`font-body font-semibold uppercase tracking-eyebrow ${sizeClasses.labelText} ${themeClasses.label}`}>
          {label}
        </span>
        {sublabel && (
          <span className={`font-body text-xs font-normal mt-0.5 ${themeClasses.sublabel}`}>
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
};

export const MetricGroup: React.FC<{
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
  divider?: boolean;
  className?: string;
}> = ({ children, columns = 4, divider = true, className = '' }) => {
  const colClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 lg:grid-cols-4',
  }[columns];

  return (
    <div
      className={`grid ${colClasses} gap-8 md:gap-10 py-6 ${
        divider ? 'divide-y sm:divide-y-0 sm:divide-x divide-charcoal/10' : ''
      } ${className}`}
    >
      {React.Children.map(children, (child, index) => (
        <div key={index} className={`${index !== 0 && divider ? 'pt-6 sm:pt-0 sm:pl-8 lg:pl-10' : ''}`}>
          {child}
        </div>
      ))}
    </div>
  );
};
