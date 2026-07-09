/**
 * -----------------------------------------------------------------------------
 * File: search.service.ts
 * Feature: Search
 *
 * Purpose:
 * Provides business operations for the Search feature.
 * -----------------------------------------------------------------------------
 */

import { getOffersByProductId } from "@/features/offer";
import { getProducts } from "@/features/product";
import { getStoreById } from "@/features/store";

import { SearchMapper } from "../mappers/search.mapper";

import type { SearchSortOption } from "../types/search.types";
import type { SearchFilters } from "../types/search-filter.types";
import type { SearchResultViewModel } from "../viewmodels/search.viewmodel";

export function searchProducts(
  query: string,
  sort: SearchSortOption = "relevance",
  filters?: SearchFilters,
): SearchResultViewModel[] {
  const keyword = query.trim().toLowerCase();

  if (keyword.length < 2) {
    return [];
  }

  let results = getProducts()
    .filter(
      (product) =>
        product.title.toLowerCase().includes(keyword) ||
        product.brand.toLowerCase().includes(keyword),
    )
    .map((product) => {
      const offers = getOffersByProductId(product.id);

      return SearchMapper.toSearchResultViewModel(
        product,
        offers,
        (storeId) => getStoreById(storeId)?.name ?? "Unknown Store",
      );
    });

  if (filters) {
    results = results.filter((result) => {
      const categoryMatch =
        filters.category === "all" ||
        result.category.toLowerCase() === filters.category;

      const storeMatch =
        filters.store === "all" ||
        result.offers.some(
          (offer) =>
            offer.storeName.toLowerCase() === filters.store.toLowerCase(),
        );

      const stockMatch =
        !filters.inStockOnly || result.offers.some((offer) => offer.inStock);

      const minPriceMatch =
        filters.minPrice === undefined ||
        (result.lowestOffer?.currentPrice ?? 0) >= filters.minPrice;

      const maxPriceMatch =
        filters.maxPrice === undefined ||
        (result.lowestOffer?.currentPrice ?? 0) <= filters.maxPrice;

      return (
        categoryMatch &&
        storeMatch &&
        stockMatch &&
        minPriceMatch &&
        maxPriceMatch
      );
    });
  }

  return sortSearchResults(results, sort);
}

function sortSearchResults(
  results: SearchResultViewModel[],
  sort: SearchSortOption,
): SearchResultViewModel[] {
  const sorted = [...results];

  switch (sort) {
    case "lowest-price":
      return sorted.sort(
        (a, b) =>
          (a.lowestOffer?.currentPrice ?? Number.MAX_SAFE_INTEGER) -
          (b.lowestOffer?.currentPrice ?? Number.MAX_SAFE_INTEGER),
      );

    case "highest-price":
      return sorted.sort(
        (a, b) =>
          (b.lowestOffer?.currentPrice ?? 0) -
          (a.lowestOffer?.currentPrice ?? 0),
      );

    default:
      return sorted;
  }
}
