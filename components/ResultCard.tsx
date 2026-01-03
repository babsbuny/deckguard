'use client';

import { AlertTriangle, CheckCircle, XCircle, HelpCircle, Shield, MessageCircle } from 'lucide-react';
import { Analysis, Language, Verdict, Confidence } from '@/types';
import { getVerdictLabel, getConfidenceLabel } from '@/lib/i18n';

interface ResultCardProps {
  analysis: Analysis;
  language: Language;
}

export default function ResultCard({ analysis, language }: ResultCardProps) {
  
  // 1. 판정값(Verdict) 안전장치: 이상한 단어가 와도 표준(GO/HOLD/NO_GO)으로 변환
  const getNormalizedVerdict = (v: string): 'GO' | 'HOLD' | 'NO_GO' => {
    const map: Record<string, 'GO' | 'HOLD' | 'NO_GO'> = {
      'investable': 'GO',
      'potential': 'HOLD',
      'pass': 'NO_GO',
      'GO': 'GO',
      'HOLD': 'HOLD',
      'NO_GO': 'NO_GO'
    };
    return map[v] || 'HOLD';
  };

  // 2. [추가된 수리] 신뢰도(Confidence) 안전장치: 숫자(0.98)가 와도 글자('high')로 변환
  const getNormalizedConfidence = (c: any): 'low' | 'medium' | 'high' => {
    // 숫자로 오면 점수에 따라 등급 매기기
    if (typeof c === 'number') {
        if (c >= 0.8) return 'high';
        if (c >= 0.5) return 'medium';
        return 'low';
    }
    // 글자로 왔는데 이상하면 medium으로 퉁치기
    const valid = ['low', 'medium', 'high'];
    return valid.includes(c) ? c : 'medium';
  };

  const normalizedVerdict = getNormalizedVerdict(analysis.verdict as string);
  const normalizedConfidence = getNormalizedConfidence(analysis.confidence);

  const verdictConfig = {
    GO: { icon: CheckCircle, color: 'text-go', bg: 'bg-go/10' },
    HOLD: { icon: AlertTriangle, color: 'text-hold', bg: 'bg-hold/10' },
    NO_GO: { icon: XCircle, color: 'text-no-go', bg: 'bg-no-go/10' },
  };

  const confidenceConfig = {
    low: { color: 'text-no-go', bg: 'bg-no-go/10' },
    medium: { color: 'text-hold', bg: 'bg-hold/10' },
    high: { color: 'text-go', bg: 'bg-go/10' },
  };

  const { icon: VerdictIcon, color: verdictColor, bg: verdictBg } = verdictConfig[normalizedVerdict];
  // 여기서 이제 안전하게 변환된 값(normalizedConfidence)을 씁니다!
  const { color: confColor, bg: confBg } = confidenceConfig[normalizedConfidence];

  return (
    <div className="space-y-6">
      {/* Main Verdict Card */}
      <div className={`rounded-xl border border-border-color ${verdictBg} p-8`}>
        <div className="flex items-center justify-between mb-6">
          {/* Verdict */}
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-xl ${verdictBg} border-2 ${verdictColor.replace('text-', 'border-')} flex items-center justify-center`}>
              <VerdictIcon className={`w-8 h-8 ${verdictColor}`} />
            </div>
            <div>
              <p className="text-sm text-text-secondary mb-1">
                {language === 'en' ? 'Verdict' : '판정'}
              </p>
              <h2 className={`text-2xl font-bold ${verdictColor}`}>
                {getVerdictLabel(normalizedVerdict as Verdict, language)}
              </h2>
            </div>
          </div>

          {/* Confidence Badge */}
          <div className={`px-4 py-2 rounded-lg ${confBg}`}>
            <p className="text-xs text-text-secondary mb-1">
              {language === 'en' ? 'Confidence' : '신뢰도'}
            </p>
            <p className={`font-semibold ${confColor}`}>
              {getConfidenceLabel(normalizedConfidence, language)}
            </p>
          </div>
        </div>

        {/* Rationale */}
        <div className="bg-bg-card rounded-lg p-4">
          <p className="text-text-primary whitespace-pre-wrap">{analysis.rationale}</p>
        </div>

        {/* Tags */}
        {analysis.tags && analysis.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {analysis.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full bg-bg-card border border-border-color text-sm text-text-secondary"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Friction Points */}
      {analysis.friction_points && analysis.friction_points.length > 0 && (
        <div className="rounded-xl border border-border-color bg-bg-card p-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
            <AlertTriangle className="w-5 h-5 text-hold" />
            {language === 'en' ? 'Friction Points' : '이탈 요인'}
          </h3>
          <div className="space-y-4">
            {analysis.friction_points.map((point: any, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg bg-bg-surface border-l-4"
                style={{
                  borderColor: point.severity === 'high' ? '#FF003C' : '#FFD600'
                }}
              >
                {typeof point === 'string' ? (
                   <p className="text-text-primary">{point}</p>
                ) : (
                  <>
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">{point.title}</h4>
                      <span className="text-xs px-2 py-1 rounded bg-hold/20 text-hold">
                        {point.severity?.toUpperCase() || 'POINT'}
                      </span>
                    </div>
                    <p className="text-text-secondary text-sm">{point.description}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Likely Questions */}
      {analysis.likely_questions && analysis.likely_questions.length > 0 && (
        <div className="rounded-xl border border-border-color bg-bg-card p-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
            <HelpCircle className="w-5 h-5 text-brand-blue" />
            {language === 'en' ? 'Likely Investor Questions' : '예상 투자자 질문'}
          </h3>
          <div className="space-y-4">
            {analysis.likely_questions.map((q: any, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-bg-surface">
                <p className="font-medium mb-2">&ldquo;{typeof q === 'string' ? q : q.question}&rdquo;</p>
                {typeof q !== 'string' && q.context && <p className="text-sm text-text-secondary">{q.context}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Defense Prompts */}
      {analysis.defense_prompts && analysis.defense_prompts.length > 0 && (
        <div className="rounded-xl border border-border-color bg-bg-card p-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
            <Shield className="w-5 h-5 text-go" />
            {language === 'en' ? 'Defense Prompts' : '방어 프롬프트'}
          </h3>
          <div className="space-y-4">
            {analysis.defense_prompts.map((prompt: any, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-bg-surface">
                <div className="flex items-start gap-3 mb-3">
                  <MessageCircle className="w-4 h-4 text-text-secondary mt-1" />
                  <p className="font-medium text-text-secondary">
                    {typeof prompt === 'string' ? '예상 질문에 대한 답변' : prompt.question}
                  </p>
                </div>
                <div className="pl-7">
                  <p className="text-go">{typeof prompt === 'string' ? prompt : prompt.suggested_response}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}