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

  const inStock = offer.availability === "IN_STOCK";

  const availability = inStock ? "In Stock" : "Out of Stock";

  const storeName = store?.name ?? "Unknown Store";

  const productTitle = product?.title ?? "Unknown Product";

  const confidence = Math.round(recommendation.score * 100);

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

  if (confidence >= 90) {
    reasons.push("Excellent overall recommendation score");
  }

  if (reasons.length === 0) {
    reasons.push("Best overall offer among compared products");
  }

  const title = `Buy from ${storeName}`;

  const description =
    discount > 0
      ? `${productTitle} is available from ${storeName} for ₦${price.toLocaleString()} with a ${discount}% discount. This offer achieved the highest overall recommendation score after evaluating price, discount, availability and retailer quality.`
      : `${productTitle} is available from ${storeName} for ₦${price.toLocaleString()}. This offer achieved the highest overall recommendation score after evaluating price, availability and retailer quality.`;

  return {
    title,

    description,

    storeId: offer.storeId,

    storeName,

    productId: offer.productId,

    productTitle,

    price,

    discount,

    availability,

    confidence,

    savings: price,

    reasons,
  };
}
