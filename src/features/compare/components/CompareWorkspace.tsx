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
 *
 * Does NOT:
 * - Fetch data.
 * - Manage state.
 * -----------------------------------------------------------------------------
 */

import ComparisonMatrix from "./ComparisonMatrix";
import ComparisonPanel from "./ComparisonPanel";
import ComparisonPanelHeader from "./ComparisonPanelHeader";
import ComparisonToolbar from "./ComparisonToolbar";

function CompareWorkspace() {
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

        <ComparisonMatrix />
      </ComparisonPanel>
    </section>
  );
}

export default CompareWorkspace;
