/**
 * -----------------------------------------------------------------------------
 * File: ComparisonMatrix.tsx
 * Feature: Compare
 *
 * Purpose:
 * Displays the comparison matrix.
 *
 * Responsibilities:
 * - Render comparison headers.
 * - Render comparison rows.
 * - Display the empty state when no products exist.
 *
 * Does NOT:
 * - Fetch data.
 * - Manage state.
 * -----------------------------------------------------------------------------
 */

import ComparisonDataRow from "./ComparisonDataRow";
import EmptyComparisonState from "./EmptyComparisonState";
import ProductHeaderRow from "./ProductHeaderRow";
import StoreHeaderRow from "./StoreHeaderRow";

import useComparisonContext from "@/features/comparison/context/useComparisonContext";

function ComparisonMatrix() {
  const comparison = useComparisonContext();

  if (comparison.products.length === 0) {
    return <EmptyComparisonState />;
  }

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
        {/* ------------------------------------------------------------------ */}
        {/* Product Header                                                     */}
        {/* ------------------------------------------------------------------ */}

        <ProductHeaderRow
          products={comparison.products}
          onRemoveProduct={comparison.removeProduct}
        />

        {/* ------------------------------------------------------------------ */}
        {/* Store Header                                                       */}
        {/* ------------------------------------------------------------------ */}

        <StoreHeaderRow
          products={comparison.products}
          stores={comparison.stores}
        />

        {/* ------------------------------------------------------------------ */}
        {/* Comparison Rows                                                    */}
        {/* ------------------------------------------------------------------ */}

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
