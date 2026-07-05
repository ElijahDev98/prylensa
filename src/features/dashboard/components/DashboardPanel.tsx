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
 * Dashboard Rule:
 * Panels size themselves according to their content.
 * They never force equal heights.
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
