/**
 * -----------------------------------------------------------------------------
 * File: SearchToolbar.tsx
 * Feature: Search
 *
 * Purpose:
 * Displays the primary Search toolbar.
 *
 * Responsibilities:
 * - Compose Search controls.
 * - Route keyboard interactions.
 * - Display Search suggestions.
 * - Submit Search requests.
 *
 * Architecture:
 *
 * SearchPage
 *      ↓
 * SearchToolbar
 *      ↓
 * SearchInput
 *
 * Notes:
 * - UI composition only.
 * - No business logic.
 * -----------------------------------------------------------------------------
 */

import type { ComponentProps, KeyboardEventHandler, Ref } from "react";

import { Camera, Mic } from "lucide-react";

import SearchControls from "./SearchControls";
import SearchInput from "./SearchInput";
import SearchShortcutHint from "./SearchShortcutHint";
import SearchSubmitButton from "./SearchSubmitButton";
import SearchSuggestionList from "./SearchSuggestionList";

import type { SearchSortOption } from "../../types/search.types";

interface SearchToolbarProps {
  inputRef: Ref<HTMLInputElement>;

  query: string;

  ghostText: string;

  sort: SearchSortOption;

  suggestions: string[];

  activeSuggestionIndex: number;

  onQueryChange(value: string): void;

  onSortChange(sort: SearchSortOption): void;

  /**
   * Executes a Search.
   */
  onSearch(): void;

  /**
   * Handles Escape.
   */
  onEscape(): void;

  /**
   * Hides the suggestion popup.
   */
  onHideSuggestions(): void;

  /**
   * Accept inline autocomplete.
   */
  onAcceptAutocomplete?(): void;

  onSelectSuggestion(suggestion: string): void;

  onMoveSuggestionUp(): void;

  onMoveSuggestionDown(): void;
}

function SearchToolbar({
  inputRef,
  query,
  ghostText,
  sort,
  suggestions,
  activeSuggestionIndex,
  onQueryChange,
  onSortChange,
  onSearch,
  onEscape,
  onHideSuggestions,
  onAcceptAutocomplete,
  onSelectSuggestion,
  onMoveSuggestionUp,
  onMoveSuggestionDown,
}: SearchToolbarProps) {
  /**
   * ---------------------------------------------------------------------------
   * Form Submission
   * ---------------------------------------------------------------------------
   */

  const handleSubmit = (
    event: Parameters<NonNullable<ComponentProps<"form">["onSubmit"]>>[0],
  ) => {
    event.preventDefault();

    onSearch();

    onHideSuggestions();
  };

  /**
   * ---------------------------------------------------------------------------
   * Keyboard Interaction
   * ---------------------------------------------------------------------------
   */

  const handleInputKeyDown: KeyboardEventHandler<HTMLInputElement> = (
    event,
  ) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        onMoveSuggestionDown();
        return;

      case "ArrowUp":
        event.preventDefault();
        onMoveSuggestionUp();
        return;

      case "Escape":
        event.preventDefault();
        onEscape();
        return;

      case "Enter":
        event.preventDefault();

        onSearch();

        onHideSuggestions();

        return;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-4">
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
          <SearchInput
            ref={inputRef}
            value={query}
            ghostText={ghostText}
            onChange={onQueryChange}
            onAcceptAutocomplete={onAcceptAutocomplete}
            onKeyDown={handleInputKeyDown}
          />

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

          <div className="ml-2">
            <SearchShortcutHint />
          </div>
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
