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
 * - Do not expose Product, Offer or Store domain models.
 * - All presentation components must consume these interfaces only.
 * * Future Changes:
 * - Additional presentation fields should be added here rather than exposing
 *   domain models to the UI.
 * -----------------------------------------------------------------------------
 */

/**
 * Represents a single offer displayed by the Search feature.
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

  lowestOffer: SearchOfferViewModel | null;
}
