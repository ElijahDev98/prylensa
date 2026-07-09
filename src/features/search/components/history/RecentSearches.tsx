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
 * - Allow users to clear their search history.
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

  onClear(): void;
}

function RecentSearches({ searches, onSelect, onClear }: RecentSearchesProps) {
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
      <header className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            Recent Searches
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Quickly continue a previous search.
          </p>
        </div>

        {searches.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="
              text-sm
              font-medium
              text-red-600
              transition-colors
              hover:text-red-700
            "
          >
            Clear
          </button>
        )}
      </header>

      {searches.length === 0 ? (
        <div
          className="
            rounded-xl
            border
            border-dashed
            border-slate-200
            py-8
            text-center
          "
        >
          <p className="text-sm text-slate-500">No recent searches yet.</p>
        </div>
      ) : (
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
      )}
    </section>
  );
}

export default RecentSearches;
