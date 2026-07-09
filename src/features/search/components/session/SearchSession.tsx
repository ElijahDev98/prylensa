/**
 * -----------------------------------------------------------------------------
 * File: SearchSession.tsx
 * Feature: Search
 *
 * Purpose:
 * Displays information about the current search session.
 *
 * Responsibilities:
 * - Display current search query.
 * - Display search status.
 * - Display search statistics.
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

import SearchSessionBadge from "./SearchSessionBadge";

interface SearchSessionProps {
  query: string;

  resultCount: number;

  storeCount: number;
}

function SearchSession({ query, resultCount, storeCount }: SearchSessionProps) {
  if (query.trim().length === 0) {
    return null;
  }

  return (
    <section
      aria-label="Search Session"
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        px-6
        py-4
        shadow-sm
      "
    >
      <div
        className="
          flex
          flex-col
          gap-4
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        <div className="min-w-0">
          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-wider
              text-slate-500
            "
          >
            Search Results
          </p>

          <h2
            className="
              mt-1
              truncate
              text-lg
              font-semibold
              text-slate-900
            "
          >
            {query}
          </h2>
        </div>

        <div
          className="
            flex
            flex-wrap
            gap-2
          "
        >
          <SearchSessionBadge label="Products" value={resultCount} />

          <SearchSessionBadge label="Stores" value={storeCount} />

          <SearchSessionBadge label="Status" value="Updated Now" />
        </div>
      </div>
    </section>
  );
}

export default SearchSession;
