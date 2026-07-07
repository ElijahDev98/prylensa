/**
 * -----------------------------------------------------------------------------
 * File: offer.service.ts
 * Feature: Offer Domain
 *
 * Purpose:
 * Central business service for Offer entities.
 *
 * Responsibilities:
 * - Retrieve offers.
 * - Query offers.
 * - Calculate offer statistics.
 * - Sort offers.
 *
 * Does NOT:
 * - Manage React state.
 * - Render UI.
 * -----------------------------------------------------------------------------
 */

import { OFFERS } from "../data/offers";

import type { Offer } from "../types/offer.types";

export type OfferSortOption =
  "lowest-price" | "highest-price" | "highest-discount";

/* -------------------------------------------------------------------------- */
/* Private Helpers                                                            */
/* -------------------------------------------------------------------------- */

function getTotalCost(offer: Offer): number {
  return offer.currentPrice + offer.shippingFee;
}

function compareByTotalCost(a: Offer, b: Offer): number {
  return getTotalCost(a) - getTotalCost(b);
}

/* -------------------------------------------------------------------------- */
/* Retrieval                                                                  */
/* -------------------------------------------------------------------------- */

export function getOffers(): Offer[] {
  return OFFERS;
}

export function getOfferById(id: string): Offer | undefined {
  return OFFERS.find((offer) => offer.id === id);
}

export function getOffersByProductId(productId: string): Offer[] {
  return OFFERS.filter((offer) => offer.productId === productId);
}

export function getOffersByStoreId(storeId: string): Offer[] {
  return OFFERS.filter((offer) => offer.storeId === storeId);
}

/* -------------------------------------------------------------------------- */
/* Analytics                                                                  */
/* -------------------------------------------------------------------------- */

export function getLowestOffer(productId: string): Offer | undefined {
  return getOffersByProductId(productId).slice().sort(compareByTotalCost)[0];
}

export function getHighestOffer(productId: string): Offer | undefined {
  return getOffersByProductId(productId)
    .slice()
    .sort(compareByTotalCost)
    .at(-1);
}

export function getAveragePrice(productId: string): number {
  const offers = getOffersByProductId(productId);

  if (offers.length === 0) {
    return 0;
  }

  const total = offers.reduce((sum, offer) => sum + getTotalCost(offer), 0);

  return total / offers.length;
}

/* -------------------------------------------------------------------------- */
/* Sorting                                                                    */
/* -------------------------------------------------------------------------- */

export function sortOffers(offers: Offer[], option: OfferSortOption): Offer[] {
  const sorted = [...offers];

  switch (option) {
    case "lowest-price":
      return sorted.sort(compareByTotalCost);

    case "highest-price":
      return sorted.sort((a, b) => compareByTotalCost(b, a));

    case "highest-discount":
      return sorted.sort((a, b) => b.discount - a.discount);

    default:
      return sorted;
  }
}
