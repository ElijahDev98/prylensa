/**
 * -----------------------------------------------------------------------------
 * File: ProductHeaderRow.tsx
 * Feature: Compare
 *
 * Purpose:
 * Displays the comparison product header row.
 *
 * Responsibilities:
 * - Render compared product columns.
 * - Provide the foundation for the comparison matrix.
 *
 * Does NOT:
 * - Fetch data.
 * - Manage state.
 * -----------------------------------------------------------------------------
 */

import { Star, X } from "lucide-react";

import { COMPARISON_PRODUCTS } from "../data/comparison-products";

function ProductHeaderRow() {
  return (
    <section
      className="
        grid
        grid-cols-[180px_repeat(3,minmax(0,1fr))]
        border-b
        border-slate-200
      "
    >
      {/* ------------------------------------------------------------------ */}
      {/* Left Label                                                         */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="
          flex
          items-start
          border-r
          border-slate-200
          p-8
        "
      >
        <span
          className="
            text-lg
            font-semibold
            text-slate-900
          "
        >
          Products
        </span>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Product Columns                                                    */}
      {/* ------------------------------------------------------------------ */}

      {COMPARISON_PRODUCTS.map((product) => (
        <article
          key={product.id}
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
          {/* Remove */}

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

          {/* Thumbnail */}

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

          {/* Information */}

          <div className="min-w-0">
            <h3
              className="
                text-2xl
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
                text-base
                text-slate-500
              "
            >
              {product.variant}
            </p>

            <div
              className="
                mt-6
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
      ))}
    </section>
  );
}

export default ProductHeaderRow;
