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
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { getAutocomplete } from "../services/search-autocomplete.service";
import { buildSearchSummary } from "../services/search-summary.service";
import { getSearchSuggestions } from "../services/search-suggestion.service";
import { searchProducts } from "../services/search.service";

import {
  addRecentSearch,
  clearRecentSearches,
  loadRecentSearches,
  removeRecentSearch,
} from "../utils/recent-search.storage";

import useOfferDialog from "./search/useOfferDialog";
import { usePreferences } from "@/features/settings";
import { SearchMapper } from "../mappers/search.mapper";

import type { SearchSortOption, SearchState } from "../types/search.types";
import type {
  SearchResultViewModel,
  SearchSummaryViewModel,
} from "../viewmodels/search.viewmodel";

function createInitialState(): SearchState {
  return {
    query: "",
    loading: false,
    hasSearched: false,
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

let cachedSearchState: SearchState | null = null;

const EMPTY_SUMMARY: SearchSummaryViewModel = {
  resultCount: 0,
  storeCount: 0,
  lowestPrice: 0,
  lowestPriceLabel: "0",
  averagePrice: 0,
  averagePriceLabel: "0",
  bestQueryMatch: 0,
  bestQueryMatchLabel: "0%",
};

export default function useSearch() {
  const { formatPrice } = usePreferences();
  const formatPriceRef = useRef(formatPrice);
  /**
   * ---------------------------------------------------------------------------
   * Feature State
   * ---------------------------------------------------------------------------
   */

  const [state, setState] = useState<SearchState>(
    () =>
      cachedSearchState
        ? {
            ...cachedSearchState,
            hasSearched:
              cachedSearchState.hasSearched ??
              cachedSearchState.results.length > 0,
          }
        : createInitialState(),
  );

  /**
   * ---------------------------------------------------------------------------
   * UI State
   * ---------------------------------------------------------------------------
   */

  const [suggestionsOpen, setSuggestionsOpen] = useState(false);

  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

  const offerDialog = useOfferDialog();

  useEffect(() => {
    cachedSearchState = state;
  }, [state]);

  useEffect(() => {
    formatPriceRef.current = formatPrice;
  }, [formatPrice]);

  /**
   * ---------------------------------------------------------------------------
   * Derived State
   * ---------------------------------------------------------------------------
   */

  const displayResults = useMemo(
    () => SearchMapper.reformatSearchResultViewModels(state.results, formatPrice),
    [state.results, formatPrice],
  );

  const displaySelectedResult =
    displayResults.find((result) => result.id === state.selectedResult?.id) ?? null;

  const summary = useMemo(() => {
    return displayResults.length > 0
      ? buildSearchSummary(displayResults, formatPrice)
      : { ...EMPTY_SUMMARY, lowestPriceLabel: formatPrice(0), averagePriceLabel: formatPrice(0) };
  }, [displayResults, formatPrice]);

  const suggestions = useMemo(() => {
    return getSearchSuggestions(state.query, state.recentSearches);
  }, [state.query, state.recentSearches]);

  const autocomplete = useMemo(() => {
    return getAutocomplete(state.query, state.recentSearches);
  }, [state.query, state.recentSearches]);

  /**
   * ---------------------------------------------------------------------------
   * Search Runner
   * ---------------------------------------------------------------------------
   */

  const runSearch = useCallback(
    async (
      query: string,
      sort: SearchSortOption,
      options?: {
        updateQuery?: boolean;
        saveRecent?: boolean;
      },
    ) => {
      const trimmedQuery = query.trim();

      if (!trimmedQuery) {
        return false;
      }

      setState((previous) => ({
        ...previous,
        loading: true,
        hasSearched: false,
        feedback: {},
      }));

      try {
        const results = await searchProducts(
          trimmedQuery,
          sort,
          formatPriceRef.current,
        );

        setState((previous) => ({
          ...previous,
          query: options?.updateQuery ? trimmedQuery : previous.query,
          loading: false,
          hasSearched: true,
          results,
          selectedResult: results[0] ?? null,
          recentSearches: options?.saveRecent
            ? addRecentSearch(previous.recentSearches, trimmedQuery)
            : previous.recentSearches,
        }));
        return true;
      } catch {
        setState((previous) => ({
          ...previous,
          loading: false,
          hasSearched: false,
          feedback: {
            error: "Unable to complete search. Please try again.",
          },
        }));
        return false;
      }
    },
    [],
  );

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
      hasSearched: false,
      results: [],
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

  const updateSort = useCallback(
    async (sort: SearchSortOption) => {
      setState((previous) => ({
        ...previous,
        sort,
      }));

      if (state.query.trim()) {
        await runSearch(state.query, sort);
      }
    },
    [state.query, runSearch],
  );

  /**
   * ---------------------------------------------------------------------------
   * Search Execution
   * ---------------------------------------------------------------------------
   */

  const executeSearch = useCallback(async () => {
    setSuggestionsOpen(false);
    setActiveSuggestionIndex(-1);

    await runSearch(state.query, state.sort, {
      saveRecent: true,
    });
  }, [state.query, state.sort, runSearch]);

  const executeRecentSearch = useCallback(
    async (query: string) => {
      setSuggestionsOpen(false);
      setActiveSuggestionIndex(-1);

      await runSearch(query, state.sort, {
        updateQuery: true,
        saveRecent: true,
      });
    },
    [state.sort, runSearch],
  );

  const executeSearchQuery = useCallback(
    async (query: string) => {
      setSuggestionsOpen(false);
      setActiveSuggestionIndex(-1);

      return runSearch(query, state.sort, {
        updateQuery: true,
        saveRecent: true,
      });
    },
    [state.sort, runSearch],
  );

  /**
   * ---------------------------------------------------------------------------
   * Suggestions
   * ---------------------------------------------------------------------------
   */

  const selectSuggestion = useCallback(
    async (suggestion: string) => {
      setSuggestionsOpen(false);
      setActiveSuggestionIndex(-1);

      await runSearch(suggestion, state.sort, {
        updateQuery: true,
        saveRecent: true,
      });
    },
    [state.sort, runSearch],
  );

  /**
   * ---------------------------------------------------------------------------
   * Autocomplete
   * ---------------------------------------------------------------------------
   */

  const acceptAutocomplete = useCallback(() => {
    if (!autocomplete) {
      return;
    }

    setState((previous) => ({
      ...previous,
      query: previous.query + autocomplete,
    }));

    setSuggestionsOpen(false);
    setActiveSuggestionIndex(-1);
  }, [autocomplete]);

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

  const removeRecentSearchHistory = useCallback((query: string) => {
    setState((previous) => ({
      ...previous,
      recentSearches: removeRecentSearch(previous.recentSearches, query),
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
      hasSearched: false,
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
    results: displayResults,
    selectedResult: displaySelectedResult,

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
    executeSearchQuery,
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
    removeRecentSearchHistory,

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
