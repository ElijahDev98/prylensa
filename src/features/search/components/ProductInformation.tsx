/**
 * -----------------------------------------------------------------------------
 * File: ProductInformation.tsx
 * Feature: Search
 *
 * Purpose:
 * Displays product information for the selected search result.
 *
 * Responsibilities:
 * - Display product details.
 * - Display the lowest available offer.
 * - Forward compare actions.
 *
 * Does NOT:
 * - Manage comparison state.
 * - Fetch data.
 * - Execute business logic.
 * -----------------------------------------------------------------------------
 */

import Card from "@/components/ui/Card";
import { LAYOUT, SPACING } from "@/design-system";

import ProductDetailsLink from "./ProductDetailsLink";
import ProductFeatureGrid from "./ProductFeatureGrid";
import ProductHeader from "./ProductHeader";
import ProductPrice from "./ProductPrice";

import type { SearchResultViewModel } from "../viewmodels/search.viewmodel";

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
  const { product, lowestOffer } = result;

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
          title={product.title}
          brand={product.brand}
          rating={product.rating}
          reviews={product.reviewCount}
        />

        <ProductPrice offer={lowestOffer?.offer ?? null} />

        <ProductFeatureGrid specifications={product.specifications} />

        <ProductDetailsLink />
      </div>

      <div className={SPACING.actionTop}>
        <button
          type="button"
          onClick={() => onCompare(product.id)}
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
