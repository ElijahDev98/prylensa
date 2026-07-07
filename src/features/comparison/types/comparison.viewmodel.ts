/**
 * -----------------------------------------------------------------------------
 * File: comparison.viewmodel.ts
 * Feature: Comparison Domain
 *
 * Purpose:
 * Defines the public API exposed by the Comparison Domain.
 *
 * Responsibilities:
 * - Expose presentation ViewModels.
 * - Expose comparison actions.
 *
 * Does NOT:
 * - Contain implementation.
 * -----------------------------------------------------------------------------
 */

import type { Store } from "@/features/store/types/store.types";

import type { ComparisonProductViewModel } from "../viewmodels/comparison-product.viewmodel";
import type { ComparisonRowViewModel } from "../viewmodels/comparison-row.viewmodel";

export interface ComparisonViewModel {
  /**
   * Products prepared for the Compare presentation.
   */
  products: ComparisonProductViewModel[];

  /**
   * Comparison rows prepared for the Compare presentation.
   */
  rows: ComparisonRowViewModel[];

  /**
   * Available stores.
   */
  stores: Store[];

  /**
   * Number of selected products.
   */
  selectedCount: number;

  /**
   * Add a product to the comparison.
   */
  addProduct(productId: string): void;

  /**
   * Remove a product from the comparison.
   */
  removeProduct(productId: string): void;

  /**
   * Returns true if the product is already selected.
   */
  isSelected(productId: string): boolean;

  /**
   * Remove every product from the comparison.
   */
  clearComparison(): void;

  /**
   * Restore the comparison to its initial state.
   */
  resetComparison(): void;
}
