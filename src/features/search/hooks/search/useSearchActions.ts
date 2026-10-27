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
import { usePreferences } from "@/features/settings";

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
  const { formatPrice } = usePreferences();
  const updateSort = useCallback(
    async (sort: SearchSortOption) => {
      let query = "";

      setState((previous) => ({
        ...previous,
        sort,
        loading: true,
        hasSearched: false,
      }));

      setState((previous) => {
        query = previous.query;

        return previous;
      });

      const results = await searchProducts(query, sort, formatPrice);

      setState((previous) => ({
        ...previous,
        loading: false,
        hasSearched: true,
        results,
      }));
    },
    [setState, formatPrice],
  );

  const executeSearch = useCallback(async () => {
    let query = "";
    let sort: SearchSortOption = "relevance";

    setState((previous) => {
      query = previous.query;
      sort = previous.sort;

      return {
        ...previous,
        loading: true,
        hasSearched: false,
        feedback: {},
      };
    });

    const results = await searchProducts(query, sort, formatPrice);

    setState((previous) => {
      return {
        ...previous,
        loading: false,
        hasSearched: true,
        results,
        selectedResult: null,
        recentSearches: addRecentSearch(
          previous.recentSearches,
          query,
        ),
      };
    });
  }, [setState, formatPrice]);

  const executeRecentSearch = useCallback(
    async (query: string) => {
      let sort: SearchSortOption = "relevance";

      setState((previous) => {
        sort = previous.sort;

        return {
          ...previous,
          query,
          loading: true,
          hasSearched: false,
          feedback: {},
          selectedResult: null,
        };
      });

      const results = await searchProducts(query, sort, formatPrice);

      setState((previous) => ({
        ...previous,
        query,
        loading: false,
        hasSearched: true,
        results,
        selectedResult: null,
        recentSearches: addRecentSearch(previous.recentSearches, query),
      }));
    },
    [setState, formatPrice],
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
