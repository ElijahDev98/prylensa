/**
 * -----------------------------------------------------------------------------
 * File: ComparisonDataRow.tsx
 * Feature: Compare
 *
 * Purpose:
 * Displays a reusable comparison row (Price, Rating, Availability, etc.).
 *
 * Responsibilities:
 * - Render the row label.
 * - Render one comparison column per product.
 *
 * Does NOT:
 * - Fetch data.
 * - Manage state.
 * - Execute business logic.
 * -----------------------------------------------------------------------------
 */

import ComparisonProductColumn from "./ComparisonProductColumn";
import ComparisonRow from "./ComparisonRow";
import ProductLabelCell from "./ProductLabelCell";

import type { ComparisonRow as ComparisonRowModel } from "../types/comparison-data.types";
import type { Store } from "../types/store.types";

interface ComparisonDataRowProps {
  row: ComparisonRowModel;

  stores: Store[];
}

function ComparisonDataRow({ row, stores }: ComparisonDataRowProps) {
  return (
    <ComparisonRow productCount={row.products.length}>
      <ProductLabelCell label={row.label} />

      {row.products.map((product) => (
        <ComparisonProductColumn
          key={product.productId}
          product={product}
          stores={stores}
        />
      ))}
    </ComparisonRow>
  );
}

export default ComparisonDataRow;
