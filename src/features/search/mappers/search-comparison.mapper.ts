/**
 * -----------------------------------------------------------------------------
 * File: search-comparison.mapper.ts
 * Feature: Search
 *
 * Purpose:
 * Maps Search presentation results into Comparison selection inputs.
 *
 * Responsibilities:
 * - Keep Search UI free of comparison data-shaping logic.
 * - Normalize marketplace identifiers for the Comparison store catalog.
 * -----------------------------------------------------------------------------
 */

import type { ComparisonSelectedProduct } from "@/features/comparison/services/comparison.service";

import type { SearchResultViewModel } from "../viewmodels/search.viewmodel";

function normalizeStoreId(storeId: string): string {
  const normalized = storeId.trim().toLowerCase();

  if (normalized.includes("jumia")) {
    return "jumia";
  }

  if (normalized.includes("konga")) {
    return "konga";
  }

  if (normalized.includes("slot")) {
    return "slot";
  }

  if (normalized.includes("amazon")) {
    return "amazon";
  }

  return normalized;
}

export function toComparisonSelectedProducts(
  result: SearchResultViewModel,
): ComparisonSelectedProduct[] {
  const offersByStore = new Map<string, typeof result.offers>();

  for (const offer of result.offers) {
    const storeId = normalizeStoreId(offer.storeId);
    const storeOffers = offersByStore.get(storeId) ?? [];
    storeOffers.push(offer);
    offersByStore.set(storeId, storeOffers);
  }

  return [...offersByStore.entries()].map(([storeId, offers]) => {
    const sortedOffers = [...offers].sort((left, right) => {
      const leftVerified = left.availabilityStatus === "in-stock";
      const rightVerified = right.availabilityStatus === "in-stock";
      if (leftVerified !== rightVerified) {
        return leftVerified ? -1 : 1;
      }

      return left.currentPrice - right.currentPrice;
    });
    const representative = sortedOffers[0];
    const title = representative?.productTitle || result.title;
    const imageUrl = representative?.imageUrl || result.thumbnail;

    return {
      id: `${result.id}::${storeId}`,

      title,

      brand: representative?.brand || result.brand,

      category: result.category || "Marketplace result",

      description: `${title} at ${representative?.storeName ?? storeId}, represented by ${offers.length} matched listing${offers.length === 1 ? "" : "s"}.`,

      imageUrl,

      imageAlt: title,

      rating: result.rating,

      reviewCount: result.reviewCount,

      specifications: [
        ...result.specifications,
        {
          id: `${result.id}-${storeId}-marketplace`,
          name: "Marketplace",
          value: representative?.storeName ?? storeId,
        },
      ],

      aiAnalysis: result.aiAnalysis
        ? {
            confidenceLabel: result.aiAnalysis.confidenceLabel,
            evaluationLabel: result.aiAnalysis.evaluationLabel,
            riskLabel: result.aiAnalysis.riskLabel,
            predictionLabel: result.aiAnalysis.predictionLabel,
            predictionEvidenceLabel: result.aiAnalysis.predictionEvidenceLabel,
            recommendationAction: result.aiAnalysis.recommendationAction,
            recommendationReason: result.aiAnalysis.recommendationReason,
            insight: result.aiAnalysis.insight,
            variantStatus: result.aiAnalysis.variantStatus,
            variantLabel: result.aiAnalysis.variantLabel,
            variantSummary: result.aiAnalysis.variantSummary,
          }
        : undefined,

      offers: sortedOffers.map((offer) => ({
        id: offer.id,

        storeId,

        currentPrice: offer.currentPrice,

        previousPrice: offer.originalPrice ?? offer.currentPrice,

        discount: offer.discountPercentage ?? 0,

        shippingFee: 0,

        estimatedDelivery: "Marketplace delivery",

        stockStatus: offer.availabilityStatus === "unverified"
          ? "UNVERIFIED"
          : offer.inStock
            ? "IN_STOCK"
            : "OUT_OF_STOCK",

        productUrl: offer.productUrl,

        dataSource: offer.dataSource,

        observedAt: offer.observedAt,

        availabilityStatus: offer.availabilityStatus,
      })),
    };
  });
}
