/**
 * -----------------------------------------------------------------------------
 * File: search.mapper.ts
 * Feature: Search
 *
 * Purpose:
 * Maps Marketplace Search API DTOs into Search ViewModels.
 *
 * Responsibilities:
 * - Convert backend SearchResultDto objects into SearchResultViewModels.
 * - Convert marketplace offers into presentation models.
 * - Produce SearchSummaryViewModel.
 * - Centralize presentation formatting.
 *
 * Architecture:
 *
 * UI
 *   ↓
 * Hook
 *   ↓
 * Search Service
 *   ↓
 * Search Mapper
 *   ↓
 * Backend DTO
 * -----------------------------------------------------------------------------
 */

import type { SearchOfferDto, SearchResultDto } from "../api/search.api";

import type {
  SearchOfferViewModel,
  SearchResultViewModel,
  SearchSummaryViewModel,
} from "../viewmodels/search.viewmodel";

export class SearchMapper {
  /**
   * Converts a marketplace offer returned by the backend
   * into a SearchOfferViewModel.
   */
  private static toOfferViewModel(offer: SearchOfferDto): SearchOfferViewModel {
    return {
      id: offer.id,

      /**
       * Marketplace acts as the store identifier.
       */
      storeId: offer.marketplace,

      /**
       * Marketplace acts as the display name.
       */
      storeName: offer.marketplace,

      currentPrice: offer.price,

      currentPriceLabel: `₦${offer.price.toLocaleString()}`,

      originalPrice: offer.originalPrice,

      originalPriceLabel:
        offer.originalPrice !== undefined
          ? `₦${offer.originalPrice.toLocaleString()}`
          : undefined,

      discountPercentage:
        offer.originalPrice && offer.originalPrice > offer.price
          ? Math.round(
              ((offer.originalPrice - offer.price) / offer.originalPrice) * 100,
            )
          : 0,

      inStock: offer.inStock,

      productUrl: offer.productUrl,
    };
  }

  /**
   * Converts a grouped marketplace search result
   * into a SearchResultViewModel.
   */
  public static toSearchResultViewModel(
    result: SearchResultDto,
  ): SearchResultViewModel {
    const offers = [...result.offers]
      .sort((left, right) => left.price - right.price)
      .map((offer) => this.toOfferViewModel(offer));

    const representativeProduct = result.offers[0];

    return {
      /**
       * Use the comparison key as the stable identifier.
       */
      id: result.comparisonKey,

      /**
       * Display information comes from the first offer.
       */
      title: representativeProduct?.title ?? "",

      brand: representativeProduct?.brand ?? "",

      /**
       * Category is not currently returned by the backend.
       */
      category: "",

      /**
       * Thumbnail comes from the representative offer.
       */
      thumbnail: representativeProduct?.imageUrl ?? "",

      /**
       * The backend currently exposes a single image.
       * Until multiple images are supported, expose it
       * as a one-item gallery.
       */
      images: representativeProduct?.imageUrl
        ? [
            {
              id: representativeProduct.id,
              url: representativeProduct.imageUrl,
              alt: representativeProduct.title,
            },
          ]
        : [],

      /**
       * Rating will be added later.
       */
      rating: representativeProduct?.rating ?? 0,

      /**
       * Review count is not currently available.
       */
      reviewCount: 0,

      /**
       * Product specifications will be added
       * by the backend later.
       */
      specifications: [],

      offerCount: result.offerCount,

      hasOffers: offers.length > 0,

      lowestOffer: offers[0] ?? null,

      offers,
    };
  }

  /**
   * Converts backend search results into SearchResultViewModels.
   */
  public static toSearchResultViewModels(
    results: readonly SearchResultDto[],
  ): SearchResultViewModel[] {
    return results.map((result) => this.toSearchResultViewModel(result));
  }

  /**
   * Produces the Search Summary ViewModel.
   */
  public static toSearchSummaryViewModel(
    results: readonly SearchResultViewModel[],
  ): SearchSummaryViewModel {
    if (results.length === 0) {
      return {
        resultCount: 0,
        storeCount: 0,
        lowestPrice: 0,
        lowestPriceLabel: "₦0",
        averagePrice: 0,
        averagePriceLabel: "₦0",
      };
    }

    const uniqueStores = new Set<string>();
    const prices: number[] = [];

    for (const result of results) {
      for (const offer of result.offers) {
        uniqueStores.add(offer.storeId);
        prices.push(offer.currentPrice);
      }
    }

    const lowestPrice = Math.min(...prices);

    const averagePrice =
      prices.length === 0
        ? 0
        : Math.round(
            prices.reduce((sum, price) => sum + price, 0) / prices.length,
          );

    return {
      resultCount: results.length,

      storeCount: uniqueStores.size,

      lowestPrice,

      lowestPriceLabel: `₦${lowestPrice.toLocaleString()}`,

      averagePrice,

      averagePriceLabel: `₦${averagePrice.toLocaleString()}`,
    };
  }
}
