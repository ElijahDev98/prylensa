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

import StoreMark from "@/features/store/components/StoreMark";
import { Check, ExternalLink } from "lucide-react";

import type { SearchOfferViewModel } from "../../viewmodels/search.viewmodel";
import { getOfferFreshness } from "@/shared/utils/offer-freshness";

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
  const offersByStore = new Map<string, SearchOfferViewModel>();
  for (const offer of offers) {
    const key = offer.storeId.toLowerCase();
    const current = offersByStore.get(key);
    if (
      !current ||
      (offer.availabilityStatus === "in-stock" &&
        current.availabilityStatus !== "in-stock") ||
      (offer.availabilityStatus === current.availabilityStatus &&
        offer.currentPrice < current.currentPrice)
    ) {
      offersByStore.set(key, offer);
    }
  }
  const storeOffers = [...offersByStore.values()].sort(
    (left, right) => left.currentPrice - right.currentPrice,
  );

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
        <h2 className="text-lg font-semibold text-slate-900">Matched Store Prices</h2>

        <div className="mt-5 space-y-2">
          {storeOffers.length > 0 ? (
            storeOffers.map((offer) => {
              const freshness = getOfferFreshness(offer.observedAt, offer.dataSource);
              const isBest = offer.availabilityStatus === "in-stock" &&
                offer.storeId === lowestOffer?.storeId &&
                offer.currentPrice === lowestOffer.currentPrice;
              return (
                <a
                  key={`${offer.storeId}:${offer.productUrl}:${offer.id}`}
                  href={offer.productUrl || undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 rounded-lg border p-3 transition-colors ${
                    isBest
                      ? "border-emerald-300 bg-emerald-50"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <StoreMark storeId={offer.storeId} storeName={offer.storeName} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-slate-900">
                      {offer.storeName}
                    </span>
                    <span
                      className={`block text-xs ${freshness.isStale ? "text-amber-700" : "text-slate-500"}`}
                      title={freshness.title}
                    >
                      {freshness.label}
                    </span>
                    {offer.availabilityStatus === "unverified" ? (
                      <span className="block text-xs font-semibold text-amber-700">
                        Availability unverified
                      </span>
                    ) : null}
                  </span>
                  <span className="text-right">
                    <span className="block text-sm font-bold text-slate-950">
                      {offer.currentPriceLabel}
                    </span>
                    {isBest && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                        <Check size={12} aria-hidden="true" /> Best
                      </span>
                    )}
                  </span>
                  <ExternalLink size={14} className="text-slate-400" aria-hidden="true" />
                </a>
              );
            })
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
