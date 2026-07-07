/**
 * -----------------------------------------------------------------------------
 * File: offer.mapper.ts
 * Feature: Offer Domain
 *
 * Purpose:
 * Maps Offer entities into Offer ViewModels.
 *
 * Responsibilities:
 * - Transform Offer -> OfferViewModel.
 * - Calculate presentation values.
 *
 * Does NOT:
 * - Format values.
 * - Execute React logic.
 * -----------------------------------------------------------------------------
 */

import type { Offer } from "../types/offer.types";

import type { OfferViewModel } from "../viewmodels/offer.viewmodel";

export function toOfferViewModel(offer: Offer): OfferViewModel {
  return {
    id: offer.id,

    productId: offer.productId,

    storeId: offer.storeId,

    currentPrice: offer.currentPrice,

    previousPrice: offer.previousPrice,

    shippingFee: offer.shippingFee,

    totalCost: offer.currentPrice + offer.shippingFee,

    discount: offer.discount,

    estimatedDelivery: offer.estimatedDelivery,

    stockStatus: offer.stockStatus,

    lastUpdated: offer.lastUpdated,

    currency: offer.currency,

    productUrl: offer.productUrl,
  };
}

export function toOfferViewModels(offers: Offer[]): OfferViewModel[] {
  return offers.map(toOfferViewModel);
}
