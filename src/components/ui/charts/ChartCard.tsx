/**
 * -----------------------------------------------------------------------------
 * File: ChartCard.tsx
 * Layer: Shared UI
 *
 * Purpose:
 * Shared container for analytics charts.
 * -----------------------------------------------------------------------------
 */

import type { ReactNode } from "react";

interface ChartCardProps {
  title: string;

  description?: string;

  children: ReactNode;
}

function ChartCard({ title, description, children }: ChartCardProps) {
  return (
    <section
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
    >
      <header className="mb-6">
        <h2
          className="
            text-lg
            font-semibold
            text-slate-900
          "
        >
          {title}
        </h2>

        {description && (
          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >
            {description}
          </p>
        )}
      </header>

      {children}
    </section>
  );
}

export default ChartCard;
