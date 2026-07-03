/**
 * -----------------------------------------------------------------------------
 * File: HeaderSearch.tsx
 * Feature: Header
 *
 * Purpose:
 * Displays the application's global search trigger.
 *
 * Responsibilities:
 * - Display search UI.
 * - Prepare for future command palette integration.
 *
 * Future:
 * - Ctrl + K
 * - Product Search
 * - AI Search
 * - Recent Searches
 * -----------------------------------------------------------------------------
 */

import { Search } from "lucide-react";

function HeaderSearch() {
  return (
    <button
      type="button"
      aria-label="Open search"
      className="
        flex
        h-11
        w-full
        max-w-md
        items-center
        gap-3
        rounded-xl
        border
        border-slate-200
        bg-slate-50
        px-4
        text-left
        transition-colors
        hover:bg-white
        hover:border-slate-300
      "
    >
      <Search size={18} className="text-slate-400" />

      <span className="flex-1 text-sm text-slate-500">Search products...</span>

      <kbd
        className="
          rounded-md
          border
          border-slate-300
          bg-white
          px-2
          py-1
          text-xs
          text-slate-500
        "
      >
        Ctrl K
      </kbd>
    </button>
  );
}

export default HeaderSearch;
