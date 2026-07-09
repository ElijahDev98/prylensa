/**
 * -----------------------------------------------------------------------------
 * File: search.service.ts
 * Feature: Search
 *
 * Purpose:
 * Provides business operations for the Search feature.
 *
 * Responsibilities:
 * - Execute product searches.
 * - Resolve product offers.
 * - Resolve store information.
 * - Sort search results.
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
 * Domain Model
 *
 * Notes:
 * - Owns Search business logic.
 * - UI must never access Product, Offer or Store directly.
 * -----------------------------------------------------------------------------
 */

import { getOffersByProductId } from "@/features/offer";
import { getProducts } from "@/features/product";
import { getStoreById } from "@/features/store";

import { SearchMapper } from "../mappers/search.mapper";

import type { SearchSortOption } from "../types/search.types";
import type { SearchResultViewModel } from "../viewmodels/search.viewmodel";

/**
 * Executes a product search.
 */
export function searchProducts(
  query: string,
  sort: SearchSortOption = "relevance",
): SearchResultViewModel[] {
  const keyword = query.trim().toLowerCase();

  if (keyword.length < 2) {
    return [];
  }

  const results = getProducts()
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

  return sortSearchResults(results, sort);
}

/**
 * Sorts search results.
 */
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

    case "relevance":
    default:
      return sorted;
  }
}
