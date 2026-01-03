'use client';

import { useState, useEffect } from 'react';
import { Language } from '@/types';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
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
          {language === 'en' ? 'Terms of Service' : '이용약관'}
        </h1>

        <div className="prose prose-invert max-w-none text-[#A3A3A3] space-y-6">
          {language === 'en' ? (
            <>
              <p className="text-sm">Last updated: January 2026</p>

              <section>
                <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">1. Acceptance of Terms</h2>
                <p>By accessing and using DeckGuard ("Service"), operated by Lucete AI Lab, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">2. Description of Service</h2>
                <p>DeckGuard is an AI-powered pitch deck communication risk analysis service. The Service analyzes uploaded pitch decks and provides feedback on potential investor friction points. This Service does not guarantee investment success or provide investment advice.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">3. User Obligations</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You must be at least 18 years old to use this Service.</li>
                  <li>You are responsible for maintaining the confidentiality of your account.</li>
                  <li>You agree not to upload any illegal, harmful, or infringing content.</li>
                  <li>You retain all ownership rights to your uploaded documents.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">4. Payment and Refunds</h2>
                <p>All payments are processed securely through our payment provider. As this is a digital service, <strong>no refunds are available once analysis has begun</strong>. Please review your documents before initiating analysis.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">5. Intellectual Property</h2>
                <p>The Service, including its design, features, and content, is owned by Lucete AI Lab. Your uploaded documents remain your property. We do not claim any ownership over your content.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">6. Disclaimer of Warranties</h2>
                <p>The Service is provided "as is" without warranties of any kind. We do not guarantee that the analysis will result in successful fundraising. The Service is for communication risk assessment only and should not be considered investment advice.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">7. Limitation of Liability</h2>
                <p>Lucete AI Lab shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Service.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">8. Modifications</h2>
                <p>We reserve the right to modify these terms at any time. Continued use of the Service after changes constitutes acceptance of the modified terms.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">9. Contact</h2>
                <p>For questions about these Terms, please contact us at hello@deckguard.ai</p>
              </section>
            </>
          ) : (
            <>
              <p className="text-sm">최종 수정일: 2026년 1월</p>

              <section>
                <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">제1조 (목적)</h2>
                <p>본 약관은 Lucete AI Lab(이하 "회사")이 운영하는 DeckGuard 서비스(이하 "서비스")의 이용조건 및 절차, 회사와 이용자의 권리, 의무, 책임사항을 규정함을 목적으로 합니다.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">제2조 (서비스의 내용)</h2>
                <p>DeckGuard는 AI 기반 피치덱 커뮤니케이션 리스크 분석 서비스입니다. 본 서비스는 업로드된 피치덱을 분석하여 투자자 이탈 요인에 대한 피드백을 제공합니다. 본 서비스는 투자 성공을 보장하지 않으며, 투자 조언을 제공하지 않습니다.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">제3조 (이용자의 의무)</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>이용자는 만 18세 이상이어야 합니다.</li>
                  <li>이용자는 자신의 계정 정보를 안전하게 관리할 책임이 있습니다.</li>
                  <li>이용자는 불법적이거나 유해한 콘텐츠를 업로드해서는 안 됩니다.</li>
                  <li>업로드된 문서에 대한 모든 소유권은 이용자에게 있습니다.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">제4조 (결제 및 환불)</h2>
                <p>모든 결제는 보안 결제 시스템을 통해 처리됩니다. 본 서비스는 디지털 서비스이므로, <strong>분석이 시작된 후에는 환불이 불가능합니다</strong>. 분석을 시작하기 전에 문서를 확인해 주시기 바랍니다.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">제5조 (지적재산권)</h2>
                <p>서비스의 디자인, 기능 및 콘텐츠에 대한 지적재산권은 Lucete AI Lab에 있습니다. 이용자가 업로드한 문서의 소유권은 이용자에게 있으며, 회사는 이에 대한 권리를 주장하지 않습니다.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">제6조 (면책조항)</h2>
                <p>서비스는 "있는 그대로" 제공되며, 어떠한 종류의 보증도 제공하지 않습니다. 회사는 분석 결과가 성공적인 투자 유치로 이어질 것을 보장하지 않습니다. 본 서비스는 커뮤니케이션 리스크 평가만을 위한 것이며, 투자 조언으로 간주되어서는 안 됩니다.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">제7조 (책임의 제한)</h2>
                <p>회사는 서비스 이용으로 인한 간접적, 우발적, 특수적 또는 결과적 손해에 대해 책임을 지지 않습니다.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">제8조 (약관의 변경)</h2>
                <p>회사는 필요한 경우 본 약관을 변경할 수 있으며, 변경된 약관은 서비스 내 공지를 통해 효력이 발생합니다.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">제9조 (문의)</h2>
                <p>본 약관에 대한 문의사항은 hello@deckguard.ai로 연락해 주시기 바랍니다.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">부칙</h2>
                <p>본 약관은 2026년 1월 1일부터 시행됩니다.</p>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
