/**
 * -----------------------------------------------------------------------------
 * File: comparison-recommendation.mapper.ts
 * Feature: Comparison Domain
 *
 * Purpose:
 * Maps Comparison Analysis recommendations into presentation ViewModels.
 *
 * Responsibilities:
 * - Convert business recommendation models.
 * - Produce RecommendationViewModels.
 * - Keep presentation independent of business models.
 *
 * Does NOT:
 * - Execute business logic.
 * - Rank offers.
 * - Calculate scores.
 * -----------------------------------------------------------------------------
 */

import type { ComparisonRecommendation } from "../services/comparison-analysis/comparison-types";

import type { RecommendationViewModel } from "../viewmodels/recommendation.viewmodel";

export function toComparisonRecommendationViewModel(
  recommendation: ComparisonRecommendation,
): RecommendationViewModel {
  const price = recommendation.offer.price ?? 0;

  const discount = recommendation.offer.discount ?? 0;

  const inStock = recommendation.offer.availability === "IN_STOCK";

  const reasons: string[] = [];

  if (price > 0) {
    reasons.push("Competitive market price");
  }

  if (discount > 0) {
    reasons.push(`${discount}% discount available`);
  }

  if (inStock) {
    reasons.push("Currently in stock");
  }

  if (reasons.length === 0) {
    reasons.push("Best overall score among compared offers");
  }

  return {
    title: "Best Overall Recommendation",

    description:
      "This offer provides the strongest balance of price, discount and availability.",

    reasons,

    confidence: Math.round(recommendation.score * 100),

    savings: price,
  };
}
