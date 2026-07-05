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

      {/* Phase 3.3
          Comparison Matrix
      */}
    </section>
  );
}

export default CompareWorkspace;
