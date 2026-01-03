'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import FileUpload from '@/components/FileUpload';
import TerminalLog from '@/components/TerminalLog';
import ResultCard from '@/components/ResultCard';
import { Stage, Language, Analysis } from '@/types';
import { t, getStageLabel } from '@/lib/i18n';

const STAGES: Stage[] = ['pre-seed', 'seed', 'pre-a', 'series-a'];

export default function AnalyzePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get('session_id');

  const [language, setLanguage] = useState<Language>('en');
  const [stage, setStage] = useState<Stage>('seed');
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<Analysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isBootstrapped, setIsBootstrapped] = useState(false);

  // Bootstrap session on mount
  useEffect(() => {
    // 1. 세션 ID가 없으면 홈으로 보냄 (이건 유지)
    if (!sessionId) {
      router.push('/');
      return;
    }

    // 👇 [수정됨] "프리패스" 로직 적용!
    // 서버에 영수증 검사(fetch)를 하지 않고 바로 통과시킵니다.
    console.log("Bypassing session check for testing...");
    setIsBootstrapped(true);

    // 원래 있던 엄격한 검사 코드는 주석 처리함 (나중에 필요하면 살리세요)
    /*
    async function bootstrap() {
      try {
        const response = await fetch('/api/session/bootstrap', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Session validation failed');
        }

        setIsBootstrapped(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to validate session');
        setTimeout(() => router.push('/'), 3000);
      }
    }
    bootstrap();
    */
  }, [sessionId, router]);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!file || !sessionId) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      // Create form data
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
        const data = await response.json();
        throw new Error(data.error || 'Analysis failed');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Show loading state while bootstrapping
  if (!isBootstrapped && !error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-brand-blue border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-text-secondary">Validating session...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && !result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-no-go/20 flex items-center justify-center mx-auto mb-4">
            <span className="text-no-go text-2xl">!</span>
          </div>
          <h2 className="text-xl font-semibold mb-2">Session Error</h2>
          <p className="text-text-secondary mb-4">{error}</p>
          <p className="text-sm text-text-secondary">Redirecting to home...</p>
        </div>
      </div>
    );
  }

  // Show result
  if (result) {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <ResultCard analysis={result} language={language} />
          <div className="mt-8 text-center">
            <button
              onClick={() => {
                setResult(null);
                setFile(null);
              }}
              className="px-6 py-3 bg-bg-card border border-border-color rounded-lg hover:border-brand-blue transition-all"
            >
              {language === 'en' ? 'Analyze Another Deck' : '다른 덱 분석하기'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show analyzing state
  if (isAnalyzing) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="max-w-2xl w-full">
          <TerminalLog />
        </div>
      </div>
    );
  }

  // Show upload form
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">
            {t('uploadTitle', language)}
          </h1>
          <p className="text-text-secondary">
            {t('uploadLimit', language)}
          </p>
        </div>

        {/* Stage Selector */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-3">
            {t('stageLabel', language)}
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {STAGES.map((s) => (
              <button
                key={s}
                onClick={() => setStage(s)}
                className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                  stage === s
                    ? 'border-brand-blue bg-brand-blue/10 text-brand-blue'
                    : 'border-border-color hover:border-text-secondary'
                }`}
              >
                {getStageLabel(s, language)}
              </button>
            ))}
          </div>
        </div>

        {/* File Upload */}
        <FileUpload
          onFileSelect={handleFileSelect}
          selectedFile={file}
          language={language}
        />

        {/* Error Display */}
        {error && (
          <div className="mt-4 p-4 rounded-lg bg-no-go/10 border border-no-go text-no-go">
            {error}
          </div>
        )}

        {/* Analyze Button */}
        <button
          onClick={handleAnalyze}
          disabled={!file}
          className={`w-full mt-8 py-4 rounded-lg font-semibold text-lg transition-all ${
            file
              ? 'bg-brand-blue text-white hover:brightness-110'
              : 'bg-bg-card text-text-secondary cursor-not-allowed'
          }`}
        >
          {t('analyzeButton', language)}
        </button>
      </div>
    </div>
  );
}