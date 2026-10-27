/**
 * -----------------------------------------------------------------------------
 * File: RecentComparisonsWidget.tsx
 * Feature: Dashboard
 *
 * Purpose:
 * Displays recent product comparisons.
 *
 * Responsibilities:
 * - Render widget header.
 * - Render recent comparison rows.
 *
 * Does NOT:
 * - Fetch data.
 * - Manage state.
 * - Know where the data comes from.
 * -----------------------------------------------------------------------------
 */

import DashboardWidgetHeader from "./DashboardWidgetHeader";
import RecentComparisonRow from "./RecentComparisonRow";

import { useState } from "react";

import type { RecentComparisonViewModel } from "../viewmodels/dashboard.viewmodel";

interface RecentComparisonsWidgetProps {
  comparisons: RecentComparisonViewModel[];
}

function RecentComparisonsWidget({
  comparisons,
}: RecentComparisonsWidgetProps) {
  const [expanded, setExpanded] = useState(false);

  const visibleComparisons = expanded ? comparisons : comparisons.slice(0, 2);

  const canToggle = comparisons.length > 2;

  return (
    <section>
      <DashboardWidgetHeader
        title="Recent Comparisons"
        description="Latest comparison activity across products."
        actionLabel={canToggle ? (expanded ? "Show Less" : "View All") : undefined}
        onAction={() => setExpanded((current) => !current)}
      />

      {comparisons.length === 0 ? (
        <p className="text-sm text-slate-500">
          Recent live comparisons will appear after products are refreshed.
        </p>
      ) : (
        <div>
          {visibleComparisons.map((comparison) => (
            <RecentComparisonRow key={comparison.id} comparison={comparison} />
          ))}
        </div>
      )}
    </section>
  );
}

export default RecentComparisonsWidget;
