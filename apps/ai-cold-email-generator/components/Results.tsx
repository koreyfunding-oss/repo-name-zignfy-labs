"use client";

import { getSquareCheckoutUrl } from "@/utils/square";

export interface EmailResult {
  subject: string;
  body: string;
}

interface ResultsProps {
  results: EmailResult[];
  unlocked: boolean;
}

const PREVIEW_COUNT = 2;

export default function Results({ results, unlocked }: ResultsProps) {
  function handleUnlock() {
    const checkoutUrl = getSquareCheckoutUrl();
    window.location.href = checkoutUrl;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">
        Generated Emails ({results.length})
      </h2>

      {results.map((email, index) => {
        const isLocked = !unlocked && index >= PREVIEW_COUNT;
        return (
          <div
            key={index}
            className={`relative rounded-xl border bg-white p-5 shadow-sm ${
              isLocked ? "overflow-hidden" : ""
            }`}
          >
            {isLocked && (
              <div className="absolute inset-0 z-10 flex items-center justify-center backdrop-blur-sm bg-white/30 rounded-xl">
                <span className="text-sm font-medium text-gray-600 select-none">
                  🔒 Unlock to view
                </span>
              </div>
            )}
            <div className={isLocked ? "select-none pointer-events-none" : ""}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-600">
                Email {index + 1}
              </p>
              <p className="mb-3 text-sm font-semibold text-gray-800">
                <span className="text-gray-500">Subject: </span>
                {email.subject}
              </p>
              <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans leading-relaxed">
                {email.body}
              </pre>
            </div>
          </div>
        );
      })}

      {!unlocked && results.length > PREVIEW_COUNT && (
        <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-5 text-center">
          <p className="mb-3 text-sm text-gray-700">
            <strong>{results.length - PREVIEW_COUNT} more emails</strong> are
            locked. Unlock all results instantly.
          </p>
          <button
            onClick={handleUnlock}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
          >
            🔓 Unlock All Emails
          </button>
        </div>
      )}
    </div>
  );
}
