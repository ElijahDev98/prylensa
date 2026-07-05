/**
 * -----------------------------------------------------------------------------
 * File: recent-comparisons.ts
 * Feature: Dashboard
 * -----------------------------------------------------------------------------
 */

import type { RecentComparison } from "../types/recent-comparison.types";

export const RECENT_COMPARISONS: RecentComparison[] = [
  {
    id: "1",
    product: "Apple iPhone 16 Pro",
    comparedStores: 6,
    bestPrice: "₦1,999,000",
    comparedAt: "2 minutes ago",
  },
  {
    id: "2",
    product: "Samsung Galaxy S25 Ultra",
    comparedStores: 5,
    bestPrice: "₦2,050,000",
    comparedAt: "15 minutes ago",
  },
  {
    id: "3",
    product: "Sony WH-1000XM6",
    comparedStores: 4,
    bestPrice: "₦645,000",
    comparedAt: "1 hour ago",
  },
];
