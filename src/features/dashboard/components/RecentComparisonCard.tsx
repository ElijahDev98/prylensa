/**
 * -----------------------------------------------------------------------------
 * File: RecentComparisonCard.tsx
 * Feature: Dashboard
 * -----------------------------------------------------------------------------
 */

import type { RecentComparison } from "../types/recent-comparison.types";

interface RecentComparisonCardProps {
  comparison: RecentComparison;
}

function RecentComparisonCard({ comparison }: RecentComparisonCardProps) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        p-4
      "
    >
      <h3 className="font-semibold text-slate-900">{comparison.product}</h3>

      <div
        className="
          mt-3
          flex
          items-center
          justify-between
          text-sm
          text-slate-500
        "
      >
        <span>{comparison.comparedStores} Stores</span>

        <span>{comparison.bestPrice}</span>
      </div>

      <p className="mt-3 text-xs text-slate-400">{comparison.comparedAt}</p>
    </div>
  );
}

export default RecentComparisonCard;
