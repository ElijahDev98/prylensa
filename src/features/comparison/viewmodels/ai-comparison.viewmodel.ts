export type AiComparisonStatus = "idle" | "loading" | "success" | "error";

export interface AiRankedProductViewModel {
  id: string;
  rank: number;
  title: string;
  verdict: string;
  score: number;
  scoreLabel: string;
  scoreMetrics: Array<{
    label: string;
    value: number;
  }>;
  bestMarketplace: string;
  bestPrice: number;
  bestPriceLabel: string;
  savingsLabel: string;
  riskLabel: string;
  riskClassName: string;
  insight: string;
  recommendationAction: string;
  recommendationReason: string;
  predictionLabel: string;
  variantStatus: "verified" | "review" | "conflict" | "insufficient";
  variantLabel: string;
  variantSummary: string;
  variantClassName: string;
}

export interface AiComparisonViewModel {
  status: AiComparisonStatus;
  generatedAt: string;
  winnerId: string | null;
  winnerTitle: string | null;
  confidenceLabel: string;
  headline: string;
  winnerReason: string;
  evidenceLabel: string;
  evidenceLimited: boolean;
  priceRange: number;
  priceRangeLabel: string;
  rankings: AiRankedProductViewModel[];
  error: string | null;
}

export const EMPTY_AI_COMPARISON: AiComparisonViewModel = {
  status: "idle",
  generatedAt: "",
  winnerId: null,
  winnerTitle: null,
  confidenceLabel: "0%",
  headline: "",
  winnerReason: "",
  evidenceLabel: "No evidence",
  evidenceLimited: true,
  priceRange: 0,
  priceRangeLabel: "0",
  rankings: [],
  error: null,
};
