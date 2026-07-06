/**
 * -----------------------------------------------------------------------------
 * File: comparison.service.ts
 * Feature: Compare
 *
 * Purpose:
 * Encapsulates all comparison business logic.
 *
 * Responsibilities:
 * - Provide comparison data.
 * - Remove products.
 * - Add products.
 * - Reset comparison.
 * - Filter comparison rows.
 *
 * NOTE:
 * This service currently uses mock data.
 * It will later delegate to the API client without affecting the UI.
 * -----------------------------------------------------------------------------
 */

import { COMPARISON_PRODUCTS } from "../data/comparison-products";
import { COMPARISON_ROWS } from "../data/comparison-rows";
import { STORES } from "../data/stores";

import type { ComparisonProduct } from "../types/comparison-product.types";
import type { ComparisonRow } from "../types/comparison-data.types";
import type { Store } from "../types/store.types";

export interface ComparisonState {
  products: ComparisonProduct[];
  stores: Store[];
  rows: ComparisonRow[];
}

export function createComparisonState(): ComparisonState {
  return {
    products: COMPARISON_PRODUCTS,
    stores: STORES,
    rows: COMPARISON_ROWS,
  };
}

export function removeProduct(
  state: ComparisonState,
  productId: string,
): ComparisonState {
  const products = state.products.filter((product) => product.id !== productId);

  const rows = state.rows.map((row) => ({
    ...row,
    products: row.products.filter((product) => product.productId !== productId),
  }));

  return {
    ...state,
    products,
    rows,
  };
}

export function clearComparison(): ComparisonState {
  return {
    products: [],
    stores: STORES,
    rows: [],
  };
}

export function resetComparison(): ComparisonState {
  return createComparisonState();
}
