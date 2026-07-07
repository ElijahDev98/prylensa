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
 * - Delegate business logic to the Search Service.
 *
 * Does NOT:
 * - Render UI.
 * - Know Product, Offer or Store implementation.
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

    /**
     * Do not show any products
     * until the user searches.
     */
    results: [],

    /**
     * No product selected initially.
     */
    selectedResult: null,
  };
}

function useSearch() {
  const [state, setState] = useState(createInitialState);

  /**
   * Update the search query only.
   */
  const updateQuery = useCallback((query: string) => {
    setState((previous) => ({
      ...previous,

      query,
    }));
  }, []);

  /**
   * Execute the search using
   * the current query.
   */
  const executeSearch = useCallback(() => {
    setState((previous) => {
      const results = searchProducts(previous.query);

      return {
        ...previous,

        results,

        /**
         * Automatically display the first
         * matching product in the workspace.
         */
        selectedResult: results.length > 0 ? results[0] : null,

        feedback:
          results.length === 0
            ? {
                warning: "No matching products found.",
              }
            : {},
      };
    });
  }, []);

  /**
   * Select a different search result.
   */
  const selectResult = useCallback((result: SearchResultViewModel) => {
    setState((previous) => ({
      ...previous,

      selectedResult: result,
    }));
  }, []);

  /**
   * Clear the selected result.
   */
  const clearSelection = useCallback(() => {
    setState((previous) => ({
      ...previous,

      selectedResult: null,
    }));
  }, []);

  return {
    query: state.query,

    loading: state.loading,

    feedback: state.feedback,

    results: state.results,

    selectedResult: state.selectedResult,

    updateQuery,

    executeSearch,

    selectResult,

    clearSelection,
  };
}

export default useSearch;
