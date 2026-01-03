'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { UploadCloud, CheckCircle, AlertTriangle, FileText, Loader2, RefreshCw } from 'lucide-react';

// --- [1. 설정 및 타입 정의] ---
type Stage = 'pre-seed' | 'seed' | 'pre-a' | 'series-a';
type Language = 'en' | 'ko';

const STAGES: Stage[] = ['pre-seed', 'seed', 'pre-a', 'series-a'];

// --- [2. 메인 페이지 컴포넌트] ---
export default function AnalyzePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // 테스트를 위해 session_id가 없어도 작동하게 수정했습니다.
  const sessionId = searchParams.get('session_id') || 'test-session-id';

  const [language, setLanguage] = useState<Language>('ko'); // 기본 한국어
  const [stage, setStage] = useState<Stage>('seed');
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 파일 선택 핸들러
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  // 드래그 앤 드롭 핸들러
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setError(null);
    }
  };

  // 분석 시작 핸들러
  const handleAnalyze = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      // 실제 서버로 전송 (API가 준비 안 됐을 경우를 대비해 가짜 로딩 구현)
      const formData = new FormData();
      formData.append('file', file);
      formData.append('sessionId', sessionId);
      formData.append('stage', stage);
      formData.append('language', language);

      // ---------------------------------------------------------
      // [주의] 실제 AI 분석 API가 연결되면 아래 주석을 푸세요.
      // const response = await fetch('/api/analyze', { method: 'POST', body: formData });
      // const data = await response.json();
      // setResult(data);
      // ---------------------------------------------------------

      // [임시] AI가 분석하는 척 보여주는 시뮬레이션 (3초 뒤 결과 나옴)
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // 가짜 결과 데이터 (테스트용)
      setResult({
        score: 85,
        verdict: "Investment Worthy",
        summary: "비즈니스 모델이 명확하고 시장 규모가 큽니다. 다만 경쟁사 분석이 조금 부족해 보입니다.",
        frictionPoints: [
          { title: "Revenue Model", severity: "HIGH", description: "수익 창출 시점이 불명확합니다." },
          { title: "Team Structure", severity: "MEDIUM", description: "CTO의 부재가 리스크가 될 수 있습니다." }
        ]
      });

    } catch (err) {
      setError("분석 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // --- [화면 1: 분석 중일 때 (터미널 효과)] ---
  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-black text-green-400 font-mono p-8 flex flex-col items-center justify-center">
        <div className="max-w-2xl w-full bg-gray-900 rounded-lg p-6 shadow-2xl border border-gray-800">
          <div className="flex items-center gap-2 mb-4 border-b border-gray-800 pb-4">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-2 text-sm text-gray-500">DeckGuard AI Terminal</span>
          </div>
          <div className="space-y-2">
            <p className="animate-pulse">> Uploading pitch deck...</p>
            <p className="animate-pulse delay-75">> Extracting text layers...</p>
            <p className="animate-pulse delay-150">> Analyzing business model (Stage: {stage})...</p>
            <p className="animate-pulse delay-300">> Checking for investor friction points...</p>
            <p className="mt-4 text-white">Analyzig... <span className="inline-block animate-spin">◴</span></p>
          </div>
        </div>
      </div>
    );
  }

  // --- [화면 2: 결과가 나왔을 때] ---
  if (result) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-blue-500">Analysis Result</h1>
              <span className="bg-blue-900 text-blue-200 px-4 py-1 rounded-full text-sm font-bold">
                Score: {result.score}/100
              </span>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold mb-2">💡 Summary</h2>
              <p className="text-gray-300 leading-relaxed">{result.summary}</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-2">⚠️ Friction Points</h2>
              {result.frictionPoints.map((point: any, idx: number) => (
                <div key={idx} className="bg-black/50 p-4 rounded-lg border border-gray-800">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className={`w-5 h-5 ${point.severity === 'HIGH' ? 'text-red-500' : 'text-yellow-500'}`} />
                    <span className="font-bold">{point.title}</span>
                    <span className="text-xs text-gray-500 border border-gray-700 px-2 py-0.5 rounded ml-auto">
                      {point.severity}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm ml-7">{point.description}</p>
                </div>
              ))}
            </div>

            <button 
              onClick={() => { setFile(null); setResult(null); }}
              className="mt-8 w-full py-4 bg-gray-800 hover:bg-gray-700 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" /> Analyze Another Deck
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- [화면 3: 파일 업로드 (기본 화면)] ---
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        
        {/* 헤더 */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Upload Your Pitch Deck
          </h1>
          <p className="text-gray-400">
            PDF format only, Max 20 pages.
          </p>
        </div>

        {/* 스테이지 선택 */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-3 text-gray-400">Select Your Stage</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {STAGES.map((s) => (
              <button
                key={s}
                onClick={() => setStage(s)}
                className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                  stage === s
                    ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                    : 'border-gray-800 bg-gray-900 text-gray-500 hover:border-gray-600'
                }`}
              >
                {s.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* 언어 선택 */}
        <div className="flex justify-end gap-2 mb-4">
           <button onClick={() => setLanguage('en')} className={`px-3 py-1 rounded text-xs ${language === 'en' ? 'bg-blue-600' : 'bg-gray-800'}`}>EN</button>
           <button onClick={() => setLanguage('ko')} className={`px-3 py-1 rounded text-xs ${language === 'ko' ? 'bg-blue-600' : 'bg-gray-800'}`}>KR</button>
        </div>

        {/* 파일 업로드 박스 */}
        <div 
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-12 transition-colors relative group ${
            file ? 'border-green-500 bg-green-500/5' : 'border-gray-700 hover:border-blue-500 bg-gray-900/50'
          }`}
        >
          <input 
            type="file" 
            accept=".pdf" 
            onChange={handleFileSelect} 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="flex flex-col items-center pointer-events-none">
            {file ? (
              <>
                <FileText className="w-16 h-16 text-green-500 mb-4" />
                <span className="text-xl font-bold text-green-400">{file.name}</span>
                <span className="text-sm text-gray-500 mt-2">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                <p className="mt-4 text-sm text-green-400/80">Click or Drag to change file</p>
              </>
            ) : (
              <>
                <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-10 h-10 text-blue-500" />
                </div>
                <span className="text-xl font-medium text-gray-300">Drag & drop your PDF here</span>
                <span className="text-sm text-gray-500 mt-3 bg-gray-800 px-4 py-1 rounded-full">
                  or Click to Browse
                </span>
              </>
            )}
          </div>
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div className="mt-4 p-4 rounded-lg bg-red-900/20 border border-red-800 text-red-400 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            {error}
          </div>
        )}

        {/* 분석 버튼 */}
        <button
          onClick={handleAnalyze}
          disabled={!file || isAnalyzing}
          className={`w-full mt-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
            file && !isAnalyzing
              ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-900/20'
              : 'bg-gray-800 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isAnalyzing ? (
            <><Loader2 className="animate-spin" /> Analyzing...</>
          ) : (
            "Scan My Deck ⚡"
          )}
        </button>

      </div>
    </div>
  );
}