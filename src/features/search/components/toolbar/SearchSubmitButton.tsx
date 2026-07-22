/**
 * -----------------------------------------------------------------------------
 * File: SearchSubmitButton.tsx
 * Feature: Search
 *
 * Purpose:
 * Primary action button for executing a search.
 *
 * Responsibilities:
 * - Submit the parent search form.
 * - Display loading feedback.
 * - Prevent duplicate submissions.
 * - Provide accessible button semantics.
 *
 * Architecture:
 *
 * SearchPage
 *      ↓
 * SearchToolbar
 *      ↓
 * SearchSubmitButton
 *
 * Notes:
 * - Presentation component only.
 * - No business logic.
 * - No service or API dependencies.
 * -----------------------------------------------------------------------------
 */

import { Loader2, Search } from "lucide-react";

interface SearchSubmitButtonProps {
  /**
   * Indicates whether a search request is currently executing.
   */
  loading?: boolean;
}

function SearchSubmitButton({ loading = false }: SearchSubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      aria-disabled={loading}
      aria-busy={loading}
      className="
        flex
        h-14
        min-w-36
        items-center
        justify-center
        rounded-2xl
        bg-blue-600
        px-8
        font-medium
        text-white
        transition-all
        duration-200
        hover:bg-blue-700
        disabled:cursor-not-allowed
        disabled:bg-slate-400
        disabled:hover:bg-slate-400
      "
    >
      {loading ? (
        <>
          <Loader2 size={18} className="mr-2 animate-spin" />
          Searching...
        </>
      ) : (
        <>
          <Search size={18} className="mr-2" />
          Search
        </>
      )}
    </button>
  );
}

export default SearchSubmitButton;
