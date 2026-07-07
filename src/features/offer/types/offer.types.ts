/**
 * -----------------------------------------------------------------------------
 * File: offer.types.ts
 * Feature: Offer Domain
 *
 * Purpose:
 * Canonical Offer entity shared across the application.
 *
 * Responsibilities:
 * - Represent a store-specific offer.
 * - Remain independent of presentation.
 *
 * Does NOT:
 * - Contain UI metadata.
 * - Contain business logic.
 * -----------------------------------------------------------------------------
 */

/**
 * Product availability at a store.
 */
export type StockStatus = "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";

/**
 * Supported currencies.
 *
 * NOTE:
 * Additional currencies will be introduced
 * when international stores are supported.
 */
export type Currency = "NGN";

/**
 * Canonical Offer entity.
 */
export interface Offer {
  /**
   * Unique offer identifier.
   */
  id: string;

  /**
   * Product identifier.
   */
  productId: string;

  /**
   * Store identifier.
   */
  storeId: string;

  /**
   * Current selling price.
   */
  currentPrice: number;

  /**
   * Previous selling price.
   */
  previousPrice: number;

  /**
   * Discount percentage.
   *
   * Example:
   * 15 = 15%
   */
  discount: number;

  /**
   * Shipping fee.
   *
   * Zero means free shipping.
   */
  shippingFee: number;

  /**
   * Estimated delivery.
   *
   * Example:
   * "Tomorrow"
   * "2–3 Days"
   */
  estimatedDelivery: string;

  /**
   * Availability.
   */
  stockStatus: StockStatus;

  /**
   * Last synchronization time.
   *
   * NOTE:
   * Mock string for now.
   * Later becomes ISO timestamp.
   */
  lastUpdated: string;

  /**
   * Currency.
   */
  currency: Currency;

  /**
   * Direct product URL.
   */
  productUrl: string;
}
