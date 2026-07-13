/**
 * -----------------------------------------------------------------------------
 * File: useSearch.ts
 * Feature: Search
 *
 * Purpose:
 * Orchestrates the Search feature.
 *
 * Responsibilities:
 * - Own Search feature state.
 * - Coordinate Search services.
 * - Produce derived Search data.
 * - Manage Offer dialog state.
 *
 * Architecture:
 *
 * UI
 *   ↓
 * useSearch
 *   ↓
 * Services
 *
 * Notes:
 * - Feature orchestrator.
 * - No business rules.
 * -----------------------------------------------------------------------------
 */

import { DEFAULT_SEARCH_FILTERS } from "../types/search-filter.types";
import { useCallback, useMemo, useState } from "react";

import { getAutocomplete } from "../services/search-autocomplete.service";
import { buildSearchSummary } from "../services/search-summary.service";
import { getSearchSuggestions } from "../services/search-suggestion.service";
import { searchProducts } from "../services/search.service";

import {
  addRecentSearch,
  clearRecentSearches,
  loadRecentSearches,
} from "../utils/recent-search.storage";

import useOfferDialog from "./search/useOfferDialog";

import type { SearchSortOption, SearchState } from "../types/search.types";
import type {
  SearchResultViewModel,
  SearchSummaryViewModel,
} from "../viewmodels/search.viewmodel";

function createInitialState(): SearchState {
  return {
    query: "",
    loading: false,
    feedback: {},
    results: [],
    selectedResult: null,
    recentSearches: loadRecentSearches(),
    sort: "relevance",
    filters: {
      ...DEFAULT_SEARCH_FILTERS,
    },
  };
}

const EMPTY_SUMMARY: SearchSummaryViewModel = {
  resultCount: 0,
  storeCount: 0,
  lowestPrice: 0,
  lowestPriceLabel: "₦0",
  averagePrice: 0,
  averagePriceLabel: "₦0",
};

