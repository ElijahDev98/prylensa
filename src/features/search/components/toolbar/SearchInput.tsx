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
 * - Expose the input ref for focus management.
 *
 * Future Enhancements:
 * - Google-style autocomplete
 * - Recent searches
 * - Search suggestions
 * - Keyboard shortcuts
 * -----------------------------------------------------------------------------
 */

import { forwardRef } from "react";

import { Search } from "lucide-react";

import type { SearchInputProps } from "../../types/search.types";

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ value, onChange }, ref) => {
    return (
      <div className="flex flex-1 items-center gap-3">
        <Search size={20} className="text-slate-400" />

        <label htmlFor="product-search" className="sr-only">
          Search products
        </label>

        <input
          ref={ref}
          id="product-search"
          type="search"
          autoComplete="off"
          spellCheck={false}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search for products, brands or categories..."
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
  },
);

SearchInput.displayName = "SearchInput";

export default SearchInput;
