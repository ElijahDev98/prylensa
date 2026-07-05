/**
 * -----------------------------------------------------------------------------
 * File: useSearch.ts
 * Feature: Search
 *
 * Purpose:
 * Centralized state management for the Search feature.
 * -----------------------------------------------------------------------------
 */

import { useCallback, useState } from "react";

import type { MockProduct } from "../data/products";
import { searchProducts } from "../services/search.service";

export interface SearchState {
  query: string;

  products: MockProduct[];

  selectedProduct: MockProduct | null;

  loading: boolean;

  error: string | null;
}

const INITIAL_STATE: SearchState = {
  query: "",

  products: [],

  selectedProduct: null,

  loading: false,

  error: null,
};

const MINIMUM_SEARCH_LENGTH = 2;

export function useSearch() {
  const [state, setState] = useState<SearchState>(INITIAL_STATE);

  const updateQuery = useCallback((query: string) => {
    setState((previous) => ({
      ...previous,
      query,
    }));
  }, []);

  const setSelectedProduct = useCallback((product: MockProduct) => {
    setState((previous) => ({
      ...previous,
      selectedProduct: product,
    }));
  }, []);

  const executeSearch = useCallback(async () => {
    const keyword = state.query.trim();

    /**
     * Prevent invalid searches.
     */
    if (keyword.length < MINIMUM_SEARCH_LENGTH) {
      setState((previous) => ({
        ...previous,
        products: [],
        loading: false,
        error: null,
      }));

      return;
    }

    try {
      setState((previous) => ({
        ...previous,
        loading: true,
        error: null,
      }));

      const products = await searchProducts(keyword);

      setState((previous) => ({
        ...previous,

        products,

        selectedProduct: products.length > 0 ? products[0] : null,

        loading: false,
      }));
    } catch {
      setState((previous) => ({
        ...previous,
        loading: false,
        error: "Unable to search products.",
      }));
    }
  }, [state.query]);

  return {
    state,
    updateQuery,
    setSelectedProduct,
    executeSearch,
  };
}
