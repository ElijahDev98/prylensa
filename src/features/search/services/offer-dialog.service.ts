/**
 * -----------------------------------------------------------------------------
 * File: offer-dialog.service.ts
 * Feature: Search
 *
 * Purpose:
 * Provides business operations for the Offer Dialog.
 *
 * Responsibilities:
 * - Sort presentation offers.
 *
 * Architecture:
 * UI
 *   ↓
 * Offer Dialog
 *   ↓
 * Offer Dialog Service
 *   ↓
 * SearchOfferViewModel
 *
 * Notes:
 * - Operates exclusively on presentation models.
 * - Must never depend on Offer domain models.
 * -----------------------------------------------------------------------------
 */

import type { OfferSortOption } from "../types/offer-dialog.types";
import type { SearchOfferViewModel } from "../viewmodels/search.viewmodel";

/**
 * Sorts presentation offers according to the selected option.
 *
 * @param offers Presentation offer collection.
 * @param sort Selected sort option.
 * @returns Sorted presentation offers.
 */
export function sortOffers(
  offers: SearchOfferViewModel[],
  sort: OfferSortOption,
): SearchOfferViewModel[] {
  const sorted = [...offers];

  switch (sort) {
    case "lowest-price":
      return sorted.sort(
        (left, right) => left.currentPrice - right.currentPrice,
      );

    case "highest-discount":
      return sorted.sort(
        (left, right) =>
          (right.discountPercentage ?? 0) - (left.discountPercentage ?? 0),
      );

    case "store":
      return sorted.sort((left, right) =>
        left.storeName.localeCompare(right.storeName),
      );

    default:
      return sorted;
  }
}
