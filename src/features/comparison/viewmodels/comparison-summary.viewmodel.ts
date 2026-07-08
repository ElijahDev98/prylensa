/**
 * -----------------------------------------------------------------------------
 * File: comparison-summary.viewmodel.ts
 * Feature: Comparison Domain
 *
 * Purpose:
 * Presentation model for comparison summary.
 * -----------------------------------------------------------------------------
 */

export interface ComparisonSummaryViewModel {
  /**
   * Lowest available price.
   */
  lowestPrice: number;

  /**
   * Highest available price.
   */
  highestPrice: number;

  /**
   * Average price.
   */
  averagePrice: number;

  /**
   * Estimated savings.
   */
  estimatedSavings: number;

  /**
   * Number of compared products.
   */
  comparedProducts: number;
}

/**
 * Empty summary.
 */
export const EMPTY_SUMMARY: ComparisonSummaryViewModel = {
  lowestPrice: 0,

  highestPrice: 0,

  averagePrice: 0,

  estimatedSavings: 0,

  comparedProducts: 0,
};
