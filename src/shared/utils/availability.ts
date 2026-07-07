/**
 * -----------------------------------------------------------------------------
 * File: availability.ts
 * Shared Utility
 *
 * Purpose:
 * Shared presentation formatter for stock availability.
 * -----------------------------------------------------------------------------
 */

import type { StockStatus } from "@/features/offer";

export interface AvailabilityPresentation {
  label: string;

  badgeClassName: string;
}

export function formatAvailability(
  status: StockStatus,
): AvailabilityPresentation {
  switch (status) {
    case "in-stock":
      return {
        label: "In Stock",

        badgeClassName: "bg-green-100 text-green-700 border border-green-200",
      };

    case "low-stock":
      return {
        label: "Low Stock",

        badgeClassName: "bg-amber-100 text-amber-700 border border-amber-200",
      };

    case "out-of-stock":
      return {
        label: "Out of Stock",

        badgeClassName: "bg-red-100 text-red-700 border border-red-200",
      };
  }
}
