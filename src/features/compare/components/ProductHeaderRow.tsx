/**
 * -----------------------------------------------------------------------------
 * File: ProductHeaderRow.tsx
 * Feature: Compare
 *
 * Purpose:
 * Displays the product header row for the comparison matrix.
 *
 * Responsibilities:
 * - Arrange the product label cell.
 * - Arrange compared product header cells.
 * - Provide the comparison grid layout.
 *
 * Does NOT:
 * - Fetch data.
 * - Manage state.
 * - Execute business logic.
 * -----------------------------------------------------------------------------
 */

import ProductHeaderCell from "./ProductHeaderCell";
import ProductLabelCell from "./ProductLabelCell";

import { COMPARISON_PRODUCTS } from "../data/comparison-products";

function ProductHeaderRow() {
  return (
    <section
      className="border-b border-slate-200"
      style={{
        display: "grid",
        gridTemplateColumns: `180px repeat(${COMPARISON_PRODUCTS.length}, minmax(340px, 1fr))`,
      }}
    >
      <ProductLabelCell label="Products" />

      {COMPARISON_PRODUCTS.map((product) => (
        <ProductHeaderCell key={product.id} product={product} />
      ))}
    </section>
  );
}

export default ProductHeaderRow;
