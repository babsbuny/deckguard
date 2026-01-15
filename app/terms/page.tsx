'use client';

import { useState } from 'react';

export default function TermsPage() {
  const [language, setLanguage] = useState<'en' | 'ko'>('en');

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#A3A3A3]">
      {/* Header */}
      <header className="border-b border-[#1F1F1F] px-6 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <a href="/" className="text-[#E5E5E5] font-semibold text-lg">
            DeckGuard
          </a>
          <button
            onClick={() => setLanguage(language === 'en' ? 'ko' : 'en')}
            className="text-sm text-[#A3A3A3] hover:text-[#E5E5E5] transition-colors"
          >
            {language === 'en' ? '한국어' : 'English'}
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {language === 'en' ? (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-[#E5E5E5] mb-8">Terms of Service</h1>
            
            <p className="text-sm text-[#737373]">Last updated: January 15, 2026</p>

            <section>
              <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">1. Acceptance of Terms</h2>
              <p>By accessing and using DeckGuard ("Service"), a product of Lucete AI Lab (Business Registration No. 143-26-01816), you agree to be bound by these Terms of Service. Lucete AI Lab is the legal entity operating this service under the product name "DeckGuard". If you do not agree to these terms, please do not use the Service.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">2. Service Description</h2>
              <p>DeckGuard is an AI-powered pitch deck analysis service that provides automated feedback and scoring for startup pitch decks. The Service analyzes uploaded documents and generates reports based on established investment criteria.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">3. User Responsibilities</h2>
              <p>Users are responsible for ensuring they have the right to upload and analyze any documents submitted to the Service. Users agree not to upload confidential third-party materials without proper authorization.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">4. Payment and Refunds</h2>
              <p>All payments are processed securely through Paddle.com (our Merchant of Record). Refund Policy:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong>14-Day Refund Policy:</strong> You may request a full refund within 14 days of purchase if you have not yet initiated any analysis.</li>
                <li><strong>No refunds after analysis begins:</strong> Once you have initiated an analysis, no refunds will be provided as the digital service has been delivered.</li>
                <li><strong>Technical Issues:</strong> If you experience technical issues preventing service delivery, please contact hello@deckguard.ai within 14 days for assistance or refund consideration.</li>
              </ul>
              <p className="mt-4">To request a refund, please contact hello@deckguard.ai with your order details.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">5. Intellectual Property</h2>
              <p>Users retain all rights to their uploaded documents. DeckGuard and Lucete AI Lab claim no ownership over user-submitted content. The Service, including its AI models and analysis methodology, remains the intellectual property of Lucete AI Lab.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">6. Data Privacy</h2>
              <p>We take data privacy seriously. Uploaded documents are processed securely and are not shared with third parties. Documents are automatically deleted from our servers within 24 hours of analysis completion.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">7. Limitation of Liability</h2>
              <p>DeckGuard provides AI-generated analysis for informational purposes only. The Service does not guarantee investment outcomes or success. Lucete AI Lab shall not be liable for any decisions made based on the analysis provided.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">8. Contact Information</h2>
              <p>For questions about these Terms of Service, please contact:</p>
              <ul className="list-none mt-2 space-y-1">
                <li><strong>Business Name:</strong> Lucete AI Lab</li>
                <li><strong>Product Name:</strong> DeckGuard</li>
                <li><strong>Business Registration No.:</strong> 143-26-01816</li>
                <li><strong>Email:</strong> hello@deckguard.ai</li>
              </ul>
            </section>
          </div>
        ) : (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-[#E5E5E5] mb-8">이용약관</h1>
            
            <p className="text-sm text-[#737373]">최종 수정일: 2026년 1월 15일</p>

            <section>
              <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">제1조 (목적)</h2>
              <p>본 약관은 Lucete AI Lab(사업자등록번호: 143-26-01816, 이하 "회사")이 DeckGuard라는 서비스명으로 운영하는 서비스(이하 "서비스")의 이용조건 및 절차, 회사와 이용자의 권리, 의무, 책임사항을 규정함을 목적으로 합니다. Lucete AI Lab은 "DeckGuard"라는 제품명으로 본 서비스를 운영하는 법인입니다.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">제2조 (서비스 내용)</h2>
              <p>DeckGuard는 AI 기반 피치덱 분석 서비스로, 스타트업 피치덱에 대한 자동화된 피드백과 점수를 제공합니다. 서비스는 업로드된 문서를 분석하고 검증된 투자 기준에 따른 리포트를 생성합니다.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">제3조 (이용자 책임)</h2>
              <p>이용자는 서비스에 제출하는 모든 문서에 대한 업로드 및 분석 권한이 있음을 보장해야 합니다. 이용자는 적절한 권한 없이 제3자의 기밀 자료를 업로드하지 않을 것에 동의합니다.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">제4조 (결제 및 환불)</h2>
              <p>모든 결제는 Paddle.com(결제 대행사)을 통해 안전하게 처리됩니다. 환불 정책:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong>14일 환불 정책:</strong> 분석을 시작하지 않은 경우, 구매 후 14일 이내에 전액 환불을 요청할 수 있습니다.</li>
                <li><strong>분석 시작 후 환불 불가:</strong> 분석을 시작한 경우, 디지털 서비스가 제공된 것으로 간주되어 환불이 불가능합니다.</li>
                <li><strong>기술적 문제:</strong> 서비스 제공을 방해하는 기술적 문제가 발생한 경우, 14일 이내에 hello@deckguard.ai로 문의해 주시기 바랍니다.</li>
              </ul>
              <p className="mt-4">환불을 요청하시려면 주문 정보와 함께 hello@deckguard.ai로 연락해 주세요.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">제5조 (지적재산권)</h2>
              <p>이용자는 업로드한 문서에 대한 모든 권리를 보유합니다. DeckGuard와 Lucete AI Lab은 이용자가 제출한 콘텐츠에 대한 소유권을 주장하지 않습니다. AI 모델 및 분석 방법론을 포함한 서비스는 Lucete AI Lab의 지적재산입니다.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">제6조 (개인정보보호)</h2>
              <p>회사는 데이터 프라이버시를 중요하게 생각합니다. 업로드된 문서는 안전하게 처리되며 제3자와 공유되지 않습니다. 문서는 분석 완료 후 24시간 이내에 서버에서 자동 삭제됩니다.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">제7조 (책임의 제한)</h2>
              <p>DeckGuard는 정보 제공 목적으로만 AI 생성 분석을 제공합니다. 서비스는 투자 결과나 성공을 보장하지 않습니다. Lucete AI Lab은 제공된 분석을 기반으로 내린 결정에 대해 책임지지 않습니다.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#E5E5E5] mt-8 mb-4">제8조 (연락처)</h2>
              <p>본 이용약관에 대한 문의사항은 아래로 연락해 주세요:</p>
              <ul className="list-none mt-2 space-y-1">
                <li><strong>상호명:</strong> Lucete AI Lab</li>
                <li><strong>서비스명:</strong> DeckGuard</li>
                <li><strong>사업자등록번호:</strong> 143-26-01816</li>
                <li><strong>이메일:</strong> hello@deckguard.ai</li>
              </ul>
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1F1F1F] px-6 py-8 mt-12">
        <div className="max-w-4xl mx-auto text-center text-sm text-[#737373]">
          <p>© 2026 Lucete AI Lab. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
