/**
 * -----------------------------------------------------------------------------
 * File: SearchSelectionPlaceholder.tsx
 * Feature: Search
 *
 * Purpose:
 * Displays a placeholder while search results exist but no product
 * has been selected.
 *
 * Responsibilities:
 * - Guide users to select a product.
 * - Explain the next action.
 *
 * Architecture:
 * UI
 *
 * Notes:
 * - Pure presentation component.
 * - No business logic.
 * -----------------------------------------------------------------------------
 */

import { MousePointerClick } from "lucide-react";

interface SearchSelectionPlaceholderProps {
  resultCount: number;
}

function SearchSelectionPlaceholder({
  resultCount,
}: SearchSelectionPlaceholderProps) {
  return (
    <section
      aria-label="Select Product"
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
            bg-blue-50
          "
        >
          <MousePointerClick size={46} className="text-blue-600" />
        </div>

        <h2
          className="
            mt-8
            text-3xl
            font-bold
            text-slate-900
          "
        >
          Select a product
        </h2>

        <p
          className="
            mx-auto
            mt-5
            max-w-2xl
            text-lg
            leading-8
            text-slate-600
          "
        >
          We found{" "}
          <span className="font-semibold text-slate-900">{resultCount}</span>{" "}
          matching {resultCount === 1 ? "product" : "products"}. Choose one from
          the search results to view prices, specifications, AI insights and
          comparisons.
        </p>

        <div
          className="
            mx-auto
            mt-12
            max-w-xl
            rounded-2xl
            border
            border-blue-100
            bg-blue-50
            p-6
          "
        >
          <p
            className="
              text-sm
              font-medium
              text-blue-800
            "
          >
            💡 Tip
          </p>

          <p
            className="
              mt-2
              text-sm
              leading-7
              text-blue-700
            "
          >
            Selecting a product opens the complete workspace where you can
            compare offers, inspect specifications, review images and add it to
            your comparison list.
          </p>
        </div>
      </div>
    </section>
  );
}

export default SearchSelectionPlaceholder;
