/**
 * -----------------------------------------------------------------------------
 * File: ComparisonAnalytics.tsx
 * Feature: Comparison
 *
 * Purpose:
 * Displays visual analytics for the current comparison.
 *
 * Responsibilities:
 * - Consume Comparison ViewModel.
 * - Render reusable chart components.
 *
 * Does NOT:
 * - Calculate analytics.
 * - Execute business logic.
 * -----------------------------------------------------------------------------
 */

import { BarChartCard } from "@/components/ui/charts";
import {
  CheckCircle2,
  TrendingDown,
} from "lucide-react";

import useComparison from "@/features/comparison/hooks/useComparison";
import { usePreferences } from "@/features/settings";
import StoreMark from "@/features/store/components/StoreMark";
import { getComparisonGroupId } from "@/features/comparison/utils/comparison-group";
import AnalyticsStats from "./AnalyticsStats";
import OfferDistributionChart from "./OfferDistributionChart";
import MarketplaceDecisionSummary from "./MarketplaceDecisionSummary";

function ComparisonAnalytics() {
  const { analytics, recommendation } = useComparison();
  const { formatPrice } = usePreferences();
  const matchedGroupIds = new Set(
    analytics.prices.map((price) => getComparisonGroupId(price.productId)),
  );
  const marketplaceMode =
    matchedGroupIds.size === 1 && analytics.marketplacePrices.length > 1;

  if (analytics.prices.length === 0) {
    return null;
  }

  return (
    <section
      className="
        space-y-6
      "
    >
      <header
        className="
          space-y-2
        "
      >
        <h2
          className="
            text-2xl
            font-bold
            tracking-tight
            text-slate-900
          "
        >
          Price Distribution
        </h2>

        <p
          className="
            max-w-2xl
            text-sm
            leading-6
            text-slate-500
          "
        >
          {analytics.offerCount} offers across {analytics.storeCount} marketplaces,
          measured at product and listing level.
        </p>
      </header>

      <AnalyticsStats />

      {marketplaceMode ? (
        <BarChartCard
          title="Marketplace Best Offer Comparison"
          description="Bar height represents the lowest valid matched price at each marketplace; AI context and evidence appear below."
          data={analytics.marketplacePrices}
          xKey="storeName"
          yKey="price"
          xAxisLabel="Marketplaces"
          showValueLabels
          footer={(
            <MarketplaceDecisionSummary
              marketplaces={analytics.marketplacePrices}
              recommendation={recommendation}
            />
          )}
        />
      ) : (
        <BarChartCard
          title="Lowest Market Price"
          description="Each bar represents the best available price for a compared product."
          data={analytics.prices}
          xKey="productName"
          yKey="price"
        />
      )}

      <OfferDistributionChart
        offers={analytics.offers}
        medianPrice={analytics.medianPrice}
      />

      <section>
        <div className="mb-3 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <h3 className="text-lg font-bold text-slate-950">Price distribution table</h3>
            <p className="mt-1 text-sm text-slate-500">
              Marketplace listings ranked by price, with their premium over the best observed offer.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
            <TrendingDown size={17} aria-hidden="true" />
            Potential range saving {formatPrice(analytics.priceRange)}
          </span>
        </div>

        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Marketplace</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">From best</th>
                <th className="px-4 py-3">Market position</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {analytics.offers.map((offer, index) => (
                <tr
                  key={`${offer.id}:${index}`}
                  className={offer.isBest ? "bg-emerald-50/60" : "hover:bg-slate-50"}
                >
                  <td className="max-w-xs px-4 py-3 font-medium text-slate-900">
                    <span className="line-clamp-2">{offer.productName}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <StoreMark
                        storeId={offer.storeId}
                        storeName={offer.storeName}
                        className="h-7 w-7 text-[7px]"
                      />
                      <span className="font-medium text-slate-700">{offer.storeName}</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 font-bold text-slate-950">
                    {formatPrice(offer.price)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-slate-700">
                    {offer.isBest ? (
                      <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                        <CheckCircle2 size={15} aria-hidden="true" /> Best
                      </span>
                    ) : (
                      `+${formatPrice(offer.differenceFromBest)} (${offer.differencePercentage.toFixed(1)}%)`
                    )}
                  </td>
                  <td className={`px-4 py-3 font-semibold ${offer.position === "Above average" ? "text-amber-700" : "text-emerald-700"}`}>
                    {offer.position}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}

export default ComparisonAnalytics;
