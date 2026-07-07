/**
 * -----------------------------------------------------------------------------
 * File: offer.service.ts
 * Feature: Offer Domain
 *
 * Purpose:
 * Provides read-only access to the Offer Catalog.
 *
 * Responsibilities:
 * - Retrieve offers.
 * - Query offers by product.
 * - Query offers by store.
 * - Resolve lowest/highest offers.
 * -----------------------------------------------------------------------------
 */

import { OFFERS } from "../data/offers";

import type { Offer } from "../types/offer.types";

export function getOffers(): Offer[] {
  return OFFERS;
}

export function getOfferById(offerId: string): Offer | undefined {
  return OFFERS.find((offer) => offer.id === offerId);
}

export function getOffersByProductId(productId: string): Offer[] {
  return OFFERS.filter((offer) => offer.productId === productId);
}

export function getOffersByStoreId(storeId: string): Offer[] {
  return OFFERS.filter((offer) => offer.storeId === storeId);
}

/**
 * -----------------------------------------------------------------------------
 * Internal Helpers
 * -----------------------------------------------------------------------------
 */

function getOfferStatistics(productId: string) {
  const offers = getOffersByProductId(productId);

  if (offers.length === 0) {
    return {
      offers,
      lowest: null,
      highest: null,
      averagePrice: 0,
    };
  }

  let lowest = offers[0];
  let highest = offers[0];
  let total = 0;

  for (const offer of offers) {
    total += offer.currentPrice;

    if (offer.currentPrice < lowest.currentPrice) {
      lowest = offer;
    }

    if (offer.currentPrice > highest.currentPrice) {
      highest = offer;
    }
  }

  return {
    offers,
    lowest,
    highest,
    averagePrice: Math.round(total / offers.length),
  };
}

/**
 * -----------------------------------------------------------------------------
 * Aggregate Queries
 * -----------------------------------------------------------------------------
 */

export function getLowestOffer(productId: string): Offer | null {
  return getOfferStatistics(productId).lowest;
}

export function getHighestOffer(productId: string): Offer | null {
  return getOfferStatistics(productId).highest;
}

export function getAveragePrice(productId: string): number {
  return getOfferStatistics(productId).averagePrice;
}
