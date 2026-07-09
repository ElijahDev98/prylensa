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
 * - Execute search sessions.
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
 * - Owns Search business logic.
 * - UI must never access Product, Offer or Store directly.
 * -----------------------------------------------------------------------------
 */

import { getOffersByProductId } from "@/features/offer";
import { getProducts } from "@/features/product";
import { getStoreById } from "@/features/store";

import { SearchMapper } from "../mappers/search.mapper";

import type { SearchState, SearchSortOption } from "../types/search.types";
import type { SearchResultViewModel } from "../viewmodels/search.viewmodel";

/**
 * Maximum number of recent searches retained.
 */
const MAX_RECENT_SEARCHES = 10;

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
 * Executes an entire search session.
 *
 * This is the single business entry point used by the Hook.
 */
export function executeSearch(state: SearchState, query: string): SearchState {
  return {
    ...state,

    query,

    loading: false,

    results: searchProducts(query, state.sort),

    selectedResult: null,

    recentSearches: updateRecentSearches(state.recentSearches, query),
  };
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

    default:
      return sorted;
  }
}

/**
 * Updates recent search history.
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
