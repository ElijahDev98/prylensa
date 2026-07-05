/**
 * -----------------------------------------------------------------------------
 * File: TrendingProductRow.tsx
 * Feature: Dashboard
 *
 * Purpose:
 * Displays a compact summary row for a trending product.
 *
 * Responsibilities:
 * - Display the product category icon.
 * - Display product information.
 * - Display current price.
 * - Display price trend.
 *
 * Does NOT:
 * - Fetch data.
 * - Manage state.
 * - Know where data originates.
 * -----------------------------------------------------------------------------
 */

import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import {
  DEFAULT_PRODUCT_CATEGORY_ICON,
  PRODUCT_CATEGORY_ICONS,
} from "@/shared/icons";

import type { TrendingProduct } from "../types/trending-product.types";

interface TrendingProductRowProps {
  product: TrendingProduct;
}

function TrendingProductRow({ product }: TrendingProductRowProps) {
  const CategoryIcon =
    PRODUCT_CATEGORY_ICONS[
      product.category as keyof typeof PRODUCT_CATEGORY_ICONS
    ] ?? DEFAULT_PRODUCT_CATEGORY_ICON;

  const isPriceDrop = product.trend === "down";

  return (
    <article
      className="
        flex
        items-center
        justify-between
        gap-4
        border-b
        border-slate-200
        py-4
        transition-colors
        duration-200
        hover:bg-slate-50
        first:pt-0
        last:border-b-0
        last:pb-0
      "
    >
      {/* ------------------------------------------------------------------ */}
      {/* Product Information                                                */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="
          flex
          min-w-0
          items-center
          gap-4
        "
      >
        {/* Category Icon */}

        <div
          className="
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-2xl
            bg-slate-100
          "
        >
          <CategoryIcon size={22} className="text-slate-600" />
        </div>

        {/* Product Details */}

        <div className="min-w-0">
          <h3
            className="
              truncate
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
            {product.category}
            {" • "}
            {product.store}
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Price & Trend                                                      */}
      {/* ------------------------------------------------------------------ */}

      <div className="text-right">
        <p
          className="
            whitespace-nowrap
            text-base
            font-semibold
            text-slate-900
          "
        >
          {product.currentPrice}
        </p>

        <span
          className={`
            mt-2
            inline-flex
            items-center
            gap-1
            rounded-full
            px-2.5
            py-1
            text-xs
            font-semibold
            ${
              isPriceDrop
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }
          `}
        >
          {isPriceDrop ? (
            <ArrowDownRight size={14} />
          ) : (
            <ArrowUpRight size={14} />
          )}

          {product.priceChange}
        </span>
      </div>
    </article>
  );
}

export default TrendingProductRow;
