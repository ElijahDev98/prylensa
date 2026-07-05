/**
 * -----------------------------------------------------------------------------
 * File: ComparisonToolbar.tsx
 * Feature: Compare
 *
 * Purpose:
 * Toolbar for managing product comparisons.
 *
 * Responsibilities:
 * - Product search.
 * - Store filter.
 * - Sort selector.
 * - Compare action.
 *
 * Does NOT:
 * - Fetch data.
 * - Manage state.
 * -----------------------------------------------------------------------------
 */

import { ArrowUpDown, Search, Store } from "lucide-react";

function ComparisonToolbar() {
  return (
    <section
      className="
        flex
        flex-col
        gap-4
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
      {/* Search */}

      <div
        className="
          flex
          flex-1
          items-center
          gap-3
          rounded-2xl
          border
          border-slate-200
          px-4
          py-3
        "
      >
        <Search size={18} className="text-slate-400" />

        <input
          type="text"
          placeholder="Search products to compare..."
          className="
            w-full
            bg-transparent
            outline-none
            placeholder:text-slate-400
          "
        />
      </div>

      {/* Actions */}

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
            px-4
            py-3
            text-sm
            font-medium
            text-slate-700
            transition-colors
            hover:bg-slate-50
          "
        >
          <ArrowUpDown size={16} />
          Sort
        </button>

        <button
          type="button"
          className="
            rounded-xl
            bg-blue-600
            px-5
            py-3
            text-sm
            font-semibold
            text-white
            transition-colors
            hover:bg-blue-700
          "
        >
          Compare
        </button>
      </div>
    </section>
  );
}
export default ComparisonToolbar;
