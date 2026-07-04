/**
 * -----------------------------------------------------------------------------
 * File: useSearch.ts
 * Feature: Search
 *
 * Purpose:
 * Centralized state management for the Search Feature.
 * -----------------------------------------------------------------------------
 */

import { useCallback, useState } from "react";

import { searchProducts } from "../services/search.service";
import type { MockProduct } from "../data/products";

export interface SearchState {
  query: string;
  products: MockProduct[];
  loading: boolean;
  error: string | null;
}

export function useSearch() {
  const [state, setState] = useState<SearchState>({
    query: "",
    products: [],
    loading: false,
    error: null,
  });

  const updateQuery = (query: string) => {
    setState((previous) => ({
      ...previous,
      query,
    }));
  };

  const executeSearch = useCallback(async () => {
    try {
      setState((previous) => ({
        ...previous,
        loading: true,
        error: null,
      }));

      const results = await searchProducts(state.query);

      setState((previous) => ({
        ...previous,
        loading: false,
        products: results,
      }));
    } catch {
      setState((previous) => ({
        ...previous,
        loading: false,
        error: "Unable to complete search.",
      }));
    }
  }, [state.query]);

  return {
    state,
    updateQuery,
    executeSearch,
  };
}
