'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ResultCard from '@/components/ResultCard';
import { Analysis, Language } from '@/types';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ResultPage() {
  const params = useParams();
  const id = params.id as string;

  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    async function fetchAnalysis() {
      try {
        const response = await fetch(`/api/analyze?id=${id}`);
        if (!response.ok) {
          throw new Error('Analysis not found');
        }
        const data = await response.json();
        setAnalysis(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load analysis');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchAnalysis();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-brand-blue border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error || !analysis) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Analysis Not Found</h2>
          <p className="text-text-secondary mb-4">{error}</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-brand-blue hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {language === 'en' ? 'Back to Home' : '홈으로 돌아가기'}
        </Link>

        {/* Result Card */}
        <ResultCard analysis={analysis} language={language} />

        {/* Actions */}
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => window.print()}
            className="px-6 py-3 bg-bg-card border border-border-color rounded-lg hover:border-brand-blue transition-all"
          >
            {language === 'en' ? 'Print Report' : '리포트 인쇄'}
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-brand-blue text-white rounded-lg hover:brightness-110 transition-all"
          >
            {language === 'en' ? 'Analyze Another Deck' : '다른 덱 분석하기'}
          </Link>
        </div>
      </div>
    </div>
  );
}
