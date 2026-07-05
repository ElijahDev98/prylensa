/**
 * -----------------------------------------------------------------------------
 * File: SearchToolbar.tsx
 * Feature: Search
 *
 * Purpose:
 * Search toolbar.
 *
 * Responsibilities:
 * - Display search field.
 * - Camera shortcut.
 * - Voice shortcut.
 * - Submit search.
 * -----------------------------------------------------------------------------
 */

import type { ComponentProps } from "react";
import { Camera, Mic } from "lucide-react";

import SearchInput from "./SearchInput";
import SearchSubmitButton from "./SearchSubmitButton";

interface SearchToolbarProps {
  query: string;
  onQueryChange: (value: string) => void;
  onSearch: () => void;
}

function SearchToolbar({ query, onQueryChange, onSearch }: SearchToolbarProps) {
  const handleSubmit = (
    event: Parameters<NonNullable<ComponentProps<"form">["onSubmit"]>>[0],
  ) => {
    event.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-4">
      <div
        className="
          flex
          flex-1
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

      <SearchSubmitButton />
    </form>
  );
}

export default SearchToolbar;
