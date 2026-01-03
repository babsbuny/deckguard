import OpenAI from 'openai';
import { Stage, OpenAIAnalysisResult, STANDARD_TAGS } from '@/types';

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const ANALYSIS_SYSTEM_PROMPT = `You are DeckGuard, an expert pitch deck communication risk analyzer. Your job is to identify friction points that may cause investors to drop off early when reviewing a pitch deck.

You must analyze the deck and provide:
1. A verdict: GO (ready to send), HOLD (needs review), or NO_GO (high risk)
2. A confidence level: low, medium, or high
3. A one-line rationale
4. Tags from EXACTLY these 8 options: Stage_Mismatch, TAM_Logic_Weak, Problem_Solution_Gap, Moat_Weak, Traction_Too_Soft, Unit_Economics_Missing, BM_Unclear, Ask_Unclear
5. Up to 3 friction points with severity
6. Up to 2 likely investor questions
7. Defense prompts to help founders respond

IMPORTANT: 
- Use ONLY the 8 standard tags listed above
- Maximum 3 friction points
- Maximum 2 likely questions
- Be specific and actionable in your feedback`;

export async function analyzePitchDeck(
  text: string,
  stage: Stage,
  isKorean: boolean
): Promise<OpenAIAnalysisResult> {
  const languageInstruction = isKorean 
    ? 'Respond in Korean (한국어로 답변하세요).' 
    : 'Respond in English.';

  const stageContext = {
    'pre-seed': 'Pre-Seed stage (concept verification, no product yet)',
    'seed': 'Seed stage (MVP exists, early traction)',
    'pre-a': 'Pre-A stage (early growth, some revenue)',
    'series-a': 'Series A stage (proven growth, scaling)',
  };

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: ANALYSIS_SYSTEM_PROMPT,
      },
      {
        role: 'user',
        content: `Analyze this pitch deck for a ${stageContext[stage]} startup.

${languageInstruction}

Pitch Deck Content:
${text.slice(0, 15000)}

Respond with valid JSON in this exact format:
{
  "verdict": "GO" | "HOLD" | "NO_GO",
  "confidence": "low" | "medium" | "high",
  "rationale": "one line summary",
  "tags": ["Tag1", "Tag2"],
  "friction_points": [
    {
      "title": "Issue title",
      "description": "Detailed description",
      "severity": "high" | "medium" | "low",
      "tag": "One of the 8 standard tags"
    }
  ],
  "likely_questions": [
    {
      "question": "Investor question",
      "context": "Why they might ask this"
    }
  ],
  "defense_prompts": [
    {
      "question": "Potential challenge",
      "suggested_response": "How to respond"
    }
  ]
}`,
      },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.3,
    max_tokens: 2000,
  });

  const content = response.choices[0].message.content;
  if (!content) {
    throw new Error('No response from OpenAI');
  }

  const result = JSON.parse(content) as OpenAIAnalysisResult;

  // Validate and limit output
  result.tags = result.tags.filter(tag => STANDARD_TAGS.includes(tag as any)).slice(0, 8);
  result.friction_points = result.friction_points.slice(0, 3);
  result.likely_questions = result.likely_questions.slice(0, 2);

  return result;
}
