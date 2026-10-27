/**
 * -----------------------------------------------------------------------------
 * File: AIRecommendationsPage.tsx
 * Feature: AI Recommendations
 *
 * Purpose:
 * Displays AI-assisted buying recommendations from live dashboard intelligence.
 * -----------------------------------------------------------------------------
 */

import {
  ArrowRight,
  BadgeCheck,
  BellPlus,
  Brain,
  RefreshCw,
  Search,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "@/app/router/routes";
import useDashboard from "@/features/dashboard/hooks/useDashboard";
import {
  recommendationActionLabel,
  recommendationDestination,
} from "./services/recommendation-navigation";
import {
  submitRecommendationFeedback,
  type RecommendationFeedback,
} from "./services/recommendation-feedback.service";

function AIRecommendationsPage() {
  const dashboard = useDashboard();
  const navigate = useNavigate();
  const [feedbackById, setFeedbackById] = useState<
    Record<string, RecommendationFeedback>
  >({});
  const [savingFeedbackId, setSavingFeedbackId] = useState<string | null>(null);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);

  async function recordFeedback(
    recommendationId: string,
    feedback: RecommendationFeedback,
  ): Promise<void> {
    setSavingFeedbackId(recommendationId);
    setFeedbackError(null);
    try {
      await submitRecommendationFeedback(recommendationId, feedback);
      setFeedbackById((current) => ({ ...current, [recommendationId]: feedback }));
    } catch {
      setFeedbackError("Feedback could not be saved. Please try again.");
    } finally {
      setSavingFeedbackId(null);
    }
  }

  const topProducts = dashboard.trendingProducts.slice(0, 4);

  return (
    <section className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6">
      <header className="rounded-3xl border border-slate-200 bg-white p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600">
              <Sparkles size={28} />
            </div>

            <div>
              <p className="text-sm font-semibold text-blue-600">
                Buying intelligence
              </p>

              <h1 className="mt-1 text-2xl font-semibold text-slate-950">
                AI Recommendations
              </h1>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
                Recommendations are generated from live marketplace prices,
                stock status, store coverage and product quality signals.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={dashboard.refreshDashboard}
              disabled={dashboard.refreshing}
              title="Refresh recommendations"
              className="rounded-xl border border-slate-200 bg-white p-3 text-slate-600 hover:bg-slate-50 disabled:opacity-50"
            >
              <RefreshCw size={18} className={dashboard.refreshing ? "animate-spin" : ""} />
            </button>
            <button
              type="button"
              onClick={() => navigate(ROUTES.SEARCH)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              <Search size={17} />
              Search Product
            </button>
          </div>
        </div>
      </header>

      {dashboard.loading ? (
        <section className="rounded-3xl border border-slate-200 bg-white p-8 text-sm text-slate-500">
          Loading recommendation intelligence...
        </section>
      ) : dashboard.error ? (
        <section className="rounded-3xl border border-red-200 bg-red-50 p-5 text-sm font-medium text-red-700">
          {dashboard.error}
        </section>
      ) : (
        <div className="grid gap-6 lg:grid-cols-12">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 lg:col-span-7">
            <div className="mb-5 flex items-center gap-3">
              <Brain size={22} className="text-blue-600" />
              <h2 className="text-lg font-semibold text-slate-900">
                Recommended Actions
              </h2>
            </div>

            <div className="space-y-4">
              {feedbackError && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                  {feedbackError}
                </p>
              )}
              {dashboard.recommendations.map((recommendation) => (
                <article
                  key={recommendation.id}
                  className="rounded-2xl border border-slate-200 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {recommendation.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        {recommendation.description}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${recommendation.badgeColor}`}
                    >
                      {recommendation.priority}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => navigate(recommendationDestination(recommendation))}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
                    >
                      {recommendationActionLabel(recommendation) === "Create alert" ? (
                        <BellPlus size={16} />
                      ) : (
                        <Search size={16} />
                      )}
                      {recommendationActionLabel(recommendation)}
                    </button>

                    {recommendation.feedbackEnabled && (
                      <div className="flex items-center gap-1" aria-label="Rate recommendation">
                        {(["helpful", "not-helpful"] as const).map((feedback) => {
                          const selected =
                            (feedbackById[recommendation.id] ?? recommendation.feedback) === feedback;
                          const Icon = feedback === "helpful" ? ThumbsUp : ThumbsDown;
                          return (
                            <button
                              key={feedback}
                              type="button"
                              onClick={() => void recordFeedback(recommendation.id, feedback)}
                              disabled={savingFeedbackId === recommendation.id}
                              title={feedback === "helpful" ? "Helpful" : "Not helpful"}
                              aria-pressed={selected}
                              className={`rounded-lg border p-2 transition-colors disabled:opacity-50 ${
                                selected
                                  ? "border-blue-200 bg-blue-50 text-blue-700"
                                  : "border-slate-200 text-slate-500 hover:bg-slate-50"
                              }`}
                            >
                              <Icon size={15} aria-hidden="true" />
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 lg:col-span-5">
            <div className="mb-5 flex items-center gap-3">
              <BadgeCheck size={22} className="text-emerald-600" />
              <h2 className="text-lg font-semibold text-slate-900">
                Supporting Quality Signals
              </h2>
            </div>

            <div className="space-y-4">
              {topProducts.map((product) => (
                <article
                  key={product.id}
                  className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 p-4"
                >
                  <div className="min-w-0">
                    <h3 className="truncate font-semibold text-slate-900">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Best at {product.bestPriceStoreLabel}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${product.qualityColor}`}
                  >
                    {product.qualityScoreLabel}
                  </span>
                </article>
              ))}
            </div>

            <button
              type="button"
              onClick={() => navigate(ROUTES.COMPARE)}
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
            >
              Open comparison
              <ArrowRight size={16} />
            </button>
          </section>
        </div>
      )}
    </section>
  );
}

export default AIRecommendationsPage;
