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

import Card from "@/components/ui/Card";
import { LAYOUT, SPACING } from "@/design-system";

import ProductDetailsLink from "./ProductDetailsLink";
import ProductFeatureGrid from "./ProductFeatureGrid";
import ProductHeader from "./ProductHeader";
import ProductPrice from "./ProductPrice";

import type { SearchResultViewModel } from "../../viewmodels/search.viewmodel";

interface ProductInformationProps {
  result: SearchResultViewModel;

  onCompare: (productId: string) => void;

  isCompared: boolean;
}

function ProductInformation({
  result,
  onCompare,
  isCompared,
}: ProductInformationProps) {
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
        <ProductHeader
          title={result.title}
          brand={result.brand}
          rating={result.rating}
          reviews={result.reviewCount}
        />

        <ProductPrice offer={result.lowestOffer} />

        <ProductFeatureGrid specifications={result.specifications} />

        <ProductDetailsLink />
      </div>

      <div className={SPACING.actionTop}>
        <button
          type="button"
          onClick={() => onCompare(result.id)}
          disabled={isCompared}
          className={`
            w-full
            rounded-2xl
            py-3
            font-medium
            text-white
            transition-colors
            duration-200
            focus:outline-none
            focus:ring-2

            ${
              isCompared
                ? "cursor-not-allowed bg-slate-400"
                : `
                  bg-blue-600
                  hover:bg-blue-700
                  focus:ring-blue-200
                `
            }
          `}
        >
          {isCompared ? "Added to Compare" : "Compare Prices"}
        </button>
      </div>
    </Card>
  );
}

export default ProductInformation;
