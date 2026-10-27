/**
 * -----------------------------------------------------------------------------
 * File: ComparisonMatrix.tsx
 * Feature: Compare
 *
 * Purpose:
 * Displays the comparison matrix.
 * -----------------------------------------------------------------------------
 */

import ComparisonDataRow from "./ComparisonDataRow";
import EmptyComparisonState from "./EmptyComparisonState";
import ProductHeaderRow from "./ProductHeaderRow";
import StoreHeaderRow from "./StoreHeaderRow";
import MatchedMarketplaceMatrix from "./MatchedMarketplaceMatrix";

import useComparisonContext from "@/features/comparison/context/useComparisonContext";
import { getComparisonGroupId } from "@/features/comparison/utils/comparison-group";

function ComparisonMatrix() {
  const comparison = useComparisonContext();

  if (comparison.products.length === 0) {
    return <EmptyComparisonState />;
  }

  const matchedGroupIds = new Set(
    comparison.products.map((product) => getComparisonGroupId(product.id)),
  );
  const matchedMarketplaceMode =
    matchedGroupIds.size === 1 &&
    comparison.analytics.marketplacePrices.length > 1;

  if (matchedMarketplaceMode) {
    return <MatchedMarketplaceMatrix />;
  }

  return (
    <div
      className="
        overflow-x-auto
        rounded-2xl
        border
        border-slate-200
        bg-white
      "
    >
      <div className="min-w-275">
        <div className="sticky top-0 z-30 bg-white">
          <ProductHeaderRow
            products={comparison.products}
            onRemoveProduct={comparison.removeProduct}
          />

          <StoreHeaderRow
            products={comparison.products}
            stores={comparison.stores}
          />
        </div>

        {comparison.rows.map((row) => (
          <ComparisonDataRow
            key={row.id}
            row={row}
            stores={comparison.stores}
          />
        ))}
      </div>
    </div>
  );
}

export default ComparisonMatrix;
