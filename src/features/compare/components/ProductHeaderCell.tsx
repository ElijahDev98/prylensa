/**
 * -----------------------------------------------------------------------------
 * File: ProductHeaderCell.tsx
 * Feature: Compare (Presentation)
 *
 * Purpose:
 * Displays a product header within the comparison matrix.
 *
 * Responsibilities:
 * - Render comparison product information.
 * - Raise remove events.
 *
 * Does NOT:
 * - Know Product entities.
 * - Execute business logic.
 * -----------------------------------------------------------------------------
 */

import { Star, X } from "lucide-react";
import ProductImage from "@/components/ui/ProductImage";

import type { ComparisonProductViewModel } from "@/features/comparison/viewmodels/comparison-product.viewmodel";

interface ProductHeaderCellProps {
  product: ComparisonProductViewModel;

  onRemove: (productId: string) => void;
}

function ProductHeaderCell({ product, onRemove }: ProductHeaderCellProps) {
  const hasRating = product.rating > 0;

  const hasReviews = product.reviewCount > 0;

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
          overflow-hidden
          rounded-xl
          border
          border-slate-200
          bg-slate-50
        "
      >
        <ProductImage
          src={product.imageUrl}
          alt={product.imageAlt}
          category={product.category}
        />
      </div>

      {/* Product Information */}

      <div
        className="
          relative
          min-w-0
          flex-1
        "
      >
        <button
          type="button"
          aria-label={`Remove ${product.title}`}
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
          {product.title}
        </h3>

        <p
          className="
            mt-2
            text-sm
            text-slate-500
          "
        >
          {product.subtitle}
        </p>

        {(hasRating || hasReviews) && (
          <div
            className="
              mt-4
              flex
              items-center
              gap-2
            "
          >
            {hasRating && (
              <>
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
              </>
            )}

            {hasReviews && (
              <span
                className="
                  text-sm
                  text-slate-500
                "
              >
                ({product.reviewCount.toLocaleString()} reviews)
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default ProductHeaderCell;
