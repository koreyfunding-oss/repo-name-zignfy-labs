/**
 * @zignfy/ollama
 *
 * Shared Ollama client used across all Zignfy Labs micro-tools.
 * Wraps the Ollama HTTP API so individual apps never duplicate
 * connection or model-calling logic.
 */

export interface OllamaGenerateOptions {
  /** The Ollama model to use, e.g. "llama3", "mistral". */
  model: string;
  /** The prompt text to send. */
  prompt: string;
  /** Optional base URL; defaults to http://localhost:11434. */
  baseUrl?: string;
}

export interface OllamaGenerateResult {
  model: string;
  response: string;
  done: boolean;
}

/**
 * Send a generation request to a locally-running Ollama instance.
 *
 * @example
 * ```ts
 * import { generate } from "@zignfy/ollama";
 *
 * const result = await generate({ model: "llama3", prompt: "Hello!" });
 * console.log(result.response);
 * ```
 */
export async function generate(
  options: OllamaGenerateOptions
): Promise<OllamaGenerateResult> {
  const { model, prompt, baseUrl = "http://localhost:11434" } = options;

  const response = await fetch(`${baseUrl}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model, prompt, stream: false }),
  });

  if (!response.ok) {
    throw new Error(
      `Ollama request failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json() as Promise<OllamaGenerateResult>;
}

/**
 * List models available on the local Ollama instance.
 */
export async function listModels(
  baseUrl = "http://localhost:11434"
): Promise<string[]> {
  const response = await fetch(`${baseUrl}/api/tags`);

  if (!response.ok) {
    throw new Error(
      `Ollama list models failed: ${response.status} ${response.statusText}`
    );
  }

  const data = (await response.json()) as { models: Array<{ name: string }> };
  return data.models.map((m) => m.name);
}
