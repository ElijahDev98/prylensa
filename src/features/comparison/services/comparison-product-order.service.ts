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

import { getOffersByProductId } from "@/features/offer/services/offer.service";

import type { Product } from "@/features/product";

import type { ComparisonSortOption } from "../types/comparison-preferences.types";

/**
 * Orders products according to the selected comparison preference.
 */
export function orderProducts(
  products: Product[],
  sortBy: ComparisonSortOption,
): Product[] {
  const ordered = [...products];

  switch (sortBy) {
    case "price-ascending":
      ordered.sort(compareLowestPriceAscending);
      break;

    case "price-descending":
      ordered.sort(compareLowestPriceDescending);
      break;

    case "discount-descending":
      ordered.sort(compareHighestDiscountDescending);
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
function compareLowestPriceAscending(left: Product, right: Product): number {
  return getLowestPrice(left) - getLowestPrice(right);
}

/**
 * Highest price first.
 */
function compareLowestPriceDescending(left: Product, right: Product): number {
  return getLowestPrice(right) - getLowestPrice(left);
}

/**
 * Highest discount first.
 */
function compareHighestDiscountDescending(
  left: Product,
  right: Product,
): number {
  return getHighestDiscount(right) - getHighestDiscount(left);
}

/**
 * Alphabetical order.
 */
function compareAlphabetically(left: Product, right: Product): number {
  return left.title.localeCompare(right.title);
}

/**
 * Lowest available offer.
 */
function getLowestPrice(product: Product): number {
  const offers = getOffersByProductId(product.id);

  if (offers.length === 0) {
    return Number.MAX_SAFE_INTEGER;
  }

  return Math.min(...offers.map((offer) => offer.currentPrice));
}

/**
 * Highest available discount.
 */
function getHighestDiscount(product: Product): number {
  const offers = getOffersByProductId(product.id);

  if (offers.length === 0) {
    return 0;
  }

  return Math.max(...offers.map((offer) => offer.discount));
}
