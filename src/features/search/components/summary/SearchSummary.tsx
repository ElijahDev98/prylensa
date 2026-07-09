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

          <h2
            className="
              text-sm
              font-semibold
              uppercase
              tracking-wider
              text-slate-700
            "
          >
            Search Analytics
          </h2>
        </div>

        <span
          className="
            text-xs
            text-slate-500
          "
        >
          Updated now
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
        <SearchSummaryCard label="Products" value={resultCount} />

        <SearchSummaryCard label="Stores" value={storeCount} />

        <SearchSummaryCard label="Lowest Price" value={lowestPrice} />

        <SearchSummaryCard label="Average Price" value={averagePrice} />
      </div>
    </section>
  );
}

export default SearchSummary;
