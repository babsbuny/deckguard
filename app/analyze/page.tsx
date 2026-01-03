'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { UploadCloud, Loader2, FileText, AlertTriangle, RefreshCw, Zap } from 'lucide-react';

// 타입 정의
type Language = 'en' | 'kr';
type Currency = 'USD' | 'KRW';
type Stage = 'pre-seed' | 'seed' | 'pre-a' | 'series-a';

// 스테이지 목록
const STAGES: Stage[] = ['pre-seed', 'seed', 'pre-a', 'series-a'];

// 스테이지 라벨 (양국어)
const STAGE_LABELS: Record<Stage, Record<Language, string>> = {
  'pre-seed': { en: 'Pre-Seed (Concept Verification)', kr: 'Pre-Seed (가설 검증 단계)' },
  'seed': { en: 'Seed (MVP & Traction)', kr: 'Seed (MVP 및 초기 지표)' },
  'pre-a': { en: 'Pre-A (Early Growth)', kr: 'Pre-A (초기 성장)' },
  'series-a': { en: 'Series A (Growth & Scale)', kr: 'Series A (성장 및 확장)' },
};

// 터미널 로그 메시지 (8단계)
const TERMINAL_MESSAGES = [
  { en: 'Initializing DeckGuard v1.0...', kr: 'DeckGuard v1.0 초기화 중...' },
  { en: 'Processing uploaded document...', kr: '업로드된 문서 처리 중...' },
  { en: 'Extracting text content...', kr: '텍스트 콘텐츠 추출 중...' },
  { en: 'Analyzing market logic...', kr: '시장 논리 분석 중...' },
  { en: 'Checking business model clarity...', kr: '비즈니스 모델 명확성 확인 중...' },
  { en: 'Evaluating unit economics...', kr: '유닛 이코노믹스 평가 중...' },
  { en: 'Validating stage alignment...', kr: '투자 단계 정합성 검증 중...' },
  { en: 'Analysis complete.', kr: '분석 완료.' },
];

// UI 텍스트 (양국어)
const UI_TEXT = {
  title: { en: 'Upload Your Pitch Deck', kr: '피치덱 업로드' },
  limit: { en: 'Max 20 pages, 15MB', kr: '최대 20페이지, 15MB' },
  selectStage: { en: 'Select Your Stage', kr: '투자 단계 선택' },
  dragDrop: { en: 'Drag and drop your PDF here', kr: 'PDF 파일을 여기에 드래그하세요' },
  or: { en: 'or', kr: '또는' },
  browse: { en: 'Browse files', kr: '파일 선택' },
  ready: { en: 'Ready to analyze', kr: '분석 준비 완료' },
  analyze: { en: 'Scan My Deck', kr: '내 덱 리스크 진단' },
  analyzing: { en: 'AI Analyzing...', kr: 'AI 분석 중...' },
  analyzeAnother: { en: 'Analyze Another Deck', kr: '다른 덱 분석하기' },
  validating: { en: 'Validating session...', kr: '세션 확인 중...' },
  sessionError: { en: 'Session Error', kr: '세션 오류' },
  redirecting: { en: 'Redirecting to home...', kr: '홈으로 이동 중...' },
};

