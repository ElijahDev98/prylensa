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
      style={{
        gridTemplateColumns: `220px repeat(${productCount}, minmax(0,1fr))`,
      }}
      className="
        grid
        bg-white
        border-b border-slate-200
      "
    >
      {children}
    </section>
  );
}

export default ComparisonRow;
