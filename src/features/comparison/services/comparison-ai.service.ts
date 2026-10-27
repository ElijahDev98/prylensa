import { fetchAiComparison } from "../api/comparison-ai.api";

import type { Offer } from "@/features/offer";
import type { Product } from "@/features/product";
import type { Store } from "@/features/store";
import type {
  AiComparisonAnalysisDto,
  AiComparisonResponseDto,
} from "../api/comparison-ai.api";
import type { AiComparisonViewModel } from "../viewmodels/ai-comparison.viewmodel";
import { getComparisonGroupId } from "../utils/comparison-group";

type PriceFormatter = (valueInNgn: number) => string;

export interface AiComparisonGroup {
  comparisonKey: string;
  offers: Array<{
    id: string;
    productId: string;
    title: string;
    brand?: string;
    category?: string;
    price: number;
    originalPrice?: number;
    currency: "NGN";
    imageUrl?: string;
    productUrl?: string;
    marketplace: string;
    inStock: boolean;
    rating?: number;
    reviewCount?: number;
    dataSource?: "live" | "persisted-snapshot";
    observedAt?: string;
    availabilityStatus?: "in-stock" | "out-of-stock" | "unverified";
  }>;
}

export function buildAiComparisonGroups(
  products: Product[],
  offers: Offer[],
  stores: Store[],
): AiComparisonGroup[] {
  const storesById = new Map(stores.map((store) => [store.id, store]));
  const groups = new Map<string, AiComparisonGroup>();

  for (const product of products) {
    const comparisonKey = getComparisonGroupId(product.id);
    const group = groups.get(comparisonKey) ?? {
      comparisonKey,
      offers: [],
    };

    group.offers.push(
      ...offers
        .filter((offer) => offer.productId === product.id)
        .map((offer) => ({
          id: offer.id,
          productId: comparisonKey,
          title: product.title,
          brand: product.brand,
          category: product.category,
          price: offer.currentPrice,
          originalPrice: offer.previousPrice,
          currency: offer.currency,
          imageUrl: product.images[0]?.url,
          productUrl: offer.productUrl,
          marketplace: storesById.get(offer.storeId)?.name ?? offer.storeId,
          inStock: offer.stockStatus === "IN_STOCK" || offer.stockStatus === "LOW_STOCK",
          rating: product.rating,
          reviewCount: product.reviewCount,
          dataSource: offer.dataSource,
          observedAt: offer.observedAt,
          availabilityStatus: offer.availabilityStatus,
        })),
    );

    groups.set(comparisonKey, group);
  }

  return [...groups.values()].filter((group) => group.offers.length > 0);
}

function riskClassName(risk: "high" | "medium" | "low"): string {
  if (risk === "high") {
    return "bg-red-50 text-red-700";
  }

  if (risk === "medium") {
    return "bg-amber-50 text-amber-700";
  }

  return "bg-emerald-50 text-emerald-700";
}

function predictionLabel(
  prediction: AiComparisonAnalysisDto["prediction"],
): string {
  const method = prediction.method ?? "live-marketplace-signals";
  const sampleSize = prediction.sample_size ?? 0;
  const direction =
    prediction.direction.charAt(0).toUpperCase() +
    prediction.direction.slice(1);
  const sign = prediction.change_percentage > 0 ? "+" : "";

  if (method === "baseline-collecting") {
    return "Building price history";
  }

  if (method === "historical-price-stability") {
    return `Stable across ${sampleSize} observations`;
  }

  if (method === "marketplace-spread-signal") {
    return `${direction}ward price pressure`;
  }

  const suffix =
    method === "historical-linear-regression" ? "forecast" : "trend";

  return `${direction} ${sign}${prediction.change_percentage.toFixed(1)}% ${suffix}`;
}

function toViewModel(
  response: AiComparisonResponseDto,
  formatPrice: PriceFormatter,
): AiComparisonViewModel {
  const evidence = response.evidence ?? {
    product_count: response.rankings.length,
    offer_count: response.rankings.length,
    marketplace_count: new Set(
      response.rankings.map((ranking) => ranking.analysis.best_marketplace),
    ).size,
    minimum_marketplaces_per_product: 1,
    rated_offer_percentage: 0,
  };

  return {
    status: "success",
    generatedAt: response.generated_at,
    winnerId: response.winner_id,
    winnerTitle: response.winner_title,
    confidenceLabel: `${response.confidence.toFixed(0)}%`,
    headline: response.headline,
    winnerReason: response.winner_reason,
    evidenceLabel: `${evidence.offer_count} offers · ${evidence.marketplace_count} marketplaces`,
    evidenceLimited: evidence.minimum_marketplaces_per_product < 2,
    priceRange: response.price_range,
    priceRangeLabel: formatPrice(response.price_range),
    rankings: response.rankings.map(({ rank, verdict, scores, analysis }) => {
      return {
        id: analysis.id,
        rank,
        title: analysis.title,
        verdict,
        score: scores.overall,
        scoreLabel: `${scores.overall.toFixed(0)}/100`,
        scoreMetrics: [
          { label: "Deal", value: scores.deal },
          { label: "Quality signal", value: scores.quality },
          { label: "Availability", value: scores.availability },
          { label: "Match evidence", value: scores.market_confidence },
          { label: "Stability", value: scores.stability },
        ],
        bestMarketplace: analysis.best_marketplace,
        bestPrice: analysis.best_price,
        bestPriceLabel: formatPrice(analysis.best_price),
        savingsLabel: `${analysis.savings_percentage.toFixed(1)}% below highest observed offer`,
        riskLabel: `${analysis.risk_level} risk`,
        riskClassName: riskClassName(analysis.risk_level),
        insight: analysis.insight,
        recommendationAction: analysis.recommendation.action,
        recommendationReason: analysis.recommendation.reason,
        predictionLabel: predictionLabel(analysis.prediction),
        variantStatus: analysis.variant_verification.status,
        variantLabel:
          analysis.variant_verification.status === "verified"
            ? "Variant verified"
            : analysis.variant_verification.status === "conflict"
              ? "Variant conflict"
              : analysis.variant_verification.status === "review"
                ? "Check variant details"
                : "Limited variant evidence",
        variantSummary: analysis.variant_verification.summary,
        variantClassName:
          analysis.variant_verification.status === "verified"
            ? "bg-emerald-50 text-emerald-700"
            : analysis.variant_verification.status === "conflict"
              ? "bg-red-50 text-red-700"
              : "bg-amber-50 text-amber-700",
      };
    }),
    error: null,
  };
}

export async function compareProductsWithAi(
  groups: AiComparisonGroup[],
  formatPrice: PriceFormatter,
  signal?: AbortSignal,
): Promise<AiComparisonViewModel> {
  return toViewModel(await fetchAiComparison(groups, signal), formatPrice);
}

export function reformatAiComparison(
  comparison: AiComparisonViewModel,
  formatPrice: PriceFormatter,
): AiComparisonViewModel {
  return {
    ...comparison,
    priceRangeLabel: formatPrice(comparison.priceRange),
    rankings: comparison.rankings.map((product) => ({
      ...product,
      bestPriceLabel: formatPrice(product.bestPrice),
    })),
  };
}
