/**
 * -----------------------------------------------------------------------------
 * File: ComparisonToolbar.tsx
 * Feature: Compare
 *
 * Purpose:
 * Displays the comparison toolbar.
 *
 * Responsibilities:
 * - Display comparison summary.
 * - Display comparison actions.
 * - Consume Comparison Context.
 *
 * Does NOT:
 * - Manage state.
 * - Execute business logic.
 * -----------------------------------------------------------------------------
 */

import { Box, Download, Plus, Trash2 } from "lucide-react";

import ComparisonSortMenu from "./ComparisonSortMenu";
import ComparisonStoreMenu from "./ComparisonStoreMenu";

import useComparisonContext from "@/features/comparison/context/useComparisonContext";

function ComparisonToolbar() {
  const comparison = useComparisonContext();

  const productCount = comparison.products.length;

  const hasProducts = productCount > 0;

  const canSort = productCount > 1;

  return (
    <section
      aria-label="Comparison Toolbar"
      className="
        flex
        flex-col
        gap-6
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >
      {/* --------------------------------------------------------------------- */}
      {/* Summary                                                               */}
      {/* --------------------------------------------------------------------- */}

      <div className="flex items-center gap-4">
        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            border
            border-slate-200
            bg-slate-50
          "
        >
          <Box size={28} className="text-slate-700" />
        </div>

        <div>
          <h2
            className="
              text-lg
              font-semibold
              text-slate-900
            "
          >
            {productCount} Product
            {productCount !== 1 ? "s" : ""} Selected
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >
            Compare pricing, availability and product features.
          </p>
        </div>
      </div>

      {/* --------------------------------------------------------------------- */}
      {/* Actions                                                               */}
      {/* --------------------------------------------------------------------- */}

      <div
        className="
          flex
          flex-wrap
          items-center
          gap-3
        "
      >
        {/* Stores */}

        <ComparisonStoreMenu disabled={!hasProducts} />

        {/* Sort */}

        <ComparisonSortMenu disabled={!canSort} />

        {/* Export */}

        <button
          type="button"
          disabled={!hasProducts}
          onClick={comparison.exportComparison}
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            border-slate-200
            bg-white
            px-4
            py-3
            text-sm
            font-medium
            text-slate-700
            transition-colors
            hover:bg-slate-50
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <Download size={16} />
          Export
        </button>

        {/* Add Product */}

        <button
          type="button"
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            border-blue-200
            bg-blue-50
            px-4
            py-3
            text-sm
            font-semibold
            text-blue-600
            transition-colors
            hover:bg-blue-100
          "
        >
          <Plus size={16} />
          Add Product
        </button>

        {/* Clear */}

        <button
          type="button"
          disabled={!hasProducts}
          onClick={comparison.clearComparison}
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            border-red-200
            bg-red-50
            px-4
            py-3
            text-sm
            font-semibold
            text-red-600
            transition-colors
            hover:bg-red-100
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <Trash2 size={16} />
          Clear All
        </button>
      </div>
    </section>
  );
}

export default ComparisonToolbar;
