/**
 * -----------------------------------------------------------------------------
 * File: RecentComparisonsWidget.tsx
 * Feature: Dashboard
 *
 * Purpose:
 * Displays recent product comparisons.
 * -----------------------------------------------------------------------------
 */

import RecentComparisonRow from "./RecentComparisonRow";

import { RECENT_COMPARISONS } from "../data/recent-comparisons";

function RecentComparisonsWidget() {
  return (
    <section className="flex flex-col">
      <header
        className="
          mb-6
          flex
          items-start
          justify-between
          gap-4
        "
      >
        <div>
          <h2
            className="
              text-lg
              font-semibold
              text-slate-900
            "
          >
            Recent Comparisons
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >
            Your latest product comparison activity.
          </p>
        </div>

        <button
          type="button"
          className="
            shrink-0
            rounded-xl
            px-3
            py-2
            text-sm
            font-medium
            text-blue-600
            transition-colors
            hover:bg-blue-50
            hover:text-blue-700
          "
        >
          View All
        </button>
      </header>

      <div>
        {RECENT_COMPARISONS.map((comparison) => (
          <RecentComparisonRow key={comparison.id} comparison={comparison} />
        ))}
      </div>
    </section>
  );
}

export default RecentComparisonsWidget;
