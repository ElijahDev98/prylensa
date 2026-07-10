/**
 * -----------------------------------------------------------------------------
 * File: useSearchActions.ts
 * Feature: Search
 *
 * Purpose:
 * Encapsulates Search execution actions.
 *
 * Responsibilities:
 * - Execute searches.
 * - Execute recent searches.
 * - Update sorting.
 * - Manage product selection.
 *
 * Architecture:
 * UI
 *   ↓
 * Hook
 *   ↓
 * Search Service
 *
 * Notes:
 * - No presentation logic.
 * - No UI state.
 * -----------------------------------------------------------------------------
 */

import { useCallback } from "react";

import { searchProducts } from "../../services/search.service";

import {
  addRecentSearch,
  clearRecentSearches,
} from "../../utils/recent-search.storage";

import type { Dispatch, SetStateAction } from "react";

import type { SearchState } from "../../types/search.types";
import type { SearchResultViewModel } from "../../viewmodels/search.viewmodel";

interface UseSearchActionsProps {
  setState: Dispatch<SetStateAction<SearchState>>;
}

export default function useSearchActions({ setState }: UseSearchActionsProps) {
  const updateSort = useCallback(
    (sort: SearchState["sort"]) => {
      setState((previous) => {
        const results = searchProducts(previous.query, sort);

        return {
          ...previous,
          sort,
          results,
        };
      });
    },
    [setState],
  );

  const executeSearch = useCallback(() => {
    setState((previous) => {
      const results = searchProducts(previous.query, previous.sort);

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
  }, [setState]);

  const executeRecentSearch = useCallback(
    (query: string) => {
      setState((previous) => {
        const results = searchProducts(query, previous.sort);

        const recentSearches = addRecentSearch(previous.recentSearches, query);

        return {
          ...previous,
          query,
          results,
          selectedResult: null,
          recentSearches,
        };
      });
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
