/**
 * -----------------------------------------------------------------------------
 * File: useComparisonContext.ts
 * Feature: Comparison (Domain)
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
