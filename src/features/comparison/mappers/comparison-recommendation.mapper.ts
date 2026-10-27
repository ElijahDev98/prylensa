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
import type { ComparisonSelectedProductAnalysis } from "../services/comparison.service";

import type { RecommendationViewModel } from "../viewmodels/recommendation.viewmodel";
import type { Offer } from "@/features/offer/types/offer.types";
import { getOfferFreshness } from "@/shared/utils/offer-freshness";

interface RecommendationMapperInput {
  recommendation: ComparisonRecommendation;

  product?: Product;

  store?: Store;

  productUrl?: string;

  sourceOffer?: Offer;

  savings?: number;

  searchAnalysis?: ComparisonSelectedProductAnalysis;

  formatPrice(valueInNgn: number): string;
}

export function toComparisonRecommendationViewModel({
  recommendation,
  product,
  store,
  productUrl = "",
  sourceOffer,
  savings = 0,
  searchAnalysis,
  formatPrice,
}: RecommendationMapperInput): RecommendationViewModel {
  const offer = recommendation.offer;

  const price = offer.price ?? 0;

  const discount = offer.discount ?? 0;

  const inStock = offer.availability === "IN_STOCK";

  const availabilityUnverified = sourceOffer?.availabilityStatus === "unverified";
  const availability = availabilityUnverified
    ? "Availability Unverified"
    : inStock
      ? "In Stock"
      : "Out of Stock";

  const storeName = store?.name ?? "Unknown Store";

  const productTitle = product?.title ?? "Unknown Product";

  const confidence = Math.round(recommendation.score * 100);
  const freshness = getOfferFreshness(
    sourceOffer?.observedAt,
    sourceOffer?.dataSource ?? "persisted-snapshot",
  );

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

  const title = availabilityUnverified
    ? `Verify availability at ${storeName}`
    : `Buy from ${storeName}`;

  const description = availabilityUnverified
    ? `${storeName} last listed ${productTitle} for ${formatPrice(price)}, but the stored observation is too old to confirm current availability. Verify the product page before relying on this price.`
    : discount > 0
      ? `${productTitle} is available from ${storeName} for ${formatPrice(price)} with a ${discount}% discount. This offer achieved the highest overall recommendation score after evaluating price, discount, availability and retailer quality.`
      : `${productTitle} is available from ${storeName} for ${formatPrice(price)}. This offer achieved the highest overall recommendation score after evaluating price, availability and retailer quality.`;

  return {
    title,

    description,

    storeId: offer.storeId,

    storeName,

    productId: offer.productId,

    productTitle,

    productUrl,

    price,

    discount,

    availability,

    confidence,

    savings,

    reasons,

    aiConfidenceLabel: searchAnalysis?.confidenceLabel ?? "",

    aiRiskLabel: searchAnalysis?.riskLabel ?? "",

    aiPredictionLabel: searchAnalysis?.predictionLabel ?? "",

    aiEvidenceLabel: searchAnalysis?.predictionEvidenceLabel ?? "",

    aiRecommendationAction: searchAnalysis?.recommendationAction ?? "",

    aiRecommendationReason: searchAnalysis?.recommendationReason ?? "",

    aiInsight: searchAnalysis?.insight ?? "",

    aiVariantStatus: searchAnalysis?.variantStatus ?? "insufficient",

    aiVariantLabel: searchAnalysis?.variantLabel ?? "Limited variant evidence",

    aiVariantSummary:
      searchAnalysis?.variantSummary ??
      "Marketplace titles do not provide enough shared variant evidence.",

    freshnessLabel: freshness.label,

    freshnessTitle: freshness.title,

    freshnessIsStale: freshness.isStale,
  };
}
