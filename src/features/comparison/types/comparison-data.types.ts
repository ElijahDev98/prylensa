/**
 * -----------------------------------------------------------------------------
 * File: comparison-data.types.ts
 * Feature: Compare
 *
 * Purpose:
 * Defines the reusable comparison data model.
 *
 * This structure mirrors the backend response and remains independent
 * of the UI implementation.
 * -----------------------------------------------------------------------------
 */

export type ComparisonValueColor = "default" | "success" | "warning" | "danger";

export interface ComparisonStoreValue {
  storeId: string;

  value: string;

  highlight?: boolean;

  color?: ComparisonValueColor;
}

export interface ComparisonProductValues {
  productId: string;

  values: ComparisonStoreValue[];
}

export interface ComparisonRow {
  id: string;

  label: string;

  products: ComparisonProductValues[];
}
