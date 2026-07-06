/**
 * -----------------------------------------------------------------------------
 * File: ComparisonMatrix.tsx
 * Feature: Compare
 *
 * Purpose:
 * Displays the comparison matrix.
 *
 * Responsibilities:
 * - Render product headers.
 * - Render store headers.
 * - Render comparison rows.
 *
 * Does NOT:
 * - Fetch data.
 * - Manage state.
 * -----------------------------------------------------------------------------
 */

import ComparisonDataRow from "./ComparisonDataRow";
import ProductHeaderRow from "./ProductHeaderRow";
import StoreHeaderRow from "./StoreHeaderRow";

import useComparisonContext from "../context/useComparisonContext";

function ComparisonMatrix() {
  const comparison = useComparisonContext();

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[980px]">
        <ProductHeaderRow
          products={comparison.products}
          onRemoveProduct={comparison.removeProduct}
        />

        <StoreHeaderRow
          products={comparison.products}
          stores={comparison.stores}
        />

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
