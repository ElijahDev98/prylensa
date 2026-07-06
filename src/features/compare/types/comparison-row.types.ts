/**
 * -----------------------------------------------------------------------------
 * File: comparison-row.types.ts
 * Feature: Compare
 * -----------------------------------------------------------------------------
 */

export interface ComparisonCell {
  value: string;

  highlight?: boolean;

  color?: "green" | "orange" | "red";
}

export interface ComparisonRow {
  id: string;

  label: string;

  values: ComparisonCell[][];
}
