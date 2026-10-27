import type { StockStatus } from "@/features/offer";

/**
 * -----------------------------------------------------------------------------
 * File: comparison-analytics.viewmodel.ts
 * Feature: Comparison Domain
 *
 * Purpose:
 * Presentation model for comparison analytics.
 *
 * Responsibilities:
 * - Represent analytics ready for visualization.
 * - Keep chart components presentation-only.
 * -----------------------------------------------------------------------------
 */

/**
 * Analytics point representing a single compared product.
 */
export interface ComparisonPricePointViewModel {
  /**
   * Product identifier.
   */
  productId: string;

  /**
   * Product display name.
   */
  productName: string;

  /**
   * Best available price across visible stores.
   */
  price: number;

  /**
   * Indicates the lowest-priced product.
   */
  isLowest: boolean;

  /**
   * Indicates the highest-priced product.
   */
  isHighest: boolean;
}

export type ComparisonMarketPosition =
  | "Best price"
  | "Below average"
  | "Above average";

export interface ComparisonOfferPricePointViewModel {
  id: string;
  productId: string;
  productName: string;
  storeId: string;
  storeName: string;
  price: number;
  previousPrice: number;
  discount: number;
  stockStatus: StockStatus;
  productUrl: string;
  differenceFromBest: number;
  differencePercentage: number;
  position: ComparisonMarketPosition;
  isBest: boolean;
  dataSource: "live" | "persisted-snapshot";
  observedAt?: string;
  availabilityStatus: "in-stock" | "unverified";
  freshnessLabel: string;
  isStale: boolean;
}

export interface ComparisonMarketplacePriceViewModel {
  id: string;
  productId: string;
  productName: string;
  storeId: string;
  storeName: string;
  price: number;
  previousPrice: number;
  discount: number;
  stockStatus: StockStatus;
  productUrl: string;
  offerCount: number;
  differenceFromBest: number;
  differencePercentage: number;
  isLowest: boolean;
  isHighest: boolean;
  dataSource: "live" | "persisted-snapshot";
  availabilityStatus: "in-stock" | "unverified";
  freshnessLabel: string;
  isStale: boolean;
}

export interface ComparisonAnalyticsViewModel {
  /**
   * Product price distribution.
   */
  prices: ComparisonPricePointViewModel[];

  /** Every visible marketplace offer used by the distribution table. */
  offers: ComparisonOfferPricePointViewModel[];

  /** One best listing per product and marketplace for store-level comparison. */
  marketplacePrices: ComparisonMarketplacePriceViewModel[];

  /**
   * Lowest available price.
   */
  lowestPrice: number;

  /**
   * Highest available price.
   */
  highestPrice: number;

  /**
   * Average product price.
   */
  averagePrice: number;

  medianPrice: number;

  priceRange: number;

  spreadPercentage: number;

  offerCount: number;

  storeCount: number;
}

/**
 * Empty analytics.
 */
export const EMPTY_ANALYTICS: ComparisonAnalyticsViewModel = {
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
