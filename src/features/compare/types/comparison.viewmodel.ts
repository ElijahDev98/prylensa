/**
 * -----------------------------------------------------------------------------
 * File: comparison.viewmodel.ts
 * Feature: Compare
 *
 * Purpose:
 * Defines the public ViewModel consumed by the Compare UI.
 *
 * Responsibilities:
 * - Aggregate comparison data.
 * - Aggregate comparison actions.
 *
 * NOTE:
 * This is the only object the Compare UI should consume.
 * -----------------------------------------------------------------------------
 */

import type { ComparisonRow } from "./comparison-data.types";
import type { ComparisonProduct } from "./comparison-product.types";
import type { Store } from "./store.types";

export interface ComparisonViewModel {
  /* -------------------------------------------------------------------------- */
  /* Data                                                                       */
  /* -------------------------------------------------------------------------- */

  products: ComparisonProduct[];

  stores: Store[];

  rows: ComparisonRow[];

  /* -------------------------------------------------------------------------- */
  /* Actions                                                                    */
  /* -------------------------------------------------------------------------- */

  removeProduct(productId: string): void;

  clearComparison(): void;

  resetComparison(): void;
}
