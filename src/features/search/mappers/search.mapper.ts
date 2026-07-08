/**
 * -----------------------------------------------------------------------------
 * File: search.mapper.ts
 * Feature: Search
 *
 * Purpose:
 * Maps Product and Offer domain entities into Search presentation models.
 *
 * Responsibilities:
 * - Convert domain entities into presentation-ready ViewModels.
 * - Keep formatting and presentation transformations out of the UI.
 *
 * Architecture:
 * UI
 *   ↓
 * Hook
 *   ↓
 * Search Service
 *   ↓
 * Search Mapper
 *   ↓
 * ViewModel
 *   ↓
 * Domain Models
 *
 * Notes:
 * - This class must remain stateless.
 * - Components must never perform these mappings themselves.
 * -----------------------------------------------------------------------------
 */

import type { Offer } from "@/features/offer";
import type { Product } from "@/features/product";

import type {
  SearchOfferViewModel,
  SearchResultViewModel,
} from "../viewmodels/search.viewmodel";

export class SearchMapper {
  /**
   * Maps a domain Offer into a SearchOfferViewModel.
   */
  public static toOfferViewModel(
    offer: Offer,
    storeName: string,
  ): SearchOfferViewModel {
    return {
      id: offer.id,
      storeId: offer.storeId,
      storeName,

      currentPrice: offer.currentPrice,
      currentPriceLabel: `₦${offer.currentPrice.toLocaleString()}`,

      originalPrice: offer.previousPrice,
      originalPriceLabel: `₦${offer.previousPrice.toLocaleString()}`,

      discountPercentage: offer.discount,

      inStock: offer.stockStatus !== "OUT_OF_STOCK",

      productUrl: offer.productUrl,
    };
  }

  /**
   * Maps a Product and its Offers into a SearchResultViewModel.
   */
  public static toSearchResultViewModel(
    product: Product,
    offers: Offer[],
    resolveStoreName: (storeId: string) => string,
  ): SearchResultViewModel {
    const sortedOffers = [...offers].sort(
      (a, b) => a.currentPrice - b.currentPrice,
    );

    const lowestOffer =
      sortedOffers.length > 0
        ? this.toOfferViewModel(
            sortedOffers[0],
            resolveStoreName(sortedOffers[0].storeId),
          )
        : null;

    return {
      id: product.id,

      title: product.title,

      brand: product.brand,

      category: product.category,

      thumbnail: product.images[0]?.url ?? "",

      offerCount: sortedOffers.length,

      hasOffers: sortedOffers.length > 0,

      lowestOffer,
    };
  }
}
