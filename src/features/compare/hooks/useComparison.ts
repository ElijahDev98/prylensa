/**
 * -----------------------------------------------------------------------------
 * File: useComparison.ts
 * Feature: Compare
 *
 * Purpose:
 * Provides comparison data for the Compare feature.
 *
 * Responsibilities:
 * - Expose products.
 * - Expose stores.
 *
 * Does NOT:
 * - Fetch remote data (yet).
 * -----------------------------------------------------------------------------
 */

import { COMPARISON_PRODUCTS } from "../data/comparison-products";
import { STORES } from "../data/stores";

function useComparison() {
  return {
    products: COMPARISON_PRODUCTS,
    stores: STORES,
  };
}

export default useComparison;
