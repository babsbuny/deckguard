import Stripe from 'stripe';
import { Currency, ProductType } from '@/types';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

// (기존 함수 유지) - 혹시 몰라 남겨둡니다
export function getStripePriceId(productType: ProductType, currency: Currency): string {
  const priceMap: Record<ProductType, Record<Currency, string>> = {
    single: {
      USD: process.env.STRIPE_PRICE_SINGLE_USD || '',
      KRW: process.env.STRIPE_PRICE_SINGLE_KRW || '',
    },
    monthly: {
      USD: process.env.STRIPE_PRICE_MONTHLY_USD || '',
      KRW: process.env.STRIPE_PRICE_MONTHLY_KRW || '',
    },
  };

  return priceMap[productType][currency];
}

// 👇 [핵심 수정] 3번째 인자로 priceId를 받도록 수정했습니다!
export async function createCheckoutSession(
  productType: ProductType,
  currency: Currency,
  priceIdFromClient?: string // 여기가 추가됨
): Promise<Stripe.Checkout.Session> {
  
  // 1. 밖에서 받아온 ID가 있으면 그걸 쓰고, 없으면 환경 변수에서 찾음 (우선순위 변경)
  const priceId = priceIdFromClient || getStripePriceId(productType, currency);
  
  // 안전장치: 가격 ID가 없으면 에러 발생
  if (!priceId) {
    throw new Error('Price ID is missing. (가격표가 없습니다)');
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL!;

  const session = await stripe.checkout.sessions.create({
    mode: 'payment', // 월간 패스일 경우 'subscription'이어야 하지만, 일단 payment로 테스트
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    // CRITICAL: Enable promotion codes for VIP/promo support
    allow_promotion_codes: true,
    success_url: `${appUrl}/analyze?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/?canceled=true`,
    metadata: {
      product_type: productType,
      currency: currency,
    },
  });

  return session;
}

// Verify Stripe webhook signature
export function verifyWebhookSignature(
  payload: string | Buffer,
  signature: string
): Stripe.Event {
  return stripe.webhooks.constructEvent(
    payload,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!
  );
}