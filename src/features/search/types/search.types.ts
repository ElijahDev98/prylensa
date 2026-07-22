/**
 * -----------------------------------------------------------------------------
 * File: search.types.ts
 * Feature: Search
 *
 * Purpose:
 * Defines shared Search feature types.
 *
 * Architecture:
 *
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

import type { FocusEventHandler, KeyboardEventHandler } from "react";

import type { SearchFilters } from "./search-filter.types";
import type { SearchResultViewModel } from "../viewmodels/search.viewmodel";

/**
 * User-facing feedback produced by the Search feature.
 */
export interface SearchFeedback {
  validation?: string;

  warning?: string;

  error?: string;

  success?: string;
}

/**
 * Supported search sorting options.
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
   * Indicates whether a search request is executing.
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
   * Selected sorting option.
   */
  sort: SearchSortOption;

  /**
   * Active search filters.
   */
  filters: SearchFilters;
}

/**
 * Shared Search input properties.
 */
export interface SearchInputProps {
  /**
   * Current search query.
   */
  value: string;

  /**
   * Inline autocomplete completion.
   *
   * Example:
   *
   * value = "iph"
   * ghostText = "one 16 Pro"
   */
  ghostText?: string;

  /**
   * Disables user interaction while a search
   * request is executing.
   */
  disabled?: boolean;

  /**
   * Invoked whenever the input value changes.
   */
  onChange(value: string): void;

  /**
   * Accepts the current autocomplete suggestion.
   */
  onAcceptAutocomplete?(): void;

  /**
   * Keyboard events forwarded to the toolbar.
   */
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;

  /**
   * Focus events.
   */
  onFocus?: FocusEventHandler<HTMLInputElement>;

  /**
   * Blur events.
   */
  onBlur?: FocusEventHandler<HTMLInputElement>;
}
