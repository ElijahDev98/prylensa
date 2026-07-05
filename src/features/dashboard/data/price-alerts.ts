/**
 * -----------------------------------------------------------------------------
 * File: price-alerts.ts
 * Feature: Dashboard
 *
 * Purpose:
 * Mock data for dashboard price alerts.
 * -----------------------------------------------------------------------------
 */

import type { PriceAlert } from "../types/price-alert.types";

export const PRICE_ALERTS: PriceAlert[] = [
  {
    id: "1",
    product: "Apple iPhone 16 Pro",
    store: "Jumia",
    currentPrice: "₦1,999,000",
    previousPrice: "₦2,050,000",
    direction: "down",
  },
  {
    id: "2",
    product: "MacBook Pro M5",
    store: "iStore",
    currentPrice: "₦4,250,000",
    previousPrice: "₦4,180,000",
    direction: "up",
  },
  {
    id: "3",
    product: "Sony WH-1000XM6",
    store: "Slot",
    currentPrice: "₦645,000",
    previousPrice: "₦699,000",
    direction: "down",
  },
];
