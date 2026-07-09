/**
 * -----------------------------------------------------------------------------
 * File: SearchSummaryCard.tsx
 * Feature: Search
 *
 * Purpose:
 * Displays a single metric inside the Search Summary.
 *
 * Responsibilities:
 * - Display one metric.
 *
 * Architecture:
 * UI
 *
 * Notes:
 * - Pure presentation component.
 * -----------------------------------------------------------------------------
 */

interface SearchSummaryCardProps {
  label: string;

  value: string | number;
}

function SearchSummaryCard({ label, value }: SearchSummaryCardProps) {
  return (
    <div
      className="
        flex
        flex-col
        gap-1
        min-w-35
      "
    >
      <span
        className="
          text-xs
          font-medium
          uppercase
          tracking-wider
          text-slate-500
        "
      >
        {label}
      </span>

      <span
        className="
          text-lg
          font-bold
          text-slate-900
        "
      >
        {value}
      </span>
    </div>
  );
}

export default SearchSummaryCard;
