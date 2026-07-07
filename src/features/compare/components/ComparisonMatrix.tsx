/**
 * -----------------------------------------------------------------------------
 * File: ComparisonMatrix.tsx
 * Feature: Compare
 *
 * Purpose:
 * Displays the comparison matrix.
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
        rounded-2xl
        border
        border-slate-200
        bg-white
      "
    >
      <div className="min-w-275">
        <div className="sticky top-0 z-30 bg-white">
          <ProductHeaderRow
            products={comparison.products}
            onRemoveProduct={comparison.removeProduct}
          />

          <StoreHeaderRow
            products={comparison.products}
            stores={comparison.stores}
          />
        </div>

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
