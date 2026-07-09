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
 * - Generate search suggestions.
 * - Manage selected product.
 * - Manage Offer dialog state.
 *
 * Architecture:
 * UI
 *   ↓
 * Hook
 *   ↓
 * Search Service
 *
 * Notes:
 * - No business logic.
 * - Business rules belong in SearchService.
 * -----------------------------------------------------------------------------
 */

import { useCallback, useState } from "react";

import { searchProducts } from "../services/search.service";
import { getSearchSuggestions } from "../services/search-suggestion.service";

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

  const [suggestions, setSuggestions] = useState<string[]>([]);

  const [activeSuggestionIndex, setActiveSuggestionIndex] =
    useState<number>(-1);

  const updateQuery = useCallback((query: string) => {
    setState((previous) => ({
      ...previous,
      query,
    }));

    setSuggestions((previousSuggestions) => {
      void previousSuggestions;

      return getSearchSuggestions(query, loadRecentSearches());
    });

    setActiveSuggestionIndex(-1);
  }, []);

  const updateSort = useCallback((sort: SearchState["sort"]) => {
    setState((previous) => {
      const results = searchProducts(previous.query, sort);

      return {
        ...previous,
        sort,
        results,
      };
    });
  }, []);

  const executeSearch = useCallback(() => {
    setState((previous) => {
      const results = searchProducts(previous.query, previous.sort);

      const recentSearches = addRecentSearch(
        previous.recentSearches,
        previous.query,
      );

      setSuggestions([]);
      setActiveSuggestionIndex(-1);

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
      const results = searchProducts(query, previous.sort);

      const recentSearches = addRecentSearch(previous.recentSearches, query);

      setSuggestions([]);
      setActiveSuggestionIndex(-1);

      return {
        ...previous,
        query,
        results,
        selectedResult: null,
        recentSearches,
      };
    });
  }, []);

  const selectSuggestion = useCallback((suggestion: string) => {
    setState((previous) => ({
      ...previous,
      query: suggestion,
    }));

    setSuggestions([]);
    setActiveSuggestionIndex(-1);
  }, []);

  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
    setActiveSuggestionIndex(-1);
  }, []);

  const moveSuggestionUp = useCallback(() => {
    setActiveSuggestionIndex((previous) => Math.max(previous - 1, 0));
  }, []);

  const moveSuggestionDown = useCallback(() => {
    setActiveSuggestionIndex((previous) =>
      Math.min(previous + 1, suggestions.length - 1),
    );
  }, [suggestions.length]);

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

    suggestions,
    activeSuggestionIndex,

    updateQuery,
    updateSort,

    executeSearch,
    executeRecentSearch,

    selectSuggestion,
    clearSuggestions,
    moveSuggestionUp,
    moveSuggestionDown,

    clearRecentSearchHistory,

    selectResult,
    clearSelection,

    offerDialogOpen,
    openOfferDialog,
    closeOfferDialog,
  };
}
