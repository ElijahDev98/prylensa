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
 * - Prevent duplicate submissions while searching.
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
 * - Presentation component only.
 * - No business logic.
 * -----------------------------------------------------------------------------
 */

import type { ComponentProps, KeyboardEventHandler, Ref } from "react";

import { Camera, Mic, Square } from "lucide-react";

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

  /**
   * Indicates whether a search request is currently running.
   */
  loading: boolean;

  suggestions: string[];

  activeSuggestionIndex: number;

  onQueryChange(value: string): void;

  onSortChange(sort: SearchSortOption): void;

  onSearch(): void;

  onEscape(): void;

  onHideSuggestions(): void;

  onAcceptAutocomplete?(): void;

  onSelectSuggestion(suggestion: string): void;

  onMoveSuggestionUp(): void;

  onMoveSuggestionDown(): void;

  onOpenVisualSearch(): void;

  onToggleVoiceSearch(): void;

  voiceListening: boolean;

  voiceSupported: boolean;

  voiceMessage: string | null;

  voiceError: string | null;
}

function SearchToolbar({
  inputRef,
  query,
  ghostText,
  sort,
  loading,
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
  onOpenVisualSearch,
  onToggleVoiceSearch,
  voiceListening,
  voiceSupported,
  voiceMessage,
  voiceError,
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

    if (loading) {
      return;
    }

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
    if (loading) {
      return;
    }

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
    <div className="space-y-2">
      <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-4">
        <div className="relative min-w-0 basis-full flex-1 md:basis-auto">
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
            disabled={loading}
            onChange={onQueryChange}
            onAcceptAutocomplete={onAcceptAutocomplete}
            onKeyDown={handleInputKeyDown}
          />

          <div className="mx-3 h-6 w-px bg-slate-200" />

          <button
            type="button"
            disabled={loading}
            onClick={onOpenVisualSearch}
            aria-label="Search by image"
            title="Search by image"
            className="
              rounded-lg
              p-2
              text-slate-500
              transition-colors
              hover:bg-slate-100
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <Camera size={20} />
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={onToggleVoiceSearch}
            aria-label={voiceListening ? "Stop voice search" : "Voice search"}
            aria-pressed={voiceListening}
            title={
              voiceSupported
                ? voiceListening
                  ? "Stop listening"
                  : "Voice search"
                : "Voice search is unavailable"
            }
            className={`
              rounded-lg
              p-2
              transition-colors
              disabled:cursor-not-allowed
              disabled:opacity-50
              ${
                voiceListening
                  ? "bg-red-50 text-red-600 hover:bg-red-100"
                  : "text-slate-500 hover:bg-slate-100"
              }
            `}
          >
            {voiceListening ? <Square size={18} /> : <Mic size={20} />}
          </button>

          <div className="ml-2 hidden sm:block">
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

        <SearchSubmitButton loading={loading} />
      </form>

      {(voiceMessage || voiceError) && (
        <p
          role={voiceError ? "alert" : "status"}
          aria-live="polite"
          className={`px-1 text-sm ${voiceError ? "text-red-700" : "text-slate-600"}`}
        >
          {voiceError ?? voiceMessage}
        </p>
      )}
    </div>
  );
}

export default SearchToolbar;
