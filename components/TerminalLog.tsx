'use client';

import { useState, useEffect } from 'react';

const TERMINAL_MESSAGES = [
  { text: 'Initializing DeckGuard v1.0...', delay: 500 },
  { text: 'Processing uploaded document...', delay: 1000 },
  { text: 'Extracting text content...', delay: 1500 },
  { text: 'Analyzing market logic...', delay: 2000 },
  { text: 'Checking business model clarity...', delay: 2500 },
  { text: 'Evaluating unit economics...', delay: 3000 },
  { text: 'Validating stage alignment...', delay: 3500 },
  { text: 'Analysis complete.', delay: 4000 },
];

export default function TerminalLog() {
  const [displayedMessages, setDisplayedMessages] = useState<string[]>([]);
  const [currentText, setCurrentText] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (messageIndex >= TERMINAL_MESSAGES.length) return;

    const currentMessage = TERMINAL_MESSAGES[messageIndex].text;

    if (charIndex < currentMessage.length) {
      // Typing effect
      const timeout = setTimeout(() => {
        setCurrentText(currentMessage.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 30);
      return () => clearTimeout(timeout);
    } else {
      // Move to next message
      const timeout = setTimeout(() => {
        setDisplayedMessages([...displayedMessages, currentMessage]);
        setCurrentText('');
        setCharIndex(0);
        setMessageIndex(messageIndex + 1);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [messageIndex, charIndex, displayedMessages]);

  const getMessageColor = (message: string): string => {
    if (message.includes('complete')) return 'text-go';
    if (message.includes('Initializing')) return 'text-brand-blue';
    return 'text-text-secondary';
  };

  const isComplete = messageIndex >= TERMINAL_MESSAGES.length;

  return (
    <div className="w-full">
      {/* Terminal Window */}
      <div className="bg-bg-card border border-border-color rounded-xl overflow-hidden">
        {/* Window Header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border-color bg-bg-surface">
          <div className="w-3 h-3 rounded-full bg-no-go" />
          <div className="w-3 h-3 rounded-full bg-hold" />
          <div className="w-3 h-3 rounded-full bg-go" />
          <span className="ml-2 text-sm text-text-secondary font-mono">
            DeckGuard Terminal
          </span>
        </div>

        {/* Terminal Content */}
        <div className="p-6 font-mono text-sm min-h-[300px]">
          {/* Displayed Messages */}
          {displayedMessages.map((message, index) => (
            <div key={index} className={`mb-2 ${getMessageColor(message)}`}>
              <span className="text-text-secondary mr-2">$</span>
              {message}
              {message.includes('complete') && (
                <span className="ml-2">✓</span>
              )}
            </div>
          ))}

          {/* Current Typing Message */}
          {currentText && (
            <div className="mb-2 text-text-secondary">
              <span className="mr-2">$</span>
              {currentText}
              <span className="cursor-blink ml-0.5">|</span>
            </div>
          )}

          {/* Loading indicator when not complete */}
          {!isComplete && !currentText && displayedMessages.length === 0 && (
            <div className="flex items-center gap-2 text-text-secondary">
              <span>$</span>
              <span className="cursor-blink">|</span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="px-6 pb-4">
          <div className="h-1 bg-bg-surface rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-blue transition-all duration-300"
              style={{
                width: `${(messageIndex / TERMINAL_MESSAGES.length) * 100}%`,
              }}
            />
          </div>
          <p className="mt-2 text-xs text-text-secondary text-center">
            {isComplete ? 'Processing results...' : `Step ${messageIndex + 1} of ${TERMINAL_MESSAGES.length}`}
          </p>
        </div>
      </div>
    </div>
  );
}
