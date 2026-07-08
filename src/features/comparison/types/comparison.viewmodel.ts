/**
 * -----------------------------------------------------------------------------
 * File: comparison.viewmodel.ts
 * Feature: Comparison Domain
 *
 * Purpose:
 * Public ViewModel exposed by the Comparison Domain.
 *
 * Responsibilities:
 * - Expose presentation data.
 * - Expose comparison actions.
 * - Hide business models.
 * -----------------------------------------------------------------------------
 */

import type { StoreViewModel } from "@/features/store/viewmodels/store.viewmodel";

import type { ComparisonProductViewModel } from "../viewmodels/comparison-product.viewmodel";
import type { ComparisonRowViewModel } from "../viewmodels/comparison-row.viewmodel";
import type { RecommendationViewModel } from "../viewmodels/recommendation.viewmodel";
import type { ComparisonInsightViewModel } from "../viewmodels/comparison-insight.viewmodel";
import type { ComparisonSummaryViewModel } from "../viewmodels/comparison-summary.viewmodel";
import type { ComparisonPreferencesViewModel } from "../viewmodels/comparison-preferences.viewmodel";

export interface ComparisonViewModel extends ComparisonPreferencesViewModel {
  /**
   * Products currently being compared.
   */
  products: ComparisonProductViewModel[];

  /**
   * Rows displayed by the comparison matrix.
   */
  rows: ComparisonRowViewModel[];

  /**
   * All available stores.
   */
  stores: StoreViewModel[];

  /**
   * Number of selected products.
   */
  selectedCount: number;

  /**
   * Comparison summary.
   */
  summary: ComparisonSummaryViewModel;

  /**
   * Recommendation.
   *
   * Always available.
   */
  recommendation: RecommendationViewModel;

  /**
   * Comparison insights.
   */
  insights: ComparisonInsightViewModel[];

  /**
   * Product actions.
   */
  addProduct(productId: string): void;

  removeProduct(productId: string): void;

  isSelected(productId: string): boolean;

  clearComparison(): void;

  resetComparison(): void;

  /**
   * Export actions.
   */
  exportComparison(): void;
}
