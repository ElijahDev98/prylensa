/**
 * -----------------------------------------------------------------------------
 * File: useSearch.ts
 * Feature: Search
 *
 * Purpose:
 * Owns Search feature state.
 *
 * Responsibilities:
 * - Manage search query.
 * - Execute searches.
 * - Manage selected search result.
 * - Manage Offer Dialog state.
 * -----------------------------------------------------------------------------
 */

import { useCallback, useState } from "react";

import { searchProducts } from "../services/search.service";

import type { SearchState } from "../types/search.types";
import type { SearchResultViewModel } from "../viewmodels/search.viewmodel";

function createInitialState(): SearchState {
  return {
    query: "",
    loading: false,
    feedback: {},
    results: [],
    selectedResult: null,
  };
}

function useSearch() {
  const [state, setState] = useState(createInitialState);

  const [offerDialogOpen, setOfferDialogOpen] = useState(false);

  const updateQuery = useCallback((query: string) => {
    setState((previous) => ({
      ...previous,
      query,
    }));
  }, []);

  const executeSearch = useCallback(() => {
    setState((previous) => ({
      ...previous,
      results: searchProducts(previous.query),
      selectedResult: null,
    }));
  }, []);

  const selectResult = useCallback((result: SearchResultViewModel) => {
    setState((previous) => ({
      ...previous,
      selectedResult: result,
    }));
  }, []);

  const clearSelection = useCallback(() => {
    setState((previous) => ({
      ...previous,
      selectedResult: null,
    }));
  }, []);

  const openOfferDialog = useCallback(() => {
    setOfferDialogOpen(true);
  }, []);

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

export default useSearch;
