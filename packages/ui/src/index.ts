/**
 * @zignfy/ui
 *
 * Shared UI primitives used across all Zignfy Labs micro-tools.
 * These are framework-agnostic building blocks (plain HTML string
 * renderers) so that any tool – CLI, web, or hybrid – can produce
 * consistent output without duplicating markup or styles.
 */

export interface ButtonProps {
  label: string;
  /** Defaults to "button". */
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

/**
 * Render a button element as an HTML string.
 *
 * @example
 * ```ts
 * import { renderButton } from "@zignfy/ui";
 * document.body.innerHTML = renderButton({ label: "Pay Now" });
 * ```
 */
export function renderButton(props: ButtonProps): string {
  const { label, type = "button", disabled = false, className = "" } = props;
  const disabledAttr = disabled ? " disabled" : "";
  const classAttr = className ? ` class="${className}"` : "";
  return `<button type="${type}"${classAttr}${disabledAttr}>${label}</button>`;
}

export interface CardProps {
  title: string;
  body: string;
  className?: string;
}

/**
 * Render a card element as an HTML string.
 */
export function renderCard(props: CardProps): string {
  const { title, body, className = "" } = props;
  const classAttr = className ? ` class="${className}"` : "";
  return `<div${classAttr}><h2>${title}</h2><p>${body}</p></div>`;
}

export interface AlertProps {
  message: string;
  /** Defaults to "info". */
  variant?: "info" | "success" | "warning" | "error";
}

/**
 * Render an alert banner as an HTML string.
 */
export function renderAlert(props: AlertProps): string {
  const { message, variant = "info" } = props;
  return `<div role="alert" data-variant="${variant}">${message}</div>`;
}
