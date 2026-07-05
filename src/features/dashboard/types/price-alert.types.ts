/**
 * -----------------------------------------------------------------------------
 * File: price-alert.types.ts
 * Feature: Dashboard
 *
 * Purpose:
 * Domain model for dashboard price alerts.
 * -----------------------------------------------------------------------------
 */

export interface PriceAlert {
  id: string;

  product: string;

  store: string;

  currentPrice: string;

  previousPrice: string;

  direction: "up" | "down";
}
