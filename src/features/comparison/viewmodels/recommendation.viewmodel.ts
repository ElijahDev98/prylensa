/**
 * -----------------------------------------------------------------------------
 * File: recommendation.viewmodel.ts
 * Feature: Comparison Domain
 *
 * Purpose:
 * Presentation model for comparison recommendations.
 * -----------------------------------------------------------------------------
 */

export interface RecommendationViewModel {
  /**
   * Recommendation heading.
   */
  title: string;

  /**
   * Recommendation description.
   */
  description: string;

  /**
   * Reasons supporting the recommendation.
   */
  reasons: string[];

  /**
   * Confidence score (0–100).
   */
  confidence: number;

  /**
   * Estimated savings amount.
   */
  savings: number;
}

/**
 * Default recommendation used when no comparison
 * recommendation is available.
 */
export const EMPTY_RECOMMENDATION: RecommendationViewModel = {
  title: "No Recommendation",

  description: "Select at least one product to generate a recommendation.",

  reasons: [],

  confidence: 0,

  savings: 0,
};
