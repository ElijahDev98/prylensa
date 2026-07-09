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
 * - Delegate presentation mapping to SearchMapper.
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
 * - This service owns Search business logic.
 * - ViewModel construction is delegated to SearchMapper.
 * - React components must never access Product, Offer or Store directly.
 * -----------------------------------------------------------------------------
 */

import { getOffersByProductId } from "@/features/offer";
import { getProducts } from "@/features/product";
import { getStoreById } from "@/features/store";

import { SearchMapper } from "../mappers/search.mapper";

import type { SearchResultViewModel } from "../viewmodels/search.viewmodel";

/**
 * Maximum number of recent searches retained.
 */
const MAX_RECENT_SEARCHES = 10;

/**
 * Executes a product search.
 *
 * @param query User supplied search query.
 * @returns Search result ViewModels.
 */
export function searchProducts(query: string): SearchResultViewModel[] {
  const keyword = query.trim().toLowerCase();

  if (keyword.length < 2) {
    return [];
  }

  return getProducts()
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
}

/**
 * Updates the recent search history.
 *
 * Responsibilities:
 * - Ignore empty searches.
 * - Prevent duplicate entries.
 * - Keep newest searches first.
 * - Limit history size.
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
