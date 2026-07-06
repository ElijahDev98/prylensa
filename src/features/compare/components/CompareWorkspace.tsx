/**
 * -----------------------------------------------------------------------------
 * File: CompareWorkspace.tsx
 * Feature: Compare
 *
 * Purpose:
 * Main workspace for the Compare feature.
 *
 * Responsibilities:
 * - Arrange comparison components.
 * - Retrieve comparison ViewModel.
 * - Pass the ViewModel to child components.
 *
 * Does NOT:
 * - Execute business logic.
 * -----------------------------------------------------------------------------
 */

import ComparisonMatrix from "./ComparisonMatrix";
import ComparisonPanel from "./ComparisonPanel";
import ComparisonPanelHeader from "./ComparisonPanelHeader";
import ComparisonToolbar from "./ComparisonToolbar";

import useComparison from "../hooks/useComparison";

function CompareWorkspace() {
  const comparison = useComparison();

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

      <ComparisonPanel>
        <ComparisonPanelHeader
          title="Product Comparison"
          description="Compare product pricing, availability and key features across multiple online stores."
        />

        <ComparisonMatrix comparison={comparison} />
      </ComparisonPanel>
    </section>
  );
}

export default CompareWorkspace;
