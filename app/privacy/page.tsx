'use client';

import { useState, useEffect } from 'react';
import { Language } from '@/types';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
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

  return (
    <div className="min-h-screen bg-[#050505] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-[#A3A3A3] hover:text-[#E5E5E5] mb-8">
          <ArrowLeft className="w-4 h-4" />
          {language === 'en' ? 'Back to Home' : '홈으로 돌아가기'}
        </Link>

        <h1 className="text-3xl font-bold text-[#E5E5E5] mb-8">
          {language === 'en' ? 'Privacy Policy' : '개인정보처리방침'}
        </h1>

        <div className="prose prose-invert max-w-none text-[#A3A3A3] space-y-6">
          {language === 'en' ? (
            <>
              <p className="text-sm">Last updated: January 2026</p>

              <section>
                <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">1. Introduction</h2>
                <p>Lucete AI Lab ("we", "us", "our") operates DeckGuard. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Service.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">2. Information We Collect</h2>
                <h3 className="text-lg font-medium text-[#E5E5E5] mt-4 mb-2">Information You Provide</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Email address (for account and communication)</li>
                  <li>Payment information (processed securely by our payment provider)</li>
                  <li>Uploaded pitch deck documents (for analysis purposes)</li>
                </ul>
                <h3 className="text-lg font-medium text-[#E5E5E5] mt-4 mb-2">Automatically Collected Information</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Device and browser information</li>
                  <li>IP address</li>
                  <li>Usage data and analytics</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">3. How We Use Your Information</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>To provide and maintain our Service</li>
                  <li>To process your payments</li>
                  <li>To analyze your pitch deck and provide feedback</li>
                  <li>To communicate with you about the Service</li>
                  <li>To improve our Service</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">4. Data Retention</h2>
                <p>Uploaded documents are retained for 24 hours for caching purposes and to provide consistent analysis results. After this period, documents are automatically deleted. Analysis results may be retained for service improvement purposes.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">5. Data Security</h2>
                <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure. We strive to use commercially acceptable means to protect your data.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">6. Third-Party Services</h2>
                <p>We use third-party services for payment processing and analytics. These services have their own privacy policies governing the use of your information.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">7. Your Rights</h2>
                <p>You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at hello@deckguard.ai</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">8. Changes to This Policy</h2>
                <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">9. Contact Us</h2>
                <p>If you have questions about this Privacy Policy, please contact us at hello@deckguard.ai</p>
              </section>
            </>
          ) : (
            <>
              <p className="text-sm">최종 수정일: 2026년 1월</p>

              <section>
                <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">제1조 (개인정보의 처리 목적)</h2>
                <p>Lucete AI Lab(이하 "회사")은 DeckGuard 서비스(이하 "서비스") 제공을 위해 다음의 목적으로 개인정보를 처리합니다.</p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>서비스 제공 및 운영</li>
                  <li>결제 처리</li>
                  <li>피치덱 분석 및 피드백 제공</li>
                  <li>서비스 관련 안내 및 문의 응대</li>
                  <li>서비스 개선</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">제2조 (수집하는 개인정보 항목)</h2>
                <h3 className="text-lg font-medium text-[#E5E5E5] mt-4 mb-2">이용자가 제공하는 정보</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>이메일 주소 (계정 및 커뮤니케이션용)</li>
                  <li>결제 정보 (결제 대행사를 통해 안전하게 처리)</li>
                  <li>업로드된 피치덱 문서 (분석 목적)</li>
                </ul>
                <h3 className="text-lg font-medium text-[#E5E5E5] mt-4 mb-2">자동으로 수집되는 정보</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>기기 및 브라우저 정보</li>
                  <li>IP 주소</li>
                  <li>서비스 이용 기록</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">제3조 (개인정보의 보유 및 이용기간)</h2>
                <p>업로드된 문서는 캐싱 및 일관된 분석 결과 제공을 위해 24시간 동안 보관됩니다. 이 기간이 지나면 문서는 자동으로 삭제됩니다. 분석 결과는 서비스 개선 목적으로 보관될 수 있습니다.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">제4조 (개인정보의 안전성 확보조치)</h2>
                <p>회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>개인정보의 암호화</li>
                  <li>해킹 등에 대비한 기술적 대책</li>
                  <li>개인정보 접근 제한</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">제5조 (제3자 제공)</h2>
                <p>회사는 결제 처리 및 분석을 위해 제3자 서비스를 이용합니다. 해당 서비스들은 자체적인 개인정보처리방침을 가지고 있습니다.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">제6조 (정보주체의 권리)</h2>
                <p>이용자는 언제든지 자신의 개인정보에 대한 열람, 정정, 삭제를 요청할 수 있습니다. 해당 권리 행사를 원하시면 hello@deckguard.ai로 연락해 주시기 바랍니다.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">제7조 (개인정보 보호책임자)</h2>
                <p>회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
                <ul className="list-none pl-6 space-y-1 mt-2">
                  <li>회사명: Lucete AI Lab</li>
                  <li>이메일: hello@deckguard.ai</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">제8조 (개인정보처리방침 변경)</h2>
                <p>이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">부칙</h2>
                <p>본 방침은 2026년 1월 1일부터 시행됩니다.</p>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
