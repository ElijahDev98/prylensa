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
 * - Distribute Dashboard view models.
 *
 * Does NOT:
 * - Fetch data.
 * - Manage state.
 * - Execute business logic.
 * -----------------------------------------------------------------------------
 */

import DashboardPanel from "./DashboardPanel";

import AIRecommendationWidget from "./AIRecommendationWidget";
import PriceAlertsWidget from "./PriceAlertsWidget";
import RecentComparisonsWidget from "./RecentComparisonsWidget";
import TrendingProductsWidget from "./TrendingProductsWidget";

import type {
  PriceAlertViewModel,
  RecommendationViewModel,
  RecentComparisonViewModel,
  TrendingProductViewModel,
} from "../viewmodels/dashboard.viewmodel";

interface DashboardWorkspaceProps {
  trendingProducts: TrendingProductViewModel[];

  priceAlerts: PriceAlertViewModel[];

  recommendations: RecommendationViewModel[];

  recentComparisons: RecentComparisonViewModel[];
}

function DashboardWorkspace({
  trendingProducts,
  priceAlerts,
  recommendations,
  recentComparisons,
}: DashboardWorkspaceProps) {
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
          <TrendingProductsWidget products={trendingProducts} />
        </DashboardPanel>
      </div>

      {/* Price Alerts */}

      <div className="lg:col-span-4">
        <DashboardPanel>
          <PriceAlertsWidget alerts={priceAlerts} />
        </DashboardPanel>
      </div>

      {/* AI Recommendations */}

      <div className="lg:col-span-6">
        <DashboardPanel>
          <AIRecommendationWidget recommendations={recommendations} />
        </DashboardPanel>
      </div>

      {/* Recent Comparisons */}

      <div className="lg:col-span-6">
        <DashboardPanel>
          <RecentComparisonsWidget comparisons={recentComparisons} />
        </DashboardPanel>
      </div>
    </section>
  );
}

export default DashboardWorkspace;
