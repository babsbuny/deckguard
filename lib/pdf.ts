import pdf from 'pdf-parse';
import crypto from 'crypto';
import { Confidence } from '@/types';

export interface PDFExtractResult {
  text: string;
  numPages: number;
  fileHash: string;
  confidence: Confidence;
  isKorean: boolean;
}

// Extract text from PDF buffer
export async function extractTextFromPDF(buffer: Buffer): Promise<PDFExtractResult> {
  const data = await pdf(buffer);
  
  const text = data.text;
  const numPages = data.numpages;
  
  // Calculate file hash for caching
  const fileHash = crypto
    .createHash('sha256')
    .update(buffer)
    .digest('hex');
  
  // Calculate confidence score based on extraction quality
  const extractionQuality = text.length / (numPages * 200);
  let confidence: Confidence;
  
  if (extractionQuality < 0.4) {
    confidence = 'low';
  } else if (extractionQuality < 0.75) {
    confidence = 'medium';
  } else {
    confidence = 'high';
  }
  
  // Detect if content is Korean (>20% Korean characters)
  const koreanChars = (text.match(/[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/g) || []).length;
  const totalChars = text.replace(/\s/g, '').length;
  const isKorean = totalChars > 0 && (koreanChars / totalChars) > 0.2;
  
  return {
    text,
    numPages,
    fileHash,
    confidence,
    isKorean,
  };
}

// Validate file before processing
export function validateFile(file: { size: number; type: string; name: string }): { valid: boolean; error?: string } {
  const MAX_SIZE = 15 * 1024 * 1024; // 15MB
  
  if (file.size > MAX_SIZE) {
    return { valid: false, error: 'File size exceeds 15MB limit' };
  }
  
  if (file.type !== 'application/pdf') {
    return { valid: false, error: 'Only PDF files are accepted' };
  }
  
  return { valid: true };
}

// Check if PDF has too many pages
export function validatePageCount(numPages: number): { valid: boolean; error?: string } {
  const MAX_PAGES = 20;
  
  if (numPages > MAX_PAGES) {
    return { valid: false, error: `PDF has ${numPages} pages. Maximum is ${MAX_PAGES} pages.` };
  }
  
  return { valid: true };
}
