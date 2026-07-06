/**
 * -----------------------------------------------------------------------------
 * File: ComparisonProductColumn.tsx
 * Feature: Compare
 *
 * Purpose:
 * Displays all comparison values for a single product.
 *
 * Responsibilities:
 * - Resolve stores.
 * - Render comparison values.
 *
 * Does NOT:
 * - Fetch data from APIs.
 * - Manage state.
 * -----------------------------------------------------------------------------
 */

import ComparisonValue from "./ComparisonValue";

import { STORES } from "../data/stores";

import type { ComparisonProductValues } from "../types/comparison-data.types";

function ComparisonProductColumn({
  product,
}: {
  product: ComparisonProductValues;
}) {
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
        const store = STORES.find((item) => item.id === value.storeId);

        if (!store) {
          return null;
        }

        return <ComparisonValue key={store.id} store={store} value={value} />;
      })}
    </div>
  );
}

export default ComparisonProductColumn;
