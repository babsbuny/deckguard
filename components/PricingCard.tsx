'use client';

import { useState } from 'react';
import { Check, Zap, Crown } from 'lucide-react';
import { ProductType, Currency, Language } from '@/types';

interface PricingCardProps {
  type: ProductType;
  currency: Currency;
  language: Language;
  featured?: boolean;
}

export default function PricingCard({ type, currency, language, featured }: PricingCardProps) {
  const [loading, setLoading] = useState(false);

  const content = {
    single: {
      en: {
        title: 'Single Pass',
        price: currency === 'USD' ? '$29' : '₩33,000',
        priceId: 'price_1Sl8O1QUiSBQkLZMdLPJ1gxt', 
        period: 'One-time',
        sub: 'Urgent risk check. Cheaper than a coffee chat.',
        features: [
          'One pitch deck analysis',
          'Full risk report',
          'Defense prompts included',
        ],
      },
      kr: {
        title: '1회 진단',
        price: currency === 'USD' ? '$29' : '₩33,000',
        priceId: 'price_1Sl8O2QUiSBQkLZMo79R72aW',
        period: '1회',
        sub: 'VC 커피챗 1회 비용보다 저렴하게, 이탈 요인을 사전에 점검하세요.',
        features: [
          '피치덱 1회 분석',
          '전체 리스크 리포트',
          '방어 프롬프트 포함',
        ],
      },
    },
    monthly: {
      en: {
        title: 'Monthly Pass',
        price: currency === 'USD' ? '$99' : '₩99,000',
        priceId: 'price_1Sl8O2QUiSBQkLZMRwVxCEhl',
        period: '30 days',
        sub: 'Unlimited checks until your funding round closes.',
        badge: 'Best Value',
        features: [
          'Unlimited analyses',
          '30-day access',
          'Priority support',
          'Team sharing (coming soon)',
        ],
      },
      kr: {
        title: '월간 패스',
        price: currency === 'USD' ? '$99' : '₩99,000',
        priceId: 'price_1Sl8O2QUiSBQkLZM36wF26N0',
        period: '30일',
        sub: '투자 라운드 종료까지 무제한 진단 & 수정.',
        badge: '추천',
        features: [
          '무제한 분석',
          '30일 이용권',
          '우선 지원',
          '팀 공유 (곧 출시)',
        ],
      },
    },
  };

  const t = content[type][language];

  const handleCheckout = async () => {
    setLoading(true);
    try {
      // @ts-ignore (타입 에러 무시)
      const targetPriceId = t.priceId;

      console.log('Sending Checkout Request:', { type, currency, priceId: targetPriceId }); // 확인용 로그

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            productType: type, 
            currency,
            priceId: targetPriceId 
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('Checkout Session Error:', data);
        alert('결제 세션을 만들지 못했습니다. (Stripe 설정 확인 필요)');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('결제 시작 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`relative rounded-xl border p-6 ${
        featured
          ? 'border-brand-blue bg-brand-blue/5'
          : 'border-border-color bg-bg-surface'
      }`}
    >
      {/* Badge */}
      {'badge' in t && t.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-blue text-white text-xs font-semibold">
            <Crown className="w-3 h-3" />
            {t.badge}
          </span>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">{t.title}</h3>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-4xl font-bold">{t.price}</span>
          <span className="text-text-secondary">/ {t.period}</span>
        </div>
        <p className="mt-3 text-sm text-text-secondary">{t.sub}</p>
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-6">
        {t.features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-2 text-sm">
            <Check className="w-4 h-4 text-go flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button
        onClick={handleCheckout}
        disabled={loading}
        className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
          featured
            ? 'bg-brand-blue text-white hover:brightness-110'
            : 'bg-bg-card border border-border-color hover:border-brand-blue'
        }`}
      >
        {loading ? (
          <span className="animate-spin w-5 h-5 border-2 border-current border-t-transparent rounded-full" />
        ) : (
          <>
            <Zap className="w-4 h-4" />
            {language === 'en' ? 'Get Started' : '시작하기'}
          </>
        )}
      </button>

      {/* No Refund Notice */}
      <p className="mt-4 text-xs text-text-secondary text-center">
        {language === 'en'
          ? 'Digital service. No refunds once analysis begins.'
          : '디지털 서비스이므로 분석 시작 후에는 환불이 불가합니다.'}
      </p>
    </div>
  );
}