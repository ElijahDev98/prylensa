/**
 * -----------------------------------------------------------------------------
 * File: offer.factory.ts
 * Feature: Offer Domain
 *
 * Purpose:
 * Generates mock offers for the Product Catalog.
 *
 * NOTE:
 * This file exists only for mock data generation.
 * When the backend is connected, it will be removed.
 * -----------------------------------------------------------------------------
 */

import type { Offer } from "../types/offer.types";

interface OfferSeed {
  price: number;

  previousPrice: number;

  shippingFee: number;

  stockStatus: Offer["stockStatus"];
}

const STORE_ORDER = ["jumia", "konga", "amazon", "slot"] as const;

export function createOffers(productId: string, seeds: OfferSeed[]): Offer[] {
  return seeds.map((seed, index) => ({
    id: `${productId}-${STORE_ORDER[index]}`,

    productId,

    storeId: STORE_ORDER[index],

    currentPrice: seed.price,

    previousPrice: seed.previousPrice,

    discount: Math.round(
      ((seed.previousPrice - seed.price) / seed.previousPrice) * 100,
    ),

    shippingFee: seed.shippingFee,

    stockStatus: seed.stockStatus,

    estimatedDelivery:
      index === 3
        ? "Same Day"
        : index === 2
          ? "5–7 Days"
          : index === 1
            ? "1–3 Days"
            : "2–4 Days",

    productUrl: "#",

    lastUpdated: new Date().toISOString(),

    currency: "NGN",
  }));
}
