// ============================================
// DeckGuard Type Definitions
// ============================================

// Payment Status
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'expired';

// Currency
export type Currency = 'USD' | 'KRW';

// Product Type
export type ProductType = 'single' | 'monthly';

// Stage
export type Stage = 'pre-seed' | 'seed' | 'pre-a' | 'series-a';

// Verdict
export type Verdict = 'NO_GO' | 'HOLD' | 'GO';

// Confidence Level
export type Confidence = 'low' | 'medium' | 'high';

// Language
export type Language = 'en' | 'kr';

// ============================================
// Database Tables
// ============================================

export interface PaymentSession {
  id: string;
  stripe_session_id: string;
  entitlement_token: string | null;
  payment_status: PaymentStatus;
  currency: Currency;
  product_type: ProductType;
  uses_remaining: number;
  expires_at: string | null;
  created_at: string;
}

export interface Analysis {
  id: string;
  stripe_session_id: string;
  stage: Stage;
  file_name: string | null;
  file_size: number | null;
  file_hash: string;
  language_detected: string | null;
  verdict: Verdict;
  confidence: Confidence;
  tags: string[];
  rationale: string | null;
  friction_points: FrictionPoint[];
  likely_questions: LikelyQuestion[];
  defense_prompts: DefensePrompt[];
  created_at: string;
}

// ============================================
// Analysis Components
// ============================================

export interface FrictionPoint {
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  tag: StandardTag;
}

export interface LikelyQuestion {
  question: string;
  context: string;
}

export interface DefensePrompt {
  question: string;
  suggested_response: string;
}

// ============================================
// Standard Tags (EXACTLY 8)
// ============================================

export type StandardTag =
  | 'Stage_Mismatch'
  | 'TAM_Logic_Weak'
  | 'Problem_Solution_Gap'
  | 'Moat_Weak'
  | 'Traction_Too_Soft'
  | 'Unit_Economics_Missing'
  | 'BM_Unclear'
  | 'Ask_Unclear';

export const STANDARD_TAGS: StandardTag[] = [
  'Stage_Mismatch',
  'TAM_Logic_Weak',
  'Problem_Solution_Gap',
  'Moat_Weak',
  'Traction_Too_Soft',
  'Unit_Economics_Missing',
  'BM_Unclear',
  'Ask_Unclear',
];

// ============================================
// API Request/Response Types
// ============================================

export interface CheckoutRequest {
  productType: ProductType;
  currency: Currency;
}

export interface CheckoutResponse {
  url: string;
}

export interface AnalyzeRequest {
  sessionId: string;
  stage: Stage;
  file: File;
}

export interface AnalyzeResponse {
  analysisId: string;
  verdict: Verdict;
  confidence: Confidence;
  rationale: string;
  tags: StandardTag[];
  frictionPoints: FrictionPoint[];
  likelyQuestions: LikelyQuestion[];
  defensePrompts: DefensePrompt[];
  cached: boolean;
}

export interface BootstrapRequest {
  sessionId: string;
}

export interface BootstrapResponse {
  success: boolean;
  message?: string;
}

export interface UploadResponse {
  signedUrl: string;
  path: string;
}

// ============================================
// OpenAI Analysis Schema
// ============================================

export interface OpenAIAnalysisResult {
  verdict: Verdict;
  confidence: Confidence;
  rationale: string;
  tags: StandardTag[];
  friction_points: FrictionPoint[];
  likely_questions: LikelyQuestion[];
  defense_prompts: DefensePrompt[];
}

// ============================================
// UI State Types
// ============================================

export interface AppState {
  language: Language;
  currency: Currency;
}

export interface TerminalLogMessage {
  text: string;
  delay: number;
}

// ============================================
// Pricing Configuration
// ============================================

export interface PricingPlan {
  type: ProductType;
  priceUSD: number;
  priceKRW: number;
  features: string[];
  badge?: string;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    type: 'single',
    priceUSD: 29,
    priceKRW: 33000,
    features: ['One-time analysis', 'Full risk report', 'Defense prompts'],
  },
  {
    type: 'monthly',
    priceUSD: 99,
    priceKRW: 99000,
    features: ['Unlimited analyses', '30-day access', 'Priority support'],
    badge: 'Best Value',
  },
];
