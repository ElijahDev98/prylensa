/**
 * -----------------------------------------------------------------------------
 * File: search.mapper.ts
 * Feature: Search
 *
 * Purpose:
 * Maps Product and Offer domain entities into Search presentation models.
 *
 * Responsibilities:
 * - Convert Product and Offer domain models into presentation ViewModels.
 * - Perform all presentation formatting.
 * - Ensure UI components never consume domain models directly.
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
 * Search ViewModel
 *   ↓
 * Domain Models
 *
 * Notes:
 * - This mapper must remain stateless.
 * - All presentation formatting belongs here.
 * - Never return domain entities to the UI.
 * -----------------------------------------------------------------------------
 */

import type { Offer } from "@/features/offer";
import type { Product } from "@/features/product";

import type {
  SearchOfferViewModel,
  SearchResultViewModel,
} from "../viewmodels/search.viewmodel";

/**
 * Search presentation mapper.
 */
export class SearchMapper {
  /**
   * Converts a domain Offer into a SearchOfferViewModel.
   *
   * @param offer Domain offer.
   * @param storeName Resolved store name.
   * @returns Presentation-ready offer.
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

      originalPriceLabel:
        offer.previousPrice > 0
          ? `₦${offer.previousPrice.toLocaleString()}`
          : undefined,

      discountPercentage: offer.discount,

      inStock: offer.stockStatus !== "OUT_OF_STOCK",

      productUrl: offer.productUrl,
    };
  }

  /**
   * Converts a Product and its Offers into a SearchResultViewModel.
   *
   * @param product Product domain model.
   * @param offers Product offers.
   * @param resolveStoreName Store name resolver.
   * @returns Presentation-ready search result.
   */
  public static toSearchResultViewModel(
    product: Product,
    offers: Offer[],
    resolveStoreName: (storeId: string) => string,
  ): SearchResultViewModel {
    const sortedOffers = [...offers].sort(
      (left, right) => left.currentPrice - right.currentPrice,
    );

    const offerViewModels = sortedOffers.map((offer) =>
      this.toOfferViewModel(offer, resolveStoreName(offer.storeId)),
    );

    return {
      id: product.id,

      title: product.title,

      brand: product.brand,

      category: product.category,

      thumbnail: product.images[0]?.url ?? "",

      offerCount: offerViewModels.length,

      hasOffers: offerViewModels.length > 0,

      lowestOffer: offerViewModels.length > 0 ? offerViewModels[0] : null,

      offers: offerViewModels,
    };
  }
}
