/**
 * -----------------------------------------------------------------------------
 * File: useComparison.ts
 * Feature: Compare
 *
 * Purpose:
 * Public hook for the Compare feature.
 *
 * Responsibilities:
 * - Expose the Comparison ViewModel.
 *
 * Does NOT:
 * - Manage state.
 * - Execute business logic.
 * -----------------------------------------------------------------------------
 */

import useComparisonState from "./useComparisonState";

import type { ComparisonViewModel } from "../types/comparison.viewmodel";

function useComparison(): ComparisonViewModel {
  return useComparisonState();
}

export default useComparison;
