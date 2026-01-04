'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Key, Loader2, CheckCircle, AlertTriangle, HelpCircle } from 'lucide-react';

type Language = 'en' | 'kr';

const UI_TEXT = {
  title: {
    en: 'Activate Your Monthly Pass',
    kr: '월간 멤버십 인증'
  },
  subtitle: {
    en: 'Enter the license key sent to your email after purchase.',
    kr: '구매 후 이메일로 발급된 라이선스 키를 입력해 주세요.'
  },
  noLogin: {
    en: 'No login required. Instant activation with your license key.',
    kr: '로그인 없이 라이선스 키로 즉시 인증됩니다.'
  },
  singlePassNote: {
    en: 'Single Pass users do not need this page.',
    kr: 'Single Pass(1회권) 이용자는 이 페이지를 사용할 필요가 없습니다.'
  },
  inputLabel: {
    en: 'License Key',
    kr: '라이선스 키'
  },
  inputPlaceholder: {
    en: 'e.g. 5E22-XXXX-XXXX-XXXX',
    kr: '예: 5E22-XXXX-XXXX-XXXX'
  },
  activateBtn: {
    en: 'Activate Membership',
    kr: '멤버십 인증하기'
  },
  activating: {
    en: 'Activating...',
    kr: '인증 중...'
  },
  successMsg: {
    en: 'Membership activated! Redirecting to service...',
    kr: '멤버십 인증 완료! 서비스로 이동합니다...'
  },
  errorInvalid: {
    en: 'Invalid license key. Please check your email and try again.',
    kr: '라이선스 키가 유효하지 않습니다. 이메일을 다시 확인해주세요.'
  },
  errorEmpty: {
    en: 'Please enter your license key.',
    kr: '라이선스 키를 입력해주세요.'
  },
  errorExpired: {
    en: 'This license has expired. Please renew your subscription.',
    kr: '라이선스가 만료되었습니다. 구독을 갱신해주세요.'
  },
  faqTitle: {
    en: 'Need Help?',
    kr: '도움이 필요하신가요?'
  },
  faq1Q: {
    en: 'Where can I find my license key?',
    kr: '라이선스 키는 어디에 있나요?'
  },
  faq1A: {
    en: 'Lemon Squeezy sends it to your email after purchase.',
    kr: '구매 시 레몬스퀴지가 이메일로 보내드립니다.'
  },
  faq2Q: {
    en: "I purchased Monthly Pass but don't have a key?",
    kr: 'Monthly Pass를 구매했는데 키가 없어요?'
  },
  faq2A: {
    en: 'Please check your spam folder.',
    kr: '이메일 스팸함도 확인해주세요.'
  },
  faq3Q: {
    en: 'I purchased Single Pass?',
    kr: 'Single Pass 구매자인데요?'
  },
  faq3A: {
    en: 'Single Pass does not require a key. Use the service directly after payment.',
    kr: 'Single Pass는 키가 필요 없습니다. 결제 후 바로 서비스를 이용하세요.'
  },
};

