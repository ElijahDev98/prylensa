/**
 * -----------------------------------------------------------------------------
 * File: SummaryCard.tsx
 * Feature: Comparison
 *
 * Purpose:
 * Displays a comparison summary metric.
 *
 * Responsibilities:
 * - Present a key comparison metric.
 * - Maintain a consistent dashboard appearance.
 * *
 * Does NOT:
 * - Execute business logic.
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
        group
        flex
        h-full
        flex-col
        justify-between
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-slate-300
        hover:shadow-lg
      "
    >
      <header className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-wider
              text-slate-500
            "
          >
            {title}
          </p>

          <div
            className="
              h-px
              w-10
              bg-slate-200
              transition-all
              duration-300
              group-hover:w-14
            "
          />
        </div>

        <div
          className={`
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            shadow-sm
            transition-transform
            duration-300
            group-hover:scale-105
            ${accent}
          `}
        >
          {icon}
        </div>
      </header>

      <div className="mt-8">
        <p
          className="
            wrap-break-word
            text-3xl
            font-bold
            tracking-tight
            text-slate-900
          "
        >
          {value}
        </p>

        <p
          className="
            mt-2
            text-sm
            text-slate-500
          "
        >
          Updated from the current comparison results.
        </p>
      </div>
    </article>
  );
}

export default SummaryCard;
