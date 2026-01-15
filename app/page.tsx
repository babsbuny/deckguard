'use client';

import { useState, useEffect } from 'react';
import { Shield, Zap, Target, CheckCircle } from 'lucide-react';
import PricingCard from '@/components/PricingCard';
import { Language } from '@/types';

export default function Home() {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // 저장된 언어 불러오기
    const savedLang = localStorage.getItem('deckguard_lang') as Language;
    if (savedLang) setLanguage(savedLang);

    // Header에서 언어 변경 이벤트 받기
    const handleLanguageChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      setLanguage(customEvent.detail as Language);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);

  const content = {
    en: {
      badge: 'by Lucete AI Lab',
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
      refund: 'Digital service. No refunds once analysis begins.',
    },
    kr: {
      badge: 'by Lucete AI Lab',
      headline: '투자자 이탈 요인을 사전에 제거하세요.',
      subheadline: '투자 유치를 보장하지 않으며, 커뮤니케이션 리스크만 진단합니다.',
      cta: '내 덱 진단하기',
      features: [
        { icon: Shield, title: '리스크 감지', desc: '투자자 이탈 포인트 식별' },
        { icon: Zap, title: '즉시 분석', desc: '60초 이내 결과 확인' },
        { icon: Target, title: '단계별 맞춤', desc: 'Pre-Seed부터 Series A까지' },
      ],
      howItWorks: '이용 방법',
      steps: [
        { num: '01', title: '업로드', desc: '피치덱 PDF 업로드' },
        { num: '02', title: '분석', desc: 'AI가 문제점 스캔' },
        { num: '03', title: '개선', desc: '발송 전 수정' },
      ],
      pricing: '가격',
      pricingSub: '투자 일정에 맞는 플랜을 선택하세요',
      trust: '전 세계 100명 이상의 창업자가 신뢰합니다',
      refund: '디지털 서비스이므로 분석 시작 후에는 환불이 불가합니다.',
    },
  };

  const t = content[language];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/10 via-transparent to-transparent" />
        
        <div className="relative max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-surface border border-border-color text-sm text-text-secondary mb-6">
            <Shield className="w-4 h-4 text-brand-blue" />
            {t.badge}
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
            {t.headline}
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
            {t.subheadline}
          </p>

          {/* CTA */}
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold rounded-lg transition-all"
          >
            {t.cta}
          </a>

          {/* Terminal Preview */}
          <div className="mt-12 max-w-lg mx-auto">
            <div className="bg-bg-surface border border-border-color rounded-lg overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2 border-b border-border-color">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-2 text-xs text-text-secondary font-mono">deckguard-cli</span>
              </div>
              <div className="p-4 font-mono text-sm text-left">
                <p className="text-text-secondary">$ deckguard analyze pitch_deck.pdf</p>
                <p className="text-go mt-2">✓ Processing document...</p>
                <p className="text-go">✓ Extracting content...</p>
                <p className="text-go">✓ Analyzing risk factors...</p>
                <p className="text-brand-blue mt-2">→ Analysis complete.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {t.features.map((feature, idx) => (
              <div key={idx} className="text-center p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-brand-blue/20 text-brand-blue mb-4">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">{feature.title}</h3>
                <p className="text-text-secondary">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-text-primary mb-12">{t.howItWorks}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {t.steps.map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-blue/20 text-brand-blue font-mono font-bold text-xl mb-4">
                  {step.num}
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">{step.title}</h3>
                <p className="text-text-secondary">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-bg-surface">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-text-primary mb-4">{t.pricing}</h2>
          <p className="text-text-secondary text-center mb-12">{t.pricingSub}</p>

          <div className="grid md:grid-cols-2 gap-8">
            <PricingCard type="single" language={language} />
            <PricingCard type="monthly" language={language} featured />
          </div>

          <p className="text-center text-text-secondary text-sm mt-8">{t.refund}</p>
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
