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

import type { Store } from "@/features/store";

import type { ComparisonAnalyticsViewModel } from "../viewmodels/comparison-analytics.viewmodel";
import type { ComparisonInsightViewModel } from "../viewmodels/comparison-insight.viewmodel";
import type { ComparisonPreferencesViewModel } from "../viewmodels/comparison-preferences.viewmodel";
import type { ComparisonProductViewModel } from "../viewmodels/comparison-product.viewmodel";
import type { ComparisonRowViewModel } from "../viewmodels/comparison-row.viewmodel";
import type { ComparisonSummaryViewModel } from "../viewmodels/comparison-summary.viewmodel";
import type { RecommendationViewModel } from "../viewmodels/recommendation.viewmodel";
import type { ComparisonSelectedProduct } from "../services/comparison.service";

export interface ComparisonViewModel extends ComparisonPreferencesViewModel {
  /**
   * Products currently being compared.
   */
  products: ComparisonProductViewModel[];

  /**
   * Comparison matrix rows.
   */
  rows: ComparisonRowViewModel[];

  /**
   * Available stores.
   */
  stores: Store[];

  /**
   * Analytics used by charts.
   */
  analytics: ComparisonAnalyticsViewModel;

  /**
   * Summary cards.
   */
  summary: ComparisonSummaryViewModel;

  /**
   * Recommendation panel.
   */
  recommendation: RecommendationViewModel;

  /**
   * AI insights.
   */
  insights: ComparisonInsightViewModel[];

  /**
   * Selected product count.
   */
  selectedCount: number;

  /**
   * Product actions.
   */
  addProduct(productId: string): void;

  addSelectedProduct(product: ComparisonSelectedProduct): void;

  removeProduct(productId: string): void;

  isSelected(productId: string): boolean;

  clearComparison(): void;

  resetComparison(): void;

  /**
   * Export comparison.
   */
  exportComparison(): void;
}
