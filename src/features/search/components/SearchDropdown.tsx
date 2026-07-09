/**
 * -----------------------------------------------------------------------------
 * File: RecentSearches.tsx
 * Feature: Search
 *
 * Purpose:
 * Displays the user's recent search history.
 *
 * Responsibilities:
 * - Render recent searches.
 * - Notify the parent when a search is selected.
 *
 * Architecture:
 * UI
 *   ↓
 * Props
 *
 * Notes:
 * - Pure presentation component.
 * - No business logic.
 * - No state management.
 * -----------------------------------------------------------------------------
 */

interface RecentSearchesProps {
  searches: string[];

  onSelect(search: string): void;
}

function RecentSearches({ searches, onSelect }: RecentSearchesProps) {
  if (searches.length === 0) {
    return null;
  }

  return (
    <section
      aria-label="Recent Searches"
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-4
      "
    >
      <h3 className="mb-3 text-sm font-semibold text-slate-700">
        Recent Searches
      </h3>

      <div className="flex flex-wrap gap-2">
        {searches.map((search) => (
          <button
            key={search}
            type="button"
            onClick={() => onSelect(search)}
            className="
              rounded-full
              border
              border-slate-300
              bg-slate-50
              px-3
              py-1.5
              text-sm
              text-slate-700
              transition-colors
              hover:bg-slate-100
            "
          >
            {search}
          </button>
        ))}
      </div>
    </section>
  );
}

export default RecentSearches;
