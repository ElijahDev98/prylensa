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
import AIComparisonPanel from "./AIComparisonPanel";
import ComparisonMatrix from "./ComparisonMatrix";
import ComparisonPanel from "./ComparisonPanel";
import ComparisonPanelHeader from "./ComparisonPanelHeader";
import ComparisonSummary from "../../comparison/components/ComparisonSummary";
import ComparisonToolbar from "./ComparisonToolbar";

function CompareWorkspace() {
  return (
    <section
      aria-label="Compare Workspace"
      className="
        flex
        min-w-0
        flex-col
        gap-8
      "
    >
      {/* ------------------------------------------------------------------ */}
      {/* Toolbar */}
      {/* ------------------------------------------------------------------ */}

      <ComparisonToolbar />

      {/* ------------------------------------------------------------------ */}
      {/* Factual comparison inputs */}
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

      {/* ------------------------------------------------------------------ */}
      {/* Headline price evidence */}
      {/* ------------------------------------------------------------------ */}

      <ComparisonSummary />

      {/* ------------------------------------------------------------------ */}
      {/* Detailed analytics */}
      {/* ------------------------------------------------------------------ */}

      <ComparisonAnalytics />

      {/* ------------------------------------------------------------------ */}
      {/* AI inference */}
      {/* ------------------------------------------------------------------ */}

      <AIComparisonPanel />

      {/* ------------------------------------------------------------------ */}
      {/* Actionable offer */}
      {/* ------------------------------------------------------------------ */}

      <BestOfferCard />
    </section>
  );
}

export default CompareWorkspace;
