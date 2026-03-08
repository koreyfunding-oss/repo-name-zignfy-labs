import { NextRequest, NextResponse } from "next/server";
import { generateWithOllama } from "@/utils/ollama";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prospectName, prospectCompany, yourProduct, painPoint, tone } = body;

    if (!prospectName || !prospectCompany || !yourProduct || !painPoint || !tone) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const prompt = `You are a world-class copywriter specialising in cold email outreach.

Generate exactly 5 distinct cold email variants for the following scenario:

Prospect name: ${prospectName}
Prospect company: ${prospectCompany}
Product / service being pitched: ${yourProduct}
Pain point to address: ${painPoint}
Email tone: ${tone}

Rules:
- Each email must have a compelling subject line and a short body (3-5 sentences max).
- Personalise using the prospect name and company.
- Address the pain point directly and show how the product solves it.
- End with a clear, low-friction call to action.
- Do NOT number the emails inside the subject or body fields.

Return ONLY a valid JSON array with exactly 5 objects. Each object must have exactly two string fields: "subject" and "body".
No markdown, no code fences, no explanation — just the raw JSON array.

Example format:
[
  {"subject": "...", "body": "..."},
  {"subject": "...", "body": "..."}
]`;

    const raw = await generateWithOllama(prompt);

    // Extract JSON array from LLM response (the model may wrap it in markdown)
    const jsonMatch = raw.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      console.error("Ollama returned non-JSON response:", raw);
      return NextResponse.json(
        { error: "LLM did not return a valid JSON array." },
        { status: 502 }
      );
    }

    const results = JSON.parse(jsonMatch[0]);

    if (!Array.isArray(results) || results.length === 0) {
      console.error("Ollama returned empty or invalid results:", raw);
      return NextResponse.json(
        { error: "LLM returned an empty or invalid result." },
        { status: 502 }
      );
    }

    return NextResponse.json({ results });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
