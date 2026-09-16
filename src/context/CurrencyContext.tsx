'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type Currency = 'AED' | 'USD' | 'BRL';

interface ExchangeRates {
  USD: number;
  BRL: number;
}

// Fallback rates (AED peg to USD is fixed at 3.6725 -> 1 AED = 0.272294 USD; BRL ~ 1.51)
const FALLBACK_RATES: ExchangeRates = {
  USD: 0.2723,
  BRL: 1.51,
};

const CACHE_KEY = 'oxford_cove_rates';
const CACHE_TIMESTAMP_KEY = 'oxford_cove_rates_timestamp';
const CURRENCY_STORAGE_KEY = 'oxford_cove_currency';
const CACHE_DURATION_MS = 6 * 60 * 60 * 1000; // 6 hours

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  rates: ExchangeRates;
  isLoading: boolean;
  isConverting: boolean;
  disclaimer: string;
  convert: (amountInAED: number) => number;
  formatPrice: (amountInAED: number, options?: { prefix?: string }) => string;
  formatCompact: (amountInAED: number, options?: { showPlus?: boolean }) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<Currency>('USD');
  const [rates, setRates] = useState<ExchangeRates>(FALLBACK_RATES);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load saved currency preference from localStorage
  useEffect(() => {
    try {
      const savedCurrency = localStorage.getItem(CURRENCY_STORAGE_KEY) as Currency | null;
      if (savedCurrency && (savedCurrency === 'AED' || savedCurrency === 'USD' || savedCurrency === 'BRL')) {
        setCurrencyState(savedCurrency);
      }
    } catch {
      // Ignore localStorage errors in SSR/private browsing
    }
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem(CURRENCY_STORAGE_KEY, c);
    } catch {
      // Ignore
    }
  };

  // Fetch exchange rates with 6h cache and 2s timeout fallback
  useEffect(() => {
    let isMounted = true;

    async function fetchRates() {
      // Check cache first
      try {
        const cachedRates = localStorage.getItem(CACHE_KEY);
        const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);

        if (cachedRates && cachedTimestamp) {
          const age = Date.now() - parseInt(cachedTimestamp, 10);
          if (age < CACHE_DURATION_MS) {
            const parsed = JSON.parse(cachedRates);
            if (parsed.USD && parsed.BRL) {
              if (isMounted) {
                setRates(parsed);
                setIsLoading(false);
              }
              return;
            }
          }
        }
      } catch {
        // Continue to fetch if cache reading fails
      }

      // Fetch from public API with 2s timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      try {
        let response = await fetch('https://open.er-api.com/v6/latest/AED', {
          signal: controller.signal,
        });

        if (!response.ok) {
          response = await fetch('https://api.exchangerate-api.com/v4/latest/AED', {
            signal: controller.signal,
          });
        }

        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          if (data && data.rates && data.rates.BRL) {
            const newRates: ExchangeRates = {
              USD: FALLBACK_RATES.USD, // Fixed peg
              BRL: Number(data.rates.BRL) || FALLBACK_RATES.BRL,
            };

            if (isMounted) {
              setRates(newRates);
              setIsLoading(false);
            }

            try {
              localStorage.setItem(CACHE_KEY, JSON.stringify(newRates));
              localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
            } catch {
              // Ignore localStorage write errors
            }
            return;
          }
        }
      } catch {
        // Fallback silently
      }

      if (isMounted) {
        setRates(FALLBACK_RATES);
        setIsLoading(false);
      }
    }

    fetchRates();

    return () => {
      isMounted = false;
    };
  }, []);

  const convert = useCallback(
    (amountInAED: number): number => {
      if (currency === 'AED') return amountInAED;
      const rate = rates[currency] || FALLBACK_RATES[currency];
      return Math.round(amountInAED * rate);
    },
    [currency, rates]
  );

  // Formats cleanly without cents / decimals
  const formatPrice = useCallback(
    (amountInAED: number, options?: { prefix?: string }): string => {
      const prefix = options?.prefix ? `${options.prefix} ` : '';
      const converted = convert(amountInAED);

      switch (currency) {
        case 'USD':
          return `${prefix}$${converted.toLocaleString('en-US')}`;
        case 'BRL':
          return `${prefix}R$ ${converted.toLocaleString('pt-BR')}`;
        case 'AED':
        default:
          return `${prefix}AED ${amountInAED.toLocaleString('en-US')}`;
      }
    },
    [currency, convert]
  );

  // Compact formats: "AED 679K+", "$185K+", "R$ 1,02M+"
  const formatCompact = useCallback(
    (amountInAED: number, options?: { showPlus?: boolean }): string => {
      const plus = options?.showPlus !== false ? '+' : '';
      const converted = convert(amountInAED);

      switch (currency) {
        case 'USD':
          if (converted >= 1_000_000) {
            return `$${(converted / 1_000_000).toFixed(2)}M${plus}`;
          }
          return `$${Math.round(converted / 1_000)}K${plus}`;
        case 'BRL':
          if (converted >= 1_000_000) {
            return `R$ ${(converted / 1_000_000).toFixed(2).replace('.', ',')}M${plus}`;
          }
          return `R$ ${Math.round(converted / 1_000)}K${plus}`;
        case 'AED':
        default:
          if (amountInAED >= 1_000_000) {
            return `AED ${(amountInAED / 1_000_000).toFixed(2)}M${plus}`;
          }
          return `AED ${Math.round(amountInAED / 1_000)}K${plus}`;
      }
    },
    [currency, convert]
  );

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        rates,
        isLoading,
        isConverting: currency !== 'AED',
        disclaimer: '*Câmbio referencial, sujeito a variação. Valor contratual em AED.',
        convert,
        formatPrice,
        formatCompact,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

export const CurrencyDisclaimer: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { isConverting } = useCurrency();
  if (!isConverting) return null;

  return (
    <span
      className={`text-[10px] sm:text-[10.5px] text-[#806B54] font-medium tracking-wide block transition-opacity duration-300 ${className}`}
    >
      *Câmbio referencial, sujeito a variação. Valor contratual em AED.
    </span>
  );
};
