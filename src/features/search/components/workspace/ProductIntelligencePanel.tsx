import { Activity, BadgeCheck, BrainCircuit, ChartNoAxesCombined, ShieldAlert, ShieldCheck } from "lucide-react";

import type { SearchResultViewModel } from "../../viewmodels/search.viewmodel";

interface ProductIntelligencePanelProps {
  result: SearchResultViewModel;
}

function ProductIntelligencePanel({ result }: ProductIntelligencePanelProps) {
  const analysis = result.aiAnalysis;

  if (!analysis) {
    return null;
  }

  return (
    <section
      aria-label="AI product intelligence"
      className="overflow-hidden rounded-xl border border-slate-200 bg-white"
    >
      <div className="grid lg:grid-cols-[minmax(0,1.6fr)_minmax(330px,0.9fr)]">
        <div className="p-5 lg:p-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
              <BrainCircuit size={19} />
            </span>

            <div>
              <p className="text-xs font-semibold uppercase text-blue-700">
                AI product intelligence
              </p>
              <h2 className="mt-0.5 text-base font-semibold text-slate-950">
                {analysis.recommendationAction}
              </h2>
            </div>

            <span
              className={`ml-auto rounded-full px-3 py-1 text-xs font-semibold ${analysis.recommendationColor}`}
            >
              {analysis.relevanceLabel}
            </span>
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-700">
            {analysis.insight}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            {analysis.recommendationReason}
          </p>

          <div className={`mt-4 flex items-start gap-2 rounded-lg px-3 py-2.5 ${analysis.variantColor}`}>
            {analysis.variantStatus === "verified" ? (
              <BadgeCheck size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
            ) : (
              <ShieldAlert size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
            )}
            <div>
              <p className="text-xs font-semibold">{analysis.variantLabel}</p>
              <p className="mt-0.5 text-xs leading-5 opacity-90">
                {analysis.variantSummary}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 bg-slate-50 p-5 lg:border-l lg:border-t-0 lg:p-6">
          <div className="flex items-start gap-3">
            <ChartNoAxesCombined size={19} className="mt-0.5 shrink-0 text-blue-600" />
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-500">Price outlook</p>
              <p className="mt-1 text-sm font-semibold text-slate-950">
                {analysis.predictionLabel}
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                {analysis.predictionEvidenceLabel}
              </p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className={`rounded-lg px-3 py-2.5 ${analysis.predictionColor}`}>
              <Activity size={15} />
              <p className="mt-1 text-xs font-semibold">
                {analysis.predictionConfidenceLabel}
              </p>
            </div>
            <div className={`rounded-lg px-3 py-2.5 ${analysis.riskColor}`}>
              <ShieldCheck size={15} />
              <p className="mt-1 text-xs font-semibold">
                {analysis.riskLabel}
              </p>
            </div>
          </div>

          <p className="mt-3 text-xs leading-5 text-slate-500">
            {analysis.predictionExplanation}
          </p>
        </div>
      </div>
    </section>
  );
}

export default ProductIntelligencePanel;
