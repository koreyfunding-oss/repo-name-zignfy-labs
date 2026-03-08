/**
 * @zignfy/square
 *
 * Shared Square payments client used across all Zignfy Labs micro-tools.
 * Provides a thin, typed wrapper around the Square REST API so individual
 * apps never duplicate authentication or payment logic.
 */

export interface SquareClientOptions {
  /** Square access token (sandbox or production). */
  accessToken: string;
  /** Use the sandbox environment; defaults to false. */
  sandbox?: boolean;
}

export interface CreatePaymentOptions {
  /** Amount in the smallest currency unit (e.g. cents for USD). */
  amountMoney: { amount: number; currency: string };
  /** A unique, client-generated idempotency key. */
  idempotencyKey: string;
  /** Square payment source ID (e.g. a nonce from Web Payments SDK). */
  sourceId: string;
}

export interface PaymentResult {
  id: string;
  status: string;
  amountMoney: { amount: number; currency: string };
}

const PRODUCTION_URL = "https://connect.squareup.com";
const SANDBOX_URL = "https://connect.squareupsandbox.com";

export class SquareClient {
  private readonly baseUrl: string;
  private readonly accessToken: string;

  constructor({ accessToken, sandbox = false }: SquareClientOptions) {
    this.accessToken = accessToken;
    this.baseUrl = sandbox ? SANDBOX_URL : PRODUCTION_URL;
  }

  private get headers(): Record<string, string> {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.accessToken}`,
      "Square-Version": "2024-01-17",
    };
  }

  /**
   * Create a payment.
   *
   * @example
   * ```ts
   * import { SquareClient } from "@zignfy/square";
   *
   * const client = new SquareClient({ accessToken: process.env.SQUARE_TOKEN!, sandbox: true });
   * const payment = await client.createPayment({
   *   amountMoney: { amount: 1000, currency: "USD" },
   *   idempotencyKey: crypto.randomUUID(),
   *   sourceId: "cnon:card-nonce-ok",
   * });
   * ```
   */
  async createPayment(options: CreatePaymentOptions): Promise<PaymentResult> {
    const response = await fetch(`${this.baseUrl}/v2/payments`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(options),
    });

    if (!response.ok) {
      throw new Error(
        `Square createPayment failed: ${response.status} ${response.statusText}`
      );
    }

    const data = (await response.json()) as { payment: PaymentResult };
    return data.payment;
  }

  /**
   * Retrieve a payment by ID.
   */
  async getPayment(paymentId: string): Promise<PaymentResult> {
    const response = await fetch(`${this.baseUrl}/v2/payments/${paymentId}`, {
      headers: this.headers,
    });

    if (!response.ok) {
      throw new Error(
        `Square getPayment failed: ${response.status} ${response.statusText}`
      );
    }

    const data = (await response.json()) as { payment: PaymentResult };
    return data.payment;
  }
}
