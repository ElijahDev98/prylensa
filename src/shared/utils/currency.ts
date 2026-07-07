/**
 * -----------------------------------------------------------------------------
 * File: currency.ts
 * Shared Utility
 *
 * Purpose:
 * Provides a centralized currency formatter for the application.
 *
 * Responsibilities:
 * - Format monetary values.
 * - Ensure consistent currency display.
 *
 * Does NOT:
 * - Perform business calculations.
 * -----------------------------------------------------------------------------
 */

const DEFAULT_LOCALE = "en-NG";

const DEFAULT_CURRENCY = "NGN";

const currencyFormatter = new Intl.NumberFormat(DEFAULT_LOCALE, {
  style: "currency",
  currency: DEFAULT_CURRENCY,
  maximumFractionDigits: 0,
});

export function formatCurrency(value: number): string {
  return currencyFormatter.format(value);
}
