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
 * - Delegate search execution.
 * - Persist recent searches.
 * - Manage selected product.
 * - Manage Offer dialog state.
 * -----------------------------------------------------------------------------
 */

import { useCallback, useState } from "react";

import { searchProducts } from "../services/search.service";

import {
  addRecentSearch,
  clearRecentSearches,
  loadRecentSearches,
} from "../utils/recent-search.storage";

import type { SearchState } from "../types/search.types";
import type { SearchResultViewModel } from "../viewmodels/search.viewmodel";

function createInitialState(): SearchState {
  return {
    query: "",

    loading: false,

    feedback: {},

    results: [],

    selectedResult: null,

    recentSearches: loadRecentSearches(),

    sort: "relevance",
  };
}

export default function useSearch() {
  const [state, setState] = useState<SearchState>(createInitialState);

  const [offerDialogOpen, setOfferDialogOpen] = useState(false);

  const updateQuery = useCallback((query: string) => {
    setState((previous) => ({
      ...previous,
      query,
    }));
  }, []);

  const updateSort = useCallback((sort: SearchState["sort"]) => {
    setState((previous) => ({
      ...previous,
      sort,
    }));
  }, []);

  const executeSearch = useCallback(() => {
    setState((previous) => {
      const results = searchProducts(previous.query);

      const recentSearches = addRecentSearch(
        previous.recentSearches,
        previous.query,
      );

      return {
        ...previous,
        loading: false,
        results,
        selectedResult: null,
        recentSearches,
      };
    });
  }, []);

  const executeRecentSearch = useCallback((query: string) => {
    setState((previous) => {
      const results = searchProducts(query);

      const recentSearches = addRecentSearch(previous.recentSearches, query);

      return {
        ...previous,
        query,
        results,
        selectedResult: null,
        recentSearches,
      };
    });
  }, []);

  const clearRecentSearchHistory = useCallback(() => {
    clearRecentSearches();

    setState((previous) => ({
      ...previous,
      recentSearches: [],
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

    updateSort,

    executeSearch,

    executeRecentSearch,

    clearRecentSearchHistory,

    selectResult,

    clearSelection,

    offerDialogOpen,

    openOfferDialog,

    closeOfferDialog,
  };
}
