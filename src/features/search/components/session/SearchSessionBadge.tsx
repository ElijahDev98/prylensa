/**
 * -----------------------------------------------------------------------------
 * File: SearchSessionBadge.tsx
 * Feature: Search
 *
 * Purpose:
 * Displays a single Search session metric.
 *
 * Responsibilities:
 * - Render a session badge.
 *
 * Architecture:
 * UI
 *
 * Notes:
 * - Pure presentation component.
 * -----------------------------------------------------------------------------
 */

interface SearchSessionBadgeProps {
  label: string;

  value: string | number;
}

function SearchSessionBadge({ label, value }: SearchSessionBadgeProps) {
  return (
    <div
      className="
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        border-slate-200
        bg-slate-50
        px-4
        py-2
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
          text-sm
          font-semibold
          text-slate-900
        "
      >
        {value}
      </span>
    </div>
  );
}

export default SearchSessionBadge;
