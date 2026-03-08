export function getSquareCheckoutUrl(): string {
  const url = process.env.NEXT_PUBLIC_SQUARE_CHECKOUT_URL;
  if (!url) {
    throw new Error("NEXT_PUBLIC_SQUARE_CHECKOUT_URL is not configured.");
  }
  return url;
}
