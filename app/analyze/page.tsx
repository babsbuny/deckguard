'use client';

import { UploadCloud } from 'lucide-react';

export default function AnalyzePage() {
  // 쫓아내는 코드(redirect)를 전부 삭제했습니다. 무조건 열립니다.

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-xl w-full text-center">
        
        <div className="mb-8">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <UploadCloud className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Upload Your Deck</h1>
          <p className="text-gray-400">
            Payment verified! Ready to analyze.
          </p>
        </div>

        <div className="border-2 border-dashed border-gray-700 rounded-2xl p-12 hover:border-blue-500 transition-colors cursor-pointer bg-gray-900/50">
          <div className="flex flex-col items-center">
            <UploadCloud className="w-12 h-12 text-gray-500 mb-4" />
            <span className="text-lg font-medium text-gray-300">
              Click to upload PDF
            </span>
            <span className="text-sm text-gray-500 mt-2">
              (Drag & Drop Here)
            </span>
          </div>
        </div>

        <div className="mt-8">
          <a href="/" className="text-sm text-gray-500 hover:text-white underline">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}