/**
 * -----------------------------------------------------------------------------
 * File: comparison-analytics.viewmodel.ts
 * Feature: Comparison Domain
 *
 * Purpose:
 * Presentation model for comparison analytics.
 * -----------------------------------------------------------------------------
 */

export interface ComparisonPricePointViewModel {
  storeId: string;

  storeName: string;

  price: number;
}

export interface ComparisonAnalyticsViewModel {
  /**
   * Price distribution by store.
   */
  prices: ComparisonPricePointViewModel[];

  /**
   * Lowest price.
   */
  lowestPrice: number;

  /**
   * Highest price.
   */
  highestPrice: number;

  /**
   * Average price.
   */
  averagePrice: number;
}

export const EMPTY_ANALYTICS: ComparisonAnalyticsViewModel = {
  prices: [],

  lowestPrice: 0,

  highestPrice: 0,

  averagePrice: 0,
};
