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
 * - Order products.
 * - Apply comparison preferences.
 * - Build Comparison business models.
 * - Execute Comparison Intelligence.
 * - Execute Comparison Analytics.
 * - Export comparison data.
 * - Map business models into presentation ViewModels.
 * -----------------------------------------------------------------------------
 */

import { useCallback, useMemo, useState } from "react";

import {
  addProduct,
  clearComparison,
  createComparisonState,
  removeProduct,
  resetComparison,
} from "../services/comparison.service";

import { analyzeComparison } from "../services/comparison-analysis";

import { buildComparisonAnalytics } from "../services/comparison-analytics.service";

import { exportComparison } from "../services/comparison-export.service";

import { orderProducts } from "../services/comparison-product-order.service";

import { getComparisonRows } from "../services/comparison-row.service";

import { toComparisonProductViewModels } from "../mappers/comparison.mapper";
import { toComparisonRecommendationViewModel } from "../mappers/comparison-recommendation.mapper";
import { toComparisonRowViewModels } from "../mappers/comparison-row.mapper";
import { toComparisonSummaryViewModel } from "../mappers/comparison-summary.mapper";

import useComparisonPreferences from "./useComparisonPreferences";

import { EMPTY_ANALYTICS } from "../viewmodels/comparison-analytics.viewmodel";
import { EMPTY_INSIGHTS } from "../viewmodels/comparison-insight.viewmodel";
import { EMPTY_RECOMMENDATION } from "../viewmodels/recommendation.viewmodel";
import { EMPTY_SUMMARY } from "../viewmodels/comparison-summary.viewmodel";

import { getProductsByIds } from "@/features/product";
import { getStores } from "@/features/store/services/store.service";

import type { ComparisonViewModel } from "../viewmodels/comparison.viewmodel";

function useComparisonState(): ComparisonViewModel {
  /**
   * ---------------------------------------------------------------------------
   * Comparison State
   * ---------------------------------------------------------------------------
   */

  const [comparison, setComparison] = useState(createComparisonState);

  /**
   * ---------------------------------------------------------------------------
   * Comparison Preferences
   * ---------------------------------------------------------------------------
   */

  const preferences = useComparisonPreferences();

  /**
   * ---------------------------------------------------------------------------
   * Comparison Actions
   * ---------------------------------------------------------------------------
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
   * ---------------------------------------------------------------------------
   * Domain Entities
   * ---------------------------------------------------------------------------
   */

  const stores = getStores();

  const productEntities = getProductsByIds(comparison.selectedProductIds);

  /**
   * ---------------------------------------------------------------------------
   * Ordered Products
   * ---------------------------------------------------------------------------
   */

  const orderedProducts = orderProducts(productEntities, preferences.sortBy);

  /**
   * ---------------------------------------------------------------------------
   * Visible Stores
   * ---------------------------------------------------------------------------
   */

  const visibleStores =
    preferences.selectedStoreIds.length === 0
      ? stores
      : stores.filter((store) =>
          preferences.selectedStoreIds.includes(store.id),
        );

  /**
   * ---------------------------------------------------------------------------
   * Business Models
   * ---------------------------------------------------------------------------
   */

  const rowModels = getComparisonRows({
    products: orderedProducts,
    stores: visibleStores,
  });

  /**
   * ---------------------------------------------------------------------------
   * Comparison Intelligence
   * ---------------------------------------------------------------------------
   */

  const analysis = analyzeComparison(rowModels);

  /**
   * ---------------------------------------------------------------------------
   * Comparison Analytics
   * ---------------------------------------------------------------------------
   */

  const analytics = buildComparisonAnalytics(orderedProducts, rowModels);

  /**
   * ---------------------------------------------------------------------------
   * Stable ViewModels
   * ---------------------------------------------------------------------------
   */

  const stableAnalytics = analytics ?? EMPTY_ANALYTICS;

  const summary =
    analysis.summary == null
      ? EMPTY_SUMMARY
      : toComparisonSummaryViewModel(analysis.summary, orderedProducts.length);

  const recommendation =
    analysis.recommendation == null
      ? EMPTY_RECOMMENDATION
      : toComparisonRecommendationViewModel(analysis.recommendation);

  const insights = analysis.insights ?? EMPTY_INSIGHTS;

  /**
   * ---------------------------------------------------------------------------
   * Presentation ViewModels
   * ---------------------------------------------------------------------------
   */

  const products = toComparisonProductViewModels(orderedProducts);

  const rows = toComparisonRowViewModels(rowModels);

  /**
   * ---------------------------------------------------------------------------
   * Utility Actions
   * ---------------------------------------------------------------------------
   */

  const handleExportComparison = useCallback(() => {
    exportComparison({
      products,
      rows,
      stores: visibleStores,
    });
  }, [products, rows, visibleStores]);

  /**
   * ---------------------------------------------------------------------------
   * Public ViewModel
   * ---------------------------------------------------------------------------
   */

  return {
    products,

    rows,

    stores,

    analytics: stableAnalytics,

    summary,

    recommendation,

    insights,

    selectedCount: comparison.selectedProductIds.length,

    exportComparison: handleExportComparison,

    ...preferences,

    ...actions,
  };
}

export default useComparisonState;
