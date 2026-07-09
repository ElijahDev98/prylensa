/**
 * -----------------------------------------------------------------------------
 * File: search-filter.types.ts
 * Feature: Search
 * -----------------------------------------------------------------------------
 */

export interface SearchFilters {
  category: string;

  store: string;

  minPrice?: number;

  maxPrice?: number;

  inStockOnly: boolean;
}

export const DEFAULT_SEARCH_FILTERS: SearchFilters = {
  category: "all",

  store: "all",

  inStockOnly: false,
};
