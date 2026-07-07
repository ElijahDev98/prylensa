/**
 * -----------------------------------------------------------------------------
 * File: SearchResultList.tsx
 * Feature: Search
 *
 * Purpose:
 * Displays available search results.
 *
 * Responsibilities:
 * - Render SearchResultViewModel items.
 * - Highlight the selected result.
 * - Notify parent when a result is selected.
 *
 * Does NOT:
 * - Fetch data.
 * - Manage state.
 * - Execute business logic.
 * -----------------------------------------------------------------------------
 */

import type { SearchResultViewModel } from "../viewmodels/search.viewmodel";

interface SearchResultListProps {
  results: SearchResultViewModel[];

  selectedResult: SearchResultViewModel | null;

  onSelectResult: (result: SearchResultViewModel) => void;
}

function SearchResultList({
  results,
  selectedResult,
  onSelectResult,
}: SearchResultListProps) {
  if (results.length === 0) {
    return null;
  }

  return (
    <section
      aria-label="Search Results"
      className="
        flex
        flex-col
        gap-3
      "
    >
      {results.map((result) => {
        const { product, lowestOffer } = result;

        const isSelected = selectedResult?.product.id === product.id;

        return (
          <button
            key={product.id}
            type="button"
            onClick={() => onSelectResult(result)}
            className={`
              w-full
              rounded-xl
              border
              p-4
              text-left
              transition-all
              duration-200

              ${
                isSelected
                  ? "border-blue-500 bg-blue-50"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
              }
            `}
          >
            <div className="font-semibold text-slate-900">{product.title}</div>

            <div className="mt-1 text-sm text-slate-500">{product.brand}</div>

            {lowestOffer && (
              <div className="mt-2 font-medium text-blue-600">
                ₦{lowestOffer.offer.currentPrice.toLocaleString()}
              </div>
            )}
          </button>
        );
      })}
    </section>
  );
}

export default SearchResultList;
