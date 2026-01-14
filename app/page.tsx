'use client';

import { useState, useEffect } from 'react';
import { Shield, Zap, Target, CheckCircle, Crown } from 'lucide-react';
import { Language } from '@/types';

// Paddle Price IDs (LIVE)
const PRICE_IDS = {
  single: 'pri_01kep9trd8hahkmxfsjm2t7cqj',
  monthly: 'pri_01kep9w7r2v5bfdmty2tvvdtdh',
};

declare global {
  interface Window {
    Paddle: any;
  }
}

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
      single: {
        title: 'Single Pass',
        price: '$29',
        period: 'one-time',
        desc: 'Urgent risk check. Cheaper than a coffee chat.',
        features: ['1 Deck Analysis', 'Full Risk Report', 'Defense Prompts'],
        cta: 'Buy Single Pass',
      },
      monthly: {
        title: 'Pro Monthly',
        price: '$99',
        period: 'month',
        desc: 'Unlimited checks until your funding round closes.',
        badge: 'Best Value',
        features: ['Unlimited Analyses', '30-Day Access', 'Priority Support', 'Team Sharing (Soon)'],
        cta: 'Get Pro Monthly',
      },
      refundNotice: 'Digital service. No refunds once analysis begins.',
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
        { num: '02', title: '분석', desc: 'AI가 이탈 요인 스캔' },
        { num: '03', title: '개선', desc: '발송 전 문제 수정' },
      ],
      pricing: '가격',
      single: {
        title: 'Single Pass',
        price: '$29',
        period: '1회',
        desc: 'VC 커피챗 1회 비용보다 저렴하게 이탈 요인을 점검하세요.',
        features: ['피치덱 1회 분석', '전체 리스크 리포트', '방어 프롬프트 포함'],
        cta: '1회 진단 구매',
      },
      monthly: {
        title: 'Pro Monthly',
        price: '$99',
        period: '월',
        desc: '투자 라운드 종료까지 무제한 진단 & 수정.',
        badge: '추천',
        features: ['무제한 분석', '30일 이용권', '우선 지원', '팀 공유 (곧 출시)'],
        cta: '월간 패스 구매',
      },
      refundNotice: '디지털 서비스이므로 분석 시작 후에는 환불이 불가합니다.',
    },
  };

  const t = content[language];

  const handleCheckout = (type: 'single' | 'monthly') => {
    if (typeof window !== 'undefined' && window.Paddle) {
      window.Paddle.Checkout.open({
        items: [{ priceId: PRICE_IDS[type], quantity: 1 }],
      });
    } else {
      alert('Payment system loading. Please try again.');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {t.headline}
          </h1>
          <p className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto">
            {t.subheadline}
          </p>
          <button
            onClick={() => handleCheckout('single')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-blue text-white font-semibold rounded-lg hover:brightness-110 transition-all"
          >
            <Zap className="w-5 h-5" />
            {t.cta}
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-bg-surface">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {t.features.map((feature, idx) => (
            <div key={idx} className="text-center p-6">
              <feature.icon className="w-12 h-12 text-brand-blue mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-text-secondary">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">{t.howItWorks}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {t.steps.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="text-6xl font-bold text-brand-blue/20 mb-2">{step.num}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-text-secondary">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-4 bg-bg-surface">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">{t.pricing}</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Single Pass */}
            <div className="bg-bg-card rounded-2xl border border-border-color p-8 hover:-translate-y-1 transition-all">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-brand-blue uppercase tracking-wide">
                  {t.single.title}
                </h3>
                <div className="mt-4 flex justify-center items-baseline">
                  <span className="text-5xl font-extrabold">{t.single.price}</span>
                  <span className="ml-2 text-xl text-text-secondary">/ {t.single.period}</span>
                </div>
                <p className="mt-4 text-text-secondary">{t.single.desc}</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                {t.single.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-go flex-shrink-0" />
                    <span className="text-text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button
                onClick={() => handleCheckout('single')}
                className="w-full py-4 bg-bg-surface border border-border-color rounded-xl font-semibold hover:border-brand-blue transition-all"
              >
                {t.single.cta}
              </button>
            </div>

            {/* Pro Monthly */}
            <div className="bg-bg-card rounded-2xl border-2 border-brand-blue p-8 relative hover:-translate-y-1 transition-all">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-brand-blue text-white text-xs font-bold rounded-full uppercase">
                  <Crown className="w-3 h-3" />
                  {t.monthly.badge}
                </span>
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-brand-blue uppercase tracking-wide">
                  {t.monthly.title}
                </h3>
                <div className="mt-4 flex justify-center items-baseline">
                  <span className="text-5xl font-extrabold">{t.monthly.price}</span>
                  <span className="ml-2 text-xl text-text-secondary">/ {t.monthly.period}</span>
                </div>
                <p className="mt-4 text-text-secondary">{t.monthly.desc}</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                {t.monthly.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-go flex-shrink-0" />
                    <span className="text-text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button
                onClick={() => handleCheckout('monthly')}
                className="w-full py-4 bg-brand-blue text-white rounded-xl font-semibold hover:brightness-110 transition-all"
              >
                {t.monthly.cta}
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-text-secondary">
            {t.refundNotice}
          </p>
        </div>
      </section>
    </div>
  );
}