export default function useSearch() {
  /**
   * ---------------------------------------------------------------------------
   * Feature State
   * ---------------------------------------------------------------------------
   */

  const [state, setState] = useState<SearchState>(createInitialState);

  /**
   * ---------------------------------------------------------------------------
   * UI State
   * ---------------------------------------------------------------------------
   */

  const [suggestionsOpen, setSuggestionsOpen] = useState(false);

  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

  const offerDialog = useOfferDialog();

  /**
   * ---------------------------------------------------------------------------
   * Derived State
   * ---------------------------------------------------------------------------
   */

  const summary = useMemo(() => {
    return state.results.length > 0
      ? buildSearchSummary(state.results)
      : EMPTY_SUMMARY;
  }, [state.results]);

  const suggestions = useMemo(() => {
    return getSearchSuggestions(state.query, state.recentSearches);
  }, [state.query, state.recentSearches]);

  const autocomplete = useMemo(() => {
    return getAutocomplete(state.query);
  }, [state.query]);

  /**
   * ---------------------------------------------------------------------------
   * Query
   * ---------------------------------------------------------------------------
   */

  const updateQuery = useCallback((query: string) => {
    const trimmedQuery = query.trim();

    setState((previous) => ({
      ...previous,
      query,
      selectedResult: null,
    }));

    setSuggestionsOpen(trimmedQuery.length > 0);

    setActiveSuggestionIndex(trimmedQuery.length > 0 ? 0 : -1);
  }, []);

  /**
   * ---------------------------------------------------------------------------
   * Sorting
   * ---------------------------------------------------------------------------
   */

  const updateSort = useCallback((sort: SearchSortOption) => {
    setState((previous) => ({
      ...previous,
      sort,
      results: searchProducts(previous.query, sort),
    }));
  }, []);

  /**
   * ---------------------------------------------------------------------------
   * Search Execution
   * ---------------------------------------------------------------------------
   */

  const executeSearch = useCallback(() => {
    setSuggestionsOpen(false);
    setActiveSuggestionIndex(-1);
    setState((previous) => {
      const query = previous.query.trim();

      if (query.length === 0) {
        return previous;
      }
      const results = searchProducts(previous.query, previous.sort);

      return {
        ...previous,
        loading: false,
        results,
        selectedResult: null,
        recentSearches: addRecentSearch(
          previous.recentSearches,
          previous.query,
        ),
      };
    });
  }, []);

  const executeRecentSearch = useCallback((query: string) => {
    setSuggestionsOpen(false);
    setActiveSuggestionIndex(-1);
    setState((previous) => {
      const results = searchProducts(query, previous.sort);

      return {
        ...previous,
        query,
        results,
        selectedResult: null,
        recentSearches: addRecentSearch(previous.recentSearches, query),
      };
    });
  }, []);

  /**
   * ---------------------------------------------------------------------------
   * Suggestions
   * ---------------------------------------------------------------------------
   */

  const selectSuggestion = useCallback((suggestion: string) => {
    setSuggestionsOpen(false);
    setActiveSuggestionIndex(-1);
    setState((previous) => {
      const results = searchProducts(suggestion, previous.sort);

      return {
        ...previous,
        query: suggestion,
        results,
        selectedResult: null,
        recentSearches: addRecentSearch(previous.recentSearches, suggestion),
      };
    });
  }, []);

  /**
   * ---------------------------------------------------------------------------
   * Autocomplete
   * ---------------------------------------------------------------------------
   */

  const acceptAutocomplete = useCallback(() => {
    if (
      activeSuggestionIndex < 0 ||
      activeSuggestionIndex >= suggestions.length
    ) {
      return;
    }

    selectSuggestion(suggestions[activeSuggestionIndex]);
  }, [activeSuggestionIndex, suggestions, selectSuggestion]);

  const clearSuggestions = useCallback(() => {
    setSuggestionsOpen(false);
    setActiveSuggestionIndex(-1);
  }, []);

  const moveSuggestionUp = useCallback(() => {
    if (suggestions.length === 0) {
      return;
    }

    setActiveSuggestionIndex((previous) =>
      previous <= 0 ? suggestions.length - 1 : previous - 1,
    );
  }, [suggestions.length]);

  const moveSuggestionDown = useCallback(() => {
    if (suggestions.length === 0) {
      return;
    }

    setActiveSuggestionIndex((previous) =>
      previous >= suggestions.length - 1 ? 0 : previous + 1,
    );
  }, [suggestions.length]);

  /**
   * ---------------------------------------------------------------------------
   * Recent Searches
   * ---------------------------------------------------------------------------
   */

  const clearRecentSearchHistory = useCallback(() => {
    clearRecentSearches();

    setState((previous) => ({
      ...previous,
      recentSearches: [],
    }));
  }, []);

  /**
   * ---------------------------------------------------------------------------
   * Product Selection
   * ---------------------------------------------------------------------------
   */

  const selectResult = useCallback((result: SearchResultViewModel) => {
    setState((previous) => ({
      ...previous,
      selectedResult: result,
    }));

    setSuggestionsOpen(false);
  }, []);

  const clearSelection = useCallback(() => {
    setState((previous) => ({
      ...previous,
      selectedResult: null,
    }));
  }, []);

  const resetSearch = useCallback(() => {
    setState((previous) => ({
      ...previous,
      query: "",
      loading: false,
      feedback: {},
      results: [],
      selectedResult: null,
    }));

    setSuggestionsOpen(false);
    setActiveSuggestionIndex(-1);
  }, []);

  /**
   * ---------------------------------------------------------------------------
   * Suggestion Visibility
   * ---------------------------------------------------------------------------
   */

  const showSuggestions =
    suggestionsOpen && state.query.trim().length > 0 && suggestions.length > 0;

  /**
   * ---------------------------------------------------------------------------
   * Public API
   * ---------------------------------------------------------------------------
   */

  return {
    /**
     * Feature State
     */
    ...state,

    /**
     * Derived State
     */
    summary,
    autocomplete,

    /**
     * Suggestions
     */
    suggestions: showSuggestions ? suggestions : [],
    activeSuggestionIndex,

    /**
     * Query
     */
    updateQuery,

    /**
     * Sorting
     */
    updateSort,

    /**
     * Search
     */
    executeSearch,
    executeRecentSearch,

    /**
     * Suggestions
     */
    selectSuggestion,
    acceptAutocomplete,
    clearSuggestions,
    resetSearch,
    moveSuggestionUp,
    moveSuggestionDown,

    /**
     * Recent Searches
     */
    clearRecentSearchHistory,

    /**
     * Selection
     */
    selectResult,
    clearSelection,

    /**
     * Offer Dialog
     */
    ...offerDialog,
  };
}
