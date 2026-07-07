/**
 * -----------------------------------------------------------------------------
 * File: availability.ts
 * Shared Utility
 *
 * Purpose:
 * Converts StockStatus values into presentation metadata.
 *
 * Responsibilities:
 * - Map StockStatus to UI-friendly labels.
 * - Provide badge styling.
 * - Fail safely for unexpected values.
 * -----------------------------------------------------------------------------
 */

import type { StockStatus } from "@/features/offer";

export interface AvailabilityPresentation {
  label: string;

  badgeClassName: string;
}

/**
 * Default presentation.
 *
 * Used when an unexpected StockStatus is encountered.
 */
const DEFAULT_PRESENTATION: AvailabilityPresentation = {
  label: "Unknown",

  badgeClassName: "bg-slate-100 text-slate-700 border border-slate-200",
};

export function formatAvailability(
  status: StockStatus,
): AvailabilityPresentation {
  switch (status) {
    case "IN_STOCK":
      return {
        label: "In Stock",

        badgeClassName: "bg-green-100 text-green-700 border border-green-200",
      };

    case "LOW_STOCK":
      return {
        label: "Low Stock",

        badgeClassName: "bg-amber-100 text-amber-700 border border-amber-200",
      };

    case "OUT_OF_STOCK":
      return {
        label: "Out of Stock",

        badgeClassName: "bg-red-100 text-red-700 border border-red-200",
      };

    default:
      return DEFAULT_PRESENTATION;
  }
}
