/**
 * -----------------------------------------------------------------------------
 * File: SearchField.tsx
 * Feature: Search
 *
 * Purpose:
 * Groups the search input and inline search actions.
 * -----------------------------------------------------------------------------
 */

import { SearchCameraButton, SearchInput, SearchVoiceButton } from ".";

interface SearchFieldProps {
  query: string;
  onQueryChange: (value: string) => void;
}

function SearchField({ query, onQueryChange }: SearchFieldProps) {
  return (
    <div
      className="
        flex
        flex-1
        items-center
        gap-2
        rounded-2xl
        border
        border-slate-200
        bg-white
        px-4
        py-2
        shadow-sm
      "
    >
      <SearchInput value={query} onChange={onQueryChange} />

      <div className="h-6 w-px bg-slate-200" />

      <SearchCameraButton />

      <SearchVoiceButton />
    </div>
  );
}

export default SearchField;
