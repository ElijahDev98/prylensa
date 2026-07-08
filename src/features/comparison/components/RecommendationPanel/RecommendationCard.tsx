/**
 * -----------------------------------------------------------------------------
 * File: RecommendationCard.tsx
 * Feature: Comparison
 *
 * Purpose:
 * Displays the AI recommendation produced by the comparison engine.
 *
 * Responsibilities:
 * - Present the recommended offer.
 * - Display recommendation confidence.
 * - Display estimated savings.
 * - Explain the recommendation.
 *
 * Does NOT:
 * - Execute business logic.
 * -----------------------------------------------------------------------------
 */

import {
  BadgeCheck,
  PackageCheck,
  PiggyBank,
  Sparkles,
  Store,
  Tag,
  Trophy,
} from "lucide-react";

import RecommendationReason from "./RecommendationReason";

import useComparison from "@/features/comparison/hooks/useComparison";

function RecommendationCard() {
  const comparison = useComparison();

  const recommendation = comparison.recommendation;

  return (
    <article
      className="
        rounded-3xl
        border
        border-blue-100
        bg-linear-to-br
        from-blue-50
        to-white
        p-8
      "
    >
      {/* ------------------------------------------------------------------- */}
      {/* Header                                                              */}
      {/* ------------------------------------------------------------------- */}

      <div className="flex items-center gap-4">
        <div
          className="
            rounded-2xl
            bg-amber-100
            p-3
          "
        >
          <Trophy size={26} className="text-amber-600" />
        </div>

        <div>
          <p
            className="
              text-sm
              font-medium
              text-blue-600
            "
          >
            AI Recommendation
          </p>

          <h2
            className="
              mt-1
              text-2xl
              font-bold
              text-slate-900
            "
          >
            {recommendation.title}
          </h2>
        </div>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* Description                                                         */}
      {/* ------------------------------------------------------------------- */}

      <p
        className="
          mt-6
          text-slate-600
          leading-7
        "
      >
        {recommendation.description}
      </p>

      {/* ------------------------------------------------------------------- */}
      {/* Recommendation Details                                              */}
      {/* ------------------------------------------------------------------- */}

      <div
        className="
          mt-8
          grid
          gap-4
          md:grid-cols-3
        "
      >
        <div
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-5
          "
        >
          <div className="flex items-center gap-2">
            <Store size={18} className="text-blue-600" />

            <span className="text-sm font-medium">Store</span>
          </div>

          <p
            className="
              mt-3
              text-lg
              font-semibold
              text-slate-900
            "
          >
            {recommendation.storeName}
          </p>
        </div>

        <div
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-5
          "
        >
          <div className="flex items-center gap-2">
            <Tag size={18} className="text-emerald-600" />

            <span className="text-sm font-medium">Discount</span>
          </div>

          <p
            className="
              mt-3
              text-lg
              font-semibold
              text-emerald-600
            "
          >
            {recommendation.discount}%
          </p>
        </div>

        <div
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-5
          "
        >
          <div className="flex items-center gap-2">
            <PackageCheck size={18} className="text-violet-600" />

            <span className="text-sm font-medium">Availability</span>
          </div>

          <p
            className="
              mt-3
              text-lg
              font-semibold
              text-slate-900
            "
          >
            {recommendation.availability}
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* Analytics                                                           */}
      {/* ------------------------------------------------------------------- */}

      <div
        className="
          mt-8
          grid
          gap-4
          md:grid-cols-2
        "
      >
        <div
          className="
            rounded-2xl
            bg-white
            p-5
            shadow-sm
          "
        >
          <div className="flex items-center gap-2">
            <BadgeCheck size={18} className="text-blue-600" />

            <span className="text-sm font-medium">Confidence</span>
          </div>

          <p
            className="
              mt-3
              text-3xl
              font-bold
              text-slate-900
            "
          >
            {recommendation.confidence}%
          </p>
        </div>

        <div
          className="
            rounded-2xl
            bg-white
            p-5
            shadow-sm
          "
        >
          <div className="flex items-center gap-2">
            <PiggyBank size={18} className="text-emerald-600" />

            <span className="text-sm font-medium">Estimated Savings</span>
          </div>

          <p
            className="
              mt-3
              text-3xl
              font-bold
              text-emerald-600
            "
          >
            ₦{comparison.summary.estimatedSavings.toLocaleString()}
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* Reasons                                                             */}
      {/* ------------------------------------------------------------------- */}

      <div className="mt-10">
        <div className="mb-4 flex items-center gap-2">
          <Sparkles size={18} className="text-blue-600" />

          <h3
            className="
              text-sm
              font-semibold
              uppercase
              tracking-wide
              text-slate-700
            "
          >
            Why this recommendation?
          </h3>
        </div>

        <ul className="space-y-3">
          {recommendation.reasons.map((reason) => (
            <RecommendationReason key={reason} reason={reason} />
          ))}
        </ul>
      </div>
    </article>
  );
}

export default RecommendationCard;
