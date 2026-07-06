/**
 * -----------------------------------------------------------------------------
 * File: comparison-selection.service.ts
 * Feature: Comparison Domain
 *
 * Purpose:
 * Encapsulates comparison selection business rules.
 *
 * Responsibilities:
 * - Add products to the comparison selection.
 * - Remove products from the comparison selection.
 * - Prevent duplicates.
 * - Enforce comparison limits.
 *
 * Does NOT:
 * - Manage React state.
 * - Fetch APIs.
 * -----------------------------------------------------------------------------
 */

export const MAX_COMPARISON_PRODUCTS = 4;

export interface SelectionResult {
  success: boolean;

  selectedProductIds: string[];

  message?: string;
}

export function addProductToSelection(
  selectedProductIds: string[],
  productId: string,
): SelectionResult {
  if (selectedProductIds.includes(productId)) {
    return {
      success: false,
      selectedProductIds,
      message: "Product is already selected for comparison.",
    };
  }

  if (selectedProductIds.length >= MAX_COMPARISON_PRODUCTS) {
    return {
      success: false,
      selectedProductIds,
      message: `You can compare a maximum of ${MAX_COMPARISON_PRODUCTS} products.`,
    };
  }

  return {
    success: true,
    selectedProductIds: [...selectedProductIds, productId],
  };
}

export function removeProductFromSelection(
  selectedProductIds: string[],
  productId: string,
): SelectionResult {
  return {
    success: true,
    selectedProductIds: selectedProductIds.filter((id) => id !== productId),
  };
}

export function clearSelection(): SelectionResult {
  return {
    success: true,
    selectedProductIds: [],
  };
}
