/**
 * -----------------------------------------------------------------------------
 * File: ProductInformation.tsx
 * Feature: Search
 *
 * Purpose:
 * Displays the product information for the selected search result.
 *
 * Responsibilities:
 * - Display product details.
 * - Display the best available offer.
 * - Display product specifications.
 * - Forward comparison requests.
 *
 * Architecture:
 * UI
 *   ↓
 * SearchResultViewModel
 *
 * Notes:
 * - Pure presentation component.
 * - Must never consume Product domain models.
 * - Must never execute business logic.
 * -----------------------------------------------------------------------------
 */

import { BarChart3, ChevronLeft, ChevronRight, Scale } from "lucide-react";

import Card from "@/components/ui/Card";
import { LAYOUT, SPACING } from "@/design-system";
import { StoreMark } from "@/features/store";

import ProductDetailsLink from "./ProductDetailsLink";
import ProductFeatureGrid from "./ProductFeatureGrid";
import ProductHeader from "./ProductHeader";
import ProductPrice from "./ProductPrice";

import type {
  SearchOfferViewModel,
  SearchResultViewModel,
} from "../../viewmodels/search.viewmodel";

interface ProductInformationProps {
  result: SearchResultViewModel;

  offer: SearchOfferViewModel | null;

  matchPosition: number;

  matchCount: number;

  onPreviousMatch(): void;

  onNextMatch(): void;

  onCompare: (productId: string) => void;

  onOpenComparison(): void;

  isCompared: boolean;
}

function ProductInformation({
  result,
  offer,
  matchPosition,
  matchCount,
  onPreviousMatch,
  onNextMatch,
  onCompare,
  onOpenComparison,
  isCompared,
}: ProductInformationProps) {
  const hasPreviousMatch = matchPosition > 1;
  const hasNextMatch = matchPosition < matchCount;

  return (
    <Card
      as="article"
      className={`
        flex
        ${LAYOUT.workspacePanel.fullHeight}
        ${LAYOUT.workspacePanel.minHeight}
        ${LAYOUT.workspacePanel.maxHeight}
        flex-col
        justify-between
        ${SPACING.panel}
      `}
    >
      <div className="flex-1">
        {offer && (
          <div className="mb-5 flex items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex min-w-0 items-center gap-3">
              <StoreMark
                storeId={offer.storeId}
                storeName={offer.storeName}
                className="h-9 w-9 text-[8px]"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {offer.storeName}
                </p>
                <p
                  className={`text-xs font-medium ${
                    offer.availabilityStatus === "unverified"
                      ? "text-amber-700"
                      : offer.inStock
                        ? "text-emerald-600"
                        : "text-red-600"
                  }`}
                >
                  {offer.availabilityStatus === "unverified"
                    ? "Availability unverified"
                    : offer.inStock
                      ? "In stock"
                      : "Out of stock"}
                </p>
              </div>
            </div>

            <nav
              aria-label="Matched store pagination"
              className="flex shrink-0 items-center gap-1"
            >
              <button
                type="button"
                onClick={onPreviousMatch}
                disabled={!hasPreviousMatch}
                aria-label="Previous matched store"
                title="Previous matched store"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={16} aria-hidden="true" />
              </button>
              <span className="min-w-14 text-center text-xs font-semibold text-slate-600">
                {matchPosition} of {matchCount}
              </span>
              <button
                type="button"
                onClick={onNextMatch}
                disabled={!hasNextMatch}
                aria-label="Next matched store"
                title="Next matched store"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight size={16} aria-hidden="true" />
              </button>
            </nav>
          </div>
        )}

        <ProductHeader
          title={offer?.productTitle || result.title}
          brand={offer?.brand || result.brand}
          rating={result.rating}
          reviews={result.reviewCount}
        />

        <ProductPrice offer={offer} />

        <ProductFeatureGrid specifications={result.specifications} />

        <ProductDetailsLink />
      </div>

      <div className={SPACING.actionTop}>
        <button
          type="button"
          onClick={isCompared ? onOpenComparison : () => onCompare(result.id)}
          className={`
            inline-flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-lg
            py-3
            font-medium
            text-white
            transition-colors
            duration-200
            focus:outline-none
            focus:ring-2

            ${
              isCompared
                ? "border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 focus:ring-blue-200"
                : `
                  bg-blue-600
                  hover:bg-blue-700
                  focus:ring-blue-200
                `
            }
          `}
        >
          {isCompared ? (
            <>
              <BarChart3 size={18} aria-hidden="true" />
              View Comparison
            </>
          ) : (
            <>
              <Scale size={18} aria-hidden="true" />
              Compare Prices
            </>
          )}
        </button>
      </div>
    </Card>
  );
}

export default ProductInformation;
