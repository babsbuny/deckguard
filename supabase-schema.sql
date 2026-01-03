-- ============================================
-- DeckGuard Database Schema
-- Supabase PostgreSQL
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLE: payment_sessions
-- Access control and entitlement management
-- ============================================
CREATE TABLE payment_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  stripe_session_id TEXT UNIQUE NOT NULL,
  entitlement_token UUID,
  payment_status TEXT CHECK (payment_status IN ('pending', 'paid', 'failed', 'expired')) DEFAULT 'pending',
  currency TEXT CHECK (currency IN ('USD', 'KRW')) NOT NULL,
  product_type TEXT CHECK (product_type IN ('single', 'monthly')) NOT NULL,
  uses_remaining INT NOT NULL DEFAULT 1,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE: analyses
-- Data asset - analysis results storage
-- ============================================
CREATE TABLE analyses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  stripe_session_id TEXT REFERENCES payment_sessions(stripe_session_id),
  stage TEXT CHECK (stage IN ('pre-seed', 'seed', 'pre-a', 'series-a')) NOT NULL,
  file_name TEXT,
  file_size INT,
  file_hash TEXT NOT NULL,
  language_detected TEXT,
  verdict TEXT CHECK (verdict IN ('NO_GO', 'HOLD', 'GO')) NOT NULL,
  confidence TEXT CHECK (confidence IN ('low', 'medium', 'high')) NOT NULL,
  tags TEXT[] DEFAULT '{}',
  rationale TEXT,
  friction_points JSONB DEFAULT '[]',
  likely_questions JSONB DEFAULT '[]',
  defense_prompts JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_payment_stripe ON payment_sessions(stripe_session_id);
CREATE INDEX idx_payment_token ON payment_sessions(entitlement_token);
CREATE INDEX idx_analyses_hash ON analyses(file_hash);
CREATE INDEX idx_analyses_created ON analyses(created_at);

-- ============================================
-- STORAGE BUCKET
-- Run this in Supabase Dashboard > Storage
-- ============================================
-- Create bucket: pitch-decks
-- Set as private bucket
-- Add policy for authenticated uploads

-- ============================================
-- ROW LEVEL SECURITY (Optional)
-- ============================================
-- ALTER TABLE payment_sessions ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;

-- ============================================
-- NOTES
-- ============================================
-- 1. uses_remaining: 1 for single pass, 999 for monthly pass
-- 2. expires_at: NULL for single pass, NOW() + 30 days for monthly
-- 3. tags: Always store in English (8 standard tags only)
-- 4. file_hash: SHA-256 hash for 24-hour caching
-- 5. entitlement_token: UUID set after successful payment via webhook
