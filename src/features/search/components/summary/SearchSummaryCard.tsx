/**
 * -----------------------------------------------------------------------------
 * File: SearchSummaryCard.tsx
 * Feature: Search
 *
 * Purpose:
 * Displays a single Search summary metric.
 *
 * Responsibilities:
 * - Render one summary metric.
 * - Display label and value.
 *
 * Architecture:
 * UI
 *
 * Notes:
 * - Pure presentation component.
 * - No business logic.
 * -----------------------------------------------------------------------------
 */

interface SearchSummaryCardProps {
  label: string;

  value: string | number;
}

function SearchSummaryCard({ label, value }: SearchSummaryCardProps) {
  return (
    <article
      className="
        flex
        min-w-[160px]
        flex-1
        flex-col
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        transition-all
        duration-200
        hover:border-blue-200
        hover:shadow-md
      "
    >
      <span
        className="
          text-xs
          font-medium
          uppercase
          tracking-wide
          text-slate-500
        "
      >
        {label}
      </span>

      <span
        className="
          mt-2
          text-2xl
          font-bold
          text-slate-900
        "
      >
        {value}
      </span>
    </article>
  );
}

export default SearchSummaryCard;
