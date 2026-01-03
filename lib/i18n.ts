import { Language, Stage, Verdict, Confidence } from '@/types';

type TranslationKey = 
  | 'headline'
  | 'subheadline'
  | 'cta'
  | 'pricingSingleTitle'
  | 'pricingSinglePrice'
  | 'pricingSingleSub'
  | 'pricingMonthlyTitle'
  | 'pricingMonthlyPrice'
  | 'pricingMonthlySub'
  | 'pricingMonthlyBadge'
  | 'disclaimer'
  | 'noRefund'
  | 'uploadTitle'
  | 'uploadDrag'
  | 'uploadOr'
  | 'uploadBrowse'
  | 'uploadLimit'
  | 'stageLabel'
  | 'analyzeButton'
  | 'analyzing';

type Translations = Record<TranslationKey, string>;

const translations: Record<Language, Translations> = {
  en: {
    headline: 'Eliminate friction before you send.',
    subheadline: 'Pre-send risk check. Reduce the chances of early drop-off.',
    cta: 'Scan My Deck',
    pricingSingleTitle: 'Single Pass',
    pricingSinglePrice: '$29 / One-time',
    pricingSingleSub: 'Urgent risk check. Cheaper than a coffee chat.',
    pricingMonthlyTitle: 'Monthly Pass',
    pricingMonthlyPrice: '$99 / 30 days',
    pricingMonthlySub: 'Unlimited checks until your funding round closes.',
    pricingMonthlyBadge: 'Best Value',
    disclaimer: 'Not investment advice. Communication risk analysis only.',
    noRefund: 'Digital service. No refunds once analysis begins.',
    uploadTitle: 'Upload Your Pitch Deck',
    uploadDrag: 'Drag and drop your PDF here',
    uploadOr: 'or',
    uploadBrowse: 'Browse files',
    uploadLimit: 'Max 20 pages, 15MB',
    stageLabel: 'Select Your Stage',
    analyzeButton: 'Analyze Deck',
    analyzing: 'Analyzing...',
  },
  kr: {
    headline: '투자자 이탈 요인을 사전에 제거하세요.',
    subheadline: '투자 유치를 보장하지 않으며, 커뮤니케이션 리스크만 진단합니다.',
    cta: '내 덱 리스크 진단',
    pricingSingleTitle: '1회 진단',
    pricingSinglePrice: '₩33,000 / 1회',
    pricingSingleSub: 'VC 커피챗 1회 비용보다 저렴하게, 이탈 요인을 사전에 점검하세요.',
    pricingMonthlyTitle: '월간 패스',
    pricingMonthlyPrice: '₩99,000 / 30일',
    pricingMonthlySub: '투자 라운드 종료까지 무제한 진단 & 수정.',
    pricingMonthlyBadge: '추천',
    disclaimer: '본 서비스는 투자 유치를 보장하지 않으며, 커뮤니케이션 리스크만을 진단합니다.',
    noRefund: '디지털 서비스이므로 분석 시작 후에는 환불이 불가합니다.',
    uploadTitle: '피치덱 업로드',
    uploadDrag: 'PDF 파일을 여기에 드래그하세요',
    uploadOr: '또는',
    uploadBrowse: '파일 선택',
    uploadLimit: '최대 20페이지, 15MB',
    stageLabel: '투자 단계 선택',
    analyzeButton: '덱 분석하기',
    analyzing: '분석 중...',
  },
};

export function t(key: TranslationKey, lang: Language): string {
  return translations[lang][key];
}

// Stage labels
const stageLabels: Record<Stage, Record<Language, string>> = {
  'pre-seed': {
    en: 'Pre-Seed (Concept Verification)',
    kr: 'Pre-Seed (가설 검증 단계)',
  },
  'seed': {
    en: 'Seed (MVP & Traction)',
    kr: 'Seed (MVP 및 초기 지표)',
  },
  'pre-a': {
    en: 'Pre-A (Early Growth)',
    kr: 'Pre-A (초기 성장)',
  },
  'series-a': {
    en: 'Series A (Growth & Scale)',
    kr: 'Series A (성장 및 확장)',
  },
};

export function getStageLabel(stage: Stage, lang: Language): string {
  return stageLabels[stage][lang];
}

// Confidence labels
const confidenceLabels: Record<Confidence, Record<Language, string>> = {
  low: {
    en: 'Low Confidence',
    kr: '신뢰도 낮음',
  },
  medium: {
    en: 'Medium Confidence',
    kr: '신뢰도 보통',
  },
  high: {
    en: 'High Confidence',
    kr: '신뢰도 높음',
  },
};

export function getConfidenceLabel(confidence: Confidence, lang: Language): string {
  return confidenceLabels[confidence][lang];
}

// Verdict labels
const verdictLabels: Record<Verdict, Record<Language, string>> = {
  NO_GO: {
    en: 'High Risk',
    kr: '고위험',
  },
  HOLD: {
    en: 'Review Required',
    kr: '검토 필요',
  },
  GO: {
    en: 'Ready to Send',
    kr: '발송 가능',
  },
};

export function getVerdictLabel(verdict: Verdict, lang: Language): string {
  return verdictLabels[verdict][lang];
}
