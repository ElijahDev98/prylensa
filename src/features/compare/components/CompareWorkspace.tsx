/**
 * -----------------------------------------------------------------------------
 * File: CompareWorkspace.tsx
 * Feature: Compare
 *
 * Purpose:
 * Main workspace for the Compare feature.
 *
 * Responsibilities:
 * - Create the Comparison ViewModel.
 * - Provide the Comparison Context.
 * - Arrange comparison components.
 *
 * Does NOT:
 * - Execute business logic.
 * -----------------------------------------------------------------------------
 */

import ComparisonMatrix from "./ComparisonMatrix";
import ComparisonPanel from "./ComparisonPanel";
import ComparisonPanelHeader from "./ComparisonPanelHeader";
import ComparisonToolbar from "./ComparisonToolbar";

import { ComparisonProvider } from "../context/ComparisonContext";

import useComparison from "../hooks/useComparison";

function CompareWorkspace() {
  const comparison = useComparison();

  return (
    <ComparisonProvider comparison={comparison}>
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
            description="
              Compare product pricing,
              availability and key features
              across multiple online stores.
            "
          />

          <ComparisonMatrix />
        </ComparisonPanel>
      </section>
    </ComparisonProvider>
  );
}

export default CompareWorkspace;
