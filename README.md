# DeckGuard

**Pitch Deck Communication Risk Analyzer**

A production-ready SaaS MVP by Lucete Lab for analyzing pitch decks before sending them to investors.

---

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd deckguard
npm install
```

### 2. Set Up Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

### 3. Set Up Supabase

1. Create a new Supabase project
2. Run the SQL from `supabase-schema.sql` in the SQL Editor
3. Create a storage bucket named `pitch-decks` (set as private)
4. Copy your project URL and keys to `.env.local`

### 4. Set Up Stripe

1. Create Stripe products and prices for:
   - Single Pass USD ($29)
   - Single Pass KRW (₩33,000)
   - Monthly Pass USD ($99)
   - Monthly Pass KRW (₩99,000)
2. Copy the price IDs to `.env.local`
3. Set up webhook endpoint (see below)

### 5. Run Development Server

```bash
npm run dev
```

---

## 🔐 Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx
SUPABASE_SERVICE_ROLE_KEY=eyJxxx

# Stripe
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_PRICE_SINGLE_USD=price_xxx
STRIPE_PRICE_MONTHLY_USD=price_xxx
STRIPE_PRICE_SINGLE_KRW=price_xxx
STRIPE_PRICE_MONTHLY_KRW=price_xxx

# OpenAI
OPENAI_API_KEY=sk-xxx

# App
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

---

## 🔗 Stripe Webhook Setup

### Local Development

```bash
# Install Stripe CLI
stripe listen --forward-to localhost:3000/api/webhook
```

### Production (Vercel)

1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://your-domain.com/api/webhook`
3. Select events:
   - `checkout.session.completed`
   - `payment_intent.payment_failed`
4. Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET`

---

## 📋 Deployment Checklist

### Before Going Live

- [ ] `entitlement_token` + httpOnly cookie security model
- [ ] `/api/session/bootstrap` endpoint implemented
- [ ] `/api/upload` uses Supabase signed URL
- [ ] `export const runtime = 'nodejs'` in ALL API routes
- [ ] `allow_promotion_codes: true` in Stripe checkout
- [ ] $0 checkout (100% promo) treated as paid
- [ ] Two INDEPENDENT toggles (Language + Currency)
- [ ] 24-hour cache check via file_hash before OpenAI call
- [ ] File limits enforced: 20 pages, 15MB
- [ ] EXACTLY 8 standard tags
- [ ] Max 3 friction points, max 2 questions in output
- [ ] Confidence badge with 3 levels (Low/Medium/High)
- [ ] "Best Value" badge on Monthly plan
- [ ] No refund notice visible near Pay button
- [ ] Footer disclaimer always visible
- [ ] Dark terminal theme with exact hex codes

### Vercel Deployment

1. Push code to GitHub
2. Import project in Vercel
3. Add all environment variables
4. Deploy

---

## 🏗️ Architecture

### Security Model

```
1. User completes Stripe checkout
2. Stripe webhook fires → Server generates entitlement_token
3. Server sets httpOnly cookie with entitlement_token
4. All protected APIs verify BOTH:
   - stripe_session_id (from URL)
   - entitlement_token (from httpOnly cookie)
5. Analysis blocked if either is missing/mismatched
```

### Standard Tags (Data Asset)

Only these 8 tags are used:

1. `Stage_Mismatch`
2. `TAM_Logic_Weak`
3. `Problem_Solution_Gap`
4. `Moat_Weak`
5. `Traction_Too_Soft`
6. `Unit_Economics_Missing`
7. `BM_Unclear`
8. `Ask_Unclear`

---

## 🎨 Design System

| Token | Hex |
|-------|-----|
| Bg-Main | #050505 |
| Bg-Card | #121212 |
| Bg-Surface | #1a1a1a |
| Text-Primary | #E5E5E5 |
| Text-Secondary | #A3A3A3 |
| Border | #333333 |
| GO (Green) | #00FF94 |
| HOLD (Yellow) | #FFD600 |
| NO_GO (Red) | #FF003C |
| Brand Blue | #2563EB |

---

## 📁 File Structure

```
deckguard/
├── app/
│   ├── api/
│   │   ├── analyze/route.ts
│   │   ├── checkout/route.ts
│   │   ├── session/bootstrap/route.ts
│   │   ├── upload/route.ts
│   │   └── webhook/route.ts
│   ├── analyze/page.tsx
│   ├── result/[id]/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── FileUpload.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── PricingCard.tsx
│   ├── ResultCard.tsx
│   └── TerminalLog.tsx
├── lib/
│   ├── i18n.ts
│   ├── openai.ts
│   ├── pdf.ts
│   ├── stripe.ts
│   └── supabase.ts
├── types/
│   └── index.ts
├── .env.example
├── next.config.js
├── package.json
├── postcss.config.js
├── README.md
├── supabase-schema.sql
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🎫 VIP Promo Codes

To give VIP access:

1. Go to Stripe Dashboard → Products → Coupons
2. Create a 100% off coupon (e.g., `LUCETE_VIP`)
3. Share the coupon code with VIP users
4. They enter the code at checkout for free access

---

## 📄 License

© 2024 Lucete Lab. All rights reserved.

---

## 🆘 Support

- Email: support@lucetelab.com
- Issues: GitHub Issues

---

**Built with ❤️ by Lucete Lab**
