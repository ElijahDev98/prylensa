/**
 * -----------------------------------------------------------------------------
 * File: search-suggestion.service.ts
 * Feature: Search
 *
 * Purpose:
 * Generates search suggestions from recent searches and products.
 * -----------------------------------------------------------------------------
 */

import { getProducts } from "@/features/product";

export function getSearchSuggestions(
  query: string,
  recentSearches: string[],
): string[] {
  const keyword = query.trim().toLowerCase();

  if (!keyword) {
    return [];
  }

  const productSuggestions = getProducts()
    .flatMap((product) => [product.title, product.brand])
    .filter((value) => value.toLowerCase().includes(keyword));

  return [...new Set([...recentSearches, ...productSuggestions])]
    .filter((value) => value.toLowerCase().includes(keyword))
    .slice(0, 8);
}
