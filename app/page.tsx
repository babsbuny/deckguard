'use client';

import { useState, useEffect } from 'react';
import { Shield, Zap, Target, CheckCircle } from 'lucide-react';
import PricingCard from '@/components/PricingCard';
import { Language } from '@/types';

export default function Home() {
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

  const content = {
    en: {
      headline: 'Eliminate friction before you send.',
      subheadline: 'Pre-send risk check. Reduce the chances of early drop-off.',
      cta: 'Scan My Deck',
      features: [
        { icon: Shield, title: 'Risk Detection', desc: 'Identify investor drop-off points' },
        { icon: Zap, title: 'Instant Analysis', desc: 'Get results in under 60 seconds' },
        { icon: Target, title: 'Stage-Aligned', desc: 'Tailored for Pre-Seed to Series A' },
      ],
      howItWorks: 'How It Works',
      steps: [
        { num: '01', title: 'Upload', desc: 'Drop your pitch deck PDF' },
        { num: '02', title: 'Analyze', desc: 'AI scans for friction points' },
        { num: '03', title: 'Improve', desc: 'Fix issues before sending' },
      ],
      pricing: 'Pricing',
      pricingSub: 'Choose the plan that fits your funding timeline',
      trust: 'Trusted by 100+ founders worldwide',
    },
    kr: {
      headline: '투자자 이탈 요인을 사전에 제거하세요.',
      subheadline: '투자 유치를 보장하지 않으며, 커뮤니케이션 리스크만 진단합니다.',
      cta: '내 덱 리스크 진단',
      features: [
        { icon: Shield, title: '리스크 탐지', desc: '투자자 이탈 포인트 식별' },
        { icon: Zap, title: '즉시 분석', desc: '60초 내 결과 확인' },
        { icon: Target, title: '단계별 맞춤', desc: 'Pre-Seed부터 Series A까지' },
      ],
      howItWorks: '이용 방법',
      steps: [
        { num: '01', title: '업로드', desc: '피치덱 PDF 업로드' },
        { num: '02', title: '분석', desc: 'AI가 이탈 요인 분석' },
        { num: '03', title: '개선', desc: '발송 전 문제 해결' },
      ],
      pricing: '가격',
      pricingSub: '투자 일정에 맞는 플랜을 선택하세요',
      trust: '전세계 100+ 창업자가 신뢰합니다',
    },
  };

  const t = content[language];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/10 to-transparent" />
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bg-card border border-border-color mb-8">
            <span className="w-2 h-2 rounded-full bg-go animate-pulse" />
            <span className="text-sm text-text-secondary">by Lucete AI Lab</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {t.headline}
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-10">
            {t.subheadline}
          </p>

          {/* CTA Button */}
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-blue text-white font-semibold rounded-lg hover:brightness-110 transition-all"
          >
            {t.cta}
            <Zap className="w-5 h-5" />
          </a>

          {/* Terminal Preview */}
          <div className="mt-16 max-w-2xl mx-auto">
            <div className="bg-bg-card border border-border-color rounded-lg overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border-color">
                <div className="w-3 h-3 rounded-full bg-no-go" />
                <div className="w-3 h-3 rounded-full bg-hold" />
                <div className="w-3 h-3 rounded-full bg-go" />
                <span className="ml-2 text-sm text-text-secondary font-mono">DeckGuard v1.0</span>
              </div>
              <div className="p-6 font-mono text-sm">
                <div className="text-go">$ analyzing pitch_deck.pdf...</div>
                <div className="text-text-secondary mt-2">→ Extracting content...</div>
                <div className="text-text-secondary">→ Checking business model clarity...</div>
                <div className="text-text-secondary">→ Validating stage alignment...</div>
                <div className="text-hold mt-2">⚠ Found 2 friction points</div>
                <div className="text-go mt-2">✓ Analysis complete</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {t.features.map((feature, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg bg-bg-surface border border-border-color card-hover"
              >
                <feature.icon className="w-10 h-10 text-brand-blue mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-text-secondary">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">{t.howItWorks}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {t.steps.map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-blue/20 text-brand-blue font-mono font-bold text-xl mb-4">
                  {step.num}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-text-secondary">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-bg-card">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">{t.pricing}</h2>
          <p className="text-text-secondary text-center mb-12">
            {t.pricingSub}
          </p>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            <PricingCard
              type="single"
              language={language}
            />
            <PricingCard
              type="monthly"
              language={language}
              featured
            />
          </div>

          {/* No Refund Notice */}
          <p className="text-center text-text-secondary text-sm mt-8">
            {language === 'en'
              ? 'Digital service. No refunds once analysis begins.'
              : '디지털 서비스이므로 분석 시작 후에는 환불이 불가합니다.'}
          </p>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-text-secondary">
            <CheckCircle className="w-5 h-5 text-go" />
            <span>{t.trust}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
