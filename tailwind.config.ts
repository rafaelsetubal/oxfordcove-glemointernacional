import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#F4F1EA',
        'warm-white': '#FAF9F6',
        stone: '#DED8CC',
        charcoal: '#24231F',
        'deep-charcoal': '#171815',
        olive: '#28372D',
        forest: '#1D3027',
        bronze: '#806B54',
        champagne: '#B7A489',
        water: '#789B9A',
        border: 'rgba(36, 35, 31, 0.14)',
        'border-light': 'rgba(36, 35, 31, 0.08)',
        'overlay-dark': 'rgba(23, 24, 21, 0.42)',
        'overlay-light': 'rgba(244, 241, 234, 0.72)',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'serif'],
        body: ['var(--font-manrope)', 'sans-serif'],
        technical: ['var(--font-dm-mono)', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(64px, 7vw, 104px)', { lineHeight: '0.92', letterSpacing: '-0.025em' }],
        'display-lg': ['clamp(52px, 5vw, 76px)', { lineHeight: '0.95', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(42px, 4vw, 60px)', { lineHeight: '0.98', letterSpacing: '-0.025em' }],
        'display-sm': ['clamp(34px, 3vw, 46px)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        'body-lg': ['20px', { lineHeight: '1.60', letterSpacing: '0' }],
        'body-md': ['16px', { lineHeight: '1.65', letterSpacing: '0' }],
        'body-sm': ['14px', { lineHeight: '1.60', letterSpacing: '0' }],
        'body-xs': ['12px', { lineHeight: '1.55', letterSpacing: '0.01em' }],
        meta: ['11px', { lineHeight: '1.20', letterSpacing: '0.20em' }],
      },
      letterSpacing: {
        display: '-0.025em',
        body: '0',
        meta: '0.20em',
        'meta-wide': '0.24em',
        nav: '0.02em',
        eyebrow: '0.20em',
        btn: '0.04em',
      },
      spacing: {
        'space-1': '4px',
        'space-2': '8px',
        'space-3': '12px',
        'space-4': '16px',
        'space-5': '24px',
        'space-6': '32px',
        'space-7': '48px',
        'space-8': '64px',
        'space-9': '80px',
        'space-10': '120px',
        'space-11': '160px',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '16px',
        xl: '24px',
        pill: '999px',
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.22, 1, 0.36, 1)',
        smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        fast: '300ms',
        base: '600ms',
        slow: '1000ms',
      },
      maxWidth: {
        container: '1440px',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        'pulse-gold': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.97' },
          '50%': { transform: 'scale(1.02)', opacity: '1' },
        },
      },
      animation: {
        shimmer: 'shimmer 3s ease-in-out infinite',
        'pulse-gold': 'pulse-gold 2.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
