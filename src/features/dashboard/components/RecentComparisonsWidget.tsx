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

import type { RecentComparisonViewModel } from "../viewmodels/dashboard.viewmodel";

interface RecentComparisonsWidgetProps {
  comparisons: RecentComparisonViewModel[];
}

function RecentComparisonsWidget({
  comparisons,
}: RecentComparisonsWidgetProps) {
  return (
    <section>
      <DashboardWidgetHeader
        title="Recent Comparisons"
        description="Latest comparison activity across products."
        actionLabel="View All"
      />

      <div>
        {comparisons.map((comparison) => (
          <RecentComparisonRow key={comparison.id} comparison={comparison} />
        ))}
      </div>
    </section>
  );
}

export default RecentComparisonsWidget;
