/**
 * -----------------------------------------------------------------------------
 * File: useComparison.ts
 * Feature: Comparison Domain
 *
 * Purpose:
 * Public API for consuming the Comparison Domain.
 *
 * Responsibilities:
 * - Expose comparison state.
 * - Expose comparison actions.
 *
 * Does NOT:
 * - Own state.
 * - Execute business logic.
 * -----------------------------------------------------------------------------
 */

import useComparisonContext from "../context/useComparisonContext";

import type { ComparisonViewModel } from "../types/comparison.viewmodel";

function useComparison(): ComparisonViewModel {
  return useComparisonContext();
}

export default useComparison;
