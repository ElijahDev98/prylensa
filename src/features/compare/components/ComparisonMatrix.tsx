/**
 * -----------------------------------------------------------------------------
 * File: ComparisonMatrix.tsx
 * Feature: Compare
 *
 * Purpose:
 * Displays the complete comparison matrix.
 *
 * Responsibilities:
 * - Render comparison headers.
 * - Render comparison rows.
 * - Forward comparison actions.
 *
 * Does NOT:
 * - Fetch data.
 * - Manage state.
 * -----------------------------------------------------------------------------
 */

import ComparisonDataRow from "./ComparisonDataRow";
import ProductHeaderRow from "./ProductHeaderRow";
import StoreHeaderRow from "./StoreHeaderRow";

import type { ComparisonViewModel } from "../types/comparison.viewmodel";

interface ComparisonMatrixProps {
  comparison: ComparisonViewModel;
}

function ComparisonMatrix({ comparison }: ComparisonMatrixProps) {
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

        <ProductHeaderRow
          products={comparison.products}
          onRemoveProduct={comparison.removeProduct}
        />

        {/* -------------------------------------------------------------- */}
        {/* Store Header                                                   */}
        {/* -------------------------------------------------------------- */}

        <StoreHeaderRow
          products={comparison.products}
          stores={comparison.stores}
        />

        {/* -------------------------------------------------------------- */}
        {/* Comparison Rows                                                */}
        {/* -------------------------------------------------------------- */}

        {comparison.rows.map((row) => (
          <ComparisonDataRow
            key={row.id}
            row={row}
            stores={comparison.stores}
          />
        ))}
      </div>
    </div>
  );
}

export default ComparisonMatrix;
