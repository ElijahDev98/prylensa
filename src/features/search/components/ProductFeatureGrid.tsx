/**
 * -----------------------------------------------------------------------------
 * File: ProductFeatureGrid.tsx
 * Feature: Search
 *
 * Purpose:
 * Displays a compact summary of the product highlights.
 * -----------------------------------------------------------------------------
 */

import type { ProductFeature } from "../data/products";

interface ProductFeatureGridProps {
  features: ProductFeature[];
}

function ProductFeatureGrid({ features }: ProductFeatureGridProps) {
  return (
    <section className="mt-5">
      <p
        className="
          text-sm
          leading-6
          text-slate-600
        "
      >
        {features.map((feature) => feature.label).join(" • ")}
      </p>
    </section>
  );
}

export default ProductFeatureGrid;
