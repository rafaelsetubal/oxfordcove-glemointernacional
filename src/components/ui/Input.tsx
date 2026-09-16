import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="font-body text-[12px] font-medium tracking-wide uppercase text-charcoal/80 select-none"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            className={`w-full h-12 px-4 rounded-md bg-warm-white border ${
              error
                ? 'border-red-600/70 focus:ring-red-600/20'
                : 'border-charcoal/15 focus:border-olive focus:ring-2 focus:ring-olive/15'
            } text-charcoal placeholder:text-charcoal/40 font-body text-sm transition-all duration-fast ease-smooth focus:outline-none disabled:bg-stone/30 disabled:cursor-not-allowed ${className}`}
            {...props}
          />
        </div>
        {error ? (
          <span className="font-body text-[11px] text-red-700">{error}</span>
        ) : helperText ? (
          <span className="font-body text-[11px] text-charcoal/60">{helperText}</span>
        ) : null}
      </div>
    );
  }
);
Input.displayName = 'Input';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = '', id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="font-body text-[12px] font-medium tracking-wide uppercase text-charcoal/80 select-none"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={`w-full h-12 px-4 pr-10 rounded-md bg-warm-white border ${
              error
                ? 'border-red-600/70 focus:ring-red-600/20'
                : 'border-charcoal/15 focus:border-olive focus:ring-2 focus:ring-olive/15'
            } text-charcoal font-body text-sm transition-all duration-fast ease-smooth focus:outline-none appearance-none disabled:bg-stone/30 disabled:cursor-not-allowed cursor-pointer ${className}`}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-charcoal/60">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {error && <span className="font-body text-[11px] text-red-700">{error}</span>}
      </div>
    );
  }
);
Select.displayName = 'Select';
