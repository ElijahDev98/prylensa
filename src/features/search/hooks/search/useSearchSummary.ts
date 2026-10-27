/**
 * -----------------------------------------------------------------------------
 * File: useSearchSummary.ts
 * Feature: Search
 *
 * Purpose:
 * Produces the Search summary.
 *
 * Responsibilities:
 * - Build Search summary.
 * - Return empty summary when no results exist.
 *
 * Architecture:
 * UI
 *   ↓
 * Hook
 *   ↓
 * Search Summary Service
 *
 * Notes:
 * - Derived state only.
 * - No UI state.
 * -----------------------------------------------------------------------------
 */

import { useMemo } from "react";

import { buildSearchSummary } from "../../services/search-summary.service";
import { usePreferences } from "@/features/settings";

import type {
  SearchResultViewModel,
  SearchSummaryViewModel,
} from "../../viewmodels/search.viewmodel";

const EMPTY_SUMMARY: SearchSummaryViewModel = {
  resultCount: 0,
  storeCount: 0,
  lowestPrice: 0,
  lowestPriceLabel: "0",
  averagePrice: 0,
  averagePriceLabel: "0",
  bestQueryMatch: 0,
  bestQueryMatchLabel: "0%",
};

export default function useSearchSummary(
  results: SearchResultViewModel[],
): SearchSummaryViewModel {
  const { formatPrice } = usePreferences();

  return useMemo(() => {
    if (results.length === 0) {
      return {
        ...EMPTY_SUMMARY,
        lowestPriceLabel: formatPrice(0),
        averagePriceLabel: formatPrice(0),
      };
    }

    return buildSearchSummary(results, formatPrice);
  }, [results, formatPrice]);
}
