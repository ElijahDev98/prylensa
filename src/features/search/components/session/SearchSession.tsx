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
 * - Display search statistics.
 * - Display search status.
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
        p-6
        shadow-sm
      "
    >
      <div
        className="
          flex
          flex-col
          gap-5
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        <div>
          <p
            className="
              text-sm
              font-medium
              uppercase
              tracking-wide
              text-slate-500
            "
          >
            Current Search
          </p>

          <h2
            className="
              mt-2
              text-2xl
              font-bold
              text-slate-900
            "
          >
            "{query}"
          </h2>
        </div>

        <div
          className="
            flex
            flex-wrap
            gap-3
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
