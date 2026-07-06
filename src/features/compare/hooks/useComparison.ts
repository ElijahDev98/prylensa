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
 * - Expose comparison rows.
 *
 * Does NOT:
 * - Fetch remote data (yet).
 * -----------------------------------------------------------------------------
 */

import { COMPARISON_PRODUCTS } from "../data/comparison-products";
import { COMPARISON_ROWS } from "../data/comparison-rows";
import { STORES } from "../data/stores";

function useComparison() {
  return {
    products: COMPARISON_PRODUCTS,

    stores: STORES,

    rows: COMPARISON_ROWS,
  };
}

export default useComparison;
