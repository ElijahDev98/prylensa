/**
 * -----------------------------------------------------------------------------
 * File: DashboardWorkspace.tsx
 * Feature: Dashboard
 *
 * Purpose:
 * Main workspace for the Dashboard.
 *
 * Responsibilities:
 * - Arrange dashboard panels.
 * - Compose dashboard widgets.
 * - Provide responsive layout.
 *
 * Does NOT:
 * - Fetch data.
 * - Manage state.
 * - Execute business logic.
 * -----------------------------------------------------------------------------
 */

import DashboardPanel from "./DashboardPanel";

import TrendingProductsWidget from "./TrendingProductsWidget";
import PriceAlertsWidget from "./PriceAlertsWidget";
import AIRecommendationWidget from "./AIRecommendationWidget";
import RecentComparisonsWidget from "./RecentComparisonsWidget";

function DashboardWorkspace() {
  return (
    <section
      aria-label="Dashboard Workspace"
      className="
        grid
        gap-6
        lg:grid-cols-12
      "
    >
      {/* Trending Products */}

      <div className="lg:col-span-8">
        <DashboardPanel>
          <TrendingProductsWidget />
        </DashboardPanel>
      </div>

      {/* Price Alerts */}

      <div className="lg:col-span-4">
        <DashboardPanel>
          <PriceAlertsWidget />
        </DashboardPanel>
      </div>

      {/* AI Recommendations */}

      <div className="lg:col-span-6">
        <DashboardPanel>
          <AIRecommendationWidget />
        </DashboardPanel>
      </div>

      {/* Recent Comparisons */}

      <div className="lg:col-span-6">
        <DashboardPanel>
          <RecentComparisonsWidget />
        </DashboardPanel>
      </div>
    </section>
  );
}

export default DashboardWorkspace;
