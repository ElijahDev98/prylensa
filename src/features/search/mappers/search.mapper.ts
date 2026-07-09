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
 * - Convert Product images into presentation models.
 * - Convert Product specifications into presentation models.
 * - Produce SearchSummaryViewModel.
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
 * Search ViewModel
 *   ↓
 * Domain Models
 * -----------------------------------------------------------------------------
 */

import type { Offer } from "@/features/offer";
import type { Product } from "@/features/product";

import type {
  ProductImageViewModel,
  ProductSpecificationViewModel,
  SearchOfferViewModel,
  SearchResultViewModel,
  SearchSummaryViewModel,
} from "../viewmodels/search.viewmodel";

export class SearchMapper {
  private static toImageViewModels(
    images: Product["images"],
  ): ProductImageViewModel[] {
    return images.map((image) => ({
      id: image.id,
      url: image.url,
      alt: image.alt,
    }));
  }

  private static toSpecificationViewModels(
    specifications: Product["specifications"],
  ): ProductSpecificationViewModel[] {
    return specifications.map((specification) => ({
      id: specification.id,
      name: specification.name,
      value: specification.value,
    }));
  }

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

      images: this.toImageViewModels(product.images),

      rating: product.rating,

      reviewCount: product.reviewCount,

      specifications: this.toSpecificationViewModels(product.specifications),

      offerCount: offerViewModels.length,

      hasOffers: offerViewModels.length > 0,

      lowestOffer: offerViewModels.length > 0 ? offerViewModels[0] : null,

      offers: offerViewModels,
    };
  }

  /**
   * Produces the Search Summary ViewModel.
   */
  public static toSearchSummaryViewModel(
    results: SearchResultViewModel[],
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

    results.forEach((result) => {
      result.offers.forEach((offer) => {
        uniqueStores.add(offer.storeId);
        prices.push(offer.currentPrice);
      });
    });

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
