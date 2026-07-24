/**
 * -----------------------------------------------------------------------------
 * File: AIRecommendationsPage.tsx
 * Feature: AI Recommendations
 *
 * Purpose:
 * Entry page for future AI-assisted buying recommendations.
 * -----------------------------------------------------------------------------
 */

import { Sparkles } from "lucide-react";

function AIRecommendationsPage() {
  return (
    <section className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-8">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600">
            <Sparkles size={28} />
          </div>

          <div>
            <h1 className="text-2xl font-semibold text-slate-950">
              AI Recommendations
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Smart buying advice, similar products, better alternatives and
              price intelligence will live here as the AI service is connected.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AIRecommendationsPage;
