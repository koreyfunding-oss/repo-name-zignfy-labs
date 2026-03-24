/**
 * @zignfy/example-tool
 *
 * Demonstrates how every micro-tool in /apps consumes the shared
 * packages from /packages instead of duplicating logic.
 *
 * Shared packages used:
 *   @zignfy/ollama  – AI model generation
 *   @zignfy/square  – Payment processing
 *   @zignfy/ui      – UI rendering primitives
 *   @zignfy/utils   – Common helpers
 */

import { generate } from "@zignfy/ollama";
import { SquareClient } from "@zignfy/square";
import { renderAlert, renderButton, renderCard } from "@zignfy/ui";
import { formatCurrency, generateId, truncate } from "@zignfy/utils";

async function run(): Promise<void> {
  // ── UI ──────────────────────────────────────────────────────────────────────
  console.log("=== UI Components ===");
  console.log(renderCard({ title: "Zignfy Example Tool", body: "Monorepo demo" }));
  console.log(renderButton({ label: "Pay Now", type: "submit" }));
  console.log(renderAlert({ message: "Tool started successfully.", variant: "success" }));

  // ── Utils ────────────────────────────────────────────────────────────────────
  console.log("\n=== Utilities ===");
  console.log("ID:", generateId());
  console.log("Price:", formatCurrency(4999, "USD"));
  console.log("Truncated:", truncate("Hello from the example tool!", 15));

  // ── Ollama (only runs when a local Ollama server is reachable) ───────────────
  console.log("\n=== Ollama ===");
  try {
    const result = await generate({ model: "llama3", prompt: "Say hello in one sentence." });
    console.log("Ollama response:", result.response);
  } catch {
    console.log("Ollama not reachable – skipping (run `ollama serve` to enable).");
  }

  // ── Square (sandbox, requires env var) ────────────────────────────────────────
  console.log("\n=== Square ===");
  const squareToken = process.env.SQUARE_ACCESS_TOKEN;
  if (squareToken) {
    const client = new SquareClient({ accessToken: squareToken, sandbox: true });
    try {
      const payment = await client.createPayment({
        amountMoney: { amount: 100, currency: "USD" },
        idempotencyKey: generateId(),
        sourceId: "cnon:card-nonce-ok",
      });
      console.log("Payment created:", payment.id, payment.status);
    } catch (err) {
      console.log("Square error:", (err as Error).message);
    }
  } else {
    console.log("SQUARE_ACCESS_TOKEN not set – skipping Square demo.");
  }
}

run().catch(console.error);
