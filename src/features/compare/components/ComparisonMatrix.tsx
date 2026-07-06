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
 * - Arrange all comparison rows.
 *
 * Does NOT:
 * - Fetch data.
 * - Manage state.
 * -----------------------------------------------------------------------------
 */

import ComparisonDataRow from "./ComparisonDataRow";
import ProductHeaderRow from "./ProductHeaderRow";
import StoreHeaderRow from "./StoreHeaderRow";

import type { ComparisonRow } from "../types/comparison-data.types";
import type { ComparisonProduct } from "../types/comparison-product.types";
import type { Store } from "../types/store.types";

interface ComparisonMatrixProps {
  products: ComparisonProduct[];

  stores: Store[];

  rows: ComparisonRow[];
}

function ComparisonMatrix({ products, stores, rows }: ComparisonMatrixProps) {
  return (
    <div
      className="
        overflow-x-auto
      "
    >
      <div
        className="
          min-w-[980px]
        "
      >
        {/* -------------------------------------------------------------- */}
        {/* Product Header                                                 */}
        {/* -------------------------------------------------------------- */}

        <ProductHeaderRow products={products} />

        {/* -------------------------------------------------------------- */}
        {/* Store Header                                                   */}
        {/* -------------------------------------------------------------- */}

        <StoreHeaderRow products={products} stores={stores} />

        {/* -------------------------------------------------------------- */}
        {/* Comparison Data                                                */}
        {/* -------------------------------------------------------------- */}

        {rows.map((row) => (
          <ComparisonDataRow key={row.id} row={row} stores={stores} />
        ))}

        {/* -------------------------------------------------------------- */}
        {/* Comparison Footer (Phase 3.7)                                  */}
        {/* -------------------------------------------------------------- */}
      </div>
    </div>
  );
}

export default ComparisonMatrix;
