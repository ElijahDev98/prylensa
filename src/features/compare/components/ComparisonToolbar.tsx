/**
 * -----------------------------------------------------------------------------
 * File: ComparisonToolbar.tsx
 * Feature: Compare
 *
 * Purpose:
 * Displays the comparison toolbar.
 *
 * Responsibilities:
 * - Display comparison summary.
 * - Display comparison actions.
 * - Consume Comparison Context.
 * - Navigate users to Search when adding products.
 *
 * Does NOT:
 * - Manage comparison state.
 * - Execute business logic.
 * -----------------------------------------------------------------------------
 */

import { Box, Download, LoaderCircle, Plus, Trash2 } from "lucide-react";

import { useNavigate } from "react-router-dom";

import ComparisonSortMenu from "./ComparisonSortMenu";
import ComparisonStoreMenu from "./ComparisonStoreMenu";

import useComparisonContext from "@/features/comparison/context/useComparisonContext";
import { getComparisonGroupId } from "@/features/comparison/utils/comparison-group";

function ComparisonToolbar() {
  const comparison = useComparisonContext();

  const navigate = useNavigate();

  const productCount = comparison.products.length;

  const hasProducts = productCount > 0;

  const matchedGroupIds = new Set(
    comparison.products.map((product) => getComparisonGroupId(product.id)),
  );
  const matchedMarketplaceMode =
    matchedGroupIds.size === 1 &&
    comparison.analytics.marketplacePrices.length > 1;

  const canSort = productCount > 1 && !matchedMarketplaceMode;

  function handleAddProduct() {
    navigate("/search?mode=comparison");
  }

  return (
    <section
      aria-label="Comparison Toolbar"
      className="
        flex
        flex-col
        gap-6
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >
      {/* --------------------------------------------------------------------- */}
      {/* Summary                                                               */}
      {/* --------------------------------------------------------------------- */}

      <div className="flex items-center gap-4">
        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            border
            border-slate-200
            bg-slate-50
          "
        >
          <Box size={28} className="text-slate-700" />
        </div>

        <div>
          <h2
            className="
              text-lg
              font-semibold
              text-slate-900
            "
          >
            {matchedMarketplaceMode
              ? "1 Matched Product"
              : `${productCount} Product${productCount !== 1 ? "s" : ""} Selected`}
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >
            {matchedMarketplaceMode
              ? `${comparison.analytics.storeCount} marketplaces represented by ${comparison.analytics.offerCount} available listings.`
              : "Compare pricing, availability and product features."}
          </p>
        </div>
      </div>

      {/* --------------------------------------------------------------------- */}
      {/* Actions                                                               */}
      {/* --------------------------------------------------------------------- */}

      <div
        className="
          flex
          flex-wrap
          items-center
          gap-3
        "
      >
        <ComparisonStoreMenu disabled={!hasProducts} />

        <ComparisonSortMenu disabled={!canSort} />

        <div className="flex flex-col items-end gap-1">
          <button
            type="button"
            disabled={comparison.isExportingDataset}
            onClick={() => void comparison.exportDataset()}
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              py-3
              text-sm
              font-medium
              text-slate-700
              transition-colors
              hover:bg-slate-50
              disabled:cursor-wait
              disabled:opacity-60
            "
          >
            {comparison.isExportingDataset ? (
              <LoaderCircle size={16} className="animate-spin" />
            ) : (
              <Download size={16} />
            )}
            {comparison.isExportingDataset ? "Preparing dataset" : "Export AI dataset"}
          </button>
          {comparison.datasetExportError ? (
            <span className="max-w-64 text-right text-xs text-red-600" role="alert">
              {comparison.datasetExportError}
            </span>
          ) : null}
        </div>

        <button
          type="button"
          onClick={handleAddProduct}
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            border-blue-200
            bg-blue-50
            px-4
            py-3
            text-sm
            font-semibold
            text-blue-600
            transition-colors
            hover:bg-blue-100
          "
        >
          <Plus size={16} />
          Add Product
        </button>

        <button
          type="button"
          disabled={!hasProducts}
          onClick={comparison.clearComparison}
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            border-red-200
            bg-red-50
            px-4
            py-3
            text-sm
            font-semibold
            text-red-600
            transition-colors
            hover:bg-red-100
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <Trash2 size={16} />
          Clear All
        </button>
      </div>
    </section>
  );
}

export default ComparisonToolbar;
