/**
 * -----------------------------------------------------------------------------
 * File: price-alert.types.ts
 * Feature: Dashboard
 * -----------------------------------------------------------------------------
 */

export type AlertStatus = "drop" | "rise";

export interface PriceAlert {
  id: string;

  product: string;

  store: string;

  previousPrice: string;

  currentPrice: string;

  change: string;

  status: AlertStatus;
}
