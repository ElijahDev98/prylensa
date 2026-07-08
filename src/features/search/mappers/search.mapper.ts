import type { Product } from "@/features/product/models/product.model";
import type { Offer } from "@/features/offer/models/offer.model";

import type {
  SearchOfferViewModel,
  SearchResultViewModel,
} from "../viewmodels/search.viewmodel";

export class SearchMapper {
  static toOfferViewModel(offer: Offer): SearchOfferViewModel {
    return {
      id: offer.id,
      storeId: offer.store.id,
      storeName: offer.store.name,
      currentPrice: offer.currentPrice,
      currentPriceLabel: `₦${offer.currentPrice.toLocaleString()}`,
      originalPrice: offer.originalPrice,
      originalPriceLabel: offer.originalPrice
        ? `₦${offer.originalPrice.toLocaleString()}`
        : undefined,
      discountPercentage: offer.discountPercentage,
      inStock: offer.inStock,
      productUrl: offer.productUrl,
    };
  }

  static toSearchResultViewModel(
    product: Product,
    offers: Offer[],
  ): SearchResultViewModel {
    const sortedOffers = [...offers].sort(
      (a, b) => a.currentPrice - b.currentPrice,
    );

    return {
      id: product.id,
      title: product.title,
      brand: product.brand,
      category: product.category,
      thumbnail: product.images[0] ?? "",
      offerCount: sortedOffers.length,
      lowestOffer:
        sortedOffers.length > 0 ? this.toOfferViewModel(sortedOffers[0]) : null,
      hasOffers: sortedOffers.length > 0,
    };
  }
}
