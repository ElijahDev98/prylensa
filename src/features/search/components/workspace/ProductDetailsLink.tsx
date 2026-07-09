/**
 * -----------------------------------------------------------------------------
 * File: ProductDetailsLink.tsx
 * Feature: Search
 *
 * Purpose:
 * Opens the detailed product information.
 * -----------------------------------------------------------------------------
 */

import { ChevronRight } from "lucide-react";

function ProductDetailsLink() {
  return (
    <button
      type="button"
      className="
        mt-3
        inline-flex
        items-center
        gap-1
        self-start
        text-sm
        font-medium
        text-blue-600
        transition-colors
        hover:text-blue-700
      "
    >
      Read full specifications
      <ChevronRight size={16} />
    </button>
  );
}

export default ProductDetailsLink;
