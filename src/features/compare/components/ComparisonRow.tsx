/**
 * -----------------------------------------------------------------------------
 * File: ComparisonRow.tsx
 * Feature: Compare
 *
 * Purpose:
 * Shared layout component for every comparison row.
 *
 * Responsibilities:
 * - Render a consistent comparison grid.
 * - Align all columns.
 *
 * Does NOT:
 * - Fetch data.
 * - Manage state.
 * - Render business content.
 * -----------------------------------------------------------------------------
 */

import type { PropsWithChildren } from "react";

interface ComparisonRowProps extends PropsWithChildren {
  productCount: number;
}

function ComparisonRow({ productCount, children }: ComparisonRowProps) {
  return (
    <section
      className="
        grid
        border-b
        border-slate-200
      "
      style={{
        gridTemplateColumns: `140px repeat(${productCount}, minmax(280px, 1fr))`,
      }}
    >
      {children}
    </section>
  );
}

export default ComparisonRow;
