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

export function toComparisonSelectedProduct(
  result: SearchResultViewModel,
): ComparisonSelectedProduct {
  const image = result.images[0];

  return {
    id: result.id,

    title: result.title,

    brand: result.brand,

    category: result.category || "Marketplace result",

    description:
      result.specifications.length > 0
        ? result.specifications
            .map((specification) => `${specification.name}: ${specification.value}`)
            .join(", ")
        : `${result.title} from ${result.offerCount} marketplace offer${
            result.offerCount === 1 ? "" : "s"
          }.`,

    imageUrl: image?.url ?? result.thumbnail,

    imageAlt: image?.alt ?? result.title,

    rating: result.rating,

    reviewCount: result.reviewCount,

    specifications: result.specifications,

    offers: result.offers.map((offer) => ({
      id: offer.id,

      storeId: normalizeStoreId(offer.storeId),

      currentPrice: offer.currentPrice,

      previousPrice: offer.originalPrice ?? offer.currentPrice,

      discount: offer.discountPercentage ?? 0,

      shippingFee: 0,

      estimatedDelivery: "Marketplace delivery",

      stockStatus: offer.inStock ? "IN_STOCK" : "OUT_OF_STOCK",

      productUrl: offer.productUrl,
    })),
  };
}
