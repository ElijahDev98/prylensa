/**
 * -----------------------------------------------------------------------------
 * File: useComparisonState.ts
 * Feature: Comparison Domain
 *
 * Purpose:
 * Owns the Comparison Domain state.
 *
 * Responsibilities:
 * - Manage selected product IDs.
 * - Compose comparison preferences.
 * - Resolve Product entities.
 * - Resolve Store entities.
 * - Build Comparison business models.
 * - Execute Comparison Intelligence.
 * - Map business models into presentation ViewModels.
 * -----------------------------------------------------------------------------
 */

import { useMemo, useState } from "react";

import {
  addProduct,
  clearComparison,
  createComparisonState,
  removeProduct,
  resetComparison,
} from "../services/comparison.service";

import { getComparisonRows } from "../services/comparison-row.service";

import { analyzeComparison } from "../services/comparison-analysis";

import { toComparisonProductViewModels } from "../mappers/comparison.mapper";
import { toComparisonRowViewModels } from "../mappers/comparison-row.mapper";

import useComparisonPreferences from "./useComparisonPreferences";

import { getProductsByIds } from "@/features/product";
import { getStores } from "@/features/store/services/store.service";

import type { ComparisonViewModel } from "../types/comparison.viewmodel";

function useComparisonState(): ComparisonViewModel {
  /**
   * Comparison state.
   */
  const [comparison, setComparison] = useState(createComparisonState);

  /**
   * Comparison preferences.
   */
  const preferences = useComparisonPreferences();

  /**
   * Comparison actions.
   */
  const actions = useMemo(
    () => ({
      addProduct(productId: string) {
        setComparison((previous) => addProduct(previous, productId));
      },

      removeProduct(productId: string) {
        setComparison((previous) => removeProduct(previous, productId));
      },

      isSelected(productId: string) {
        return comparison.selectedProductIds.includes(productId);
      },

      clearComparison() {
        setComparison(() => clearComparison());
      },

      resetComparison() {
        setComparison(() => resetComparison());
      },
    }),
    [comparison.selectedProductIds],
  );

  /**
   * Domain entities.
   */
  const productEntities = getProductsByIds(comparison.selectedProductIds);

  const stores = getStores();

  /**
   * Business comparison rows.
   */
  const rowModels = getComparisonRows({
    products: productEntities,
    stores,
  });

  /**
   * Comparison intelligence.
   */
  const analysis = analyzeComparison(rowModels);

  /**
   * Presentation ViewModels.
   */
  const products = toComparisonProductViewModels(productEntities);

  const rows = toComparisonRowViewModels(rowModels);

  return {
    products,

    rows,

    stores,

    summary: analysis.summary,

    recommendation: analysis.recommendation,

    insights: analysis.insights,

    selectedCount: comparison.selectedProductIds.length,

    ...preferences,

    ...actions,
  };
}

export default useComparisonState;
