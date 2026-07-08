/**
 * -----------------------------------------------------------------------------
 * File: recommendation.viewmodel.ts
 * Feature: Comparison Domain
 *
 * Purpose:
 * Presentation model representing the best comparison recommendation.
 *
 * Responsibilities:
 * - Provide everything required by the presentation layer.
 * - Keep UI independent from business models.
 *
 * Does NOT:
 * - Execute business logic.
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
   * Recommended store.
   */
  storeId: string;

  /**
   * Store display name.
   */
  storeName: string;

  /**
   * Recommended product.
   */
  productId: string;

  /**
   * Product display name.
   */
  productTitle: string;

  /**
   * Recommended price.
   */
  price: number;

  /**
   * Available discount.
   */
  discount: number;

  /**
   * Product availability.
   */
  availability: string;

  /**
   * Recommendation confidence.
   */
  confidence: number;

  /**
   * Estimated savings.
   */
  savings: number;

  /**
   * Recommendation reasons.
   */
  reasons: string[];
}

/**
 * Empty recommendation.
 */
export const EMPTY_RECOMMENDATION: RecommendationViewModel = {
  title: "",

  description: "",

  storeId: "",

  storeName: "",

  productId: "",

  productTitle: "",

  price: 0,

  discount: 0,

  availability: "",

  confidence: 0,

  savings: 0,

  reasons: [],
};
