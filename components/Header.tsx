'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, Globe, DollarSign } from 'lucide-react';
import { Language, Currency } from '@/types';

export default function Header() {
  const [language, setLanguage] = useState<Language>('en');
  const [currency, setCurrency] = useState<Currency>('USD');

  // Persist preferences in localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('deckguard_lang') as Language;
    const savedCurrency = localStorage.getItem('deckguard_currency') as Currency;
    if (savedLang) setLanguage(savedLang);
    if (savedCurrency) setCurrency(savedCurrency);
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('deckguard_lang', lang);
    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent('languageChange', { detail: lang }));
  };

  const handleCurrencyChange = (curr: Currency) => {
    setCurrency(curr);
    localStorage.setItem('deckguard_currency', curr);
    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent('currencyChange', { detail: curr }));
  };

  return (
    <header className="sticky top-0 z-50 bg-bg-main/80 backdrop-blur-md border-b border-border-color">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-brand-blue" />
          <span className="font-semibold text-lg">DeckGuard</span>
        </Link>

        {/* Toggles */}
        <div className="flex items-center gap-4">
          {/* Language Toggle */}
          <div className="flex items-center gap-1 bg-bg-card border border-border-color rounded-lg p-1">
            <Globe className="w-4 h-4 text-text-secondary ml-2" />
            <button
              onClick={() => handleLanguageChange('en')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                language === 'en'
                  ? 'bg-brand-blue text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => handleLanguageChange('kr')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                language === 'kr'
                  ? 'bg-brand-blue text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              KR
            </button>
          </div>

          {/* Currency Toggle */}
          <div className="flex items-center gap-1 bg-bg-card border border-border-color rounded-lg p-1">
            <DollarSign className="w-4 h-4 text-text-secondary ml-2" />
            <button
              onClick={() => handleCurrencyChange('USD')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                currency === 'USD'
                  ? 'bg-brand-blue text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              $
            </button>
            <button
              onClick={() => handleCurrencyChange('KRW')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                currency === 'KRW'
                  ? 'bg-brand-blue text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              ₩
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
