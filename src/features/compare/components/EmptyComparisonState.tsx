/**
 * -----------------------------------------------------------------------------
 * File: EmptyComparisonState.tsx
 * Feature: Compare
 *
 * Purpose:
 * Displays the empty state when there are no products selected.
 *
 * Responsibilities:
 * - Inform the user.
 * - Encourage a new comparison.
 *
 * Does NOT:
 * - Manage state.
 * - Execute business logic.
 * -----------------------------------------------------------------------------
 */

import { Box, Plus } from "lucide-react";

function EmptyComparisonState() {
  return (
    <section
      aria-label="Empty Comparison State"
      className="
        flex
        flex-col
        items-center
        justify-center
        gap-6
        px-10
        py-24
        text-center
      "
    >
      <div
        className="
          flex
          h-24
          w-24
          items-center
          justify-center
          rounded-full
          bg-slate-100
        "
      >
        <Box size={44} className="text-slate-400" />
      </div>

      <div className="max-w-md">
        <h2
          className="
            text-2xl
            font-semibold
            text-slate-900
          "
        >
          No products selected
        </h2>

        <p
          className="
            mt-3
            text-base
            leading-7
            text-slate-500
          "
        >
          Start building a comparison by adding one or more products. Once
          products are selected, you'll be able to compare prices, availability,
          specifications and recommendations across multiple online stores.
        </p>
      </div>

      <button
        type="button"
        className="
          inline-flex
          items-center
          gap-3
          rounded-xl
          bg-blue-600
          px-6
          py-3
          text-sm
          font-semibold
          text-white
          transition-colors
          hover:bg-blue-700
        "
      >
        <Plus size={18} />
        Add Product
      </button>
    </section>
  );
}

export default EmptyComparisonState;
