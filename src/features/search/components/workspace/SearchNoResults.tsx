/**
 * -----------------------------------------------------------------------------
 * File: SearchNoResults.tsx
 * Feature: Search
 *
 * Purpose:
 * Displays a workspace when no products match the user's search.
 *
 * Responsibilities:
 * - Inform the user that no results were found.
 * - Suggest actions to improve the search.
 *
 * Architecture:
 * UI
 *
 * Notes:
 * - Pure presentation component.
 * - No business logic.
 * -----------------------------------------------------------------------------
 */

import { SearchX } from "lucide-react";

interface SearchNoResultsProps {
  query: string;
}

function SearchNoResults({ query }: SearchNoResultsProps) {
  return (
    <section
      aria-label="No Search Results"
      className="
        flex
        min-h-[560px]
        items-center
        justify-center
      "
    >
      <div
        className="
          w-full
          max-w-4xl
          text-center
        "
      >
        <div
          className="
            mx-auto
            flex
            h-24
            w-24
            items-center
            justify-center
            rounded-full
            bg-slate-100
          "
        >
          <SearchX size={48} className="text-slate-500" />
        </div>

        <h2
          className="
            mt-8
            text-3xl
            font-bold
            text-slate-900
          "
        >
          No products found
        </h2>

        <p
          className="
            mt-4
            text-lg
            text-slate-600
          "
        >
          We couldn't find any products matching
        </p>

        <p
          className="
            mt-2
            text-xl
            font-semibold
            text-blue-600
          "
        >
          "{query}"
        </p>

        <div
          className="
            mx-auto
            mt-12
            max-w-xl
            rounded-2xl
            border
            border-slate-200
            bg-slate-50
            p-6
            text-left
          "
        >
          <h3 className="font-semibold text-slate-900">Try the following:</h3>

          <ul
            className="
              mt-4
              list-disc
              space-y-2
              pl-5
              text-slate-600
            "
          >
            <li>Check your spelling.</li>
            <li>Search using a shorter keyword.</li>
            <li>Search by product brand.</li>
            <li>Use a more general search term.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default SearchNoResults;
