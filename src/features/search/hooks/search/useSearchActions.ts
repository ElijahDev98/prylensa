/**
 * -----------------------------------------------------------------------------
 * File: useSearchActions.ts
 * Feature: Search
 *
 * Purpose:
 * Encapsulates Search business actions.
 *
 * Responsibilities:
 * - Execute searches.
 * - Execute recent searches.
 * - Update sorting.
 * - Manage selected product.
 * - Manage recent search history.
 *
 * Architecture:
 * UI
 *   ↓
 * Hook
 *   ↓
 * Search Service
 *
 * Notes:
 * - Depends only on SearchState updater.
 * - No presentation logic.
 * -----------------------------------------------------------------------------
 */

import { useCallback } from "react";

import { searchProducts } from "../../services/search.service";

import {
  addRecentSearch,
  clearRecentSearches,
} from "../../utils/recent-search.storage";

import type { Dispatch, SetStateAction } from "react";

import type { SearchSortOption, SearchState } from "../../types/search.types";

import type { SearchResultViewModel } from "../../viewmodels/search.viewmodel";

interface UseSearchActionsProps {
  setState: Dispatch<SetStateAction<SearchState>>;
}

export default function useSearchActions({ setState }: UseSearchActionsProps) {
  const updateSort = useCallback(
    (sort: SearchSortOption) => {
      setState((previous) => ({
        ...previous,
        sort,
        results: searchProducts(previous.query, sort),
      }));
    },
    [setState],
  );

  const executeSearch = useCallback(() => {
    setState((previous) => {
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
  }, [setState]);

  const executeRecentSearch = useCallback(
    (query: string) => {
      setState((previous) => ({
        ...previous,
        query,
        results: searchProducts(query, previous.sort),
        selectedResult: null,
        recentSearches: addRecentSearch(previous.recentSearches, query),
      }));
    },
    [setState],
  );

  const selectResult = useCallback(
    (result: SearchResultViewModel) => {
      setState((previous) => ({
        ...previous,
        selectedResult: result,
      }));
    },
    [setState],
  );

  const clearSelection = useCallback(() => {
    setState((previous) => ({
      ...previous,
      selectedResult: null,
    }));
  }, [setState]);

  const clearRecentSearchHistory = useCallback(() => {
    clearRecentSearches();

    setState((previous) => ({
      ...previous,
      recentSearches: [],
    }));
  }, [setState]);

  return {
    updateSort,
    executeSearch,
    executeRecentSearch,
    selectResult,
    clearSelection,
    clearRecentSearchHistory,
  };
}
