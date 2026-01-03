'use client';

import { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import { Language } from '@/types';

export default function Footer() {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('deckguard_lang') as Language;
    if (savedLang) setLanguage(savedLang);

    const handleLanguageChange = (e: CustomEvent) => {
      setLanguage(e.detail as Language);
    };

    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
  }, []);

  const disclaimer = {
    en: 'Not investment advice. Communication risk analysis only.',
    kr: '본 서비스는 투자 유치를 보장하지 않으며, 커뮤니케이션 리스크만을 진단합니다.',
  };

  return (
    <footer className="bg-bg-card border-t border-border-color py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-brand-blue" />
            <span className="font-semibold">DeckGuard</span>
            <span className="text-text-secondary text-sm">by Lucete AI Lab</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-text-secondary">
            <a href="/terms" className="hover:text-text-primary transition-colors">
              {language === 'en' ? 'Terms' : '이용약관'}
            </a>
            <a href="/privacy" className="hover:text-text-primary transition-colors">
              {language === 'en' ? 'Privacy' : '개인정보처리방침'}
            </a>
            <a href="mailto:hello@deckguard.ai" className="hover:text-text-primary transition-colors">
              {language === 'en' ? 'Contact' : '문의하기'}
            </a>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="pt-6 border-t border-border-color">
          <p className="text-center text-sm text-text-secondary">
            ⚠️ {disclaimer[language]}
          </p>
        </div>

        {/* Copyright & Business Info */}
        <div className="mt-4 text-center text-xs text-text-secondary space-y-1">
          <p>Made by Lucete AI Lab © {new Date().getFullYear()}</p>
          <p>Lucete AI Lab | {language === 'en' ? 'Business Registration No.' : '사업자등록번호'}: 143-26-01816</p>
          <p>hello@deckguard.ai</p>
        </div>
      </div>
    </footer>
  );
}
