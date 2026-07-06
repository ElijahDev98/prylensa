/**
 * -----------------------------------------------------------------------------
 * File: ComparisonMatrix.tsx
 * Feature: Compare
 *
 * Purpose:
 * Shared container for the comparison matrix.
 *
 * Responsibilities:
 * - Provide horizontal scrolling.
 * - Arrange comparison rows.
 * - Receive comparison data from the workspace.
 *
 * Does NOT:
 * - Fetch data.
 * - Manage state.
 * -----------------------------------------------------------------------------
 */

import ProductHeaderRow from "./ProductHeaderRow";
import StoreHeaderRow from "./StoreHeaderRow";

import type { ComparisonProduct } from "../types/comparison-product.types";
import type { Store } from "../types/store.types";

interface ComparisonMatrixProps {
  products: ComparisonProduct[];

  stores: Store[];
}

function ComparisonMatrix({ products, stores }: ComparisonMatrixProps) {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[980px]">
        <ProductHeaderRow products={products} />

        <StoreHeaderRow products={products} stores={stores} />

        {/* ------------------------------------------------------------------ */}
        {/* Comparison Data Rows                                               */}
        {/* ------------------------------------------------------------------ */}

        {/* ComparisonDataRow will be added in Phase 3.6 */}

        {/* ------------------------------------------------------------------ */}
        {/* Comparison Footer                                                  */}
        {/* ------------------------------------------------------------------ */}
      </div>
    </div>
  );
}

export default ComparisonMatrix;
