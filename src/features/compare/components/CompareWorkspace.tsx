/**
 * -----------------------------------------------------------------------------
 * File: CompareWorkspace.tsx
 * Feature: Compare (Presentation)
 *
 * Purpose:
 * Main workspace for the Compare page.
 *
 * Responsibilities:
 * - Compose comparison presentation.
 * - Arrange workspace sections.
 *
 * Does NOT:
 * - Execute business logic.
 * - Fetch data.
 * -----------------------------------------------------------------------------
 */

import BestOfferCard from "../../comparison/components/BestOffer";
import ComparisonAnalytics from "../../comparison/components/ComparisonAnalytics";
import ComparisonInsights from "../../comparison/components/ComparisonInsights";
import ComparisonMatrix from "./ComparisonMatrix";
import ComparisonPanel from "./ComparisonPanel";
import ComparisonPanelHeader from "./ComparisonPanelHeader";
import ComparisonSummary from "../../comparison/components/ComparisonSummary";
import ComparisonToolbar from "./ComparisonToolbar";
import RecommendationPanel from "../../comparison/components/RecommendationPanel";

function CompareWorkspace() {
  return (
    <section
      aria-label="Compare Workspace"
      className="
        flex
        flex-col
        gap-8
      "
    >
      {/* ------------------------------------------------------------------ */}
      {/* Toolbar */}
      {/* ------------------------------------------------------------------ */}

      <ComparisonToolbar />

      {/* ------------------------------------------------------------------ */}
      {/* AI Recommendation */}
      {/* ------------------------------------------------------------------ */}

      <RecommendationPanel />

      {/* ------------------------------------------------------------------ */}
      {/* Summary */}
      {/* ------------------------------------------------------------------ */}

      <ComparisonSummary />

      {/* ------------------------------------------------------------------ */}
      {/* Best Offer */}
      {/* ------------------------------------------------------------------ */}

      <BestOfferCard />

      {/* ------------------------------------------------------------------ */}
      {/* Analytics */}
      {/* ------------------------------------------------------------------ */}

      <ComparisonAnalytics />

      {/* ------------------------------------------------------------------ */}
      {/* AI Insights */}
      {/* ------------------------------------------------------------------ */}

      <ComparisonInsights />

      {/* ------------------------------------------------------------------ */}
      {/* Comparison Matrix */}
      {/* ------------------------------------------------------------------ */}

      <ComparisonPanel>
        <ComparisonPanelHeader
          title="Product Comparison"
          description="
            Compare product pricing,
            availability,
            discounts,
            and stock status
            across multiple online stores.
          "
        />

        <ComparisonMatrix />
      </ComparisonPanel>
    </section>
  );
}

export default CompareWorkspace;
