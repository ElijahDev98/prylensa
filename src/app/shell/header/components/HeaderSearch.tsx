/**
 * -----------------------------------------------------------------------------
 * File: HeaderSearch.tsx
 * Feature: Header
 *
 * Purpose:
 * Displays the application's search trigger.
 * -----------------------------------------------------------------------------
 */

import { Search } from "lucide-react";

import { HEADER_SEARCH } from "../constants/header.constants";
import { useHeaderSearch } from "../hooks/useHeaderSearch";

function HeaderSearch() {
  const { openSearch } = useHeaderSearch();

  return (
    <button
      type="button"
      aria-label="Open search"
      onClick={openSearch}
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
        hover:border-slate-300
        hover:bg-white
      "
    >
      <Search size={18} className="text-slate-400" />

      <span className="flex-1 text-sm text-slate-500">
        {HEADER_SEARCH.placeholder}
      </span>

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
        {HEADER_SEARCH.shortcut}
      </kbd>
    </button>
  );
}

export default HeaderSearch;
