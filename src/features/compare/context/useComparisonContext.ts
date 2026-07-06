/**
 * -----------------------------------------------------------------------------
 * File: useComparisonContext.ts
 * Feature: Compare
 *
 * Purpose:
 * Provides access to the Comparison Context.
 *
 * Responsibilities:
 * - Read the Comparison Context.
 * - Ensure the Provider exists.
 *
 * Does NOT:
 * - Manage state.
 * - Execute business logic.
 * -----------------------------------------------------------------------------
 */

import { useContext } from "react";

import { ComparisonContext } from "./ComparisonContext";

import type { ComparisonViewModel } from "../types/comparison.viewmodel";

function useComparisonContext(): ComparisonViewModel {
  const comparison = useContext(ComparisonContext);

  if (comparison === null) {
    throw new Error(
      "useComparisonContext must be used inside ComparisonProvider.",
    );
  }

  return comparison;
}

export default useComparisonContext;
