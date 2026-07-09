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
 * Presentation model representing a product image.
 */
export interface ProductImageViewModel {
  id: string;

  url: string;

  alt: string;
}

/**
 * Presentation model representing a product specification.
 */
export interface ProductSpecificationViewModel {
  id: string;

  name: string;

  value: string;
}

/**
 * Presentation model representing a store offer.
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
 * Search summary presented above the result list.
 *
 * Produced by the SearchMapper.
 */
export interface SearchSummaryViewModel {
  /**
   * Number of matching products.
   */
  resultCount: number;

  /**
   * Number of unique stores represented.
   */
  storeCount: number;

  /**
   * Lowest available price.
   */
  lowestPrice: number;

  /**
   * Formatted lowest price.
   */
  lowestPriceLabel: string;

  /**
   * Average available price.
   */
  averagePrice: number;

  /**
   * Formatted average price.
   */
  averagePriceLabel: string;
}

/**
 * Presentation model representing a searchable product.
 */
export interface SearchResultViewModel {
  id: string;

  title: string;

  brand: string;

  category: string;

  thumbnail: string;

  images: ProductImageViewModel[];

  rating: number;

  reviewCount: number;

  specifications: ProductSpecificationViewModel[];

  offerCount: number;

  hasOffers: boolean;

  lowestOffer: SearchOfferViewModel | null;

  offers: SearchOfferViewModel[];
}
