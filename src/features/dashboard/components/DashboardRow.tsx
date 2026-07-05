/**
 * -----------------------------------------------------------------------------
 * File: DashboardRow.tsx
 * Feature: Dashboard
 *
 * Purpose:
 * Shared layout container for dashboard rows.
 *
 * Responsibilities:
 * - Standardize row spacing.
 * - Standardize row borders.
 * - Standardize hover state.
 * - Render child content.
 *
 * Does NOT:
 * - Fetch data.
 * - Manage state.
 * - Execute business logic.
 * -----------------------------------------------------------------------------
 */

import type { PropsWithChildren } from "react";

type DashboardRowProps = PropsWithChildren;

function DashboardRow({ children }: DashboardRowProps) {
  return (
    <article
      className="
        border-b
        border-slate-200
        py-4
        transition-colors
        duration-200
        hover:bg-slate-50
        first:pt-0
        last:border-b-0
        last:pb-0
      "
    >
      {children}
    </article>
  );
}

export default DashboardRow;
