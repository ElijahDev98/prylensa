/**
 * -----------------------------------------------------------------------------
 * File: ComparisonToolbar.tsx
 * Feature: Compare
 *
 * Purpose:
 * Displays the comparison toolbar.
 *
 * Responsibilities:
 * - Display selected products summary.
 * - Display comparison actions.
 *
 * Does NOT:
 * - Fetch data.
 * - Manage state.
 * - Execute business logic.
 * -----------------------------------------------------------------------------
 */

import { Box, ChevronDown, Download, Plus, Store, Trash2 } from "lucide-react";

function ComparisonToolbar() {
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
      {/* -------------------------------------------------------------- */}
      {/* Selected Products                                              */}
      {/* -------------------------------------------------------------- */}

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
            3 Products Selected
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >
            Compare the best prices and features.
          </p>
        </div>
      </div>

      {/* -------------------------------------------------------------- */}
      {/* Toolbar Actions                                                */}
      {/* -------------------------------------------------------------- */}

      <div
        className="
          flex
          flex-wrap
          items-center
          gap-3
        "
      >
        <button
          type="button"
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
          "
        >
          <Store size={16} />
          Stores
          <ChevronDown size={16} />
        </button>

        <button
          type="button"
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
          "
        >
          <ChevronDown size={16} className="rotate-180" />
          Sort
          <ChevronDown size={16} />
        </button>

        <button
          type="button"
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
          "
        >
          <Download size={16} />
          Export
        </button>

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

        <button
          type="button"
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
