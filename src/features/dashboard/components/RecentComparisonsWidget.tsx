/**
 * -----------------------------------------------------------------------------
 * File: RecentComparisonsWidget.tsx
 * Feature: Dashboard
 * -----------------------------------------------------------------------------
 */

import DashboardWidgetHeader from "./DashboardWidgetHeader";
import RecentComparisonRow from "./RecentComparisonRow";

import { RECENT_COMPARISONS } from "../data/recent-comparisons";

function RecentComparisonsWidget() {
  return (
    <section>
      <DashboardWidgetHeader
        title="Recent Comparisons"
        description="Latest comparison activity across products."
        actionLabel="View All"
      />

      <div>
        {RECENT_COMPARISONS.map((comparison) => (
          <RecentComparisonRow key={comparison.id} comparison={comparison} />
        ))}
      </div>
    </section>
  );
}

export default RecentComparisonsWidget;
