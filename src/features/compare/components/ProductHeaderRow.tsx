/**
 * -----------------------------------------------------------------------------
 * File: ProductHeaderRow.tsx
 * Feature: Compare
 *
 * Purpose:
 * Displays the compared products header row.
 *
 * Responsibilities:
 * - Render the product label.
 * - Render product header cells.
 * - Forward remove actions.
 *
 * Does NOT:
 * - Remove products.
 * - Manage state.
 * -----------------------------------------------------------------------------
 */

import ComparisonRow from "./ComparisonRow";
import ProductHeaderCell from "./ProductHeaderCell";
import ProductLabelCell from "./ProductLabelCell";

import type { ComparisonProduct } from "../types/comparison-product.types";

interface ProductHeaderRowProps {
  products: ComparisonProduct[];

  onRemoveProduct: (productId: string) => void;
}

function ProductHeaderRow({
  products,
  onRemoveProduct,
}: ProductHeaderRowProps) {
  return (
    <ComparisonRow productCount={products.length}>
      <ProductLabelCell label="Products" />

      {products.map((product) => (
        <ProductHeaderCell
          key={product.id}
          product={product}
          onRemove={onRemoveProduct}
        />
      ))}
    </ComparisonRow>
  );
}

export default ProductHeaderRow;
