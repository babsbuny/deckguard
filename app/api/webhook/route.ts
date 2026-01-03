import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookSignature, stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';
import { randomUUID } from 'crypto';
import Stripe from 'stripe';

// CRITICAL: Force Node.js runtime for all API routes
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      );
    }

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = verifyWebhookSignature(body, signature);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Handle checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      
      // Generate entitlement token
      const entitlementToken = randomUUID();

      // CRITICAL: Treat $0 checkouts (100% promo) as successful
      // amount_total can be 0 when a 100% discount promo code is used
      const paymentStatus = 
        session.payment_status === 'paid' || 
        session.amount_total === 0 
          ? 'paid' 
          : 'pending';

      // Update payment session with entitlement token
      const { error } = await supabaseAdmin
        .from('payment_sessions')
        .update({
          payment_status: paymentStatus,
          entitlement_token: entitlementToken,
        })
        .eq('stripe_session_id', session.id);

      if (error) {
        console.error('Failed to update payment session:', error);
        return NextResponse.json(
          { error: 'Database update failed' },
          { status: 500 }
        );
      }

      console.log(`Payment completed for session ${session.id}, entitlement: ${entitlementToken}`);
    }

    // Handle payment_intent.payment_failed event
    if (event.type === 'payment_intent.payment_failed') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      
      // Find and update the associated session
      const sessions = await stripe.checkout.sessions.list({
        payment_intent: paymentIntent.id,
        limit: 1,
      });

      if (sessions.data.length > 0) {
        const session = sessions.data[0];
        await supabaseAdmin
          .from('payment_sessions')
          .update({ payment_status: 'failed' })
          .eq('stripe_session_id', session.id);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
