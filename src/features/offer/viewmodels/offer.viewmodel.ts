/**
 * -----------------------------------------------------------------------------
 * File: offer.viewmodel.ts
 * Feature: Offer Domain
 *
 * Purpose:
 * Presentation model representing an Offer.
 *
 * Responsibilities:
 * - Preserve Offer business data.
 * - Expose presentation-ready values.
 *
 * Does NOT:
 * - Execute business logic.
 * - Format values.
 * -----------------------------------------------------------------------------
 */

import type { Currency, StockStatus } from "../types/offer.types";

export interface OfferViewModel {
  id: string;

  productId: string;

  storeId: string;

  currentPrice: number;

  previousPrice: number;

  shippingFee: number;

  /**
   * Calculated value.
   */
  totalCost: number;

  discount: number;

  estimatedDelivery: string;

  stockStatus: StockStatus;

  lastUpdated: string;

  currency: Currency;

  productUrl: string;
}