export default function AnalyzePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get('session_id');

  // State
  const [language, setLanguage] = useState<Language>('en');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [stage, setStage] = useState<Stage>('seed');
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isBootstrapped, setIsBootstrapped] = useState(false);
  const [terminalStep, setTerminalStep] = useState(0);

  // Header 토글 이벤트 연동
  useEffect(() => {
    const savedLang = localStorage.getItem('deckguard_lang') as Language;
    const savedCurrency = localStorage.getItem('deckguard_currency') as Currency;
    if (savedLang) setLanguage(savedLang);
    if (savedCurrency) setCurrency(savedCurrency);

    const handleLanguageChange = (e: CustomEvent) => setLanguage(e.detail as Language);
    const handleCurrencyChange = (e: CustomEvent) => setCurrency(e.detail as Currency);

    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    window.addEventListener('currencyChange', handleCurrencyChange as EventListener);

    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
      window.removeEventListener('currencyChange', handleCurrencyChange as EventListener);
    };
  }, []);

  // 레몬스퀴지용 - 결제 완료 후 바로 접근 허용
  useEffect(() => {
    setIsBootstrapped(true);
  }, []);

  // 터미널 애니메이션
  useEffect(() => {
    if (isAnalyzing && terminalStep < TERMINAL_MESSAGES.length) {
      const timer = setTimeout(() => {
        setTerminalStep(prev => prev + 1);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isAnalyzing, terminalStep]);

  // 파일 선택
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // 파일 검증
      if (selectedFile.type !== 'application/pdf') {
        setError(language === 'en' ? 'Only PDF files are accepted' : 'PDF 파일만 업로드 가능합니다');
        return;
      }
      if (selectedFile.size > 15 * 1024 * 1024) {
        setError(language === 'en' ? 'File size exceeds 15MB limit' : '파일 크기가 15MB를 초과합니다');
        return;
      }
      
      setFile(selectedFile);
      setError(null);
    }
  };

  // 드래그 앤 드롭
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      
      if (droppedFile.type !== 'application/pdf') {
        setError(language === 'en' ? 'Only PDF files are accepted' : 'PDF 파일만 업로드 가능합니다');
        return;
      }
      if (droppedFile.size > 15 * 1024 * 1024) {
        setError(language === 'en' ? 'File size exceeds 15MB limit' : '파일 크기가 15MB를 초과합니다');
        return;
      }
      
      setFile(droppedFile);
      setError(null);
    }
  };

  // 분석 실행
  const handleAnalyze = async () => {
    if (!file || !sessionId) return;

    setIsAnalyzing(true);
    setTerminalStep(0);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('sessionId', sessionId);
      formData.append('stage', stage);
      formData.append('language', language);

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Analysis failed');
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || (language === 'en' ? 'Analysis failed' : '분석에 실패했습니다'));
    } finally {
      setIsAnalyzing(false);
    }
  };

  // 파일 크기 포맷
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // ===== 화면 1: 세션 검증 중 =====
  if (!isBootstrapped && !error) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-[#2563EB] border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-[#A3A3A3]">{UI_TEXT.validating[language]}</p>
        </div>
      </div>
    );
  }

  // ===== 화면 2: 세션 오류 =====
  if (error && !result && !isAnalyzing) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-[#FF003C]/20 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-[#FF003C]" />
          </div>
          <h2 className="text-xl font-semibold text-[#E5E5E5] mb-2">{UI_TEXT.sessionError[language]}</h2>
          <p className="text-[#A3A3A3] mb-4">{error}</p>
          <p className="text-sm text-[#A3A3A3]">{UI_TEXT.redirecting[language]}</p>
        </div>
      </div>
    );
  }

  // ===== 화면 3: 분석 중 (터미널) =====
  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-[#121212] border border-[#333333] rounded-xl overflow-hidden">
            {/* 터미널 헤더 */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#333333] bg-[#1a1a1a]">
              <div className="w-3 h-3 rounded-full bg-[#FF003C]" />
              <div className="w-3 h-3 rounded-full bg-[#FFD600]" />
              <div className="w-3 h-3 rounded-full bg-[#00FF94]" />
              <span className="ml-2 text-sm text-[#A3A3A3] font-mono">DeckGuard Terminal</span>
            </div>

            {/* 터미널 내용 */}
            <div className="p-6 font-mono text-sm min-h-[300px]">
              {TERMINAL_MESSAGES.slice(0, terminalStep).map((msg, idx) => (
                <div key={idx} className={`mb-2 ${idx === TERMINAL_MESSAGES.length - 1 ? 'text-[#00FF94]' : 'text-[#A3A3A3]'}`}>
                  <span className="text-[#A3A3A3] mr-2">$</span>
                  {msg[language]}
                  {idx === TERMINAL_MESSAGES.length - 1 && <span className="ml-2">✓</span>}
                </div>
              ))}
              
              {terminalStep < TERMINAL_MESSAGES.length && (
                <div className="flex items-center gap-2 text-[#2563EB]">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{TERMINAL_MESSAGES[terminalStep][language]}</span>
                </div>
              )}
            </div>

            {/* 프로그레스 바 */}
            <div className="px-6 pb-4">
              <div className="h-1 bg-[#1a1a1a] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#2563EB] transition-all duration-300"
                  style={{ width: `${(terminalStep / TERMINAL_MESSAGES.length) * 100}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-[#A3A3A3] text-center">
                Step {Math.min(terminalStep + 1, TERMINAL_MESSAGES.length)} of {TERMINAL_MESSAGES.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ===== 화면 4: 결과 표시 =====
  if (result) {
    const verdictColors = {
      GO: { bg: 'bg-[#00FF94]/10', border: 'border-[#00FF94]', text: 'text-[#00FF94]' },
      HOLD: { bg: 'bg-[#FFD600]/10', border: 'border-[#FFD600]', text: 'text-[#FFD600]' },
      NO_GO: { bg: 'bg-[#FF003C]/10', border: 'border-[#FF003C]', text: 'text-[#FF003C]' },
    };
    const colors = verdictColors[result.verdict as keyof typeof verdictColors] || verdictColors.HOLD;

    return (
      <div className="min-h-screen bg-[#050505] py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* 메인 결과 카드 */}
          <div className={`rounded-xl border ${colors.border} ${colors.bg} p-8 mb-6`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-[#A3A3A3] mb-1">{language === 'en' ? 'Verdict' : '판정'}</p>
                <h2 className={`text-3xl font-bold ${colors.text}`}>
                  {result.verdict === 'GO' 
                    ? (language === 'en' ? 'Ready to Send' : '발송 가능')
                    : result.verdict === 'HOLD'
                    ? (language === 'en' ? 'Review Required' : '검토 필요')
                    : (language === 'en' ? 'High Risk' : '고위험')}
                </h2>
              </div>
              <div className={`px-4 py-2 rounded-lg ${colors.bg}`}>
                <p className="text-xs text-[#A3A3A3]">{language === 'en' ? 'Confidence' : '신뢰도'}</p>
                <p className={`font-semibold ${colors.text}`}>
                  {result.confidence === 'high' 
                    ? (language === 'en' ? 'High' : '높음')
                    : result.confidence === 'medium'
                    ? (language === 'en' ? 'Medium' : '보통')
                    : (language === 'en' ? 'Low' : '낮음')}
                </p>
              </div>
            </div>

            <div className="bg-[#121212] rounded-lg p-4">
              <p className="text-[#E5E5E5]">{result.rationale}</p>
            </div>

            {/* 태그 */}
            {result.tags && result.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {result.tags.map((tag: string, idx: number) => (
                  <span key={idx} className="px-3 py-1 rounded-full bg-[#121212] border border-[#333333] text-sm text-[#A3A3A3]">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* 마찰 포인트 */}
          {result.friction_points && result.friction_points.length > 0 && (
            <div className="bg-[#121212] border border-[#333333] rounded-xl p-6 mb-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-[#E5E5E5] mb-4">
                <AlertTriangle className="w-5 h-5 text-[#FFD600]" />
                {language === 'en' ? 'Friction Points' : '이탈 요인'}
              </h3>
              <div className="space-y-4">
                {result.friction_points.map((point: any, idx: number) => (
                  <div key={idx} className="p-4 rounded-lg bg-[#1a1a1a] border-l-4"
                    style={{ borderColor: point.severity === 'high' ? '#FF003C' : point.severity === 'medium' ? '#FFD600' : '#A3A3A3' }}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-[#E5E5E5]">{point.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded ${
                        point.severity === 'high' ? 'bg-[#FF003C]/20 text-[#FF003C]' :
                        point.severity === 'medium' ? 'bg-[#FFD600]/20 text-[#FFD600]' :
                        'bg-[#A3A3A3]/20 text-[#A3A3A3]'
                      }`}>
                        {point.severity?.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-[#A3A3A3]">{point.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 다시 분석 버튼 */}
          <button
            onClick={() => { setFile(null); setResult(null); }}
            className="w-full py-4 bg-[#121212] border border-[#333333] rounded-xl text-[#E5E5E5] hover:border-[#2563EB] transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            {UI_TEXT.analyzeAnother[language]}
          </button>
        </div>
      </div>
    );
  }

  // ===== 화면 5: 파일 업로드 (메인) =====
  return (
    <div className="min-h-screen bg-[#050505] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-[#E5E5E5] mb-2">
            {UI_TEXT.title[language]}
          </h1>
          <p className="text-[#A3A3A3]">{UI_TEXT.limit[language]}</p>
        </div>

        {/* 스테이지 선택 */}
        <div className="mb-8">
          <p className="text-sm text-[#A3A3A3] mb-3">{UI_TEXT.selectStage[language]}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {STAGES.map((s) => (
              <button
                key={s}
                onClick={() => setStage(s)}
                className={`p-4 rounded-xl border text-sm font-medium transition-all h-24 flex items-center justify-center text-center ${
                  stage === s
                    ? 'border-[#2563EB] bg-[#2563EB]/10 text-[#2563EB]'
                    : 'border-[#333333] bg-[#121212] text-[#A3A3A3] hover:border-[#A3A3A3]'
                }`}
              >
                {STAGE_LABELS[s][language]}
              </button>
            ))}
          </div>
        </div>

        {/* 파일 업로드 */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-16 transition-all relative cursor-pointer ${
            file
              ? 'border-[#2563EB] bg-[#2563EB]/5'
              : 'border-[#333333] bg-[#121212]/50 hover:border-[#A3A3A3]'
          }`}
        >
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          <div className="flex flex-col items-center pointer-events-none">
            {file ? (
              <>
                <FileText className="w-12 h-12 text-[#2563EB] mb-4" />
                <span className="text-lg font-bold text-[#E5E5E5]">{file.name}</span>
                <span className="text-sm text-[#A3A3A3] mt-1">{formatFileSize(file.size)}</span>
                <span className="text-sm text-[#00FF94] mt-2">{UI_TEXT.ready[language]}</span>
              </>
            ) : (
              <>
                <UploadCloud className="w-12 h-12 text-[#A3A3A3] mb-4" />
                <h3 className="text-lg font-medium text-[#E5E5E5] mb-2">{UI_TEXT.dragDrop[language]}</h3>
                <span className="text-sm text-[#A3A3A3] mb-4">{UI_TEXT.or[language]}</span>
                <span className="px-6 py-2 bg-[#2563EB] text-white text-sm font-medium rounded-lg">
                  {UI_TEXT.browse[language]}
                </span>
                <p className="text-xs text-[#A3A3A3] mt-4">{UI_TEXT.limit[language]}</p>
              </>
            )}
          </div>
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div className="mt-6 p-4 rounded-xl bg-[#FF003C]/10 border border-[#FF003C]/50 text-[#FF003C] flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            {error}
          </div>
        )}

        {/* 분석 버튼 */}
        <button
          onClick={handleAnalyze}
          disabled={!file}
          className={`w-full mt-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
            file
              ? 'bg-[#2563EB] text-white hover:brightness-110'
              : 'bg-[#121212] text-[#A3A3A3] cursor-not-allowed'
          }`}
        >
          <Zap className="w-5 h-5" />
          {UI_TEXT.analyze[language]}
        </button>
      </div>
    </div>
  );
}
