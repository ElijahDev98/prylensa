/**
 * -----------------------------------------------------------------------------
 * File: search.viewmodel.ts
 * Feature: Search
 *
 * Purpose:
 * Defines presentation models consumed exclusively by the Search UI.
 *
 * Architecture:
 * UI
 *   ↓
 * ViewModel
 *   ↓
 * Mapper
 *   ↓
 * Domain Model
 *
 * Rules:
 * - Never expose Product, Offer or Store domain models.
 * - Components must consume ViewModels only.
 * - Presentation formatting belongs in the Mapper layer.
 * -----------------------------------------------------------------------------
 */

/**
 * Represents a single offer displayed by the Search feature.
 *
 * All values are presentation-ready.
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

/**
 * Represents a searchable product displayed by the Search feature.
 *
 * This is the only model presentation components should consume.
 */
export interface SearchResultViewModel {
  id: string;

  title: string;

  brand: string;

  category: string;

  thumbnail: string;

  offerCount: number;

  hasOffers: boolean;

  /**
   * Lowest priced offer.
   */
  lowestOffer: SearchOfferViewModel | null;

  /**
   * All presentation-ready offers.
   *
   * Used by the Offer Dialog and any future offer-related UI.
   */
  offers: SearchOfferViewModel[];
}
