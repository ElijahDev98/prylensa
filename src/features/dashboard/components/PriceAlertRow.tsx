/**
 * -----------------------------------------------------------------------------
 * File: PriceAlertRow.tsx
 * Feature: Dashboard
 *
 * Purpose:
 * Displays a compact dashboard price alert.
 *
 * Responsibilities:
 * - Display product information.
 * - Display marketplace.
 * - Display current and previous prices.
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
        flex flex-col
        py-5
        border-b border-slate-200
        transition-colors
        gap-5 duration-200 hover:bg-slate-50 first:pt-0 last:border-b-0 last:pb-0
        md:flex-row md:items-start md:justify-between
      "
    >
      {/* ------------------------------------------------------------------ */}
      {/* Product Information                                                */}
      {/* ------------------------------------------------------------------ */}

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
          {alert.product}
        </h3>

        <div
          className="
            inline-flex
            mt-3 px-3 py-1
            text-xs font-medium text-slate-600
            bg-slate-100
            rounded-full
            items-center
          "
        >
          {alert.store}
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Price Summary                                                      */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="
          flex flex-col
          shrink-0 items-start gap-3
          md:items-end
        "
      >
        <div
          className="
            text-left
            md:text-right
          "
        >
          <p
            className="
              text-xs font-medium tracking-wide text-slate-400
              uppercase
            "
          >
            Current Price
          </p>

          <p
            className="
              mt-1
              text-lg font-bold text-slate-900
            "
          >
            {alert.currentPriceLabel}
          </p>
        </div>

        <div
          className="
            mt-4
            text-left
            md:text-right
          "
        >
          <p
            className="
              text-xs font-medium tracking-wide text-slate-400
              uppercase
            "
          >
            Previous Price
          </p>

          <p
            className="
              mt-1
              text-sm text-slate-500
              line-through
            "
          >
            {alert.previousPriceLabel}
          </p>
        </div>

        <span
          className={`
            inline-flex
            mt-4 px-3 py-1.5
            text-xs font-semibold
            rounded-full
            items-center gap-2
            ${isPriceDrop
                ? "bg-emerald-100 text-emerald-700"
                : "bg-red-100 text-red-700"}
          `}
        >
          {isPriceDrop ? (
            <ArrowDownRight size={15} />
          ) : (
            <ArrowUpRight size={15} />
          )}

          {isPriceDrop ? "Price Drop" : "Price Increase"}
        </span>
      </div>
    </article>
  );
}

export default PriceAlertRow;
