/**
 * -----------------------------------------------------------------------------
 * File: useSearch.ts
 * Feature: Search
 *
 * Purpose:
 * Composes the Search feature hooks.
 *
 * Responsibilities:
 * - Compose Search hooks.
 * - Expose Search API.
 *
 * Architecture:
 *
 * UI
 *   ↓
 * useSearch
 *   ├── useSearchState
 *   ├── useSearchActions
 *   ├── useSearchSuggestions
 *   ├── useSearchAutocomplete
 *   ├── useOfferDialog
 *   └── useSearchSummary
 *
 * Notes:
 * - Composition root only.
 * - No business logic.
 * -----------------------------------------------------------------------------
 */

import {
  useOfferDialog,
  useSearchActions,
  useSearchAutocomplete,
  useSearchSuggestions,
  useSearchSummary,
} from "./search";

import useSearchState from "./search/useSearchState";

export default function useSearch() {
  /**
   * ---------------------------------------------------------------------------
   * Search State
   * ---------------------------------------------------------------------------
   */

  const { state, setState } = useSearchState();

  /**
   * ---------------------------------------------------------------------------
   * Search Actions
   * ---------------------------------------------------------------------------
   */

  const actions = useSearchActions({
    setState,
  });

  /**
   * ---------------------------------------------------------------------------
   * Suggestions
   * ---------------------------------------------------------------------------
   */

  const suggestions = useSearchSuggestions();

  /**
   * ---------------------------------------------------------------------------
   * Autocomplete
   * ---------------------------------------------------------------------------
   */

  const autocomplete = useSearchAutocomplete();

  /**
   * ---------------------------------------------------------------------------
   * Offer Dialog
   * ---------------------------------------------------------------------------
   */

  const offerDialog = useOfferDialog();

  /**
   * ---------------------------------------------------------------------------
   * Summary
   * ---------------------------------------------------------------------------
   */

  const summary = useSearchSummary(state.results);

  /**
   * ---------------------------------------------------------------------------
   * Public API
   * ---------------------------------------------------------------------------
   */

  return {
    ...state,

    summary,

    ...actions,

    ...suggestions,

    ...autocomplete,

    ...offerDialog,
  };
}
