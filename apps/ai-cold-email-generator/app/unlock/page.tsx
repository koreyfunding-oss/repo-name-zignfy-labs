"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Results, { EmailResult } from "@/components/Results";
import { Suspense } from "react";

const STORAGE_KEY = "cold_email_results";

function readResultsFromStorage(): EmailResult[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as EmailResult[]) : [];
  } catch {
    return [];
  }
}

function UnlockContent() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");

  const [results] = useState<EmailResult[]>(readResultsFromStorage);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Loading…</p>
      </div>
    );
  }

  if (success !== "true") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-8 text-center max-w-sm">
          <p className="text-sm font-medium text-yellow-800">
            Payment not confirmed. Please complete checkout to unlock your
            emails.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block text-sm text-indigo-600 hover:underline"
          >
            ← Back to generator
          </Link>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center max-w-sm shadow-sm">
          <p className="text-sm text-gray-600">
            No saved results found. Please generate emails first.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block text-sm text-indigo-600 hover:underline"
          >
            ← Generate emails
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="mx-auto max-w-2xl px-4 py-12">
        <div className="mb-8 text-center">
          <span className="mb-3 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green-700">
            ✅ Payment Successful
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Your Cold Emails
          </h1>
          <p className="mt-2 text-base text-gray-500">
            All {results.length} emails are now unlocked.
          </p>
        </div>

        <Results results={results} unlocked={true} />

        <div className="mt-8 text-center">
          <Link href="/" className="text-sm text-indigo-600 hover:underline">
            ← Generate new emails
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function UnlockPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-gray-500">Loading…</p>
        </div>
      }
    >
      <UnlockContent />
    </Suspense>
  );
}

