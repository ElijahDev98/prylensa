/**
 * -----------------------------------------------------------------------------
 * File: comparison-analytics.service.ts
 * Feature: Comparison Domain
 *
 * Purpose:
 * Builds presentation analytics for the Comparison feature.
 *
 * Responsibilities:
 * - Produce product-based chart data.
 * - Calculate aggregate analytics.
 * - Keep presentation independent of UI.
 *
 * Does NOT:
 * - Execute comparison analysis.
 * - Format UI values.
 * -----------------------------------------------------------------------------
 */

import type { Product } from "@/features/product";
import type { Store } from "@/features/store";
import type { Offer } from "@/features/offer";

import type { ComparisonRowModel } from "../models/comparison-row.model";
import { getOfferFreshness } from "@/shared/utils/offer-freshness";

import type {
  ComparisonAnalyticsViewModel,
  ComparisonMarketPosition,
  ComparisonMarketplacePriceViewModel,
  ComparisonOfferPricePointViewModel,
  ComparisonPricePointViewModel,
} from "../viewmodels/comparison-analytics.viewmodel";

interface AnalyticsOfferSource {
  id: string;
  productId: string;
  productName: string;
  storeId: string;
  storeName: string;
  price: number;
  previousPrice: number;
  discount: number;
  stockStatus: Offer["stockStatus"];
  productUrl: string;
  dataSource: "live" | "persisted-snapshot";
  observedAt?: string;
  availabilityStatus: "in-stock" | "unverified";
}

