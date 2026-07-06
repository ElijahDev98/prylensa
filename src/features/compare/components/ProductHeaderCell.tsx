/**
 * -----------------------------------------------------------------------------
 * File: ProductHeaderCell.tsx
 * Feature: Compare
 *
 * Purpose:
 * Displays the product header inside the comparison matrix.
 *
 * Responsibilities:
 * - Display product information.
 * - Notify parent when the remove button is clicked.
 *
 * Does NOT:
 * - Remove products directly.
 * - Manage state.
 * -----------------------------------------------------------------------------
 */

import { Star, X } from "lucide-react";

import type { ComparisonProduct } from "../types/comparison-product.types";

interface ProductHeaderCellProps {
  product: ComparisonProduct;

  onRemove: (productId: string) => void;
}

function ProductHeaderCell({ product, onRemove }: ProductHeaderCellProps) {
  return (
    <article
      className="
        flex
        items-center
        gap-4
        border-r
        border-slate-200
        px-6
        py-5
        last:border-r-0
      "
    >
      {/* Product Image */}

      <div
        className="
          flex
          h-24
          w-20
          shrink-0
          items-center
          justify-center
          rounded-xl
          border
          border-slate-200
          bg-slate-50
        "
      >
        <div
          className="
            h-16
            w-12
            rounded-lg
            bg-slate-200
          "
        />
      </div>

      {/* Product Info */}

      <div
        className="
          relative
          min-w-0
          flex-1
        "
      >
        <button
          type="button"
          aria-label={`Remove ${product.name}`}
          onClick={() => onRemove(product.id)}
          className="
            absolute
            right-0
            top-0
            rounded-full
            p-1
            text-slate-400
            transition-colors
            hover:bg-slate-100
            hover:text-red-600
          "
        >
          <X size={16} />
        </button>

        <h3
          className="
            pr-8
            text-xl
            font-semibold
            leading-tight
            text-slate-900
          "
        >
          {product.name}
        </h3>

        <p
          className="
            mt-2
            text-sm
            text-slate-500
          "
        >
          {product.variant}
        </p>

        <div
          className="
            mt-4
            flex
            items-center
            gap-2
          "
        >
          <Star
            size={16}
            className="
              fill-amber-400
              text-amber-400
            "
          />

          <span
            className="
              text-sm
              font-medium
              text-slate-900
            "
          >
            {product.rating}
          </span>

          <span
            className="
              text-sm
              text-slate-500
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
