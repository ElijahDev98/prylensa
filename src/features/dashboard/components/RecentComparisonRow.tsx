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
 * - Display compared stores.
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

      <div className="flex min-w-0 items-center gap-3">
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-slate-100
          "
        >
          <ArrowRightLeft size={18} className="text-slate-600" />
        </div>

        <div className="min-w-0">
          <h3
            className="
              truncate
              font-semibold
              text-slate-900
            "
          >
            {comparison.product}
          </h3>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >
            Compared across {comparison.comparedStoresLabel}
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Comparison Summary                                                 */}
      {/* ------------------------------------------------------------------ */}

      <div className="shrink-0 text-right">
        <p
          className="
            whitespace-nowrap
            font-semibold
            text-slate-900
          "
        >
          {comparison.bestPriceLabel}
        </p>

        <p
          className="
            mt-1
            text-xs
            text-slate-400
          "
        >
          {comparison.comparedAtLabel}
        </p>
      </div>
    </article>
  );
}

export default RecentComparisonRow;
