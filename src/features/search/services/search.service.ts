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
 * - Retrieve product offers.
 * - Resolve store information.
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
 * Executes a product search.
 *
 * @param query User supplied search query.
 * @returns Search result view models.
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
