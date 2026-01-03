'use client';

import { useState, useEffect } from 'react';
import { Shield, Zap, Target, CheckCircle } from 'lucide-react';
import { Language } from '@/types';

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
        { num: '02', title: '분석', desc: 'AI가 이탈 요인 분석' },
        { num: '03', title: '개선', desc: '발송 전 문제 해결' },
      ],
      pricing: '가격',
    },
  };

  const t = content[language];

  return (
    <div className="min-h-screen text-white"> {/* 전체 텍스트 화이트 기본 설정 */}
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/10 to-transparent" />
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bg-card border border-border-color mb-8">
            <span className="w-2 h-2 rounded-full bg-go animate-pulse" />
            <span className="text-sm text-text-secondary">by Lucete AI Lab</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
            {t.headline}
          </h1>

          <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-10">
            {t.subheadline}
          </p>

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
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-text-secondary">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">{t.howItWorks}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {t.steps.map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-blue/20 text-brand-blue font-mono font-bold text-xl mb-4">
                  {step.num}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{step.title}</h3>
                <p className="text-text-secondary">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section (Dark Mode Ver.) */}
      <section id="pricing" className="py-20 bg-bg-card">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-text-secondary">Choose the plan that fits your funding timeline</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Card 1: Single Pass ($29) - Dark Theme */}
            <div className="w-full bg-bg-surface rounded-2xl shadow-xl overflow-hidden border border-border-color hover:border-blue-500 transition-all duration-300">
              <div className="p-8">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-blue-400 tracking-wide uppercase">Single Pass</h3>
                  <div className="mt-4 flex justify-center items-baseline">
                    <span className="text-5xl font-extrabold text-white">$29</span>
                    <span className="ml-2 text-xl text-gray-400">/ one-time</span>
                  </div>
                  <p className="mt-4 text-gray-400">
                    Perfect for a final check before sending to investors.
                  </p>
                </div>
                <ul className="mt-8 space-y-4">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="ml-3 text-gray-300">1 Deck Analysis</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="ml-3 text-gray-300">Risk & Friction Check</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="ml-3 text-gray-300">PDF Report Download</span>
                  </li>
                </ul>
                <div className="mt-8">
                  {/* Single Pass Link */}
                  <a href="https://deckguard.lemonsqueezy.com/checkout/buy/51b58009-f301-47ec-af65-7ed5092d12f7" 
                     className="block w-full bg-slate-800 hover:bg-slate-700 text-white text-center font-bold py-4 rounded-xl transition duration-200 border border-slate-700">
                    Buy Single Pass
                  </a>
                </div>
              </div>
            </div>

            {/* Card 2: Pro Monthly ($99) - Dark Theme */}
            <div className="w-full bg-bg-surface rounded-2xl shadow-xl overflow-hidden border-2 border-brand-blue relative transform hover:-translate-y-1 transition-all duration-300">
              <div className="absolute top-0 right-0 bg-brand-blue text-white text-xs font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wide">
                Best Value
              </div>
              <div className="p-8">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-brand-blue tracking-wide uppercase">Pro Monthly</h3>
                  <div className="mt-4 flex justify-center items-baseline">
                    <span className="text-5xl font-extrabold text-white">$99</span>
                    <span className="ml-2 text-xl text-gray-400">/ month</span>
                  </div>
                  <p className="mt-4 text-gray-400">
                    Unlimited analysis for serious founders.
                  </p>
                </div>
                <ul className="mt-8 space-y-4">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="ml-3 text-white font-bold">Unlimited Analysis</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="ml-3 text-gray-300">Iterative Feedback Loop</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="ml-3 text-gray-300">Priority Support</span>
                  </li>
                </ul>
                <div className="mt-8">
                  {/* Monthly Link */}
                  <a href="https://deckguard.lemonsqueezy.com/checkout/buy/13684713-81a7-44e2-9316-c6d27de44357" 
                     className="block w-full bg-brand-blue hover:brightness-110 text-white text-center font-bold py-4 rounded-xl transition duration-200">
                    Subscribe Now
                  </a>
                  <p className="mt-3 text-xs text-center text-gray-500">Cancel anytime</p>
                </div>
              </div>
            </div>

          </div>
          
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
            <span>
              {language === 'en'
                ? 'Trusted by 100+ founders worldwide'
                : '전세계 100+ 창업자가 신뢰합니다'}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}