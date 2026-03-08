"use client";

import { useState } from "react";

export interface EmailFormData {
  prospectName: string;
  prospectCompany: string;
  yourProduct: string;
  painPoint: string;
  tone: string;
}

interface FormProps {
  onSubmit: (data: EmailFormData) => void;
  loading: boolean;
}

const TONES = ["Professional", "Casual", "Friendly", "Bold", "Empathetic"];

export default function Form({ onSubmit, loading }: FormProps) {
  const [formData, setFormData] = useState<EmailFormData>({
    prospectName: "",
    prospectCompany: "",
    yourProduct: "",
    painPoint: "",
    tone: "Professional",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prospect Name
          </label>
          <input
            type="text"
            name="prospectName"
            value={formData.prospectName}
            onChange={handleChange}
            required
            placeholder="e.g. Sarah Johnson"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prospect Company
          </label>
          <input
            type="text"
            name="prospectCompany"
            value={formData.prospectCompany}
            onChange={handleChange}
            required
            placeholder="e.g. Acme Corp"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Your Product / Service
        </label>
        <input
          type="text"
          name="yourProduct"
          value={formData.yourProduct}
          onChange={handleChange}
          required
          placeholder="e.g. AI-powered sales analytics platform"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Pain Point to Address
        </label>
        <textarea
          name="painPoint"
          value={formData.painPoint}
          onChange={handleChange}
          required
          rows={3}
          placeholder="e.g. Struggling to convert leads into paying customers"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email Tone
        </label>
        <select
          name="tone"
          value={formData.tone}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          {TONES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? "Generating…" : "Generate Cold Emails"}
      </button>
    </form>
  );
}
