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
 * - Allow users to execute a previous search.
 *
 * Architecture:
 * UI
 *   ↓
 * Props
 *
 * Notes:
 * - Pure presentation component.
 * - No state.
 * - No business logic.
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
        p-5
        shadow-sm
      "
    >
      <header className="mb-4">
        <h2 className="text-sm font-semibold text-slate-900">
          Recent Searches
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Quickly continue a previous search.
        </p>
      </header>

      <div className="flex flex-wrap gap-2">
        {searches.map((search) => (
          <button
            key={search}
            type="button"
            onClick={() => onSelect(search)}
            className="
              rounded-full
              border
              border-slate-200
              bg-slate-50
              px-4
              py-2
              text-sm
              text-slate-700
              transition-colors
              duration-200
              hover:border-blue-300
              hover:bg-blue-50
              hover:text-blue-700
              focus:outline-none
              focus:ring-2
              focus:ring-blue-200
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
