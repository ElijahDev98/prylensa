import {
  BadgeDollarSign,
  BellPlus,
  Database,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Trophy,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import useComparison from "@/features/comparison/hooks/useComparison";
import { getComparisonGroupId } from "@/features/comparison/utils/comparison-group";
import { usePreferences } from "@/features/settings";
import { ROUTES } from "@/app/router/routes";

function AIComparisonPanel() {
  const comparison = useComparison();
  const navigate = useNavigate();
  const { formatPrice } = usePreferences();
  const analysis = comparison.aiComparison;
  const matchedGroupIds = new Set(
    comparison.analytics.prices.map((price) =>
      getComparisonGroupId(price.productId),
    ),
  );
  const marketplaceMode =
    matchedGroupIds.size === 1 &&
    comparison.analytics.marketplacePrices.length > 1;
  const marketplaceWinner = marketplaceMode
    ? comparison.analytics.marketplacePrices[0]
    : null;
  const marketplaceRange = marketplaceMode
    ? comparison.analytics.marketplacePrices[
        comparison.analytics.marketplacePrices.length - 1
      ].differenceFromBest
    : 0;

  if (marketplaceWinner) {
    const recommendation = comparison.recommendation;

    return (
      <section aria-labelledby="marketplace-verdict-title" className="space-y-5">
        <header>
          <div className="flex items-center gap-2 text-blue-600">
            <Sparkles size={18} aria-hidden="true" />
            <p className="text-sm font-semibold">AI-assisted marketplace verdict</p>
          </div>
          <h2
            id="marketplace-verdict-title"
            className="mt-1 text-2xl font-bold text-slate-950"
          >
            {marketplaceWinner.storeName} is the strongest current offer
          </h2>
        </header>

        <div className="grid gap-5 border-y border-slate-200 py-5 lg:grid-cols-[minmax(0,1fr)_auto_auto_auto] lg:items-center">
          <p className="max-w-3xl text-sm leading-6 text-slate-600">
            {recommendation.aiInsight ||
              `${marketplaceWinner.storeName} has the lowest verified price across the matched marketplace group.`}
          </p>

          <div className="border-slate-200 lg:border-l lg:pl-6">
            <p className="text-xs font-medium uppercase text-slate-500">Decision basis</p>
            <p className="mt-1 font-bold text-slate-950">
              {recommendation.aiConfidenceLabel || "Verified live offers"}
            </p>
          </div>

          <div className="border-slate-200 lg:border-l lg:pl-6">
            <p className="text-xs font-medium uppercase text-slate-500">Cross-store saving</p>
            <p className="mt-1 font-bold text-emerald-700">
              {formatPrice(marketplaceRange)}
            </p>
          </div>

          <div className="border-slate-200 lg:border-l lg:pl-6">
            <p className="text-xs font-medium uppercase text-slate-500">Evidence</p>
            <p className="mt-1 font-bold text-slate-950">
              {comparison.analytics.offerCount} offers across {comparison.analytics.storeCount} marketplaces
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
          <span>{recommendation.aiPredictionLabel || "Current-price analysis"}</span>
          <span>{recommendation.aiRiskLabel || "Cross-store variance assessed"}</span>
        </div>
      </section>
    );
  }

  if (comparison.selectedCount < 2 || analysis.status === "idle") {
    return null;
  }

  if (analysis.status === "loading") {
    return (
      <section
        aria-label="AI comparison loading"
        className="rounded-lg border border-blue-100 bg-blue-50 p-6"
      >
        <div className="flex items-center gap-3 text-blue-700">
          <Sparkles size={20} className="animate-pulse" />
          <p className="font-semibold">AI is comparing the selected products...</p>
        </div>
      </section>
    );
  }

  if (analysis.status === "error") {
    return (
      <section
        aria-label="AI comparison unavailable"
        className="flex flex-col gap-4 rounded-lg border border-red-100 bg-red-50 p-6 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h2 className="font-semibold text-red-900">AI comparison unavailable</h2>
          <p className="mt-1 text-sm text-red-700">{analysis.error}</p>
        </div>

        <button
          type="button"
          onClick={comparison.refreshAiComparison}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
        >
          <RefreshCw size={16} />
          Retry
        </button>
      </section>
    );
  }

  return (
    <section aria-labelledby="ai-comparison-title" className="space-y-5">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-blue-600">
            <Sparkles size={18} />
            <p className="text-sm font-semibold">Live AI verdict</p>
          </div>
          <h2
            id="ai-comparison-title"
            className="mt-1 text-2xl font-bold text-slate-950"
          >
            {analysis.headline}
          </h2>
        </div>

        <button
          type="button"
          onClick={comparison.refreshAiComparison}
          title="Refresh AI comparison"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          <RefreshCw size={16} />
          Refresh analysis
        </button>
      </header>

      <div className="grid gap-4 border-y border-slate-200 py-5 lg:grid-cols-[1fr_auto_auto_auto] lg:items-center">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-amber-600">
            <Trophy size={18} />
            <span className="text-sm font-semibold">Recommended product</span>
          </div>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {analysis.winnerTitle}
          </p>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            {analysis.winnerReason}
          </p>
        </div>

        <div className="flex items-center gap-3 border-slate-200 lg:border-l lg:pl-6">
          <ShieldCheck size={20} className="text-blue-600" />
          <div>
            <p className="text-xs font-medium uppercase text-slate-500">Evidence confidence</p>
            <p className="font-bold text-slate-950">{analysis.confidenceLabel}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 border-slate-200 lg:border-l lg:pl-6">
          <BadgeDollarSign size={20} className="text-emerald-600" />
          <div>
            <p className="text-xs font-medium uppercase text-slate-500">Best-price difference</p>
            <p className="font-bold text-slate-950">{analysis.priceRangeLabel}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 border-slate-200 lg:border-l lg:pl-6">
          <Database size={20} className="text-slate-600" />
          <div>
            <p className="text-xs font-medium uppercase text-slate-500">Evidence</p>
            <p className="font-bold text-slate-950">{analysis.evidenceLabel}</p>
            {analysis.evidenceLimited && (
              <p className="text-xs font-medium text-amber-700">Limited cross-store coverage</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {analysis.rankings.map((product) => (
          <article
            key={product.id}
            className={`rounded-lg border p-5 ${
              product.id === analysis.winnerId
                ? "border-blue-300 bg-blue-50"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Rank {product.rank} &middot; {product.verdict}
                </p>
                <h3 className="mt-1 text-lg font-bold text-slate-950">
                  {product.title}
                </h3>
              </div>

              <span className="shrink-0 rounded-lg bg-white px-3 py-2 text-sm font-bold text-blue-700 shadow-sm">
                {product.scoreLabel}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <span className="font-bold text-slate-950">{product.bestPriceLabel}</span>
              <span className="text-slate-500">{product.bestMarketplace}</span>
              <span className={`rounded-full px-2 py-1 text-xs font-semibold ${product.riskClassName}`}>
                {product.riskLabel}
              </span>
              <span className="text-emerald-700">{product.savingsLabel}</span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-y border-slate-200 py-4 sm:grid-cols-5">
              {product.scoreMetrics.map((metric) => (
                <div key={metric.label} className="min-w-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="truncate text-xs font-medium text-slate-500">
                      {metric.label}
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      {metric.value.toFixed(0)}
                    </span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-blue-600"
                      style={{ width: `${Math.max(0, Math.min(metric.value, 100))}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-600">{product.insight}</p>

            <div className="mt-4 border-t border-slate-200 pt-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-blue-700">
                  {product.recommendationAction}
                </span>
                <span className="text-xs text-slate-500">{product.predictionLabel}</span>
              </div>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                {product.recommendationReason}
              </p>
              <button
                type="button"
                onClick={() =>
                  navigate(
                    `${ROUTES.ALERTS}?product=${encodeURIComponent(product.title)}&type=price-drop`,
                  )
                }
                className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-800"
              >
                <BellPlus size={15} />
                Track this product
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default AIComparisonPanel;
