'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield } from 'lucide-react';
import { Language } from '@/types';

export default function Header() {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('deckguard_lang') as Language;
    if (savedLang) setLanguage(savedLang);
  }, []);

  const toggleLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('deckguard_lang', lang);
    window.dispatchEvent(new CustomEvent('languageChange', { detail: lang }));
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg-main/80 backdrop-blur-md border-b border-border-color">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Shield className="w-8 h-8 text-brand-blue" />
          <span className="text-xl font-bold">DeckGuard</span>
        </Link>

        {/* Language Toggle Only */}
        <div className="flex items-center gap-1 bg-bg-surface rounded-lg p-1">
          <button
            onClick={() => toggleLanguage('en')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
              language === 'en'
                ? 'bg-brand-blue text-white'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => toggleLanguage('kr')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
              language === 'kr'
                ? 'bg-brand-blue text-white'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            KR
          </button>
        </div>
      </div>
    </header>
  );
}
