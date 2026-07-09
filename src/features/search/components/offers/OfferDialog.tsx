/**
 * -----------------------------------------------------------------------------
 * File: OfferDialog.tsx
 * Feature: Search
 *
 * Purpose:
 * Displays all available offers for the selected product.
 *
 * Responsibilities:
 * - Compose the reusable Dialog component.
 * - Manage dialog-local sort state.
 * - Delegate sorting to the Offer Dialog service.
 * - Render the Offer list.
 *
 * Architecture:
 * UI
 *   ↓
 * SearchOfferViewModel
 *
 * Notes:
 * - Pure presentation component.
 * - No business logic.
 * -----------------------------------------------------------------------------
 */

import { useMemo, useState } from "react";

import Dialog from "@/components/ui/Dialog";

import OfferList from "./OfferList";

import { sortOffers } from "../../services/offer-dialog.service";

import type { OfferSortOption } from "../../types/offer-dialog.types";
import type { SearchOfferViewModel } from "../../viewmodels/search.viewmodel";

interface OfferDialogProps {
  open: boolean;

  offers: SearchOfferViewModel[];

  onClose(): void;
}

function OfferDialog({ open, offers, onClose }: OfferDialogProps) {
  const [sort, setSort] = useState<OfferSortOption>("lowest-price");

  const sortedOffers = useMemo(() => sortOffers(offers, sort), [offers, sort]);

  return (
    <Dialog
      open={open}
      title="Available Offers"
      onClose={onClose}
      footer={
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="
              rounded-xl
              bg-slate-900
              px-5
              py-2.5
              text-sm
              font-medium
              text-white
              transition-colors
              hover:bg-slate-700
              focus:outline-none
              focus:ring-2
              focus:ring-slate-300
            "
          >
            Close
          </button>
        </div>
      }
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            All Available Offers
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {offers.length} store
            {offers.length === 1 ? "" : "s"} found
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label
            htmlFor="offer-sort"
            className="text-sm font-medium text-slate-600"
          >
            Sort by
          </label>

          <select
            id="offer-sort"
            value={sort}
            onChange={(event) => setSort(event.target.value as OfferSortOption)}
            className="
              rounded-lg
              border
              border-slate-300
              bg-white
              px-3
              py-2
              text-sm
              text-slate-700
              focus:outline-none
              focus:ring-2
              focus:ring-blue-200
            "
          >
            <option value="lowest-price">Lowest Price</option>

            <option value="highest-discount">Highest Discount</option>

            <option value="store">Store Name</option>
          </select>
        </div>
      </div>

      <OfferList offers={sortedOffers} />
    </Dialog>
  );
}

export default OfferDialog;
