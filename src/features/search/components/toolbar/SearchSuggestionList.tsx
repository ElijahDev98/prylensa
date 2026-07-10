/**
 * -----------------------------------------------------------------------------
 * File: SearchSuggestionList.tsx
 * Feature: Search
 *
 * Purpose:
 * Displays ranked search suggestions.
 *
 * Responsibilities:
 * - Render suggestions.
 * - Highlight active suggestion.
 * - Notify selection.
 * - Provide accessibility metadata.
 *
 * Notes:
 * - Presentation only.
 * - No business logic.
 * -----------------------------------------------------------------------------
 */

interface SearchSuggestionListProps {
  suggestions: string[];

  activeIndex: number;

  onSelect(suggestion: string): void;
}

function SearchSuggestionList({
  suggestions,
  activeIndex,
  onSelect,
}: SearchSuggestionListProps) {
  if (suggestions.length === 0) {
    return null;
  }

  return (
    <div
      role="listbox"
      aria-label="Search suggestions"
      className="
        absolute
        left-0
        right-0
        top-full
        z-50
        mt-2
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-lg
      "
    >
      {suggestions.map((suggestion, index) => {
        const active = index === activeIndex;

        return (
          <button
            key={suggestion}
            id={`search-suggestion-${index}`}
            role="option"
            aria-selected={active}
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => onSelect(suggestion)}
            className={`
              flex
              w-full
              items-center
              px-5
              py-3
              text-left
              text-sm
              transition-colors

              ${
                active
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-700 hover:bg-slate-50"
              }
            `}
          >
            {suggestion}
          </button>
        );
      })}
    </div>
  );
}

export default SearchSuggestionList;
