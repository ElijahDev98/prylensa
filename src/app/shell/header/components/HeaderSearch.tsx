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
  const { state, updateQuery, submitSearch } = useHeaderSearch();

  return (
    <form
      role="search"
      aria-label="Global product search"
      onSubmit={(event) => {
        event.preventDefault();
        submitSearch();
      }}
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

      <input
        value={state.query}
        onChange={(event) => updateQuery(event.target.value)}
        placeholder={HEADER_SEARCH.placeholder}
        className="
          min-w-0
          flex-1
          bg-transparent
          text-sm
          text-slate-700
          outline-none
          placeholder:text-slate-500
        "
      />

      <kbd
        className="
          hidden
          rounded-md
          border
          border-slate-300
          bg-white
          px-2
          py-1
          text-xs
          text-slate-500
          sm:block
        "
      >
        {HEADER_SEARCH.shortcut}
      </kbd>
    </form>
  );
}

export default HeaderSearch;
