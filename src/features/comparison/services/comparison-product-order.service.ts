/**
 * -----------------------------------------------------------------------------
 * File: comparison-product-order.service.ts
 * Feature: Comparison Domain
 *
 * Purpose:
 * Orders Product domain entities before presentation mapping.
 *
 * Responsibilities:
 * - Order Product entities.
 * - Preserve immutable collections.
 * - Support comparison preferences.
 *
 * Does NOT:
 * - Know about ViewModels.
 * - Know about UI.
 * - Know about React.
 * -----------------------------------------------------------------------------
 */

import type { Product } from "@/features/product";
import type { Offer } from "@/features/offer/types/offer.types";

import type { ComparisonSortOption } from "../types/comparison-preferences.types";

/**
 * Orders products according to the selected comparison preference.
 */
export function orderProducts(
  products: Product[],
  sortBy: ComparisonSortOption,
  offers: Offer[] = [],
): Product[] {
  const ordered = [...products];

  switch (sortBy) {
    case "price-ascending":
      ordered.sort((left, right) => getLowestPrice(left, offers) - getLowestPrice(right, offers));
      break;

    case "price-descending":
      ordered.sort((left, right) => getLowestPrice(right, offers) - getLowestPrice(left, offers));
      break;

    case "discount-descending":
      ordered.sort((left, right) => getHighestDiscount(right, offers) - getHighestDiscount(left, offers));
      break;

    case "alphabetical":
      ordered.sort(compareAlphabetically);
      break;
  }

  return ordered;
}

/**
 * Lowest price first.
 */
/**
 * Alphabetical order.
 */
function compareAlphabetically(left: Product, right: Product): number {
  return left.title.localeCompare(right.title);
}

/**
 * Lowest available offer.
 */
function getLowestPrice(product: Product, allOffers: Offer[]): number {
  const offers = allOffers.filter((offer) => offer.productId === product.id);

  if (offers.length === 0) {
    return Number.MAX_SAFE_INTEGER;
  }

  return Math.min(...offers.map((offer) => offer.currentPrice));
}

/**
 * Highest available discount.
 */
function getHighestDiscount(product: Product, allOffers: Offer[]): number {
  const offers = allOffers.filter((offer) => offer.productId === product.id);

  if (offers.length === 0) {
    return 0;
  }

  return Math.max(...offers.map((offer) => offer.discount));
}
