/**
 * -----------------------------------------------------------------------------
 * File: comparison.service.ts
 * Feature: Comparison Domain
 *
 * Purpose:
 * Owns the Comparison Domain state.
 *
 * Responsibilities:
 * - Create comparison state.
 * - Add products.
 * - Remove products.
 * - Clear comparison.
 * - Reset comparison.
 *
 * NOTE:
 * Product information is no longer owned here.
 * -----------------------------------------------------------------------------
 */

export interface ComparisonState {
  selectedProductIds: string[];
}

export function createComparisonState(): ComparisonState {
  return {
    selectedProductIds: [],
  };
}

export function addProduct(
  state: ComparisonState,
  productId: string,
): ComparisonState {
  if (state.selectedProductIds.includes(productId)) {
    return state;
  }

  return {
    ...state,
    selectedProductIds: [...state.selectedProductIds, productId],
  };
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
    selectedProductIds: [],
  };
}

export function resetComparison(): ComparisonState {
  return createComparisonState();
}
