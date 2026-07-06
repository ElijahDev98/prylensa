/**
 * -----------------------------------------------------------------------------
 * File: comparison.service.ts
 * Feature: Comparison Domain
 *
 * Purpose:
 * Encapsulates all comparison business logic.
 *
 * Responsibilities:
 * - Create comparison state.
 * - Filter selected products.
 * - Remove products.
 * - Reset comparison.
 *
 * NOTE:
 * This service currently uses mock data.
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

  selectedProductIds: string[];

  stores: Store[];

  rows: ComparisonRow[];
}

export function createComparisonState(): ComparisonState {
  return {
    products: COMPARISON_PRODUCTS,

    selectedProductIds: COMPARISON_PRODUCTS.map((product) => product.id),

    stores: STORES,

    rows: COMPARISON_ROWS,
  };
}

export function getSelectedProducts(
  state: ComparisonState,
): ComparisonProduct[] {
  return state.products.filter((product) =>
    state.selectedProductIds.includes(product.id),
  );
}

export function getSelectedRows(state: ComparisonState): ComparisonRow[] {
  return state.rows.map((row) => ({
    ...row,
    products: row.products.filter((product) =>
      state.selectedProductIds.includes(product.productId),
    ),
  }));
}

export function removeProduct(
  state: ComparisonState,
  productId: string,
): ComparisonState {
  return {
    ...state,

    selectedProductIds: state.selectedProductIds.filter(
      (id) => id !== productId,
    ),
  };
}

export function clearComparison(): ComparisonState {
  return {
    products: COMPARISON_PRODUCTS,

    selectedProductIds: [],

    stores: STORES,

    rows: COMPARISON_ROWS,
  };
}

export function resetComparison(): ComparisonState {
  return createComparisonState();
}
