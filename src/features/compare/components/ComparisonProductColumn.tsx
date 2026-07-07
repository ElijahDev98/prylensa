/**
 * -----------------------------------------------------------------------------
 * File: ComparisonProductColumn.tsx
 * Feature: Compare (Presentation)
 *
 * Purpose:
 * Displays all comparison values for a single product.
 *
 * Responsibilities:
 * - Match comparison values with their stores.
 * - Forward the comparison row type.
 * - Render comparison values.
 *
 * Does NOT:
 * - Execute business logic.
 * - Format business values.
 * -----------------------------------------------------------------------------
 */

import ComparisonValue from "./ComparisonValue";

import type {
  ComparisonProductValuesViewModel,
  ComparisonRowType,
} from "@/features/comparison/viewmodels/comparison-row.viewmodel";

import type { Store } from "@/features/store";

interface ComparisonProductColumnProps {
  rowType: ComparisonRowType;

  product: ComparisonProductValuesViewModel;

  stores: Store[];
}

function ComparisonProductColumn({
  rowType,
  product,
  stores,
}: ComparisonProductColumnProps) {
  return (
    <div
      className="
        flex
        flex-col
        gap-2
        border-r
        border-slate-200
        px-6
        py-5
        last:border-r-0
      "
    >
      {product.values.map((value) => {
        const store = stores.find((item) => item.id === value.storeId);

        if (!store) {
          return null;
        }

        return (
          <ComparisonValue
            key={`${product.productId}-${store.id}`}
            rowType={rowType}
            store={store}
            value={value}
          />
        );
      })}
    </div>
  );
}

export default ComparisonProductColumn;
