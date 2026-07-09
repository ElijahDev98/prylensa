/**
 * -----------------------------------------------------------------------------
 * File: SearchControls.tsx
 * Feature: Search
 *
 * Purpose:
 * Displays Search control actions.
 *
 * Responsibilities:
 * - Display sort selection.
 * - Serve as the extension point for future filters.
 *
 * Architecture:
 * UI
 *   ↓
 * SearchSortOption
 *
 * Notes:
 * - Pure presentation component.
 * - No business logic.
 * -----------------------------------------------------------------------------
 */

import type { SearchSortOption } from "../../types/search.types";

interface SearchControlsProps {
  sort: SearchSortOption;

  onSortChange(sort: SearchSortOption): void;
}

function SearchControls({ sort, onSortChange }: SearchControlsProps) {
  return (
    <div className="flex items-center gap-3">
      <label
        htmlFor="search-sort"
        className="text-sm font-medium text-slate-600"
      >
        Sort
      </label>

      <select
        id="search-sort"
        value={sort}
        onChange={(event) =>
          onSortChange(event.target.value as SearchSortOption)
        }
        className="
          rounded-xl
          border
          border-slate-300
          bg-white
          px-3
          py-2
          text-sm
          focus:outline-none
          focus:ring-2
          focus:ring-blue-200
        "
      >
        <option value="relevance">Relevance</option>

        <option value="lowest-price">Lowest Price</option>

        <option value="highest-price">Highest Price</option>
      </select>
    </div>
  );
}

export default SearchControls;
