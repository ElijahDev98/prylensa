/**
 * -----------------------------------------------------------------------------
 * File: HeaderCompare.tsx
 * Application Shell
 *
 * Purpose:
 * Displays the Compare badge inside the application header.
 *
 * Responsibilities:
 * - Read comparison state.
 * - Display CompareBadge.
 *
 * Does NOT:
 * - Manage comparison state.
 * - Execute business logic.
 * -----------------------------------------------------------------------------
 */

import CompareBadge from "@/shared/components/CompareBadge";

import useComparisonContext from "@/features/compare/context/useComparisonContext";

function HeaderCompare() {
  const comparison = useComparisonContext();

  return <CompareBadge count={comparison.products.length} />;
}

export default HeaderCompare;
