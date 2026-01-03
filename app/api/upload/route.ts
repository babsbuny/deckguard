import { NextRequest, NextResponse } from 'next/server';
import { getSignedUploadUrl, supabaseAdmin } from '@/lib/supabase';

// CRITICAL: Force Node.js runtime for all API routes
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    // Get entitlement token from cookie
    const entitlementToken = request.cookies.get('entitlement_token')?.value;

    if (!entitlementToken) {
      return NextResponse.json(
        { error: 'Not authorized' },
        { status: 401 }
      );
    }

    // Verify entitlement exists and is valid
    const { data: session, error: sessionError } = await supabaseAdmin
      .from('payment_sessions')
      .select('*')
      .eq('entitlement_token', entitlementToken)
      .eq('payment_status', 'paid')
      .single();

    if (sessionError || !session) {
      return NextResponse.json(
        { error: 'Invalid entitlement' },
        { status: 403 }
      );
    }

    // Check uses remaining for single pass
    if (session.product_type === 'single' && session.uses_remaining <= 0) {
      return NextResponse.json(
        { error: 'No analyses remaining' },
        { status: 403 }
      );
    }

    // Check expiration for monthly pass
    if (session.product_type === 'monthly' && session.expires_at) {
      if (new Date(session.expires_at) < new Date()) {
        return NextResponse.json(
          { error: 'Subscription expired' },
          { status: 403 }
        );
      }
    }

    // Get file name from request
    const body = await request.json();
    const { fileName } = body;

    if (!fileName) {
      return NextResponse.json(
        { error: 'File name is required' },
        { status: 400 }
      );
    }

    // Generate signed upload URL
    const { signedUrl, path } = await getSignedUploadUrl(fileName);

    return NextResponse.json({ signedUrl, path });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to generate upload URL' },
      { status: 500 }
    );
  }
}
