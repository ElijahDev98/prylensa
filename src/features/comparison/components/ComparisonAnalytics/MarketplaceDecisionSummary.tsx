import {
  BadgeCheck,
  Clock3,
  Database,
  Sparkles,
} from "lucide-react";

import StoreMark from "@/features/store/components/StoreMark";
import { usePreferences } from "@/features/settings";
import type { ComparisonMarketplacePriceViewModel } from "@/features/comparison/viewmodels/comparison-analytics.viewmodel";
import type { RecommendationViewModel } from "@/features/comparison/viewmodels/recommendation.viewmodel";

interface MarketplaceDecisionSummaryProps {
  marketplaces: ComparisonMarketplacePriceViewModel[];
  recommendation: RecommendationViewModel;
}

function statusLabel(marketplace: ComparisonMarketplacePriceViewModel): string {
  if (marketplace.isStale) return "Stale observation";
  if (marketplace.availabilityStatus === "unverified") return "Verify availability";
  if (marketplace.dataSource === "persisted-snapshot") return "Recent snapshot";
  return "Live available offer";
}

function statusClassName(
  marketplace: ComparisonMarketplacePriceViewModel,
): string {
  if (
    marketplace.isStale ||
    marketplace.availabilityStatus === "unverified"
  ) {
    return "text-amber-700";
  }

  return "text-emerald-700";
}

function MarketplaceDecisionSummary({
  marketplaces,
  recommendation,
}: MarketplaceDecisionSummaryProps) {
  const { formatPrice } = usePreferences();
  const priceLeader = marketplaces.find((marketplace) => marketplace.isLowest);

  if (!priceLeader) return null;

  const recommendationMatchesLeader =
    recommendation.storeId.toLowerCase() === priceLeader.storeId.toLowerCase();
  const confidenceLabel = recommendation.aiConfidenceLabel ||
    `${recommendation.confidence}% confidence`;
  const decisionReason = recommendation.aiRecommendationReason ||
    recommendation.aiInsight ||
    `${priceLeader.storeName} currently has the lowest available matched price.`;

  return (
    <section className="mt-5 border-t border-slate-200 pt-5" aria-label="AI marketplace decision context">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 max-w-3xl">
          <div className="flex items-center gap-2 text-blue-700">
            <Sparkles size={17} aria-hidden="true" />
            <p className="text-sm font-semibold">AI decision context</p>
          </div>
          <h3 className="mt-1 text-lg font-bold text-slate-950">
            {priceLeader.storeName} is the current price leader
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {decisionReason}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-blue-700">
            <BadgeCheck size={14} aria-hidden="true" />
            {confidenceLabel}
          </span>
          {recommendation.aiRiskLabel && (
            <span className="rounded-full bg-amber-50 px-3 py-1.5 text-amber-700">
              {recommendation.aiRiskLabel}
            </span>
          )}
          {recommendation.aiPredictionLabel && (
            <span className="rounded-full bg-slate-100 px-3 py-1.5 text-slate-700">
              {recommendation.aiPredictionLabel}
            </span>
          )}
        </div>
      </div>

      <div className="mt-5 divide-y divide-slate-200 border-y border-slate-200">
        {marketplaces.map((marketplace) => {
          const isAiSupportedLeader =
            marketplace.isLowest && recommendationMatchesLeader;

          return (
            <div
              key={marketplace.id}
              className={`grid gap-3 py-4 sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:items-center ${
                marketplace.isLowest ? "bg-emerald-50" : ""
              }`}
            >
              <div className="flex min-w-0 items-center gap-3 px-3 sm:px-4">
                <StoreMark
                  storeId={marketplace.storeId}
                  storeName={marketplace.storeName}
                  className="h-8 w-8 text-[8px]"
                />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-slate-950">
                      {marketplace.storeName}
                    </p>
                    {isAiSupportedLeader && (
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                        AI-supported leader
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    {marketplace.offerCount} matched listing{marketplace.offerCount === 1 ? "" : "s"}
                  </p>
                </div>
              </div>

              <div className="px-3 sm:px-4 sm:text-right">
                <p className="font-bold text-slate-950">
                  {formatPrice(marketplace.price)}
                </p>
                <p className={`mt-1 text-xs font-medium ${
                  marketplace.isLowest ? "text-emerald-700" : "text-slate-500"
                }`}>
                  {marketplace.isLowest
                    ? "Best valid marketplace price"
                    : `+${formatPrice(marketplace.differenceFromBest)} (${marketplace.differencePercentage.toFixed(1)}%)`}
                </p>
              </div>

              <div className="px-3 sm:min-w-44 sm:px-4 sm:text-right">
                <p className={`inline-flex items-center gap-1.5 text-xs font-semibold ${statusClassName(marketplace)}`}>
                  {marketplace.dataSource === "persisted-snapshot"
                    ? <Database size={14} aria-hidden="true" />
                    : <Clock3 size={14} aria-hidden="true" />}
                  {statusLabel(marketplace)}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {marketplace.freshnessLabel}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default MarketplaceDecisionSummary;
