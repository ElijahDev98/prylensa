/**
 * -----------------------------------------------------------------------------
 * File: price-alerts.ts
 * Feature: Dashboard
 * -----------------------------------------------------------------------------
 */

import type { PriceAlert } from "../types/price-alert.types";

export const PRICE_ALERTS: PriceAlert[] = [
  {
    id: "1",
    product: "Apple iPhone 16 Pro",
    store: "Jumia",
    previousPrice: "₦2,050,000",
    currentPrice: "₦1,999,000",
    change: "-₦51,000",
    status: "drop",
  },
  {
    id: "2",
    product: "Samsung Galaxy S25 Ultra",
    store: "Konga",
    previousPrice: "₦2,020,000",
    currentPrice: "₦2,080,000",
    change: "+₦60,000",
    status: "rise",
  },
  {
    id: "3",
    product: "Sony WH-1000XM6",
    store: "Slot",
    previousPrice: "₦660,000",
    currentPrice: "₦645,000",
    change: "-₦15,000",
    status: "drop",
  },
];