export function buildComparisonAnalytics(
  products: Product[],
  rows: ComparisonRowModel[],
  stores: Store[],
  allOffers: Offer[] = [],
): ComparisonAnalyticsViewModel {
  /**
   * ---------------------------------------------------------------------------
   * Resolve the price comparison row.
   * ---------------------------------------------------------------------------
   */

  const priceRow = rows.find((row) => row.id === "price");

  if (!priceRow) {
    return {
      prices: [],
      offers: [],
      marketplacePrices: [],
      lowestPrice: 0,
      highestPrice: 0,
      averagePrice: 0,
      medianPrice: 0,
      priceRange: 0,
      spreadPercentage: 0,
      offerCount: 0,
      storeCount: 0,
    };
  }

  /**
   * ---------------------------------------------------------------------------
   * Build one chart point per product.
   * ---------------------------------------------------------------------------
   */

  const prices: ComparisonPricePointViewModel[] = products.flatMap(
    (product) => {
      const comparisonProduct = priceRow.products.find(
        (item) => item.productId === product.id,
      );

      if (!comparisonProduct) {
        return [];
      }

      const numericPrices = comparisonProduct.values
        .map((value) => value.value)
        .filter((value): value is number => typeof value === "number");

      if (numericPrices.length === 0) {
        return [];
      }

      return [
        {
          productId: product.id,

          productName: product.title,

          price: Math.min(...numericPrices),

          isLowest: false,

          isHighest: false,
        },
      ];
    },
  );

  /**
   * ---------------------------------------------------------------------------
   * Aggregate metrics.
   * ---------------------------------------------------------------------------
   */

  const rowOffers = priceRow.products.flatMap((comparisonProduct) => {
    const product = products.find(
      (item) => item.id === comparisonProduct.productId,
    );

    if (!product) {
      return [];
    }

    return comparisonProduct.values.flatMap((storeValue) => {
      if (typeof storeValue.value !== "number" || storeValue.value <= 0) {
        return [];
      }

      const store = stores.find((item) => item.id === storeValue.storeId);

      return [
        {
          id: `${comparisonProduct.productId}:${storeValue.storeId}`,
          productId: comparisonProduct.productId,
          productName: product.title,
          storeId: storeValue.storeId,
          storeName: store?.name ?? storeValue.storeId,
          price: storeValue.value,
          previousPrice: storeValue.value,
          discount: 0,
          stockStatus: "UNVERIFIED" as const,
          productUrl: "",
          dataSource: "live" as const,
          availabilityStatus: "unverified" as const,
        },
      ];
    });
  });

  const visibleProductIds = new Set(products.map((product) => product.id));
  const visibleStoreIds = new Set(stores.map((store) => store.id));
  const rawOffers: AnalyticsOfferSource[] =
    allOffers.length > 0
      ? allOffers.flatMap((offer) => {
          if (
            !visibleProductIds.has(offer.productId) ||
            !visibleStoreIds.has(offer.storeId) ||
            !Number.isFinite(offer.currentPrice) ||
            offer.currentPrice <= 0 ||
            offer.stockStatus === "OUT_OF_STOCK" ||
            offer.availabilityStatus === "out-of-stock"
          ) {
            return [];
          }

          const product = products.find((item) => item.id === offer.productId);
          const store = stores.find((item) => item.id === offer.storeId);

          if (!product) {
            return [];
          }

          return [
            {
              id: `${offer.id}:${offer.productUrl}`,
              productId: offer.productId,
              productName: product.title,
              storeId: offer.storeId,
              storeName: store?.name ?? offer.storeId,
              price: offer.currentPrice,
              previousPrice: offer.previousPrice,
              discount: offer.discount,
              stockStatus: offer.stockStatus,
              productUrl: offer.productUrl,
              dataSource: offer.dataSource,
              observedAt: offer.observedAt,
              availabilityStatus:
                offer.availabilityStatus === "in-stock"
                  ? "in-stock" as const
                  : "unverified" as const,
            },
          ];
        })
      : rowOffers;

  const values = rawOffers.map((item) => item.price);

  if (values.length === 0) {
    return {
      prices: [],

      offers: [],

      marketplacePrices: [],

      lowestPrice: 0,

      highestPrice: 0,

      averagePrice: 0,

      medianPrice: 0,

      priceRange: 0,

      spreadPercentage: 0,

      offerCount: 0,

      storeCount: 0,
    };
  }

  const lowestPrice = Math.min(...values);

  const highestPrice = Math.max(...values);

  const averagePrice =
    values.reduce((sum, value) => sum + value, 0) / values.length;

  const sortedValues = [...values].sort((left, right) => left - right);
  const middle = Math.floor(sortedValues.length / 2);
  const medianPrice =
    sortedValues.length % 2 === 0
      ? (sortedValues[middle - 1] + sortedValues[middle]) / 2
      : sortedValues[middle];
  const priceRange = highestPrice - lowestPrice;
  const spreadPercentage = lowestPrice > 0 ? (priceRange / lowestPrice) * 100 : 0;
  const analyticsObservedAt = Date.now();

  const offers: ComparisonOfferPricePointViewModel[] = rawOffers
    .map((offer) => {
      const differenceFromBest = Math.max(0, offer.price - lowestPrice);
      const isBest = differenceFromBest < 0.01;
      const position: ComparisonMarketPosition = isBest
        ? "Best price"
        : offer.price <= averagePrice
          ? "Below average"
          : "Above average";
      const freshness = getOfferFreshness(
        offer.observedAt,
        offer.dataSource,
        analyticsObservedAt,
      );

      return {
        ...offer,
        differenceFromBest,
        differencePercentage:
          lowestPrice > 0 ? (differenceFromBest / lowestPrice) * 100 : 0,
        position,
        isBest,
        freshnessLabel: freshness.label,
        isStale: freshness.isStale,
      };
    })
    .sort((left, right) => left.price - right.price);

  const marketplaceGroups = new Map<
    string,
    { offer: ComparisonOfferPricePointViewModel; offerCount: number }
  >();

  for (const offer of offers) {
    const key = `${offer.productId}:${offer.storeId}`;
    const current = marketplaceGroups.get(key);

    if (!current) {
      marketplaceGroups.set(key, { offer, offerCount: 1 });
      continue;
    }

    marketplaceGroups.set(key, {
      offer: offer.price < current.offer.price ? offer : current.offer,
      offerCount: current.offerCount + 1,
    });
  }

  const marketplaceBestPrices = [...marketplaceGroups.values()].map(
    ({ offer, offerCount }) => ({ offer, offerCount }),
  );
  const marketplaceLowest = Math.min(
    ...marketplaceBestPrices.map((item) => item.offer.price),
  );
  const marketplaceHighest = Math.max(
    ...marketplaceBestPrices.map((item) => item.offer.price),
  );
  const marketplacePrices: ComparisonMarketplacePriceViewModel[] =
    marketplaceBestPrices
      .map(({ offer, offerCount }) => ({
        id: `${offer.productId}:${offer.storeId}`,
        productId: offer.productId,
        productName: offer.productName,
        storeId: offer.storeId,
        storeName: offer.storeName,
        price: offer.price,
        previousPrice: offer.previousPrice,
        discount: offer.discount,
        stockStatus: offer.stockStatus,
        productUrl: offer.productUrl,
        offerCount,
        differenceFromBest: Math.max(0, offer.price - marketplaceLowest),
        differencePercentage:
          marketplaceLowest > 0
            ? (Math.max(0, offer.price - marketplaceLowest) /
                marketplaceLowest) *
              100
            : 0,
        isLowest: offer.price === marketplaceLowest,
        isHighest: offer.price === marketplaceHighest,
        dataSource: offer.dataSource,
        availabilityStatus: offer.availabilityStatus,
        freshnessLabel: offer.freshnessLabel,
        isStale: offer.isStale,
      }))
      .sort((left, right) => left.price - right.price);

  /**
   * ---------------------------------------------------------------------------
   * Decorate chart points.
   * ---------------------------------------------------------------------------
   */

  const decoratedPrices = prices.map((item) => ({
    ...item,

    isLowest: item.price === lowestPrice,

    isHighest: item.price === highestPrice,
  }));

  return {
    prices: decoratedPrices,

    offers,

    marketplacePrices,

    lowestPrice,

    highestPrice,

    averagePrice,

    medianPrice,

    priceRange,

    spreadPercentage,

    offerCount: offers.length,

    storeCount: new Set(offers.map((offer) => offer.storeId)).size,
  };
}
