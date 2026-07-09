/**
 * -----------------------------------------------------------------------------
 * File: ProductFeatureGrid.tsx
 * Feature: Search
 *
 * Purpose:
 * Displays a concise summary of the selected product specifications.
 *
 * Responsibilities:
 * - Render product specifications.
 *
 * Architecture:
 * UI
 *   ↓
 * ProductSpecificationViewModel
 *
 * Notes:
 * - Pure presentation component.
 * - Must never depend on Product domain models.
 * - Performs no business logic.
 * -----------------------------------------------------------------------------
 */

import type { ProductSpecificationViewModel } from "../viewmodels/search.viewmodel";

interface ProductFeatureGridProps {
  specifications: ProductSpecificationViewModel[];
}

function ProductFeatureGrid({ specifications }: ProductFeatureGridProps) {
  if (specifications.length === 0) {
    return null;
  }

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
