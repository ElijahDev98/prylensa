/**
 * -----------------------------------------------------------------------------
 * File: HeaderCompare.tsx
 * Feature: Application Shell
 *
 * Purpose:
 * Displays the Compare badge.
 * -----------------------------------------------------------------------------
 */

import { useNavigate } from "react-router-dom";

import CompareBadge from "@/shared/components/CompareBadge";

import useComparison from "@/features/comparison/hooks/useComparison";

function HeaderCompare() {
  const comparison = useComparison();

  const navigate = useNavigate();

  return (
    <button
      type="button"
      title="Compare items"
      onClick={() => navigate("/compare")}
      className="rounded-xl"
    >
      <CompareBadge count={comparison.selectedCount} />
    </button>
  );
}

export default HeaderCompare;
