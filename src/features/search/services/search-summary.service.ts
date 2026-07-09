/**
 * -----------------------------------------------------------------------------
 * File: search-summary.service.ts
 * Feature: Search
 *
 * Purpose:
 * Provides summary statistics for Search results.
 *
 * Responsibilities:
 * - Generate SearchSummaryViewModel.
 * - Delegate presentation formatting to SearchMapper.
 *
 * Architecture:
 * UI
 *   ↓
 * Hook
 *   ↓
 * Search Summary Service
 *   ↓
 * Search Mapper
 *   ↓
 * ViewModel
 *
 * Notes:
 * - Contains Search summary business logic only.
 * - Independent of the search execution service.
 * -----------------------------------------------------------------------------
 */

import { SearchMapper } from "../mappers/search.mapper";

import type {
  SearchResultViewModel,
  SearchSummaryViewModel,
} from "../viewmodels/search.viewmodel";

/**
 * Builds the Search summary for a collection of results.
 */
export function buildSearchSummary(
  results: SearchResultViewModel[],
): SearchSummaryViewModel {
  return SearchMapper.toSearchSummaryViewModel(results);
}
