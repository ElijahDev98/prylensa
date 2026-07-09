/**
 * -----------------------------------------------------------------------------
 * File: SearchToolbar.tsx
 * Feature: Search
 *
 * Purpose:
 * Displays the primary Search toolbar.
 * -----------------------------------------------------------------------------
 */

import type { ComponentProps, KeyboardEvent } from "react";

import { Camera, Mic } from "lucide-react";

import SearchControls from "./SearchControls";
import SearchInput from "./SearchInput";
import SearchSubmitButton from "./SearchSubmitButton";
import SearchSuggestionList from "./SearchSuggestionList";

import type { SearchSortOption } from "../../types/search.types";

interface SearchToolbarProps {
  query: string;

  sort: SearchSortOption;

  suggestions: string[];

  activeSuggestionIndex: number;

  onQueryChange(value: string): void;

  onSortChange(sort: SearchSortOption): void;

  onSearch(): void;

  onSelectSuggestion(suggestion: string): void;

  onMoveSuggestionUp(): void;

  onMoveSuggestionDown(): void;

  onClearSuggestions(): void;
}

function SearchToolbar({
  query,
  sort,
  suggestions,
  activeSuggestionIndex,
  onQueryChange,
  onSortChange,
  onSearch,
  onSelectSuggestion,
  onMoveSuggestionUp,
  onMoveSuggestionDown,
  onClearSuggestions,
}: SearchToolbarProps) {
  const handleSubmit = (
    event: Parameters<NonNullable<ComponentProps<"form">["onSubmit"]>>[0],
  ) => {
    event.preventDefault();

    onSearch();

    onClearSuggestions();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLFormElement>) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        onMoveSuggestionDown();
        break;

      case "ArrowUp":
        event.preventDefault();
        onMoveSuggestionUp();
        break;

      case "Escape":
        onClearSuggestions();
        break;

      case "Enter":
        onClearSuggestions();
        break;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
      className="flex flex-wrap items-center gap-4"
    >
      <div className="relative flex-1">
        <div
          className="
            flex
            items-center
            rounded-2xl
            border
            border-slate-200
            bg-white
            px-5
            py-3
            shadow-sm
            transition-all
            duration-200
            focus-within:border-blue-500
            focus-within:ring-2
            focus-within:ring-blue-100
          "
        >
          <SearchInput value={query} onChange={onQueryChange} />

          <div className="mx-3 h-6 w-px bg-slate-200" />

          <button
            type="button"
            aria-label="Search by image"
            className="
              rounded-lg
              p-2
              text-slate-500
              transition-colors
              hover:bg-slate-100
            "
          >
            <Camera size={20} />
          </button>

          <button
            type="button"
            aria-label="Voice search"
            className="
              rounded-lg
              p-2
              text-slate-500
              transition-colors
              hover:bg-slate-100
            "
          >
            <Mic size={20} />
          </button>
        </div>

        <SearchSuggestionList
          suggestions={suggestions}
          activeIndex={activeSuggestionIndex}
          onSelect={onSelectSuggestion}
        />
      </div>

      <SearchControls sort={sort} onSortChange={onSortChange} />

      <SearchSubmitButton />
    </form>
  );
}

export default SearchToolbar;
