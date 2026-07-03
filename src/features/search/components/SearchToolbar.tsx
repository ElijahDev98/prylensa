/**
 * -----------------------------------------------------------------------------
 * File: SearchToolbar.tsx
 * Feature: Search
 *
 * Purpose:
 * Layout container for the primary search toolbar.
 * -----------------------------------------------------------------------------
 */

import { SearchInput } from ".";

interface SearchToolbarProps {
  query: string;
  onQueryChange: (value: string) => void;
}

function SearchToolbar({ query, onQueryChange }: SearchToolbarProps) {
  return (
    <section
      aria-label="Product Search Toolbar"
      className="
        flex
        items-center
        gap-4
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
      "
    >
      <SearchInput value={query} onChange={onQueryChange} />

      {/* CameraButton */}

      {/* VoiceButton */}

      {/* SearchButton */}
    </section>
  );
}

export default SearchToolbar;