export default function ActivatePage() {
  const router = useRouter();
  const [language, setLanguage] = useState<Language>('en');
  const [licenseKey, setLicenseKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Header 언어 토글 연동
  useEffect(() => {
    const savedLang = localStorage.getItem('deckguard_lang') as Language;
    if (savedLang) setLanguage(savedLang);

    const handleLanguageChange = (e: CustomEvent) => setLanguage(e.detail as Language);
    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    return () => window.removeEventListener('languageChange', handleLanguageChange as EventListener);
  }, []);

  const handleActivate = async () => {
    // 빈 입력 체크
    if (!licenseKey.trim()) {
      setError(UI_TEXT.errorEmpty[language]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/activate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ licenseKey: licenseKey.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error === 'expired') {
          setError(UI_TEXT.errorExpired[language]);
        } else {
          setError(UI_TEXT.errorInvalid[language]);
        }
        return;
      }

      // 성공
      setSuccess(true);
      
      // 로컬스토리지에 라이선스 저장 (세션 유지용)
      localStorage.setItem('deckguard_license', licenseKey.trim());
      
      // 2초 후 analyze 페이지로 이동
      setTimeout(() => {
        router.push('/analyze');
      }, 2000);

    } catch (err) {
      setError(UI_TEXT.errorInvalid[language]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleActivate();
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] py-16 px-4">
      <div className="max-w-md mx-auto">
        
        {/* 메인 카드 */}
        <div className="bg-[#121212] border border-[#333333] rounded-2xl p-8 shadow-2xl">
          
          {/* 아이콘 */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-[#2563EB]/20 flex items-center justify-center">
              <Key className="w-8 h-8 text-[#2563EB]" />
            </div>
          </div>

          {/* 제목 */}
          <h1 className="text-2xl font-bold text-[#E5E5E5] text-center mb-2">
            {UI_TEXT.title[language]}
          </h1>

          {/* 설명 */}
          <p className="text-[#A3A3A3] text-center text-sm mb-2">
            {UI_TEXT.subtitle[language]}
          </p>
          <p className="text-[#A3A3A3] text-center text-sm mb-6">
            {UI_TEXT.noLogin[language]}
          </p>

          {/* Single Pass 안내 */}
          <div className="bg-[#1a1a1a] rounded-lg p-3 mb-6">
            <p className="text-xs text-[#A3A3A3] text-center">
              💡 {UI_TEXT.singlePassNote[language]}
            </p>
          </div>

          {/* 성공 상태 */}
          {success ? (
            <div className="bg-[#00FF94]/10 border border-[#00FF94] rounded-xl p-6 text-center">
              <CheckCircle className="w-12 h-12 text-[#00FF94] mx-auto mb-4" />
              <p className="text-[#00FF94] font-medium">{UI_TEXT.successMsg[language]}</p>
            </div>
          ) : (
            <>
              {/* 입력 폼 */}
              <div className="mb-4">
                <label className="block text-sm text-[#A3A3A3] mb-2">
                  {UI_TEXT.inputLabel[language]}
                </label>
                <input
                  type="text"
                  value={licenseKey}
                  onChange={(e) => setLicenseKey(e.target.value.toUpperCase())}
                  onKeyPress={handleKeyPress}
                  placeholder={UI_TEXT.inputPlaceholder[language]}
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#333333] rounded-lg text-[#E5E5E5] placeholder-[#666666] focus:border-[#2563EB] focus:outline-none font-mono tracking-wider"
                  disabled={isLoading}
                />
              </div>

              {/* 에러 메시지 */}
              {error && (
                <div className="mb-4 p-3 bg-[#FF003C]/10 border border-[#FF003C]/50 rounded-lg flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#FF003C] flex-shrink-0" />
                  <p className="text-sm text-[#FF003C]">{error}</p>
                </div>
              )}

              {/* 인증 버튼 */}
              <button
                onClick={handleActivate}
                disabled={isLoading}
                className="w-full py-4 bg-[#2563EB] text-white font-semibold rounded-xl hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {UI_TEXT.activating[language]}
                  </>
                ) : (
                  <>
                    <Key className="w-5 h-5" />
                    {UI_TEXT.activateBtn[language]}
                  </>
                )}
              </button>
            </>
          )}
        </div>

        {/* FAQ 섹션 */}
        <div className="mt-8 bg-[#121212] border border-[#333333] rounded-xl p-6">
          <h3 className="flex items-center gap-2 text-[#E5E5E5] font-semibold mb-4">
            <HelpCircle className="w-5 h-5 text-[#2563EB]" />
            {UI_TEXT.faqTitle[language]}
          </h3>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-[#E5E5E5] font-medium">{UI_TEXT.faq1Q[language]}</p>
              <p className="text-sm text-[#A3A3A3] mt-1">→ {UI_TEXT.faq1A[language]}</p>
            </div>
            <div>
              <p className="text-sm text-[#E5E5E5] font-medium">{UI_TEXT.faq2Q[language]}</p>
              <p className="text-sm text-[#A3A3A3] mt-1">→ {UI_TEXT.faq2A[language]}</p>
            </div>
            <div>
              <p className="text-sm text-[#E5E5E5] font-medium">{UI_TEXT.faq3Q[language]}</p>
              <p className="text-sm text-[#A3A3A3] mt-1">→ {UI_TEXT.faq3A[language]}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
