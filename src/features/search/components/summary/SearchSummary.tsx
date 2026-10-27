/**
 * -----------------------------------------------------------------------------
 * File: SearchSummary.tsx
 * Feature: Search
 *
 * Purpose:
 * Displays analytics for the current search.
 *
 * Responsibilities:
 * - Display search analytics.
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

import { BarChart3 } from "lucide-react";

import SearchSummaryCard from "./SearchSummaryCard";

interface SearchSummaryProps {
  query: string;

  resultCount: number;

  storeCount: number;

  lowestPrice: string;

  averagePrice: string;

  bestQueryMatch: string;
}

function SearchSummary({
  query,
  resultCount,
  storeCount,
  lowestPrice,
  averagePrice,
  bestQueryMatch,
}: SearchSummaryProps) {
  if (resultCount === 0) {
    return null;
  }

  return (
    <section
      aria-label="Search Analytics"
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
      "
    >
      <header
        className="
          flex
          items-center
          justify-between
          border-b
          border-slate-200
          px-6
          py-4
        "
      >
        <div className="flex items-center gap-3">
          <BarChart3 size={18} className="text-blue-600" />

          <div className="min-w-0">
            <h2 className="text-sm font-semibold text-slate-800">
              Search result overview
            </h2>
            <p className="mt-0.5 truncate text-xs text-slate-500">
              Results for “{query}”
            </p>
          </div>
        </div>

        <span
          className="
            text-xs
            text-slate-500
          "
        >
          {resultCount} {resultCount === 1 ? "product" : "products"}
        </span>
      </header>

      <div
        className="
          grid
          gap-6
          px-6
          py-5
          sm:grid-cols-2
          lg:grid-cols-4
        "
      >
        <SearchSummaryCard label="Stores" value={storeCount} />

        <SearchSummaryCard label="Lowest Price" value={lowestPrice} />

        <SearchSummaryCard label="Average Price" value={averagePrice} />

        <SearchSummaryCard label="Best Query Match" value={bestQueryMatch} />
      </div>
    </section>
  );
}

export default SearchSummary;
