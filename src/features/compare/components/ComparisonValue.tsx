/**
 * -----------------------------------------------------------------------------
 * File: ComparisonValue.tsx
 * Feature: Compare
 *
 * Purpose:
 * Displays a single comparison value for a store.
 *
 * Responsibilities:
 * - Display the store name.
 * - Display the comparison value.
 * - Highlight important values.
 *
 * Does NOT:
 * - Resolve stores.
 * - Fetch data.
 * - Manage state.
 * -----------------------------------------------------------------------------
 */

import { CheckCircle2 } from "lucide-react";

import type { Store } from "../types/store.types";
import type { ComparisonStoreValue } from "../types/comparison-data.types";

interface ComparisonValueProps {
  store: Store;

  value: ComparisonStoreValue;
}

function ComparisonValue({ store, value }: ComparisonValueProps) {
  const valueColor =
    value.highlight && value.color === "success"
      ? "text-green-600"
      : value.highlight && value.color === "warning"
        ? "text-amber-600"
        : value.highlight && value.color === "danger"
          ? "text-red-600"
          : "text-slate-900";

  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-4
        rounded-lg
        px-3
        py-2
        transition-colors
        hover:bg-slate-50
      "
    >
      <span
        className="
          text-sm
          font-medium
          text-slate-500
        "
      >
        {store.name}
      </span>

      <div
        className="
          flex
          items-center
          gap-2
        "
      >
        <span
          className={`
            text-sm
            font-semibold
            ${valueColor}
          `}
        >
          {value.value}
        </span>

        {value.highlight && (
          <CheckCircle2 size={16} className="text-green-600" />
        )}
      </div>
    </div>
  );
}

export default ComparisonValue;
