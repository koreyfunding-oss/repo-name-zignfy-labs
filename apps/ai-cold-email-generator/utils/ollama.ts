const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || "http://localhost:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama3";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
const OPENAI_BASE_URL =
  process.env.OPENAI_BASE_URL || "https://api.openai.com";

/**
 * Generate text using either OpenAI (when OPENAI_API_KEY is set, e.g. on
 * Vercel) or a local Ollama instance (default for local development).
 */
export async function generateWithOllama(prompt: string): Promise<string> {
  if (OPENAI_API_KEY) {
    return generateWithOpenAI(prompt);
  }
  return generateWithOllamaLocal(prompt);
}

async function generateWithOpenAI(prompt: string): Promise<string> {
  const response = await fetch(`${OPENAI_BASE_URL}/v1/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    throw new Error(
      `OpenAI request failed (${response.status}): ${response.statusText}`
    );
  }

  let data: { choices?: Array<{ message?: { content?: string } }> };
  try {
    data = await response.json();
  } catch {
    throw new Error("OpenAI returned a non-JSON response.");
  }

  const content = data?.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("OpenAI returned an empty or unexpected response.");
  }

  return content;
}

async function generateWithOllamaLocal(prompt: string): Promise<string> {
  const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      prompt,
      stream: false,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Ollama request failed (${response.status}): ${response.statusText}`
    );
  }

  const data = await response.json();
  return data.response as string;
}
