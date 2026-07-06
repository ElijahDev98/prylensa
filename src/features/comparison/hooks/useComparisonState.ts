/**
 * -----------------------------------------------------------------------------
 * File: useComparisonState.ts
 * Feature: Comparison Domain
 *
 * Purpose:
 * Owns the Comparison Domain state.
 *
 * Responsibilities:
 * - Manage comparison selection.
 * - Expose comparison actions.
 * - Derive visible comparison data.
 *
 * Does NOT:
 * - Render UI.
 * - Fetch APIs.
 * -----------------------------------------------------------------------------
 */

import { useMemo, useState } from "react";

import {
  clearComparison,
  createComparisonState,
  getSelectedProducts,
  getSelectedRows,
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
    products: getSelectedProducts(comparison),

    rows: getSelectedRows(comparison),

    stores: comparison.stores,

    ...actions,
  };
}

export default useComparisonState;
