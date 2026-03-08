"use client";

import { useState, useEffect } from "react";
import Form, { EmailFormData } from "@/components/Form";
import Results, { EmailResult } from "@/components/Results";

const STORAGE_KEY = "cold_email_results";

export default function Home() {
  const [results, setResults] = useState<EmailResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Restore any previously generated results from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setResults(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  async function handleGenerate(formData: EmailFormData) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Generation failed.");
      }
      setResults(data.results);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data.results));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="mx-auto max-w-2xl px-4 py-12">
        {/* Header */}
        <div className="mb-10 text-center">
          <span className="mb-3 inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700">
            AI-Powered
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Cold Email Generator
          </h1>
          <p className="mt-3 text-base text-gray-500">
            Generate personalised cold emails in seconds using AI. Preview 2
            free, unlock all 5 after payment.
          </p>
        </div>

        {/* Form card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm mb-8">
          <Form onSubmit={handleGenerate} loading={loading} />
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <Results results={results} unlocked={false} />
        )}
      </div>
    </div>
  );
}
