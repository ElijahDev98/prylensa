/**
 * -----------------------------------------------------------------------------
 * File: search.service.ts
 * Feature: Search
 *
 * Purpose:
 * Provides business operations for the Search feature.
 *
 * Responsibilities:
 * - Execute marketplace searches.
 * - Delegate HTTP communication to the Search API.
 * - Map backend DTOs into Search ViewModels.
 * - Sort search results.
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
 * Search API
 *   ↓
 * Express Backend
 *
 * Notes:
 * - Owns Search business logic.
 * - Never performs HTTP directly.
 * - Never performs UI rendering.
 * -----------------------------------------------------------------------------
 */

import { fetchSearchResults } from "../api/search.api";
import { SearchMapper } from "../mappers/search.mapper";

import type { SearchSortOption } from "../types/search.types";
import type { SearchResultViewModel } from "../viewmodels/search.viewmodel";

/**
 * Executes a marketplace search.
 *
 * @param query User search keyword.
 * @param sort Search sort option.
 *
 * @returns Search result view models.
 */
export async function searchProducts(
  query: string,
  sort: SearchSortOption = "relevance",
): Promise<SearchResultViewModel[]> {
  /**
   * Normalize the incoming search keyword.
   */
  const keyword = query.trim();

  /**
   * Ignore invalid searches.
   */
  if (keyword.length < 2) {
    return [];
  }

  /**
   * Execute the backend marketplace search.
   */
  const searchResults = await fetchSearchResults(keyword);

  /**
   * Convert backend DTOs into UI ViewModels.
   */
  const results = SearchMapper.toSearchResultViewModels(searchResults);

  /**
   * Apply presentation sorting.
   */
  return sortSearchResults(results, sort);
}

/**
 * Sorts SearchResultViewModels according to the selected option.
 */
function sortSearchResults(
  results: readonly SearchResultViewModel[],
  sort: SearchSortOption,
): SearchResultViewModel[] {
  const sorted = [...results];

  switch (sort) {
    case "lowest-price":
      return sorted.sort(
        (left, right) =>
          (left.lowestOffer?.currentPrice ?? Number.MAX_SAFE_INTEGER) -
          (right.lowestOffer?.currentPrice ?? Number.MAX_SAFE_INTEGER),
      );

    case "highest-price":
      return sorted.sort(
        (left, right) =>
          (right.lowestOffer?.currentPrice ?? 0) -
          (left.lowestOffer?.currentPrice ?? 0),
      );

    case "relevance":
    default:
      /**
       * The backend currently returns results ordered by relevance.
       */
      return sorted;
  }
}
