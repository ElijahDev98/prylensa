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
import ComparisonPanel from "./ComparisonPanel";

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
        <div
          className="
            flex
            min-h-[650px]
            items-center
            justify-center
          "
        >
          <div className="text-center">
            <h2
              className="
                text-xl
                font-semibold
                text-slate-900
              "
            >
              Product Comparison
            </h2>

            <p
              className="
                mt-2
                text-sm
                text-slate-500
              "
            >
              Comparison matrix will be implemented in the next milestone.
            </p>
          </div>
        </div>
      </ComparisonPanel>
    </section>
  );
}

export default CompareWorkspace;
