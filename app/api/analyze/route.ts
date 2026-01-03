import { NextRequest, NextResponse } from 'next/server';
import { extractTextFromPDF, validatePageCount } from '@/lib/pdf';
import { analyzePitchDeck } from '@/lib/openai'; // 👈 진짜 AI 함수 가져오기
import { Stage, Language } from '@/types';

// PDF 처리를 위해 Node.js 환경 강제
export const runtime = 'nodejs';

const MAX_FILE_SIZE = 15 * 1024 * 1024;

export async function POST(request: NextRequest) {
  console.log("🚀 Real AI Analysis Request (Bypass Mode)");

  try {
    // 1. 데이터 받기
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const stage = formData.get('stage') as Stage;
    const language = (formData.get('language') as Language) || 'en';

    // 2. 파일 검사
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    console.log(`📂 Processing file: ${file.name}`);

    // 3. PDF에서 텍스트 추출 (여기가 진짜!)
    const buffer = Buffer.from(await file.arrayBuffer());
    // PDF 텍스트와 함께 '신뢰도(confidence)'도 같이 가져옵니다.
    const { text, numPages, confidence, isKorean } = await extractTextFromPDF(buffer);

    // 4. 페이지 수 검사
    const pageValidation = validatePageCount(numPages);
    if (!pageValidation.valid) {
      return NextResponse.json({ error: pageValidation.error }, { status: 400 });
    }

    // 5. OpenAI에게 분석 요청 (여기가 진짜!)
    console.log("🤖 Sending to OpenAI... (This may take 10-20 seconds)");
    
    // 한국어 문서거나, 사용자가 'KR'을 선택했으면 한국어로 분석
    const outputInKorean = isKorean || language === 'kr';
    
    // 🔥 실제 OpenAI 호출 발생!
    const analysisResult = await analyzePitchDeck(text, stage, outputInKorean);
    
    console.log("✅ OpenAI Analysis Complete!");

    // 6. 결과 리턴 (DB 저장 없이 바로 화면으로)
    return NextResponse.json({
      id: 'real_' + Date.now(),
      created_at: new Date().toISOString(),
      file_name: file.name,
      file_size: file.size,
      language_detected: isKorean ? 'kr' : 'en',
      
      // 추출된 신뢰도와 AI 분석 결과
      confidence: confidence, 
      verdict: analysisResult.verdict,
      tags: analysisResult.tags,
      rationale: analysisResult.rationale,
      friction_points: analysisResult.friction_points,
      likely_questions: analysisResult.likely_questions,
      defense_prompts: analysisResult.defense_prompts,
    });

  } catch (error) {
    console.error('Real Analysis Error:', error);
    return NextResponse.json(
      { error: 'AI 분석 중 오류가 발생했습니다. (API Key 확인 필요)' },
      { status: 500 }
    );
  }
}