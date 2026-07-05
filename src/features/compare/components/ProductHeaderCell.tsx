/**
 * -----------------------------------------------------------------------------
 * File: ProductHeaderCell.tsx
 * Feature: Compare
 *
 * Purpose:
 * Displays a single compared product inside the comparison matrix.
 *
 * Responsibilities:
 * - Render product thumbnail.
 * - Render product details.
 * - Render rating.
 * - Render remove action.
 *
 * Does NOT:
 * - Fetch data.
 * - Manage state.
 * -----------------------------------------------------------------------------
 */

import { Star, X } from "lucide-react";

import type { ComparisonProduct } from "../types/comparison-product.types";

interface ProductHeaderCellProps {
  product: ComparisonProduct;
}

function ProductHeaderCell({ product }: ProductHeaderCellProps) {
  return (
    <article
      className="
        relative
        flex
        items-center
        gap-6
        border-r
        border-slate-200
        p-8
        last:border-r-0
      "
    >
      <button
        type="button"
        title="Remove product"
        aria-label="Remove product"
        className="
          absolute
          right-5
          top-5
          rounded-full
          p-1
          text-slate-400
          transition-colors
          hover:bg-slate-100
        "
      >
        <X size={16} />
      </button>

      <div
        className="
          flex
          h-28
          w-24
          shrink-0
          items-center
          justify-center
          rounded-2xl
          bg-slate-100
          text-4xl
        "
      >
        📱
      </div>

      <div className="min-w-0">
        <h3
          className="
            text-xl
            font-semibold
            text-slate-900
          "
        >
          {product.name}
        </h3>

        <p
          className="
            mt-2
            text-base
            text-slate-500
          "
        >
          {product.variant}
        </p>

        <div
          className="
            mt-5
            flex
            items-center
            gap-2
          "
        >
          <Star
            size={18}
            className="
              fill-amber-400
              text-amber-400
            "
          />

          <span className="font-medium">{product.rating}</span>

          <span className="text-slate-500">
            ({product.reviewCount.toLocaleString()} reviews)
          </span>
        </div>
      </div>
    </article>
  );
}

export default ProductHeaderCell;
