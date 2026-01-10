'use client';

import { useState, useEffect } from 'react';
import { Shield, Zap, Target, CheckCircle } from 'lucide-react';
import { Language } from '@/types';

// Paddle Price IDs
const PRICE_IDS = {
  single: 'pri_01kekqkr9rnaz0ezmf8evfjnvv',
  monthly: 'pri_01kekqh7mv168cag98y802d6be',
};

declare global {
  interface Window {
    Paddle: any;
  }
}

export default function Home() {
  const [language, setLanguage] = useState<Language>('en');

  // Sync with Header toggles
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
        { num: '02', title: '분석', desc: 'AI가 이탈 요인을 스캔' },
        { num: '03', title: '개선', desc: '발송 전 문제 수정' },
      ],
      pricing: '가격',
    },
  };

  const t = content[language];

  const handleCheckout = (type: 'single' | 'monthly') => {
    if (typeof window !== 'undefined' && window.Paddle) {
      window.Paddle.Checkout.open({
        items: [
          {
            priceId: PRICE_IDS[type],
            quantity: 1,
          },
        ],
      });
    } else {
      alert('Payment system loading. Please try again.');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {t.headline}
          </h1>
          <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
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

      {/* Features Section */}
      <section className="py-16 px-4 bg-bg-surface">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {t.features.map((feature, idx) => (
              <div key={idx} className="text-center p-6">
                <feature.icon className="w-12 h-12 text-brand-blue mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-text-secondary">{feature.desc}</p>
              </div>
            ))}
          </div>
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

      {/* Pricing Section */}
      <section className="py-16 px-4 bg-bg-surface">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">{t.pricing}</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Card 1: Single Pass ($29) */}
            <div className="w-full bg-bg-surface rounded-2xl shadow-xl overflow-hidden border-2 border-border-color relative transform hover:-translate-y-1 transition-all duration-300">
              <div className="p-8">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-brand-blue tracking-wide uppercase">Single Pass</h3>
                  <div className="mt-4 flex justify-center items-baseline">
                    <span className="text-5xl font-extrabold text-white">$29</span>
                    <span className="ml-2 text-xl text-gray-400">/ {language === 'en' ? 'one-time' : '1회'}</span>
                  </div>
                </div>
                <p className="mt-6 text-gray-300 text-center">
                  {language === 'en' 
                    ? 'Urgent risk check. Cheaper than a coffee chat.' 
                    : 'VC 커피챗 1회 비용보다 저렴하게, 이탈 요인을 사전에 점검하세요.'}
                </p>
                <ul className="mt-6 space-y-4">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="ml-3 text-gray-300">{language === 'en' ? '1 Deck Analysis' : '피치덱 1회 분석'}</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="ml-3 text-gray-300">{language === 'en' ? 'Risk & Friction Check' : '전체 리스크 리포트'}</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="ml-3 text-gray-300">{language === 'en' ? 'PDF Report Download' : '방어 프롬프트 포함'}</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <button
                    onClick={() => handleCheckout('single')}
                    className="block w-full bg-slate-800 hover:bg-slate-700 text-white text-center font-bold py-4 rounded-xl transition duration-200 border border-slate-700"
                  >
                    {language === 'en' ? 'Buy Single Pass' : '1회 진단 구매'}
                  </button>
                </div>
              </div>
            </div>

            {/* Card 2: Pro Monthly ($99) - Dark Theme */}
            <div className="w-full bg-bg-surface rounded-2xl shadow-xl overflow-hidden border-2 border-brand-blue relative transform hover:-translate-y-1 transition-all duration-300">
              <div className="absolute top-0 right-0 bg-brand-blue text-white text-xs font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wide">
                {language === 'en' ? 'Best Value' : '추천'}
              </div>
              <div className="p-8">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-brand-blue tracking-wide uppercase">Pro Monthly</h3>
                  <div className="mt-4 flex justify-center items-baseline">
                    <span className="text-5xl font-extrabold text-white">$99</span>
                    <span className="ml-2 text-xl text-gray-400">/ {language === 'en' ? 'month' : '월'}</span>
                  </div>
                </div>
                <p className="mt-6 text-gray-300 text-center">
                  {language === 'en'
                    ? 'Unlimited checks until your funding round closes.'
                    : '투자 라운드 종료까지 무제한 진단 & 수정.'}
                </p>
                <ul className="mt-6 space-y-4">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="ml-3 text-gray-300">{language === 'en' ? 'Unlimited Analyses' : '무제한 분석'}</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="ml-3 text-gray-300">{language === 'en' ? '30-Day Access' : '30일 이용권'}</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="ml-3 text-gray-300">{language === 'en' ? 'Priority Support' : '우선 지원'}</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="ml-3 text-gray-300">{language === 'en' ? 'Team Sharing (Soon)' : '팀 공유 (곧 출시)'}</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <button
                    onClick={() => handleCheckout('monthly')}
                    className="block w-full bg-brand-blue hover:brightness-110 text-white text-center font-bold py-4 rounded-xl transition duration-200"
                  >
                    {language === 'en' ? 'Get Pro Monthly' : '월간 패스 구매'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Refund Notice */}
          <p className="mt-8 text-center text-sm text-text-secondary">
            {language === 'en'
              ? 'Digital service. No refunds once analysis begins.'
              : '디지털 서비스이므로 분석 시작 후에는 환불이 불가합니다.'}
          </p>
        </div>
      </section>
    </div>
  );
}
