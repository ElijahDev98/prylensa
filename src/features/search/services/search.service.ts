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
 * - Maintain recent search history.
 * - Sort search results.
 * - Delegate ViewModel creation to SearchMapper.
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
 * - Owns Search business rules.
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
 * Maximum number of recent searches retained.
 */
const MAX_RECENT_SEARCHES = 10;

/**
 * Executes a product search.
 *
 * @param query User search query.
 * @param sort Selected sort option.
 * @returns Search results.
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
        (storeId: string) => getStoreById(storeId)?.name ?? "Unknown Store",
      );
    });

  return sortSearchResults(results, sort);
}

/**
 * Sorts Search results.
 *
 * @param results Search results.
 * @param sort Selected sort option.
 * @returns Sorted results.
 */
function sortSearchResults(
  results: SearchResultViewModel[],
  sort: SearchSortOption,
): SearchResultViewModel[] {
  const sorted = [...results];

  switch (sort) {
    case "lowest-price":
      return sorted.sort((left, right) => {
        const leftPrice =
          left.lowestOffer?.currentPrice ?? Number.MAX_SAFE_INTEGER;

        const rightPrice =
          right.lowestOffer?.currentPrice ?? Number.MAX_SAFE_INTEGER;

        return leftPrice - rightPrice;
      });

    case "highest-price":
      return sorted.sort((left, right) => {
        const leftPrice = left.lowestOffer?.currentPrice ?? 0;

        const rightPrice = right.lowestOffer?.currentPrice ?? 0;

        return rightPrice - leftPrice;
      });

    case "relevance":
    default:
      return sorted;
  }
}

/**
 * Updates the recent search history.
 *
 * @param history Existing history.
 * @param query Search query.
 * @returns Updated history.
 */
export function updateRecentSearches(
  history: string[],
  query: string,
): string[] {
  const normalized = query.trim();

  if (normalized.length === 0) {
    return history;
  }

  return [
    normalized,
    ...history.filter(
      (item) => item.toLowerCase() !== normalized.toLowerCase(),
    ),
  ].slice(0, MAX_RECENT_SEARCHES);
}
