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

  /** Direct URL for the recommended marketplace listing. */
  productUrl: string;

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

  aiConfidenceLabel: string;

  aiRiskLabel: string;

  aiPredictionLabel: string;

  aiEvidenceLabel: string;

  aiRecommendationAction: string;

  aiRecommendationReason: string;

  aiInsight: string;

  aiVariantStatus: "verified" | "review" | "conflict" | "insufficient";

  aiVariantLabel: string;

  aiVariantSummary: string;

  freshnessLabel: string;

  freshnessTitle: string;

  freshnessIsStale: boolean;
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

  productUrl: "",

  price: 0,

  discount: 0,

  availability: "",

  confidence: 0,

  savings: 0,

  reasons: [],

  aiConfidenceLabel: "",

  aiRiskLabel: "",

  aiPredictionLabel: "",

  aiEvidenceLabel: "",

  aiRecommendationAction: "",

  aiRecommendationReason: "",

  aiInsight: "",

  aiVariantStatus: "insufficient",

  aiVariantLabel: "Limited variant evidence",

  aiVariantSummary: "Marketplace titles do not provide enough shared variant evidence.",

  freshnessLabel: "Observation time unavailable",

  freshnessTitle: "",

  freshnessIsStale: true,
};
