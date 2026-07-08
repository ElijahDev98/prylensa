/**
 * -----------------------------------------------------------------------------
 * File: search.viewmodel.ts
 * Feature: Search
 *
 * Purpose:
 * Presentation models consumed exclusively by the Search UI.
 *
 * Rule:
 * Do not expose Product, Offer or Store domain models.
 * -----------------------------------------------------------------------------
 */

export interface SearchOfferViewModel {
  id: string;
  storeId: string;
  storeName: string;
  currentPrice: number;
  currentPriceLabel: string;
  originalPrice?: number;
  originalPriceLabel?: string;
  discountPercentage?: number;
  inStock: boolean;
  productUrl: string;
}

export interface SearchResultViewModel {
  id: string;
  title: string;
  brand: string;
  category: string;

  thumbnail: string;

  offerCount: number;

  lowestOffer: SearchOfferViewModel | null;

  hasOffers: boolean;
}
