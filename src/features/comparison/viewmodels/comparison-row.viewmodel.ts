/**
 * -----------------------------------------------------------------------------
 * File: comparison-row.viewmodel.ts
 * Feature: Comparison Domain
 *
 * Purpose:
 * Presentation model for comparison rows.
 * -----------------------------------------------------------------------------
 */

import type { StockStatus } from "@/features/offer";

export type ComparisonRowType = "price" | "discount" | "availability";

export type ComparisonValueColor = "default" | "success" | "warning" | "danger";

export interface ComparisonStoreValueViewModel {
  storeId: string;

  value: number | StockStatus;

  highlight: boolean;

  color: ComparisonValueColor;
}

export interface ComparisonProductValuesViewModel {
  productId: string;

  values: ComparisonStoreValueViewModel[];
}

export interface ComparisonRowViewModel {
  id: string;

  label: string;

  /**
   * Defines what this comparison row represents.
   */
  type: ComparisonRowType;

  products: ComparisonProductValuesViewModel[];
}
