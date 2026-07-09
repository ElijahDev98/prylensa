/**
 * -----------------------------------------------------------------------------
 * File: SearchEmpty.tsx
 * Feature: Search
 *
 * Purpose:
 * Displays the default Search workspace before a product is selected.
 *
 * Responsibilities:
 * - Guide users toward searching.
 * - Provide example search ideas.
 *
 * Architecture:
 * UI
 *
 * Notes:
 * - Pure presentation component.
 * - No business logic.
 * -----------------------------------------------------------------------------
 */

import { PackageSearch } from "lucide-react";

function SearchEmpty() {
  const examples = [
    "iPhone 16 Pro Max",
    "Samsung Galaxy S25 Ultra",
    "PlayStation 5",
    "MacBook Air M4",
    "HP EliteBook",
    "Sony WH-1000XM6",
  ];

  return (
    <section
      aria-label="Search Empty State"
      className="
        flex
        min-h-[520px]
        items-center
        justify-center
      "
    >
      <div
        className="
          w-full
          max-w-2xl
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-10
          text-center
          shadow-sm
        "
      >
        <div
          className="
            mx-auto
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-full
            bg-blue-50
          "
        >
          <PackageSearch size={40} className="text-blue-600" />
        </div>

        <h2
          className="
            mt-8
            text-2xl
            font-bold
            text-slate-900
          "
        >
          Search for any product
        </h2>

        <p
          className="
            mt-4
            text-base
            leading-7
            text-slate-600
          "
        >
          Compare prices across trusted stores, discover the best available
          offers, and make informed purchasing decisions powered by AI.
        </p>

        <div className="mt-10">
          <p
            className="
              mb-4
              text-sm
              font-semibold
              uppercase
              tracking-wide
              text-slate-500
            "
          >
            Try searching for
          </p>

          <div
            className="
              flex
              flex-wrap
              justify-center
              gap-3
            "
          >
            {examples.map((example) => (
              <span
                key={example}
                className="
                  rounded-full
                  border
                  border-slate-200
                  bg-slate-50
                  px-4
                  py-2
                  text-sm
                  text-slate-700
                "
              >
                {example}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SearchEmpty;
