/**
 * -----------------------------------------------------------------------------
 * File: BestOfferCard.tsx
 * Feature: Comparison
 *
 * Purpose:
 * Displays the best available offer identified by the comparison engine.
 * -----------------------------------------------------------------------------
 */

import {
  BrainCircuit,
  CheckCircle2,
  ExternalLink,
  ShoppingBag,
} from "lucide-react";

import OfferStat from "./OfferStat";

import useComparison from "@/features/comparison/hooks/useComparison";
import { usePreferences } from "@/features/settings";

function BestOfferCard() {
  const comparison = useComparison();
  const { formatPrice } = usePreferences();

  const recommendation = comparison.recommendation;
  const aiRanking = comparison.aiComparison.rankings.find(
    (ranking) => ranking.id === recommendation.productId,
  );
  const hasAiVerdict = comparison.aiComparison.status === "success" && aiRanking;
  const hasSearchAiVerdict =
    !hasAiVerdict && recommendation.aiConfidenceLabel.length > 0;
  const isAiBacked = Boolean(hasAiVerdict || hasSearchAiVerdict);

  if (recommendation.productId.length === 0) {
    return null;
  }

  return (
    <section
      className="
        rounded-lg
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
    >
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
        <div className="flex items-center gap-4">
          <div className="rounded-lg bg-blue-100 p-3">
          <ShoppingBag size={24} className="text-blue-600" />
          </div>

          <div>
            <p className="flex items-center gap-2 text-sm font-semibold text-blue-700">
              {isAiBacked && <BrainCircuit size={16} aria-hidden="true" />}
              {isAiBacked ? "AI-analyzed best offer" : "Best available offer"}
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              {recommendation.storeName}
            </h2>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-emerald-700">
            {hasAiVerdict
              ? aiRanking.scoreLabel
              : hasSearchAiVerdict
                ? recommendation.aiConfidenceLabel
                : `${recommendation.confidence}%`} decision score
          </span>
          {hasAiVerdict && (
            <>
              <span className="rounded-full bg-slate-100 px-3 py-1.5 text-slate-700">
                {aiRanking.riskLabel}
              </span>
              <span className="rounded-full bg-blue-50 px-3 py-1.5 text-blue-700">
                {aiRanking.predictionLabel}
              </span>
              <span
                className={`rounded-full px-3 py-1.5 ${aiRanking.variantClassName}`}
                title={aiRanking.variantSummary}
              >
                {aiRanking.variantLabel}
              </span>
            </>
          )}
          {hasSearchAiVerdict && (
            <>
              <span className="rounded-full bg-slate-100 px-3 py-1.5 text-slate-700">
                {recommendation.aiRiskLabel}
              </span>
              <span className="rounded-full bg-blue-50 px-3 py-1.5 text-blue-700">
                {recommendation.aiPredictionLabel}
              </span>
            </>
          )}
        </div>
      </div>

      <p
        className="
          mt-6
          text-lg
          font-semibold
          text-slate-900
        "
      >
        {recommendation.productTitle}
      </p>

      <div
        className="
          mt-6
          grid
          gap-4
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >
        <OfferStat
          label="Price"
          value={formatPrice(recommendation.price)}
        />

        <OfferStat label="Discount" value={`${recommendation.discount}%`} />

        <OfferStat label="Availability" value={recommendation.availability} />

        <OfferStat
          label="Below market average"
          value={
            recommendation.savings > 0
              ? formatPrice(recommendation.savings)
              : "Best observed"
          }
        />
      </div>

      <div className="mt-6 grid gap-5 border-t border-slate-200 pt-5 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <CheckCircle2 size={17} className="text-emerald-600" aria-hidden="true" />
            Why this offer leads
          </p>
          <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-600">
            {hasAiVerdict
              ? aiRanking.recommendationReason
              : hasSearchAiVerdict
                ? recommendation.aiRecommendationReason
                : recommendation.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
            {recommendation.reasons.map((reason) => (
              <span key={reason} className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" aria-hidden="true" />
                {reason}
              </span>
            ))}
          </div>
          <p
            className={`mt-3 text-xs ${recommendation.freshnessIsStale ? "text-amber-700" : "text-slate-500"}`}
            title={recommendation.freshnessTitle}
          >
            Price evidence: {recommendation.freshnessLabel}. Delivery fees are not included because the marketplace feeds do not supply them consistently.
          </p>
        </div>

        {recommendation.productUrl && (
          <a
            href={recommendation.productUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Visit Store
            <ExternalLink size={16} aria-hidden="true" />
          </a>
        )}
      </div>
    </section>
  );
}

export default BestOfferCard;
