/**
 * -----------------------------------------------------------------------------
 * File: CompareBadge.tsx
 * Shared Component
 *
 * Purpose:
 * Displays the current comparison count.
 *
 * Responsibilities:
 * - Display compare icon.
 * - Display selected product count.
 *
 * Does NOT:
 * - Manage state.
 * - Fetch data.
 * -----------------------------------------------------------------------------
 */

import { Scale } from "lucide-react";

interface CompareBadgeProps {
  count: number;
  onClick?: () => void;
}

function CompareBadge({ count, onClick }: CompareBadgeProps) {
  if (count <= 0) {
    return null;
  }

  const isInteractive = typeof onClick === "function";
  const Component = isInteractive ? "button" : "div";

  return (
    <Component
      {...(isInteractive
        ? {
            type: "button" as const,
            onClick,
          }
        : {})}
      className="
        relative
        inline-flex
        items-center
        gap-2
        rounded-xl
        border
        border-slate-200
        bg-white
        px-4
        py-2
        transition-colors
        hover:bg-slate-50
      "
    >
      <Scale size={18} className="text-slate-700" />

      <span
        className="
          text-sm
          font-medium
          text-slate-700
        "
      >
        Compare
      </span>

      <span
        className="
          flex
          h-6
          min-w-6
          items-center
          justify-center
          rounded-full
          bg-blue-600
          px-2
          text-xs
          font-semibold
          text-white
        "
      >
        {count}
      </span>
    </Component>
  );
}

export default CompareBadge;
