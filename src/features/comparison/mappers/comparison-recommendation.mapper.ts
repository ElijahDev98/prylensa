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
 * - Keep presentation independent from business models.
 * -----------------------------------------------------------------------------
 */

import type { Product } from "@/features/product/types/product.types";

import type { Store } from "@/features/store/types/store.types";

import type { ComparisonRecommendation } from "../services/comparison-analysis/comparison-types";

import type { RecommendationViewModel } from "../viewmodels/recommendation.viewmodel";

interface RecommendationMapperInput {
  recommendation: ComparisonRecommendation;

  product?: Product;

  store?: Store;
}

export function toComparisonRecommendationViewModel({
  recommendation,
  product,
  store,
}: RecommendationMapperInput): RecommendationViewModel {
  const offer = recommendation.offer;

  const price = offer.price ?? 0;

  const discount = offer.discount ?? 0;

  const availability =
    offer.availability === "IN_STOCK" ? "In Stock" : "Out of Stock";

  const reasons: string[] = [];

  if (price > 0) {
    reasons.push("Competitive market price");
  }

  if (discount > 0) {
    reasons.push(`${discount}% discount available`);
  }

  if (offer.availability === "IN_STOCK") {
    reasons.push("Currently in stock");
  }

  if (reasons.length === 0) {
    reasons.push("Best overall score among compared offers");
  }

  return {
    title: "Best Overall Recommendation",

    description:
      "This offer provides the strongest balance of price, discount and availability.",

    storeId: offer.storeId,

    storeName: store?.name ?? "Unknown Store",

    productId: offer.productId,

    productTitle: product?.title ?? "Unknown Product",

    price,

    discount,

    availability,

    confidence: Math.round(recommendation.score * 100),

    savings: price,

    reasons,
  };
}
