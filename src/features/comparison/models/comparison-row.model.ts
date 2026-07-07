/**
 * -----------------------------------------------------------------------------
 * File: comparison-row.model.ts
 * Feature: Comparison Domain
 *
 * Purpose:
 * Business model representing a comparison attribute.
 *
 * Responsibilities:
 * - Represent comparison data independent of presentation.
 * - Carry strongly typed business values.
 *
 * Does NOT:
 * - Format values.
 * - Apply UI metadata.
 * -----------------------------------------------------------------------------
 */

import type { StockStatus } from "@/features/offer";

export interface ComparisonStoreValueModel {
  /**
   * Store identifier.
   */
  storeId: string;

  /**
   * Business value.
   *
   * Price      -> number
   * Discount   -> number
   * Availability -> StockStatus
   */
  value: number | StockStatus;
}

export interface ComparisonProductValuesModel {
  /**
   * Product identifier.
   */
  productId: string;

  /**
   * Values for each store.
   */
  values: ComparisonStoreValueModel[];
}

export interface ComparisonRowModel {
  /**
   * Row identifier.
   *
   * Example:
   * - price
   * - discount
   * - availability
   */
  id: string;

  /**
   * Display label.
   */
  label: string;

  /**
   * Product comparison values.
   */
  products: ComparisonProductValuesModel[];
}
