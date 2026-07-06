/**
 * -----------------------------------------------------------------------------
 * File: ComparisonProductColumn.tsx
 * Feature: Compare
 *
 * Purpose:
 * Displays all comparison values for a single product.
 *
 * Responsibilities:
 * - Match comparison values with their stores.
 * - Render comparison values.
 *
 * Does NOT:
 * - Import mock data.
 * - Fetch data.
 * - Manage state.
 * -----------------------------------------------------------------------------
 */

import ComparisonValue from "./ComparisonValue";

import type { ComparisonProductValues } from "../types/comparison-data.types";

import type { Store } from "../types/store.types";

interface ComparisonProductColumnProps {
  product: ComparisonProductValues;

  stores: Store[];
}

function ComparisonProductColumn({
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
            store={store}
            value={value}
          />
        );
      })}
    </div>
  );
}

export default ComparisonProductColumn;
