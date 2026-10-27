/**
 * -----------------------------------------------------------------------------
 * File: ComparisonStoreFilter.tsx
 * Feature: Compare (Presentation)
 *
 * Purpose:
 * Displays the store filter.
 *
 * Responsibilities:
 * - Allow users to enable or disable stores.
 * - Update comparison preferences.
 *
 * Does NOT:
 * - Execute filtering.
 * - Manage business logic.
 * -----------------------------------------------------------------------------
 */

import useComparison from "@/features/comparison/hooks/useComparison";

function ComparisonStoreFilter() {
  const comparison = useComparison();

  return (
    <div className="relative">
      <label htmlFor="comparison-store-filter" className="sr-only">
        Filter comparison stores
      </label>

      <select
        id="comparison-store-filter"
        multiple
        value={comparison.selectedStoreIds}
        onChange={(event) => {
          const values = Array.from(
            event.target.selectedOptions,
            (option) => option.value,
          );

          comparison.setStores(
            values,
            comparison.stores.map((store) => store.id),
          );
        }}
        className="
          min-w-52
          rounded-xl
          border
          border-slate-200
          bg-white
          p-3
          text-sm
          font-medium
          text-slate-700
          focus:border-blue-500
          focus:outline-none
        "
      >
        {comparison.stores.map((store) => (
          <option key={store.id} value={store.id}>
            {store.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ComparisonStoreFilter;
