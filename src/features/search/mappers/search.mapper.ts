/**
 * -----------------------------------------------------------------------------
 * File: search.mapper.ts
 * Feature: Search
 *
 * Purpose:
 * Maps Product and Offer domain entities into Search presentation models.
 *
 * Responsibilities:
 * - Convert Product and Offer domain models into ViewModels.
 * - Convert Product specifications into presentation models.
 * - Centralize presentation formatting.
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
 * - Stateless.
 * - Never expose domain models to the UI.
 * -----------------------------------------------------------------------------
 */

import type { Offer } from "@/features/offer";
import type { Product } from "@/features/product";

import type {
  ProductSpecificationViewModel,
  SearchOfferViewModel,
  SearchResultViewModel,
} from "../viewmodels/search.viewmodel";

/**
 * Search presentation mapper.
 */
export class SearchMapper {
  /**
   * Maps Product specifications into presentation models.
   */
  private static toSpecificationViewModels(
    specifications: Product["specifications"],
  ): ProductSpecificationViewModel[] {
    return specifications.map((specification) => ({
      id: specification.id,
      name: specification.name,
      value: specification.value,
    }));
  }

  /**
   * Maps an Offer into a presentation model.
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
   * Maps a Product and its Offers into a SearchResultViewModel.
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

      rating: product.rating,

      reviewCount: product.reviewCount,

      specifications: this.toSpecificationViewModels(product.specifications),

      offerCount: offerViewModels.length,

      hasOffers: offerViewModels.length > 0,

      lowestOffer: offerViewModels.length > 0 ? offerViewModels[0] : null,

      offers: offerViewModels,
    };
  }
}
