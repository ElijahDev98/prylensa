/**
 * -----------------------------------------------------------------------------
 * File: ComparisonDataRow.tsx
 * Feature: Compare (Presentation)
 *
 * Purpose:
 * Displays a reusable comparison row (Price, Discount, Availability, etc.).
 *
 * Responsibilities:
 * - Render the row label.
 * - Forward the row type.
 * - Render one comparison column per product.
 *
 * Does NOT:
 * - Execute business logic.
 * - Format business values.
 * -----------------------------------------------------------------------------
 */

import ComparisonProductColumn from "./ComparisonProductColumn";
import ComparisonRow from "./ComparisonRow";
import ProductLabelCell from "./ProductLabelCell";

import type { ComparisonRowViewModel } from "@/features/comparison/viewmodels/comparison-row.viewmodel";
import type { Store } from "@/features/store";

interface ComparisonDataRowProps {
  row: ComparisonRowViewModel;

  stores: Store[];
}

function ComparisonDataRow({ row, stores }: ComparisonDataRowProps) {
  return (
    <ComparisonRow productCount={row.products.length}>
      <ProductLabelCell label={row.label} />

      {row.products.map((product) => (
        <ComparisonProductColumn
          key={product.productId}
          rowType={row.type}
          product={product}
          stores={stores}
        />
      ))}
    </ComparisonRow>
  );
}

export default ComparisonDataRow;
