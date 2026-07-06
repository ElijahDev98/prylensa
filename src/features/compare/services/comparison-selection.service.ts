/**
 * -----------------------------------------------------------------------------
 * File: comparison-selection.service.ts
 * Feature: Compare
 *
 * Purpose:
 * Handles comparison product selection.
 *
 * Responsibilities:
 * - Add products.
 * - Remove products.
 * - Prevent duplicate products.
 * - Enforce comparison limits.
 *
 * Does NOT:
 * - Manage React state.
 * - Fetch APIs.
 * -----------------------------------------------------------------------------
 */

import type { ComparisonProduct } from "../types/comparison-product.types";

export const MAX_COMPARISON_PRODUCTS = 4;

export interface SelectionResult {
  success: boolean;

  products: ComparisonProduct[];

  message?: string;
}

export function addProductToComparison(
  products: ComparisonProduct[],
  product: ComparisonProduct,
): SelectionResult {
  const exists = products.some((item) => item.id === product.id);

  if (exists) {
    return {
      success: false,
      products,
      message: "Product is already selected.",
    };
  }

  if (products.length >= MAX_COMPARISON_PRODUCTS) {
    return {
      success: false,
      products,
      message: `Maximum of ${MAX_COMPARISON_PRODUCTS} products can be compared.`,
    };
  }

  return {
    success: true,
    products: [...products, product],
  };
}

export function removeProductFromComparison(
  products: ComparisonProduct[],
  productId: string,
): SelectionResult {
  return {
    success: true,
    products: products.filter((product) => product.id !== productId),
  };
}

export function clearComparisonSelection(): SelectionResult {
  return {
    success: true,
    products: [],
  };
}
