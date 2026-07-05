/**
 * -----------------------------------------------------------------------------
 * File: CompareWorkspace.tsx
 * Feature: Compare
 *
 * Purpose:
 * Main workspace for product comparison.
 *
 * Responsibilities:
 * - Compose comparison UI.
 *
 * Does NOT:
 * - Fetch data.
 * - Manage state.
 * -----------------------------------------------------------------------------
 */

import Card from "@/components/ui/Card";

function CompareWorkspace() {
  return (
    <Card
      className="
        p-8
      "
    >
      <div
        className="
          flex
          min-h-[500px]
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
            Comparison Workspace
          </h2>

          <p
            className="
              mt-3
              text-slate-500
            "
          >
            The comparison engine will be implemented in the next milestone.
          </p>
        </div>
      </div>
    </Card>
  );
}

export default CompareWorkspace;
