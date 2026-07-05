/**
 * -----------------------------------------------------------------------------
 * File: RecentComparisonsWidget.tsx
 * Feature: Dashboard
 * -----------------------------------------------------------------------------
 */

import RecentComparisonCard from "./RecentComparisonCard";

import { RECENT_COMPARISONS } from "../data/recent-comparisons";

function RecentComparisonsWidget() {
  return (
    <section className="flex h-full flex-col">
      <h2 className="text-xl font-semibold text-slate-900">
        Recent Comparisons
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Your latest product comparisons.
      </p>

      <div className="mt-6 space-y-4">
        {RECENT_COMPARISONS.map((comparison) => (
          <RecentComparisonCard key={comparison.id} comparison={comparison} />
        ))}
      </div>
    </section>
  );
}

export default RecentComparisonsWidget;
