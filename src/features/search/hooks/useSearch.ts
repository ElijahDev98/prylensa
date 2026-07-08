/**
 * -----------------------------------------------------------------------------
 * File: useSearch.ts
 * Feature: Search
 *
 * Purpose:
 * Orchestrates the Search feature.
 *
 * Responsibilities:
 * - Manage Search state.
 * - Delegate business operations to SearchService.
 * - Expose UI callbacks.
 * - Manage Offer Dialog visibility.
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
 * - No business logic should exist in this hook.
 * - Searching is delegated entirely to SearchService.
 * - This hook owns feature state only.
 * -----------------------------------------------------------------------------
 */

import { useCallback, useState } from "react";

import { searchProducts } from "../services/search.service";

import type { SearchState } from "../types/search.types";
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
   * Executes a search through the SearchService.
   */
  const executeSearch = useCallback(() => {
    setState((previous) => ({
      ...previous,
      loading: true,
    }));

    const results = searchProducts(state.query);

    setState((previous) => ({
      ...previous,
      loading: false,
      results,
      selectedResult: null,
    }));
  }, [state.query]);

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
   * Clears the current selection.
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
    executeSearch,

    selectResult,
    clearSelection,

    offerDialogOpen,
    openOfferDialog,
    closeOfferDialog,
  };
}
