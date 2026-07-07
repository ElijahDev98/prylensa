/**
 * -----------------------------------------------------------------------------
 * File: offer.types.ts
 * Feature: Offer Domain
 *
 * Purpose:
 * Canonical Offer model.
 *
 * NOTE:
 * An Offer represents ONE product sold by ONE store.
 * -----------------------------------------------------------------------------
 */

export type StockStatus = "in-stock" | "low-stock" | "out-of-stock";

export interface Offer {
  id: string;

  productId: string;

  storeId: string;

  currentPrice: number;

  previousPrice: number;

  discount: number;

  stockStatus: StockStatus;

  shippingFee: number;

  estimatedDelivery: string;

  productUrl: string;

  lastUpdated: string;
}
