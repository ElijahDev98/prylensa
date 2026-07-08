/**
 * -----------------------------------------------------------------------------
 * File: comparison-row.constants.ts
 * Feature: Comparison Domain
 *
 * Purpose:
 * Defines canonical Comparison Row identifiers.
 *
 * Responsibilities:
 * - Provide a single source of truth for comparison row IDs.
 *
 * Does NOT:
 * - Contain business logic.
 * - Perform calculations.
 * -----------------------------------------------------------------------------
 */

export const COMPARISON_ROW_ID = {
  PRICE: "price",

  DISCOUNT: "discount",

  AVAILABILITY: "availability",
} as const;

export type ComparisonRowId =
  (typeof COMPARISON_ROW_ID)[keyof typeof COMPARISON_ROW_ID];
