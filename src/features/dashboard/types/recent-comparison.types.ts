/**
 * -----------------------------------------------------------------------------
 * File: recent-comparison.types.ts
 * Feature: Dashboard
 * -----------------------------------------------------------------------------
 */

export interface RecentComparison {
  id: string;

  product: string;

  comparedStores: number;

  bestPrice: string;

  comparedAt: string;
}
