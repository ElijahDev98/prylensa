/**
 * -----------------------------------------------------------------------------
 * File: ComparisonProductCard.tsx
 * Feature: Compare
 *
 * Purpose:
 * Displays a product selected for comparison.
 *
 * Responsibilities:
 * - Display product image placeholder.
 * - Display product information.
 * - Display product rating.
 * - Display remove action.
 *
 * Does NOT:
 * - Fetch data.
 * - Manage state.
 * -----------------------------------------------------------------------------
 */

import { Star, Trash2 } from "lucide-react";

import Card from "@/components/ui/Card";

import type { ComparisonProduct } from "../types/comparison-product.types";

interface ComparisonProductCardProps {
  product: ComparisonProduct;
}

function ComparisonProductCard({ product }: ComparisonProductCardProps) {
  return (
    <Card
      className="
        h-auto
        p-6
      "
    >
      <div
        className="
          flex
          flex-col
          items-center
          text-center
        "
      >
        {/* Product Image */}

        <div
          className="
            mb-5
            flex
            h-24
            w-24
            items-center
            justify-center
            rounded-2xl
            bg-slate-100
            text-4xl
          "
        >
          📱
        </div>

        {/* Product Information */}

        <h3
          className="
            text-lg
            font-semibold
            text-slate-900
          "
        >
          {product.name}
        </h3>

        <p
          className="
            mt-1
            text-sm
            text-slate-500
          "
        >
          {product.brand}
        </p>

        <p
          className="
            mt-1
            text-sm
            text-slate-500
          "
        >
          {product.storage}
        </p>

        {/* Rating */}

        <div
          className="
            mt-5
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
              text-slate-700
            "
          >
            {product.rating}
          </span>
        </div>

        {/* Remove Button */}

        <button
          type="button"
          className="
            mt-6
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            border-red-200
            px-4
            py-2
            text-sm
            font-medium
            text-red-600
            transition-colors
            hover:bg-red-50
          "
        >
          <Trash2 size={16} />
          Remove
        </button>
      </div>
    </Card>
  );
}

export default ComparisonProductCard;
