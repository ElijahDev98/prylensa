/**
 * -----------------------------------------------------------------------------
 * File: SearchToolbar.tsx
 * Feature: Search
 *
 * Purpose:
 * Composes the complete search toolbar.
 * -----------------------------------------------------------------------------
 */

import { SearchField, SearchSubmitButton } from ".";

interface SearchToolbarProps {
  query: string;
  onQueryChange: (value: string) => void;
}

function SearchToolbar({ query, onQueryChange }: SearchToolbarProps) {
  return (
    <form
      className="
        flex
        items-center
        gap-4
      "
    >
      <SearchField query={query} onQueryChange={onQueryChange} />

      <SearchSubmitButton />
    </form>
  );
}

export default SearchToolbar;
