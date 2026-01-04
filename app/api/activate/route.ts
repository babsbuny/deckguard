import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const { licenseKey } = await request.json();

    if (!licenseKey) {
      return NextResponse.json(
        { error: 'License key is required' },
        { status: 400 }
      );
    }

    // 레몬스퀴지 라이선스 검증 API 호출
    const response = await fetch('https://api.lemonsqueezy.com/v1/licenses/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        license_key: licenseKey,
      }),
    });

    const data = await response.json();

    // 검증 실패
    if (!response.ok || !data.valid) {
      // 만료된 경우
      if (data.license_key?.status === 'expired') {
        return NextResponse.json(
          { error: 'expired', message: 'License has expired' },
          { status: 403 }
        );
      }
      
      return NextResponse.json(
        { error: 'invalid', message: 'Invalid license key' },
        { status: 401 }
      );
    }

    // 검증 성공 - 쿠키에 라이선스 정보 저장
    const res = NextResponse.json({
      success: true,
      license: {
        key: licenseKey,
        status: data.license_key?.status,
        activations: data.license_key?.activation_usage,
        maxActivations: data.license_key?.activation_limit,
      },
    });

    // httpOnly 쿠키에 라이선스 저장 (30일)
    res.cookies.set('deckguard_license', licenseKey, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30일
      path: '/',
    });

    return res;

  } catch (error) {
    console.error('License validation error:', error);
    return NextResponse.json(
      { error: 'server', message: 'Failed to validate license' },
      { status: 500 }
    );
  }
}
