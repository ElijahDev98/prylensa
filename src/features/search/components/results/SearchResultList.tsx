/**
 * -----------------------------------------------------------------------------
 * File: SearchResultList.tsx
 * Feature: Search
 *
 * Purpose:
 * Displays the available search results.
 *
 * Responsibilities:
 * - Render SearchResultViewModel items.
 * - Highlight the selected result.
 * - Notify the parent when a result is selected.
 *
 * Architecture:
 * UI
 *   ↓
 * SearchResultViewModel
 *
 * Notes:
 * - This is a pure presentation component.
 * - It must never access domain models.
 * - It must never perform business logic.
 * -----------------------------------------------------------------------------
 */

import type { SearchResultViewModel } from "../../viewmodels/search.viewmodel";
import { ArrowLeft, CheckCircle2, Plus } from "lucide-react";
import StoreMark from "@/features/store/components/StoreMark";

interface SearchResultListProps {
  results: SearchResultViewModel[];
  selectedResult: SearchResultViewModel | null;
  onSelectResult: (result: SearchResultViewModel) => void;
  onReturnToSelection?: () => void;
  comparisonPicker?: boolean;
  onConfirmSelection?: () => void;
}

function SearchResultList({
  results,
  selectedResult,
  onSelectResult,
  onReturnToSelection,
  comparisonPicker = false,
  onConfirmSelection,
}: SearchResultListProps) {
  if (results.length === 0 && !comparisonPicker) {
    return null;
  }

  return (
    <section aria-label="Search Results" className="flex flex-col gap-3">
      {(onReturnToSelection || comparisonPicker) && (
        <header className="mb-2 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {comparisonPicker ? "Choose a product to compare" : "Choose another product"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {comparisonPicker
                ? "Select a result card, then add its matched marketplace offers."
                : "Your current product remains selected until you choose a replacement."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {onReturnToSelection && (
              <button
                type="button"
                onClick={onReturnToSelection}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-blue-500 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                <ArrowLeft size={16} aria-hidden="true" />
                {comparisonPicker ? "Back to comparison" : "Back to selected product"}
              </button>
            )}
            {comparisonPicker && onConfirmSelection && (
              <button
                type="button"
                disabled={selectedResult === null}
                onClick={onConfirmSelection}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Plus size={16} aria-hidden="true" />
                Add selected
              </button>
            )}
          </div>
        </header>
      )}

      {comparisonPicker && results.length === 0 && (
        <div className="rounded-lg border border-dashed border-slate-200 bg-white px-5 py-10 text-center text-sm text-slate-500">
          Search for a product to load comparison-ready result cards.
        </div>
      )}

      {results.map((result) => {
        const isSelected = selectedResult?.id === result.id;
        const offersByStore = new Map<string, (typeof result.offers)[number]>();
        for (const offer of result.offers) {
          const key = offer.storeId.toLowerCase();
          const current = offersByStore.get(key);
          if (!current || offer.currentPrice < current.currentPrice) {
            offersByStore.set(key, offer);
          }
        }
        const storeOffers = [...offersByStore.values()];

        return (
          <button
            key={result.id}
            type="button"
            onClick={() => onSelectResult(result)}
            className={`
              w-full
              rounded-xl
              border
              p-4
              text-left
              transition-all
              duration-200
              ${
                isSelected
                  ? "border-blue-500 bg-blue-50"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
              }
            `}
          >
            <div className="font-semibold text-slate-900">{result.title}</div>

            <div className="mt-1 text-sm text-slate-500">{result.brand}</div>

            {storeOffers.length >= 2 && (
              <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                <CheckCircle2 size={15} aria-hidden="true" />
                Matched across {storeOffers.length} stores
              </div>
            )}

            <div className="mt-3 flex flex-wrap gap-2">
              {storeOffers.map((offer) => (
                <span
                  key={offer.storeId}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-700"
                >
                  <StoreMark storeId={offer.storeId} storeName={offer.storeName} className="h-5 w-5 text-[7px]" />
                  {offer.storeName}
                  <strong className="text-slate-900">{offer.currentPriceLabel}</strong>
                </span>
              ))}
            </div>

            {result.aiAnalysis && (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${result.aiAnalysis.recommendationColor}`}
                >
                  {result.aiAnalysis.recommendationAction}
                </span>

                <span className="text-xs font-medium text-slate-500">
                  {result.aiAnalysis.relevanceLabel}
                </span>

                <span aria-hidden="true" className="text-slate-300">
                  &bull;
                </span>

                <span className="text-xs font-medium text-slate-500">
                  {result.offers.length === 1
                    ? "1 verified offer"
                    : `${result.offers.length} verified offers`}
                </span>
              </div>
            )}
          </button>
        );
      })}
    </section>
  );
}

export default SearchResultList;
