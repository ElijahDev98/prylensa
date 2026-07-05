/**
 * -----------------------------------------------------------------------------
 * File: ComparisonPanel.tsx
 * Feature: Compare
 *
 * Purpose:
 * Shared container for the comparison engine.
 *
 * Responsibilities:
 * - Provide consistent panel styling.
 * - Render the comparison content.
 *
 * Does NOT:
 * - Fetch data.
 * - Manage state.
 * - Execute business logic.
 * -----------------------------------------------------------------------------
 */

import Card from "@/components/ui/Card";

import type { PropsWithChildren } from "react";

type ComparisonPanelProps = PropsWithChildren;

function ComparisonPanel({ children }: ComparisonPanelProps) {
  return (
    <Card
      className="
        h-auto
        overflow-hidden
        p-0
      "
    >
      {children}
    </Card>
  );
}

export default ComparisonPanel;
