/**
 * -----------------------------------------------------------------------------
 * File: RecommendationReason.tsx
 * Feature: Comparison
 *
 * Purpose:
 * Displays a single recommendation reason.
 * -----------------------------------------------------------------------------
 */

import { CheckCircle2 } from "lucide-react";

interface RecommendationReasonProps {
  reason: string;
}

function RecommendationReason({ reason }: RecommendationReasonProps) {
  return (
    <li
      className="
        flex
        items-start
        gap-3
      "
    >
      <CheckCircle2
        size={18}
        className="
          mt-0.5
          shrink-0
          text-emerald-500
        "
      />

      <span
        className="
          text-sm
          text-slate-700
        "
      >
        {reason}
      </span>
    </li>
  );
}

export default RecommendationReason;
