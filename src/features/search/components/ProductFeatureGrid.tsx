/**
 * -----------------------------------------------------------------------------
 * File: ProductFeatureGrid.tsx
 * Feature: Search
 * -----------------------------------------------------------------------------
 */

import type { ProductSpecification } from "@/features/product/types/product.types";

interface ProductFeatureGridProps {
  specifications: ProductSpecification[];
}

function ProductFeatureGrid({ specifications }: ProductFeatureGridProps) {
  return (
    <section className="mt-5">
      <p
        className="
          text-sm
          leading-6
          text-slate-600
        "
      >
        {specifications.map((specification) => specification.value).join(" • ")}
      </p>
    </section>
  );
}

export default ProductFeatureGrid;
