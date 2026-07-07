/**
 * -----------------------------------------------------------------------------
 * File: ProductHeaderRow.tsx
 * Feature: Compare (Presentation)
 *
 * Purpose:
 * Displays the product header row of the comparison matrix.
 *
 * Responsibilities:
 * - Render comparison product header cells.
 * - Forward remove events.
 *
 * Does NOT:
 * - Know Product entities.
 * - Execute business logic.
 * -----------------------------------------------------------------------------
 */

import ComparisonRow from "./ComparisonRow";
import ProductHeaderCell from "./ProductHeaderCell";
import ProductLabelCell from "./ProductLabelCell";

import type { ComparisonProductViewModel } from "@/features/comparison/viewmodels/comparison-product.viewmodel";

interface ProductHeaderRowProps {
  products: ComparisonProductViewModel[];

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
