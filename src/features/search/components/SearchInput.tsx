/**
 * -----------------------------------------------------------------------------
 * File: SearchInput.tsx
 * Feature: Search
 *
 * Purpose:
 * Controlled search input.
 *
 * Responsibilities:
 * - Display the search field.
 * - Notify parent when the value changes.
 *
 * Future Enhancements:
 * - Autocomplete
 * - Recent searches
 * - Search suggestions
 * - Keyboard shortcuts
 * -----------------------------------------------------------------------------
 */

import { Search } from "lucide-react";

import type { SearchInputProps } from "../types/search.types";

function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="flex flex-1 items-center gap-3">
      <Search size={20} className="text-slate-400" />

      <label htmlFor="product-search" className="sr-only">
        Search products
      </label>

      <input
        id="product-search"
        type="search"
        autoComplete="off"
        spellCheck={false}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search for any product..."
        className="
          w-full
          border-none
          bg-transparent
          text-base
          text-slate-700
          placeholder:text-slate-400
          outline-none
        "
      />
    </div>
  );
}

export default SearchInput;
