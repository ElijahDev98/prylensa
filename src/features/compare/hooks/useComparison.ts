/**
 * -----------------------------------------------------------------------------
 * File: useComparison.ts
 * Feature: Compare
 *
 * Purpose:
 * Public hook for the Compare feature.
 *
 * Responsibilities:
 * - Expose comparison state.
 * - Expose comparison actions.
 *
 * Does NOT:
 * - Manage React state directly.
 * - Execute business logic.
 * -----------------------------------------------------------------------------
 */

import useComparisonState from "./useComparisonState";

function useComparison() {
  return useComparisonState();
}

export default useComparison;
