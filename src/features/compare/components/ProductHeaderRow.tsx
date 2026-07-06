/**
 * -----------------------------------------------------------------------------
 * File: ProductHeaderRow.tsx
 * Feature: Compare
 *
 * Purpose:
 * Displays the compared products header row.
 *
 * Responsibilities:
 * - Render the product label column.
 * - Render product header cells.
 *
 * Does NOT:
 * - Define grid layout.
 * - Fetch data.
 * - Manage state.
 * -----------------------------------------------------------------------------
 */

import ComparisonRow from "./ComparisonRow";
import ProductHeaderCell from "./ProductHeaderCell";
import ProductLabelCell from "./ProductLabelCell";

import type { ComparisonProduct } from "../types/comparison-product.types";

interface ProductHeaderRowProps {
  products: ComparisonProduct[];
}

function ProductHeaderRow({ products }: ProductHeaderRowProps) {
  return (
    <ComparisonRow productCount={products.length}>
      <ProductLabelCell label="Products" />

      {products.map((product) => (
        <ProductHeaderCell key={product.id} product={product} />
      ))}
    </ComparisonRow>
  );
}

export default ProductHeaderRow;
