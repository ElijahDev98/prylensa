/**
 * -----------------------------------------------------------------------------
 * File: search.service.ts
 * Feature: Search
 *
 * Purpose:
 * Provides the business logic for the Search feature.
 *
 * Responsibilities:
 * - Execute product searches.
 * - Resolve product offers.
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
 * - This service must never construct ViewModels directly.
 * - All presentation mapping belongs in SearchMapper.
 * -----------------------------------------------------------------------------
 */

import { getProducts } from "@/features/product";
import { getOffersByProductId } from "@/features/offer";

import { SearchMapper } from "../mappers/search.mapper";

import type { SearchResultViewModel } from "../viewmodels/search.viewmodel";

/**
 * Searches products by keyword.
 *
 * @param query User search query.
 * @returns SearchResultViewModel collection.
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
    .map((product) =>
      SearchMapper.toSearchResultViewModel(
        product,
        getOffersByProductId(product.id),
      ),
    );
}
