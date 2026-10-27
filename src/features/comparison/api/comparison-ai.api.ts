import type { AiComparisonGroup } from "../services/comparison-ai.service";
import { authenticatedFetch } from "@/features/auth/services/authenticated-fetch";

export interface AiComparisonAnalysisDto {
  id: string;
  title: string;
  best_marketplace: string;
  currency: string;
  best_price: number;
  highest_price: number;
  average_price: number;
  savings_percentage: number;
  price_spread: number;
  price_volatility_score: number;
  confidence_score: number;
  evaluation_score: number;
  risk_level: "high" | "medium" | "low";
  variant_verification: {
    status: "verified" | "review" | "conflict" | "insufficient";
    confidence: number;
    summary: string;
    matched_attributes: string[];
    conflicting_attributes: string[];
    incomplete_attributes: string[];
  };
  insight: string;
  prediction: {
    direction: "up" | "down" | "stable";
    change_percentage: number;
    confidence: number;
    explanation: string;
    sample_size?: number;
    method?:
      | "baseline-collecting"
      | "historical-linear-regression"
      | "historical-price-stability"
      | "historical-price-trend"
      | "marketplace-spread-signal"
      | "live-marketplace-signals";
  };
  recommendation: {
    action: string;
    priority: "high" | "medium" | "low";
    reason: string;
  };
}

export interface AiComparisonResponseDto {
  generated_at: string;
  winner_id: string | null;
  winner_title: string | null;
  confidence: number;
  headline: string;
  winner_reason: string;
  price_range: number;
  evidence?: {
    product_count: number;
    offer_count: number;
    marketplace_count: number;
    minimum_marketplaces_per_product: number;
    rated_offer_percentage: number;
  };
  rankings: Array<{
    rank: number;
    verdict: string;
    scores: {
      overall: number;
      deal: number;
      quality: number;
      availability: number;
      market_confidence: number;
      stability: number;
    };
    analysis: AiComparisonAnalysisDto;
  }>;
}

interface BackendResponse<T> {
  success: boolean;
  data: T;
}

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000";

export async function fetchAiComparison(
  groups: AiComparisonGroup[],
  signal?: AbortSignal,
): Promise<AiComparisonResponseDto> {
  const response = await authenticatedFetch(`${API_BASE_URL}/api/v1/ai/compare`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ groups }),
    signal,
  });

  if (!response.ok) {
    throw new Error(`AI comparison failed (${response.status}).`);
  }

  const body = (await response.json()) as BackendResponse<AiComparisonResponseDto>;

  if (!body.success || !body.data) {
    throw new Error("AI comparison returned an invalid response.");
  }

  return body.data;
}
