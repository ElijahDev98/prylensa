/**
 * -----------------------------------------------------------------------------
 * File: BestPricePanel.tsx
 * Feature: Search
 *
 * Purpose:
 * Displays the best available offer for the selected product.
 *
 * Responsibilities:
 * - Display the lowest available offer.
 * - Provide access to all available offers.
 *
 * Architecture:
 * UI
 *   ↓
 * SearchOfferViewModel
 *
 * Notes:
 * - Pure presentation component.
 * - Must consume SearchOfferViewModel only.
 * - No domain model access.
 * -----------------------------------------------------------------------------
 */

import Card from "@/components/ui/Card";
import { LAYOUT, SPACING } from "@/design-system";

import BestOfferCard from "./BestOfferCard";

import type { SearchOfferViewModel } from "../viewmodels/search.viewmodel";

interface BestPricePanelProps {
  offers: SearchOfferViewModel[];

  lowestOffer: SearchOfferViewModel | null;

  onViewAllPrices(): void;
}

function BestPricePanel({
  offers,
  lowestOffer,
  onViewAllPrices,
}: BestPricePanelProps) {
  return (
    <Card
      as="aside"
      className={`
        flex
        ${LAYOUT.workspacePanel.fullHeight}
        ${LAYOUT.workspacePanel.minHeight}
        ${LAYOUT.workspacePanel.maxHeight}
        flex-col
        ${SPACING.panel}
      `}
    >
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Best Price</h2>

        <div className="mt-6">
          {lowestOffer ? (
            <BestOfferCard
              store={lowestOffer.storeName}
              price={lowestOffer.currentPrice}
              currency="NGN"
            />
          ) : (
            <p className="text-sm text-slate-500">No offers available.</p>
          )}
        </div>
      </div>

      <div className="flex-1" />

      <div className={SPACING.actionTop}>
        <button
          type="button"
          onClick={onViewAllPrices}
          disabled={offers.length === 0}
          className="
            w-full
            rounded-2xl
            border
            border-slate-300
            py-3
            font-medium
            text-slate-700
            transition-colors
            duration-200
            hover:bg-slate-100
            disabled:cursor-not-allowed
            disabled:opacity-50
            focus:outline-none
            focus:ring-2
            focus:ring-slate-200
          "
        >
          View All Prices ({offers.length})
        </button>
      </div>
    </Card>
  );
}

export default BestPricePanel;
