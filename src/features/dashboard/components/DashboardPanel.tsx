/**
 * -----------------------------------------------------------------------------
 * File: DashboardPanel.tsx
 * Feature: Dashboard
 *
 * Purpose:
 * Shared panel container for dashboard widgets.
 *
 * Responsibilities:
 * - Provide a consistent panel appearance.
 * - Render child widget content.
 *
 * Does NOT:
 * - Fetch data.
 * - Manage state.
 * - Render business logic.
 * -----------------------------------------------------------------------------
 */

import Card from "@/components/ui/Card";

import type { PropsWithChildren } from "react";

interface DashboardPanelProps extends PropsWithChildren {
  className?: string;
}

function DashboardPanel({ children, className = "" }: DashboardPanelProps) {
  return (
    <Card
      className={`
        h-full
        rounded-3xl
        p-6
        ${className}
      `}
    >
      {children}
    </Card>
  );
}

export default DashboardPanel;
