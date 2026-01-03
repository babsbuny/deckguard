import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';
import { Currency, ProductType } from '@/types';

// CRITICAL: Force Node.js runtime for all API routes
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // 👇 [수정] priceId를 여기서 받아옵니다!
    const { productType, currency, priceId } = body as {
      productType: ProductType;
      currency: Currency;
      priceId: string; 
    };

    // Validate inputs
    if (!productType || !['single', 'monthly'].includes(productType)) {
      return NextResponse.json(
        { error: 'Invalid product type' },
        { status: 400 }
      );
    }

    if (!currency || !['USD', 'KRW'].includes(currency)) {
      return NextResponse.json(
        { error: 'Invalid currency' },
        { status: 400 }
      );
    }

    // Create Stripe Checkout session
    // 👇 [수정] priceId를 주방장(createCheckoutSession)에게 전달합니다!
    const session = await createCheckoutSession(productType, currency, priceId);

    // Create pending payment session in database
    const usesRemaining = productType === 'single' ? 1 : 999;
    const expiresAt = productType === 'monthly'
      ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      : null;

    await supabaseAdmin.from('payment_sessions').insert({
      stripe_session_id: session.id,
      payment_status: 'pending',
      currency,
      product_type: productType,
      uses_remaining: usesRemaining,
      expires_at: expiresAt,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}