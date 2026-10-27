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
 * - Allow users to delete individual search entries.
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

import {
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  History,
  LoaderCircle,
  RefreshCw,
  Search,
  Trash2,
} from "lucide-react";

import type { SavedSearch } from "../../api/saved-search.api";

interface RecentSearchesProps {
  searches: string[];
  savedSearches?: SavedSearch[];

  onSelect(search: string): void;

  onRemove(search: string): void;

  onClear(): void;

  onNewSearch?(): void;
  onToggleSave?(search: string): void;
  onRefreshSaved?(search: SavedSearch): void;
  savingQuery?: string | null;
  refreshingSavedId?: string | null;
  persistenceError?: string | null;
}

function RecentSearches({
  searches,
  savedSearches = [],
  onSelect,
  onRemove,
  onClear,
  onNewSearch,
  onToggleSave,
  onRefreshSaved,
  savingQuery = null,
  refreshingSavedId = null,
  persistenceError = null,
}: RecentSearchesProps) {
  const savedByQuery = new Map(
    savedSearches.map((search) => [search.query.trim().toLowerCase(), search]),
  );
  const recentKeys = new Set(searches.map((search) => search.trim().toLowerCase()));
  const displayedSearches = [
    ...searches,
    ...savedSearches
      .filter((search) => !recentKeys.has(search.query.trim().toLowerCase()))
      .map((search) => search.query),
  ];

  return (
    <section
      aria-label="Recent Searches"
      className="
        rounded-lg
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
      "
    >
      <header className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div className="flex items-start gap-3">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-blue-700">
            <History size={19} aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Recent and Saved Searches
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Quickly continue a previous search.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {onNewSearch && (
            <button
              type="button"
              onClick={onNewSearch}
              className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100"
            >
              <Search size={16} aria-hidden="true" />
              New search
            </button>
          )}
          {searches.length > 0 && (
            <button
              type="button"
              onClick={onClear}
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
            >
              <Trash2 size={16} aria-hidden="true" />
              Clear all
            </button>
          )}
        </div>
      </header>

      {persistenceError && (
        <p
          role="alert"
          className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700"
        >
          {persistenceError}
        </p>
      )}

      {displayedSearches.length === 0 ? (
        <div
          className="
            rounded-lg
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
        <ol className="divide-y divide-slate-200 overflow-hidden rounded-lg border border-slate-200">
          {displayedSearches.map((search, index) => (
            <li
              key={search}
              className={`flex min-h-16 flex-col items-stretch transition-colors sm:flex-row ${
                savedByQuery.has(search.trim().toLowerCase())
                  ? "bg-blue-50"
                  : "bg-white hover:bg-slate-50"
              }`}
            >
              <button
                type="button"
                onClick={() => onSelect(search)}
                className="flex min-w-0 flex-1 items-center gap-3 px-4 py-4 text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-200"
              >
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                  <History size={15} aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-slate-900">
                    {search}
                  </span>
                  <span className="mt-1 block text-xs text-slate-500">
                    {savedByQuery.has(search.trim().toLowerCase())
                      ? "Saved search"
                      : index === 0
                        ? "Most recent"
                        : `Recent search ${index + 1}`}
                  </span>
                </span>
                <span className="hidden items-center gap-1 text-xs font-semibold text-blue-700 sm:inline-flex">
                  Run search
                  <ArrowRight size={14} aria-hidden="true" />
                </span>
              </button>
              <div className="flex w-full shrink-0 justify-end border-t border-slate-200 sm:w-48 sm:border-l sm:border-t-0">
                {onToggleSave && (() => {
                const saved = savedByQuery.get(search.trim().toLowerCase());
                const saving = savingQuery?.toLowerCase() === search.toLowerCase();
                return (
                  <div className="flex shrink-0 items-center gap-1 px-1.5">
                    {saved && onRefreshSaved && (
                      <button
                        type="button"
                        onClick={() => onRefreshSaved(saved)}
                        disabled={refreshingSavedId === saved.id}
                        aria-label={`Refresh saved search: ${search}`}
                        title="Refresh saved search"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-blue-600 transition-colors hover:bg-blue-50 disabled:opacity-50"
                      >
                        {refreshingSavedId === saved.id
                          ? <LoaderCircle size={16} className="animate-spin" />
                          : <RefreshCw size={16} />}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => onToggleSave(search)}
                      disabled={saving}
                      aria-label={`${saved ? "Unsave" : "Save"} search: ${search}`}
                      title={saved ? "Remove saved search" : "Save search"}
                      className={`inline-flex h-9 w-20 items-center justify-center gap-1.5 rounded-lg px-2.5 transition-colors hover:bg-blue-50 disabled:opacity-50 ${
                        saved
                          ? "bg-blue-100 text-blue-700 ring-1 ring-inset ring-blue-200"
                          : "text-slate-500 hover:text-blue-700"
                      }`}
                    >
                      {saving
                        ? <LoaderCircle size={16} className="animate-spin" />
                        : saved
                          ? <BookmarkCheck size={16} />
                          : <Bookmark size={16} />}
                      <span className="text-xs font-semibold">
                        {saved ? "Saved" : "Save"}
                      </span>
                    </button>
                  </div>
                );
                })()}
                <button
                  type="button"
                  onClick={() => onRemove(search)}
                  aria-label={`Delete search: ${search}`}
                  title="Delete search"
                  className="inline-flex w-12 shrink-0 items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-200"
                >
                  <Trash2 size={16} aria-hidden="true" />
                </button>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

export default RecentSearches;
