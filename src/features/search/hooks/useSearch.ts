/**
 * -----------------------------------------------------------------------------
 * File: useSearch.ts
 * Feature: Search
 *
 * Purpose:
 * Orchestrates the Search feature.
 *
 * Responsibilities:
 * - Compose Search hooks.
 * - Expose Search state.
 * - Expose Search actions.
 * - Produce Search summary.
 * - Manage Offer dialog state.
 *
 * Architecture:
 * UI
 *   ↓
 * useSearch
 *   ├── useSearchState
 *   ├── useSearchActions
 *   ├── useSearchSuggestions
 *   ├── useSearchAutocomplete
 *   └── Search Summary Service
 *
 * Notes:
 * - Orchestrator only.
 * - No business logic.
 * -----------------------------------------------------------------------------
 */

import { useCallback, useState } from "react";

import { buildSearchSummary } from "../services/search-summary.service";

import {
  useSearchActions,
  useSearchAutocomplete,
  useSearchSuggestions,
} from "./search";

import useSearchState from "./search/useSearchState";

import type { SearchSummaryViewModel } from "../viewmodels/search.viewmodel";

const EMPTY_SUMMARY: SearchSummaryViewModel = {
  resultCount: 0,
  storeCount: 0,
  lowestPrice: 0,
  lowestPriceLabel: "₦0",
  averagePrice: 0,
  averagePriceLabel: "₦0",
};

export default function useSearch() {
  /**
   * ---------------------------------------------------------------------------
   * State
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

  const [offerDialogOpen, setOfferDialogOpen] = useState(false);

  const openOfferDialog = useCallback(() => {
    setOfferDialogOpen(true);
  }, []);

  const closeOfferDialog = useCallback(() => {
    setOfferDialogOpen(false);
  }, []);

  /**
   * ---------------------------------------------------------------------------
   * Summary
   * ---------------------------------------------------------------------------
   */

  const summary =
    state.results.length > 0
      ? buildSearchSummary(state.results)
      : EMPTY_SUMMARY;

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

    offerDialogOpen,
    openOfferDialog,
    closeOfferDialog,
  };
}
