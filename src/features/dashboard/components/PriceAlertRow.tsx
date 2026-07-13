/**
 * -----------------------------------------------------------------------------
 * File: PriceAlertRow.tsx
 * Feature: Dashboard
 *
 * Purpose:
 * Displays a compact dashboard price alert.
 *
 * Responsibilities:
 * - Display product.
 * - Display store.
 * - Display prices.
 * - Display alert direction.
 *
 * Does NOT:
 * - Fetch data.
 * - Manage state.
 * - Format business data.
 * - Know where data originates.
 * -----------------------------------------------------------------------------
 */

import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import type { PriceAlertViewModel } from "../viewmodels/dashboard.viewmodel";

interface PriceAlertRowProps {
  alert: PriceAlertViewModel;
}

function PriceAlertRow({ alert }: PriceAlertRowProps) {
  const isPriceDrop = alert.direction === "down";

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
      {/* Product                                                            */}
      {/* ------------------------------------------------------------------ */}

      <div className="min-w-0">
        <h3
          className="
            truncate
            font-semibold
            text-slate-900
          "
        >
          {alert.product}
        </h3>

        <p
          className="
            mt-1
            text-sm
            text-slate-500
          "
        >
          {alert.store}
        </p>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Prices                                                             */}
      {/* ------------------------------------------------------------------ */}

      <div className="text-right">
        <p
          className="
            whitespace-nowrap
            font-semibold
            text-slate-900
          "
        >
          {alert.currentPriceLabel}
        </p>

        <div
          className="
            mt-2
            flex
            items-center
            justify-end
            gap-2
          "
        >
          <span
            className="
              text-xs
              text-slate-400
              line-through
            "
          >
            {alert.previousPriceLabel}
          </span>

          <span
            className={`
              inline-flex
              items-center
              gap-1
              rounded-full
              px-2
              py-1
              text-xs
              font-semibold
              ${isPriceDrop ? "bg-green-100" : "bg-red-100"}
              ${alert.directionColor}
            `}
          >
            {isPriceDrop ? (
              <ArrowDownRight size={14} />
            ) : (
              <ArrowUpRight size={14} />
            )}
          </span>
        </div>
      </div>
    </article>
  );
}

export default PriceAlertRow;
