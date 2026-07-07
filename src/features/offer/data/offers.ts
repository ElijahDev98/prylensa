/**
 * -----------------------------------------------------------------------------
 * File: offers.ts
 * Feature: Offer Domain
 *
 * Purpose:
 * Shared Offer Catalog.
 *
 * NOTE:
 * Mock offers are generated from a compact catalog so every product
 * automatically has offers from every supported store.
 * -----------------------------------------------------------------------------
 */

import type { Offer } from "../types/offer.types";

interface OfferSeed {
  productId: string;
  basePrice: number;
}

const STORE_VARIATIONS = [
  {
    storeId: "jumia",
    multiplier: 1.0,
    shippingFee: 3500,
    delivery: "1-2 Days",
  },
  {
    storeId: "konga",
    multiplier: 0.985,
    shippingFee: 2500,
    delivery: "2-3 Days",
  },
  {
    storeId: "slot",
    multiplier: 1.02,
    shippingFee: 0,
    delivery: "Pickup Today",
  },
  {
    storeId: "amazon",
    multiplier: 1.03,
    shippingFee: 8000,
    delivery: "5-8 Days",
  },
] as const;

const OFFER_SEEDS: OfferSeed[] = [
  {
    productId: "iphone-15-pro-max",
    basePrice: 1899000,
  },

  {
    productId: "galaxy-s25-ultra",
    basePrice: 1799000,
  },

  {
    productId: "pixel-10-pro",
    basePrice: 1499000,
  },

  {
    productId: "xiaomi-15-ultra",
    basePrice: 1549000,
  },

  {
    productId: "oneplus-13",
    basePrice: 1299000,
  },

  {
    productId: "iphone-16-pro",
    basePrice: 1999000,
  },

  {
    productId: "sony-xperia-1-vii",
    basePrice: 1699000,
  },

  {
    productId: "asus-rog-phone-9",
    basePrice: 1649000,
  },
];

export const OFFERS: Offer[] = OFFER_SEEDS.flatMap((seed) =>
  STORE_VARIATIONS.map((store) => {
    const currentPrice = Math.round(seed.basePrice * store.multiplier);

    const discount = 4 + (seed.productId.length % 8);

    const previousPrice = Math.round(currentPrice / (1 - discount / 100));

    const LAST_UPDATED = [
      "2 mins ago",
      "5 mins ago",
      "9 mins ago",
      "15 mins ago",
    ] as const;

    return {
      id: `${seed.productId}-${store.storeId}`,

      productId: seed.productId,

      storeId: store.storeId,

      currentPrice,

      previousPrice,

      discount,

      stockStatus: "IN_STOCK",

      shippingFee: store.shippingFee,

      estimatedDelivery: store.delivery,

      productUrl: `https://${store.storeId}.example.com/${seed.productId}`,

      lastUpdated:
        LAST_UPDATED[
          STORE_VARIATIONS.findIndex(({ storeId }) => storeId === store.storeId)
        ],

      currency: "NGN",
    };
  }),
);
