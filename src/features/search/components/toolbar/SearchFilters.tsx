/**
 * -----------------------------------------------------------------------------
 * File: SearchFilters.tsx
 * Feature: Search
 *
 * Purpose:
 * Displays Search filter controls.
 *
 * Responsibilities:
 * - Category filter.
 * - Store filter.
 * - Stock filter.
 *
 * Notes:
 * - Presentation component only.
 * -----------------------------------------------------------------------------
 */

import type { SearchFilters } from "../../types/search-filter.types";

interface SearchFiltersProps {
  filters: SearchFilters;

  onChange(filters: SearchFilters): void;
}

function SearchFilters({ filters, onChange }: SearchFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <select
        value={filters.category}
        onChange={(event) =>
          onChange({
            ...filters,
            category: event.target.value,
          })
        }
        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
      >
        <option value="all">All Categories</option>
        <option value="phones">Phones</option>
        <option value="laptops">Laptops</option>
        <option value="accessories">Accessories</option>
      </select>

      <select
        value={filters.store}
        onChange={(event) =>
          onChange({
            ...filters,
            store: event.target.value,
          })
        }
        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
      >
        <option value="all">All Stores</option>
        <option value="jumia">Jumia</option>
        <option value="konga">Konga</option>
        <option value="slot">Slot</option>
      </select>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={filters.inStockOnly}
          onChange={(event) =>
            onChange({
              ...filters,
              inStockOnly: event.target.checked,
            })
          }
        />
        In Stock Only
      </label>
    </div>
  );
}

export default SearchFilters;
