/**
 * -----------------------------------------------------------------------------
 * File: CompareWorkspace.tsx
 * Feature: Compare
 *
 * Purpose:
 * Main comparison workspace.
 *
 * Responsibilities:
 * - Arrange compare components.
 *
 * Does NOT:
 * - Fetch data.
 * - Manage state.
 * -----------------------------------------------------------------------------
 */

import Card from "@/components/ui/Card";

import ComparisonToolbar from "./ComparisonToolbar";

function CompareWorkspace() {
  return (
    <section
      className="
        flex
        flex-col
        gap-6
      "
    >
      <ComparisonToolbar />

      <Card
        className="
          p-8
        "
      >
        <div
          className="
            flex
            min-h-[450px]
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
              Comparison Table
            </h2>

            <p
              className="
                mt-3
                text-slate-500
              "
            >
              Product comparison table will be implemented in the next
              milestone.
            </p>
          </div>
        </div>
      </Card>
    </section>
  );
}

export default CompareWorkspace;
