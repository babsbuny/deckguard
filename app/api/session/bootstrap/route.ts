import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { randomUUID } from 'crypto';
import { cookies } from 'next/headers';

// CRITICAL: Force Node.js runtime for all API routes
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId } = body;

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // Fetch payment session from database
    const { data: session, error: fetchError } = await supabaseAdmin
      .from('payment_sessions')
      .select('*')
      .eq('stripe_session_id', sessionId)
      .single();

    if (fetchError || !session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    // Verify payment status
    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Payment not completed' },
        { status: 402 }
      );
    }

    // Generate entitlement token if not exists
    let entitlementToken = session.entitlement_token;
    
    if (!entitlementToken) {
      entitlementToken = randomUUID();
      
      const { error: updateError } = await supabaseAdmin
        .from('payment_sessions')
        .update({ entitlement_token: entitlementToken })
        .eq('stripe_session_id', sessionId);

      if (updateError) {
        return NextResponse.json(
          { error: 'Failed to generate entitlement' },
          { status: 500 }
        );
      }
    }

    // Create response with httpOnly cookie
    const response = NextResponse.json({ 
      success: true,
      productType: session.product_type,
      usesRemaining: session.uses_remaining,
    });

    // CRITICAL: Set httpOnly cookie server-side only
    response.cookies.set('entitlement_token', entitlementToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Bootstrap error:', error);
    return NextResponse.json(
      { error: 'Session bootstrap failed' },
      { status: 500 }
    );
  }
}
