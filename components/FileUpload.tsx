'use client';

import { useState, useRef, DragEvent } from 'react';
import { Upload, File, X, AlertCircle } from 'lucide-react';
import { Language } from '@/types';
import { t } from '@/lib/i18n';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  language: Language;
}

export default function FileUpload({ onFileSelect, selectedFile, language }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const MAX_SIZE = 15 * 1024 * 1024; // 15MB

  const validateFile = (file: File): boolean => {
    setError(null);

    if (file.type !== 'application/pdf') {
      setError(language === 'en' ? 'Only PDF files are accepted' : 'PDF 파일만 업로드 가능합니다');
      return false;
    }

    if (file.size > MAX_SIZE) {
      setError(language === 'en' ? 'File size exceeds 15MB limit' : '파일 크기가 15MB를 초과합니다');
      return false;
    }

    return true;
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (validateFile(file)) {
        onFileSelect(file);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (validateFile(file)) {
        onFileSelect(file);
      }
    }
  };

  const handleRemoveFile = () => {
    onFileSelect(null as any);
    setError(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="w-full">
      {/* Drop Zone */}
      {!selectedFile ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`drop-zone rounded-xl p-12 text-center cursor-pointer transition-all ${
            isDragging ? 'active' : ''
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
          />

          <Upload className="w-12 h-12 mx-auto mb-4 text-text-secondary" />
          
          <p className="text-lg font-medium mb-2">
            {t('uploadDrag', language)}
          </p>
          
          <p className="text-text-secondary mb-4">
            {t('uploadOr', language)}
          </p>
          
          <button
            type="button"
            className="px-6 py-2 bg-brand-blue text-white rounded-lg hover:brightness-110 transition-all"
          >
            {t('uploadBrowse', language)}
          </button>

          <p className="mt-4 text-sm text-text-secondary">
            {t('uploadLimit', language)}
          </p>
        </div>
      ) : (
        // Selected File Preview
        <div className="rounded-xl border border-border-color bg-bg-surface p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-brand-blue/20 flex items-center justify-center">
              <File className="w-6 h-6 text-brand-blue" />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{selectedFile.name}</p>
              <p className="text-sm text-text-secondary">
                {formatFileSize(selectedFile.size)}
              </p>
            </div>

            <button
              onClick={handleRemoveFile}
              className="p-2 rounded-lg hover:bg-bg-card transition-colors"
            >
              <X className="w-5 h-5 text-text-secondary" />
            </button>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="mt-4 flex items-center gap-2 text-no-go text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
