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
import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Scale,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import Dialog from "@/components/ui/Dialog";
import StoreMark from "@/features/store/components/StoreMark";
import { usePreferences } from "@/features/settings";

import { sortOffers } from "../../services/offer-dialog.service";

import type { OfferSortOption } from "../../types/offer-dialog.types";
import type { SearchResultViewModel } from "../../viewmodels/search.viewmodel";

interface OfferDialogProps {
  open: boolean;

  result: SearchResultViewModel;

  isCompared: boolean;

  onCompare(): void;

  onOpenComparison(): void;

  onClose(): void;
}

function OfferDialog({
  open,
  result,
  isCompared,
  onCompare,
  onOpenComparison,
  onClose,
}: OfferDialogProps) {
  const [sort, setSort] = useState<OfferSortOption>("lowest-price");
  const { formatPrice } = usePreferences();

  const offers = result.offers;

  const sortedOffers = useMemo(() => sortOffers(offers, sort), [offers, sort]);

  const market = useMemo(() => {
    const prices = offers
      .map((offer) => offer.currentPrice)
      .filter((price) => Number.isFinite(price) && price > 0);
    const lowest = prices.length > 0 ? Math.min(...prices) : 0;
    const highest = prices.length > 0 ? Math.max(...prices) : 0;
    const average =
      prices.length > 0
        ? prices.reduce((total, price) => total + price, 0) / prices.length
        : 0;

    return {
      lowest,
      highest,
      average,
      savings: Math.max(0, highest - lowest),
      spreadPercentage:
        lowest > 0 ? Math.max(0, ((highest - lowest) / lowest) * 100) : 0,
      storeCount: new Set(offers.map((offer) => offer.storeId)).size,
    };
  }, [offers]);

  const analysis = result.aiAnalysis;

  return (
    <Dialog
      open={open}
      title="Offer Intelligence"
      size="wide"
      onClose={onClose}
      footer={
        <div className="flex flex-wrap items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="
              rounded-lg
              border border-slate-300
              bg-white
              px-4
              py-2.5
              text-sm
              font-semibold
              text-slate-700
              transition-colors
              hover:bg-slate-50
              focus:outline-none
              focus:ring-2
              focus:ring-slate-300
            "
          >
            Close
          </button>

          {!isCompared && (
            <button
              type="button"
              onClick={onCompare}
              className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700 hover:bg-blue-100"
            >
              <Scale size={17} aria-hidden="true" />
              Add matched group
            </button>
          )}

          <button
            type="button"
            onClick={onOpenComparison}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Open detailed comparison
            <ArrowRight size={17} aria-hidden="true" />
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        <header className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase text-blue-700">
              <Sparkles size={15} aria-hidden="true" />
              {analysis?.relevanceLabel ?? "Matched marketplace group"}
              <span className="text-slate-300">|</span>
              <span className="text-slate-500">
                {offers.length} offers across {market.storeCount} stores
              </span>
            </div>
            <h3 className="mt-2 text-xl font-bold text-slate-950">
              {result.title}
            </h3>
            <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600">
              {analysis?.relevanceReason ??
                "Prices are analyzed across the marketplaces that matched this product group."}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <label htmlFor="offer-sort" className="text-sm font-medium text-slate-600">
              Sort by
            </label>

            <select
              id="offer-sort"
              value={sort}
              onChange={(event) => setSort(event.target.value as OfferSortOption)}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="lowest-price">Lowest Price</option>

              <option value="highest-discount">Highest Discount</option>

              <option value="store">Store Name</option>
            </select>
          </div>
        </header>

        <dl className="grid overflow-hidden rounded-lg border border-slate-200 bg-slate-50 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Best price", formatPrice(market.lowest)],
            ["Market average", formatPrice(market.average)],
            ["Price spread", `${market.spreadPercentage.toFixed(1)}%`],
            ["Maximum savings", formatPrice(market.savings)],
          ].map(([label, value], index) => (
            <div
              key={label}
              className={`p-4 ${index > 0 ? "border-t border-slate-200 sm:border-l sm:border-t-0" : ""}`}
            >
              <dt className="text-xs font-semibold uppercase text-slate-500">{label}</dt>
              <dd className="mt-1 text-lg font-bold text-slate-950">{value}</dd>
            </div>
          ))}
        </dl>

        <section>
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <h4 className="font-semibold text-slate-950">Offer-level price distribution</h4>
              <p className="mt-1 text-sm text-slate-500">
                Each listing is measured against the best price and current market average.
              </p>
            </div>
            <ShieldCheck size={20} className="shrink-0 text-emerald-600" aria-hidden="true" />
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500">
                <tr>
                  <th className="px-4 py-3">Marketplace</th>
                  <th className="px-4 py-3">Offer price</th>
                  <th className="px-4 py-3">From best</th>
                  <th className="px-4 py-3">Market position</th>
                  <th className="px-4 py-3">Availability</th>
                  <th className="px-4 py-3 text-right">Listing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {sortedOffers.map((offer, index) => {
                  const difference = Math.max(0, offer.currentPrice - market.lowest);
                  const differencePercentage =
                    market.lowest > 0 ? (difference / market.lowest) * 100 : 0;
                  const isBest = difference < 0.01;
                  const belowAverage = offer.currentPrice <= market.average;

                  return (
                    <tr
                      key={`${offer.storeId}:${offer.productUrl}:${offer.id}:${index}`}
                      className={isBest ? "bg-emerald-50/60" : "hover:bg-slate-50"}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <StoreMark storeId={offer.storeId} storeName={offer.storeName} />
                          <div>
                            <p className="font-semibold text-slate-900">{offer.storeName}</p>
                            <p className="text-xs text-slate-500">
                              {offer.dataSource === "live"
                                ? "Live marketplace"
                                : offer.availabilityStatus === "unverified"
                                  ? "Historical snapshot"
                                  : "Recent snapshot"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <p className="font-bold text-slate-950">{offer.currentPriceLabel}</p>
                        {offer.discountPercentage != null && offer.discountPercentage > 0 && (
                          <p className="text-xs font-medium text-emerald-700">{offer.discountPercentage}% off</p>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        {isBest ? (
                          <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                            <CheckCircle2 size={15} aria-hidden="true" /> Best
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-slate-700">
                            <ArrowDown className="rotate-180" size={14} aria-hidden="true" />
                            +{formatPrice(difference)} ({differencePercentage.toFixed(1)}%)
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`font-medium ${isBest || belowAverage ? "text-emerald-700" : "text-amber-700"}`}>
                          {isBest ? "Best value" : belowAverage ? "Below average" : "Above average"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={
                          offer.availabilityStatus === "unverified"
                            ? "text-amber-700"
                            : offer.inStock
                              ? "text-emerald-700"
                              : "text-rose-700"
                        }>
                          {offer.availabilityStatus === "unverified"
                            ? "Availability unverified"
                            : offer.inStock
                              ? "In stock"
                              : "Unavailable"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <a
                          href={offer.productUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Open ${offer.storeName} listing`}
                          className="inline-flex rounded-lg p-2 text-blue-700 hover:bg-blue-50"
                        >
                          <ExternalLink size={17} aria-hidden="true" />
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </Dialog>
  );
}

export default OfferDialog;
