/**
 * -----------------------------------------------------------------------------
 * File: useSearchState.ts
 * Feature: Search
 *
 * Purpose:
 * Owns the Search feature state.
 *
 * Responsibilities:
 * - Initialize SearchState.
 * - Expose SearchState.
 * - Expose SearchState updater.
 *
 * Architecture:
 * UI
 *   ↓
 * Hook
 *
 * Notes:
 * - Single source of truth.
 * - No business logic.
 * -----------------------------------------------------------------------------
 */

import { useState } from "react";

import { DEFAULT_SEARCH_FILTERS } from "../../types/search-filter.types";
import { loadRecentSearches } from "../../utils/recent-search.storage";

import type { Dispatch, SetStateAction } from "react";

import type { SearchState } from "../../types/search.types";

function createInitialState(): SearchState {
  return {
    query: "",
    loading: false,
    feedback: {},
    results: [],
    selectedResult: null,
    recentSearches: loadRecentSearches(),
    sort: "relevance",
    filters: {
      ...DEFAULT_SEARCH_FILTERS,
    },
  };
}

export interface SearchStateContext {
  state: SearchState;

  setState: Dispatch<SetStateAction<SearchState>>;
}

export default function useSearchState(): SearchStateContext {
  const [state, setState] = useState<SearchState>(createInitialState);

  return {
    state,
    setState,
  };
}
