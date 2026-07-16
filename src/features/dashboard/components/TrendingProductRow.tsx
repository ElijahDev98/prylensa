/**
 * -----------------------------------------------------------------------------
 * File: TrendingProductRow.tsx
 * Feature: Dashboard
 *
 * Purpose:
 * Displays a compact summary row for a trending product.
 *
 * Responsibilities:
 * - Display product thumbnail.
 * - Display fallback category icon.
 * - Display product information.
 * - Display marketplace chips.
 * - Display best price information.
 * - Display trend visualization.
 *
 * Does NOT:
 * - Fetch data.
 * - Manage state.
 * - Format business data.
 * -----------------------------------------------------------------------------
 */

import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
} from "lucide-react";

import { TrendSparkline } from "@/components/ui/charts";

import {
  DEFAULT_PRODUCT_CATEGORY_ICON,
  PRODUCT_CATEGORY_ICONS,
} from "@/shared/icons";

import type { TrendingProductViewModel } from "../viewmodels/dashboard.viewmodel";

interface TrendingProductRowProps {
  product: TrendingProductViewModel;

  /**
   * Maximum number of marketplace chips to display.
   *
   * The store ordering is determined by the service/backend.
   * This component only controls how many are visible.
   */
  maxVisibleStores?: number;
}

function TrendingProductRow({
  product,
  maxVisibleStores = 3,
}: TrendingProductRowProps) {
  const CategoryIcon =
    PRODUCT_CATEGORY_ICONS[
      product.category as keyof typeof PRODUCT_CATEGORY_ICONS
    ] ?? DEFAULT_PRODUCT_CATEGORY_ICON;

  const isPriceDrop = product.trend === "down";

  const visibleStores = product.stores.slice(0, maxVisibleStores);

  const remainingStores = Math.max(
    product.stores.length - visibleStores.length,
    0,
  );

  return (
    <article
      className="
        flex flex-col
        py-5
        border-b border-slate-200
        transition-all
        gap-6 duration-200 hover:bg-slate-50 first:pt-0 last:border-b-0 last:pb-0
        md:flex-row md:items-start md:justify-between
      "
    >
      {/* ------------------------------------------------------------------ */}
      {/* Product Information                                                */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="
          flex flex-1
          min-w-0
          gap-4
        "
      >
        {/* Thumbnail */}

        <div
          className="
            flex overflow-hidden
            h-16 w-16
            bg-slate-100
            rounded-2xl
            shrink-0 items-center justify-center
          "
        >
          {product.thumbnail ? (
            <img
              src={product.thumbnail}
              alt={product.name}
              loading="lazy"
              className="
                object-cover
                h-full w-full
              "
            />
          ) : (
            <CategoryIcon
              size={28}
              className="
                text-slate-500
              "
            />
          )}
        </div>

        {/* Details */}

        <div
          className="
            flex-1
            min-w-0
          "
        >
          <h3
            className="
              text-base font-semibold text-slate-900
              truncate
            "
          >
            {product.name}
          </h3>

          <p
            className="
              mt-1
              text-sm text-slate-500
            "
          >
            {product.category}
          </p>

          {/* -------------------------------------------------------------- */}
          {/* Stores                                                         */}
          {/* -------------------------------------------------------------- */}

          <div
            className="
              flex flex-wrap
              mt-3
              gap-2
            "
          >
            {visibleStores.map((store) => (
              <span
                key={store}
                className="
                  px-2.5 py-1
                  text-xs font-medium text-slate-600
                  bg-slate-100
                  rounded-full
                "
              >
                {store}
              </span>
            ))}

            {remainingStores > 0 && (
              <span
                className="
                  px-2.5 py-1
                  text-xs font-semibold text-blue-700
                  bg-blue-50
                  rounded-full
                "
              >
                +{remainingStores}
              </span>
            )}
          </div>

          {/* -------------------------------------------------------------- */}
          {/* Best Price                                                     */}
          {/* -------------------------------------------------------------- */}

          {product.isBestPrice && (
            <div
              className="
                inline-flex
                mt-3 px-3 py-1
                text-xs font-semibold text-emerald-700
                bg-emerald-50
                rounded-full
                items-center gap-2
              "
            >
              <BadgeCheck size={14} />
              Best Price
              <span
                className="
                  font-medium
                "
              >
                • {product.bestPriceStoreLabel}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Market Summary                                                     */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="
          flex flex-col
          shrink-0 items-start gap-3
          lg:items-end
        "
      >
        <p
          className="
            text-lg font-bold text-slate-900
          "
        >
          {product.currentPriceLabel}
        </p>

        <span
          className={`
            inline-flex
            mt-2 px-2.5 py-1
            text-xs font-semibold
            rounded-full
            items-center gap-1
            ${
              isPriceDrop
                ? "bg-emerald-100 text-emerald-700"
                : "bg-red-100 text-red-700"
            }
          `}
        >
          {isPriceDrop ? (
            <ArrowDownRight size={14} />
          ) : (
            <ArrowUpRight size={14} />
          )}

          {product.priceChangeLabel}
        </span>

        <div
          className="
            mt-4
          "
        >
          <TrendSparkline
            data={product.trendHistory}
            color={isPriceDrop ? "success" : "danger"}
            width={140}
          />
        </div>

        <button
          type="button"
          className="
            inline-flex
            mt-4
            text-sm font-medium text-blue-600
            transition-all
            items-center gap-2 duration-200 hover:gap-3 hover:text-blue-700
          "
        >
          View Details
          <ArrowRight size={16} />
        </button>
      </div>
    </article>
  );
}

export default TrendingProductRow;
