/**
 * @zignfy/utils
 *
 * Shared utility functions used across all Zignfy Labs micro-tools.
 */

/**
 * Format a money amount as a human-readable currency string.
 *
 * @example
 * formatCurrency(1099, "USD") // "$10.99"
 */
export function formatCurrency(amountInCents: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amountInCents / 100);
}

/**
 * Generate a RFC 4122 v4 UUID using the built-in `crypto` module.
 */
export function generateId(): string {
  return crypto.randomUUID();
}

/**
 * Truncate a string to `maxLength` characters, appending "…" when cut.
 *
 * @example
 * truncate("Hello, world!", 5) // "Hello…"
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "…";
}

/**
 * Sleep for `ms` milliseconds.
 *
 * @example
 * await sleep(500);
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Return a shallow clone of `obj` with all `undefined` values removed.
 */
export function compact<T extends Record<string, unknown>>(
  obj: T
): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined)
  ) as Partial<T>;
}
