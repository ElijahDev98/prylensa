/**
 * -----------------------------------------------------------------------------
 * File: SummaryCard.tsx
 * Feature: Comparison
 *
 * Purpose:
 * Displays a comparison summary metric.
 * -----------------------------------------------------------------------------
 */

import type { ReactNode } from "react";

interface SummaryCardProps {
  title: string;

  value: string;

  icon: ReactNode;

  accent: string;
}

function SummaryCard({ title, value, icon, accent }: SummaryCardProps) {
  return (
    <article
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
    >
      <div className="flex items-center justify-between">
        <span
          className="
            text-sm
            font-medium
            text-slate-500
          "
        >
          {title}
        </span>

        <div
          className={`
            rounded-xl
            p-3
            ${accent}
          `}
        >
          {icon}
        </div>
      </div>

      <p
        className="
          mt-5
          text-3xl
          font-bold
          text-slate-900
        "
      >
        {value}
      </p>
    </article>
  );
}

export default SummaryCard;
