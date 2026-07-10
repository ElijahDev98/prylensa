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
 * - Expose state and state updater.
 *
 * Architecture:
 * UI
 *   ↓
 * Hook
 *
 * Notes:
 * - Single source of truth for SearchState.
 * - No business logic.
 * -----------------------------------------------------------------------------
 */

import { useState } from "react";

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
  };
}

interface UseSearchStateResult {
  state: SearchState;

  setState: Dispatch<SetStateAction<SearchState>>;
}

export default function useSearchState(): UseSearchStateResult {
  const [state, setState] = useState<SearchState>(createInitialState);

  return {
    state,
    setState,
  };
}
