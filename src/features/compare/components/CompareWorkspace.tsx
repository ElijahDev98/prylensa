/**
 * -----------------------------------------------------------------------------
 * File: CompareWorkspace.tsx
 * Feature: Compare (Presentation)
 *
 * Purpose:
 * Main workspace for the Compare page.
 * -----------------------------------------------------------------------------
 */

import ComparisonMatrix from "./ComparisonMatrix";
import ComparisonPanel from "./ComparisonPanel";
import ComparisonPanelHeader from "./ComparisonPanelHeader";
import ComparisonSummary from "../../comparison/components/ComparisonSummary";
import ComparisonToolbar from "./ComparisonToolbar";

import useComparisonContext from "@/features/comparison/context/useComparisonContext";

function CompareWorkspace() {
  const comparison = useComparisonContext();

  return (
    <section
      aria-label="Compare Workspace"
      className="
        flex
        flex-col
        gap-6
      "
    >
      <ComparisonToolbar />

      <ComparisonSummary
        productCount={comparison.products.length}
        storeCount={comparison.stores.length}
      />

      <ComparisonPanel>
        <ComparisonPanelHeader
          title="Product Comparison"
          description="
            Compare product pricing,
            availability and key features
            across multiple online stores.
          "
        />

        <ComparisonMatrix />
      </ComparisonPanel>
    </section>
  );
}

export default CompareWorkspace;
