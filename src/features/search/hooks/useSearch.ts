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
 * - Delegate business operations to SearchService.
 * - Expose UI callbacks.
 * - Manage Offer Dialog state.
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
 *
 * Notes:
 * - The hook owns state only.
 * - Business operations are delegated to SearchService.
 * -----------------------------------------------------------------------------
 */

import { useCallback, useState } from "react";

import { executeSearch } from "../services/search.service";

import type { SearchSortOption, SearchState } from "../types/search.types";
import type { SearchResultViewModel } from "../viewmodels/search.viewmodel";

/**
 * Creates the initial Search feature state.
 */
function createInitialState(): SearchState {
  return {
    query: "",

    loading: false,

    feedback: {},

    results: [],

    selectedResult: null,

    recentSearches: [],

    sort: "relevance",
  };
}

/**
 * Search feature orchestration hook.
 */
export default function useSearch() {
  const [state, setState] = useState<SearchState>(createInitialState);

  const [offerDialogOpen, setOfferDialogOpen] = useState(false);

  /**
   * Updates the current search query.
   */
  const updateQuery = useCallback((query: string) => {
    setState((previous) => ({
      ...previous,
      query,
    }));
  }, []);

  /**
   * Updates the selected sort option.
   */
  const updateSort = useCallback((sort: SearchSortOption) => {
    setState((previous) => ({
      ...previous,
      sort,
    }));
  }, []);

  /**
   * Executes the current search.
   */
  const performSearch = useCallback((query: string) => {
    setState((previous) => executeSearch(previous, query));
  }, []);

  /**
   * Executes the current query.
   */
  const executeCurrentSearch = useCallback(() => {
    performSearch(state.query);
  }, [performSearch, state.query]);

  /**
   * Executes a recent search.
   */
  const executeRecentSearch = useCallback(
    (query: string) => {
      performSearch(query);
    },
    [performSearch],
  );

  /**
   * Selects a search result.
   */
  const selectResult = useCallback((result: SearchResultViewModel) => {
    setState((previous) => ({
      ...previous,
      selectedResult: result,
    }));
  }, []);

  /**
   * Clears the selected result.
   */
  const clearSelection = useCallback(() => {
    setState((previous) => ({
      ...previous,
      selectedResult: null,
    }));
  }, []);

  /**
   * Opens the Offer dialog.
   */
  const openOfferDialog = useCallback(() => {
    setOfferDialogOpen(true);
  }, []);

  /**
   * Closes the Offer dialog.
   */
  const closeOfferDialog = useCallback(() => {
    setOfferDialogOpen(false);
  }, []);

  return {
    ...state,

    updateQuery,

    updateSort,

    executeSearch: executeCurrentSearch,

    executeRecentSearch,

    selectResult,

    clearSelection,

    offerDialogOpen,

    openOfferDialog,

    closeOfferDialog,
  };
}
