/**
 * -----------------------------------------------------------------------------
 * File: SearchSummary.tsx
 * Feature: Search
 *
 * Purpose:
 * Displays an overview of the current search results.
 *
 * Responsibilities:
 * - Present key search metrics.
 * - Compose SearchSummaryCard components.
 *
 * Architecture:
 * UI
 *   ↓
 * SearchSummaryViewModel
 *
 * Notes:
 * - Pure presentation component.
 * - No business logic.
 * -----------------------------------------------------------------------------
 */

import SearchSummaryCard from "./SearchSummaryCard";

interface SearchSummaryProps {
  resultCount: number;

  storeCount: number;

  lowestPrice: string;

  averagePrice: string;
}

function SearchSummary({
  resultCount,
  storeCount,
  lowestPrice,
  averagePrice,
}: SearchSummaryProps) {
  if (resultCount === 0) {
    return null;
  }

  return (
    <section
      aria-label="Search Summary"
      className="
        grid
        gap-4
        sm:grid-cols-2
        xl:grid-cols-4
      "
    >
      <SearchSummaryCard label="Products" value={resultCount} />

      <SearchSummaryCard label="Stores" value={storeCount} />

      <SearchSummaryCard label="Lowest Price" value={lowestPrice} />

      <SearchSummaryCard label="Average Price" value={averagePrice} />
    </section>
  );
}

export default SearchSummary;
