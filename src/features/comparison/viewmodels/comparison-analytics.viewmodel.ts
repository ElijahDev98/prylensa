/**
 * -----------------------------------------------------------------------------
 * File: comparison-analytics.viewmodel.ts
 * Feature: Comparison Domain
 *
 * Purpose:
 * Presentation model for comparison analytics.
 *
 * Responsibilities:
 * - Represent analytics ready for visualization.
 * - Keep chart components presentation-only.
 * -----------------------------------------------------------------------------
 */

/**
 * Analytics point representing a single compared product.
 */
export interface ComparisonPricePointViewModel {
  /**
   * Product identifier.
   */
  productId: string;

  /**
   * Product display name.
   */
  productName: string;

  /**
   * Best available price across visible stores.
   */
  price: number;

  /**
   * Indicates the lowest-priced product.
   */
  isLowest: boolean;

  /**
   * Indicates the highest-priced product.
   */
  isHighest: boolean;
}

export interface ComparisonAnalyticsViewModel {
  /**
   * Product price distribution.
   */
  prices: ComparisonPricePointViewModel[];

  /**
   * Lowest available price.
   */
  lowestPrice: number;

  /**
   * Highest available price.
   */
  highestPrice: number;

  /**
   * Average product price.
   */
  averagePrice: number;
}

/**
 * Empty analytics.
 */
export const EMPTY_ANALYTICS: ComparisonAnalyticsViewModel = {
  prices: [],

  lowestPrice: 0,

  highestPrice: 0,

  averagePrice: 0,
};
