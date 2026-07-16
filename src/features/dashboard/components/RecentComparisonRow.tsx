/**
 * -----------------------------------------------------------------------------
 * File: RecentComparisonRow.tsx
 * Feature: Dashboard
 *
 * Purpose:
 * Displays a compact recent comparison activity row.
 *
 * Responsibilities:
 * - Display compared product.
 * - Display comparison summary.
 * - Display best available price.
 * - Display comparison timestamp.
 *
 * Does NOT:
 * - Fetch data.
 * - Manage state.
 * - Format business data.
 * -----------------------------------------------------------------------------
 */

import { ArrowRightLeft } from "lucide-react";

import type { RecentComparisonViewModel } from "../viewmodels/dashboard.viewmodel";

interface RecentComparisonRowProps {
  comparison: RecentComparisonViewModel;
}

function RecentComparisonRow({ comparison }: RecentComparisonRowProps) {
  return (
    <article
      className="
        flex
        flex-col
        gap-5
        border-b
        border-slate-200
        py-5
        transition-colors
        duration-200
        hover:bg-slate-50
        md:flex-row
        md:items-start
        md:justify-between
        first:pt-0
        last:border-b-0
        last:pb-0
      "
    >
      {/* ------------------------------------------------------------------ */}
      {/* Product Information                                                */}
      {/* ------------------------------------------------------------------ */}

      <div className="flex min-w-0 flex-1 gap-4">
        <div
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-2xl
            bg-slate-100
          "
        >
          <ArrowRightLeft size={20} className="text-slate-600" />
        </div>

        <div className="min-w-0 flex-1">
          <h3
            className="
              truncate
              text-base
              font-semibold
              text-slate-900
            "
          >
            {comparison.product}
          </h3>

          <div
            className="
              mt-3
              inline-flex
              items-center
              rounded-full
              bg-slate-100
              px-3
              py-1
              text-xs
              font-medium
              text-slate-600
            "
          >
            Compared across {comparison.comparedStoresLabel}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Comparison Summary                                                 */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="
          flex
          shrink-0
          flex-col
          items-start
          gap-3
          md:items-end
        "
      >
        <div className="text-left md:text-right">
          <p
            className="
              text-xs
              font-medium
              uppercase
              tracking-wide
              text-slate-400
            "
          >
            Best Price
          </p>

          <p
            className="
              mt-1
              whitespace-nowrap
              text-lg
              font-bold
              text-slate-900
            "
          >
            {comparison.bestPriceLabel}
          </p>
        </div>

        <div className="text-left md:text-right">
          <p
            className="
              text-xs
              font-medium
              uppercase
              tracking-wide
              text-slate-400
            "
          >
            Compared
          </p>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >
            {comparison.comparedAtLabel}
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* TODO (Backend)
          - Restore previous comparison session.
          - Navigate to comparison results.
          - Display compared marketplace summary.
      */}
    </article>
  );
}

export default RecentComparisonRow;
