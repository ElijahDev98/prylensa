/**
 * -----------------------------------------------------------------------------
 * File: ProductHeaderCell.tsx
 * Feature: Compare
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
        flex
        px-6 py-5
        border-r border-slate-200
        items-center gap-4 last:border-r-0
      "
    >
      {/* ------------------------------------------------------------------ */}
      {/* Product Image                                                      */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="
          flex
          h-24 w-20
          bg-slate-50
          rounded-xl border border-slate-200
          shrink-0 items-center justify-center
        "
      >
        <div
          className="
            h-16 w-12
            bg-slate-200
            rounded-lg
          "
        />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Product Information                                                */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="
          flex-1
          min-w-0
          relative
        "
      >
        <button
          type="button"
          aria-label={`Remove ${product.name}`}
          className="
            p-1
            text-slate-400
            rounded-full
            transition-colors
            absolute right-0 top-0 hover:bg-slate-100 hover:text-slate-600
          "
        >
          <X size={16} />
        </button>

        <h3
          className="
            pr-8
            text-xl font-semibold leading-tight text-slate-900
          "
        >
          {product.name}
        </h3>

        <p
          className="
            mt-2
            text-sm text-slate-500
          "
        >
          {product.variant}
        </p>

        <div
          className="
            flex
            mt-4
            items-center gap-2
          "
        >
          <Star
            size={16}
            className="
              text-amber-400
              fill-amber-400
            "
          />

          <span
            className="
              text-sm font-medium text-slate-900
            "
          >
            {product.rating}
          </span>

          <span
            className="
              text-sm text-slate-500
            "
          >
            ({product.reviewCount.toLocaleString()} reviews)
          </span>
        </div>
      </div>
    </article>
  );
}

export default ProductHeaderCell;
