/**
 * -----------------------------------------------------------------------------
 * File: useComparisonState.ts
 * Feature: Comparison Domain
 *
 * Purpose:
 * Owns the comparison state.
 *
 * Responsibilities:
 * - Manage comparison state.
 * - Expose comparison actions.
 *
 * Does NOT:
 * - Render UI.
 * - Fetch APIs directly.
 * -----------------------------------------------------------------------------
 */

import { useMemo, useState } from "react";

import {
  clearComparison,
  createComparisonState,
  removeProduct,
  resetComparison,
} from "../services/comparison.service";

import type { ComparisonViewModel } from "../types/comparison.viewmodel";

function useComparisonState(): ComparisonViewModel {
  const [comparison, setComparison] = useState(createComparisonState);

  const actions = useMemo(
    () => ({
      removeProduct(productId: string) {
        setComparison((previous) => removeProduct(previous, productId));
      },

      clearComparison() {
        setComparison(clearComparison());
      },

      resetComparison() {
        setComparison(resetComparison());
      },
    }),
    [],
  );

  return {
    ...comparison,
    ...actions,
  };
}

export default useComparisonState;
