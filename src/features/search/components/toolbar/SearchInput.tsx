/**
 * -----------------------------------------------------------------------------
 * File: SearchInput.tsx
 * Feature: Search
 *
 * Purpose:
 * Controlled search input with inline autocomplete support.
 *
 * Responsibilities:
 * - Display the search field.
 * - Display inline ghost completion.
 * - Forward keyboard events.
 * - Forward focus events.
 * - Expose the input ref.
 *
 * Notes:
 * - Presentation only.
 * - No business logic.
 * -----------------------------------------------------------------------------
 */

import { forwardRef } from "react";

import { Search } from "lucide-react";

import type { SearchInputProps } from "../../types/search.types";

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ value, ghostText = "", onChange, onKeyDown, onFocus, onBlur }, ref) => {
    return (
      <div className="flex flex-1 items-center gap-3">
        <Search size={20} className="shrink-0 text-slate-400" />

        <label htmlFor="product-search" className="sr-only">
          Search products
        </label>

        <div className="relative flex-1">
          {/* Ghost text layer */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              flex
              items-center
              overflow-hidden
              whitespace-nowrap
              text-base
            "
          >
            <span className="invisible">{value}</span>

            {ghostText.length > 0 && (
              <span className="select-none text-slate-400">{ghostText}</span>
            )}
          </div>

          <input
            ref={ref}
            id="product-search"
            type="search"
            value={value}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            enterKeyHint="search"
            placeholder="Search for products, brands or categories..."
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={onKeyDown}
            onFocus={onFocus}
            onBlur={onBlur}
            aria-label="Search products"
            aria-autocomplete="both"
            className="
              relative
              z-10
              w-full
              border-none
              bg-transparent
              text-base
              text-slate-700
              caret-slate-900
              outline-none
              placeholder:text-slate-400
            "
          />
        </div>
      </div>
    );
  },
);

SearchInput.displayName = "SearchInput";

export default SearchInput;
