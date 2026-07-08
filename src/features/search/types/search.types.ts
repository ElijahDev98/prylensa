/**
 * -----------------------------------------------------------------------------
 * File: search.types.ts
 * Feature: Search
 *
 * Purpose:
 * Defines shared Search feature types.
 *
 * Architecture:
 * UI
 *   ↓
 * Hook
 *   ↓
 * Service
 *
 * Notes:
 * - Keep this file UI-agnostic.
 * - Only include state owned by the Search feature.
 * -----------------------------------------------------------------------------
 */

import type { SearchResultViewModel } from "../viewmodels/search.viewmodel";

/**
 * Search feedback displayed to the user.
 */
export interface SearchFeedback {
  validation?: string;

  warning?: string;

  error?: string;

  success?: string;
}

/**
 * Supported search sort options.
 *
 * Future:
 * Additional options can be introduced without modifying
 * presentation components.
 */
export type SearchSortOption = "relevance" | "lowest-price" | "highest-price";

/**
 * Search feature state.
 */
export interface SearchState {
  /**
   * Current search query.
   */
  query: string;

  /**
   * Indicates whether a search operation is in progress.
   */
  loading: boolean;

  /**
   * User-facing feedback.
   */
  feedback: SearchFeedback;

  /**
   * Current search results.
   */
  results: SearchResultViewModel[];

  /**
   * Currently selected search result.
   */
  selectedResult: SearchResultViewModel | null;

  /**
   * Recent search history.
   */
  recentSearches: string[];

  /**
   * Current sort option.
   */
  sort: SearchSortOption;
}

/**
 * Search input props.
 */
export interface SearchInputProps {
  value: string;

  onChange(value: string): void;
}
