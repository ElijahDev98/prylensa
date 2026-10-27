/**
 * -----------------------------------------------------------------------------
 * File: ComparisonValue.tsx
 * Feature: Compare (Presentation)
 *
 * Purpose:
 * Displays one comparison value for a store.
 * -----------------------------------------------------------------------------
 */

import { CheckCircle2 } from "lucide-react";

import { formatAvailability } from "@/shared/utils/availability";
import { formatPercentage } from "@/shared/utils/percentage";
import { usePreferences } from "@/features/settings";

import type { StockStatus } from "@/features/offer";
import type { Store } from "@/features/store";
import { StoreMark } from "@/features/store";

import type {
  ComparisonRowType,
  ComparisonStoreValueViewModel,
} from "@/features/comparison/viewmodels/comparison-row.viewmodel";

interface ComparisonValueProps {
  rowType: ComparisonRowType;

  store: Store;

  value: ComparisonStoreValueViewModel;
}

function ComparisonValue({ rowType, store, value }: ComparisonValueProps) {
  const { formatPrice } = usePreferences();
  const valueColorMap = {
    default: "text-slate-900",
    success: "text-green-600",
    warning: "text-amber-600",
    danger: "text-red-600",
  } as const;

  const valueColor = value.highlight
    ? valueColorMap[value.color]
    : valueColorMap.default;

  function renderValue() {
    switch (rowType) {
      case "price":
        return (
          <span className={valueColor}>
            {formatPrice(value.value as number)}
          </span>
        );

      case "discount":
        return (
          <span className={valueColor}>
            {formatPercentage(value.value as number)}
          </span>
        );

      case "availability": {
        const availability = formatAvailability(value.value as StockStatus);

        return (
          <span
            className={`
              rounded-full
              px-2
              py-1
              text-xs
              font-semibold
              ${availability.badgeClassName}
            `}
          >
            {availability.label}
          </span>
        );
      }
    }
  }

  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-4
        rounded-xl
        px-3
        py-3
        transition-colors
        hover:bg-slate-50
      "
    >
      {/* Store */}

      <div
        className="
          flex
          items-center
          gap-3
          min-w-0
        "
      >
        <StoreMark storeId={store.id} storeName={store.name} />

        <span
          className="
            truncate
            text-sm
            font-medium
            text-slate-600
          "
        >
          {store.name}
        </span>
      </div>

      {/* Value */}

      <div
        className="
          flex
          items-center
          gap-2
          shrink-0
        "
      >
        {renderValue()}

        {value.highlight && (
          <CheckCircle2 size={16} className="text-green-600" />
        )}
      </div>
    </div>
  );
}

export default ComparisonValue;
