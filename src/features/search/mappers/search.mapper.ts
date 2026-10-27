/**
 * -----------------------------------------------------------------------------
 * File: search.mapper.ts
 * Feature: Search
 *
 * Purpose:
 * Maps Marketplace Search API DTOs into Search ViewModels.
 *
 * Responsibilities:
 * - Convert backend SearchResultDto objects into SearchResultViewModels.
 * - Convert marketplace offers into presentation models.
 * - Produce SearchSummaryViewModel.
 * - Centralize presentation formatting.
 *
 * Architecture:
 *
 * UI
 *   ↓
 * Hook
 *   ↓
 * Search Service
 *   ↓
 * Search Mapper
 *   ↓
 * Backend DTO
 * -----------------------------------------------------------------------------
 */

import type {
  SearchAiAnalysisDto,
  SearchOfferDto,
  SearchResultDto,
} from "../api/search.api";

import type {
  SearchAiAnalysisViewModel,
  SearchOfferViewModel,
  SearchResultViewModel,
  SearchSummaryViewModel,
} from "../viewmodels/search.viewmodel";
import { toExternalMarketplaceProductUrl } from "@/shared/utils/marketplace-url";

export class SearchMapper {
  private static getRiskColor(risk: "high" | "medium" | "low"): string {
    if (risk === "high") {
      return "bg-red-50 text-red-700";
    }

    if (risk === "medium") {
      return "bg-amber-50 text-amber-700";
    }

    return "bg-emerald-50 text-emerald-700";
  }

  private static getRecommendationColor(
    priority: "high" | "medium" | "low",
  ): string {
    if (priority === "high") {
      return "bg-red-100 text-red-700";
    }

    if (priority === "medium") {
      return "bg-amber-100 text-amber-700";
    }

    return "bg-blue-100 text-blue-700";
  }

  private static toAiAnalysisViewModel(
    analysis?: SearchAiAnalysisDto,
  ): SearchAiAnalysisViewModel | null {
    if (!analysis) {
      return null;
    }

    const prediction = analysis.prediction;
    const variant = analysis.variant_verification;
    const sampleSize = prediction.sample_size ?? 0;
    const method = prediction.method ?? "live-marketplace-signals";
    const predictionSign = prediction.change_percentage > 0 ? "+" : "";
    const direction =
      prediction.direction.charAt(0).toUpperCase() +
      prediction.direction.slice(1);

    let predictionLabel: string;
    let predictionEvidenceLabel: string;
    let predictionColor = "bg-blue-50 text-blue-700";

    if (method === "marketplace-spread-signal") {
      predictionLabel = `${direction}ward price pressure`;
      predictionEvidenceLabel = "Cross-market price signal";
      predictionColor = "bg-amber-50 text-amber-700";
    } else if (method === "historical-price-stability") {
      predictionLabel = "Price stable across searches";
      predictionEvidenceLabel = `${sampleSize} historical observations`;
      predictionColor = "bg-emerald-50 text-emerald-700";
    } else if (
      (method === "historical-price-trend" ||
        method === "historical-linear-regression") &&
      sampleSize >= 2
    ) {
      predictionLabel = `${direction} ${predictionSign}${prediction.change_percentage.toFixed(1)}% ${
        method === "historical-linear-regression" ? "forecast" : "trend"
      }`;
      predictionEvidenceLabel = `${sampleSize} historical observations`;
      predictionColor =
        prediction.direction === "down"
          ? "bg-emerald-50 text-emerald-700"
          : prediction.direction === "up"
            ? "bg-amber-50 text-amber-700"
            : predictionColor;
    } else {
      predictionLabel = "Building price history";
      predictionEvidenceLabel =
        sampleSize === 1 ? "1 baseline observation" : "Awaiting observations";
    }

    return {
      relevanceScore: analysis.relevance_score,
      relevanceLabel: `${analysis.relevance_score.toFixed(0)}% query match`,
      relevanceReason: analysis.relevance_reason,
      insight: analysis.insight,
      confidenceLabel: `${analysis.confidence_score.toFixed(0)}% confidence`,
      evaluationLabel: `${analysis.evaluation_score.toFixed(0)}/100 score`,
      riskLabel: `${analysis.risk_level} risk`,
      riskColor: this.getRiskColor(analysis.risk_level),
      savingsLabel: `${analysis.savings_percentage.toFixed(1)}% saving`,
      predictionLabel,
      predictionExplanation: prediction.explanation,
      predictionEvidenceLabel,
      predictionConfidenceLabel: `${prediction.confidence.toFixed(0)}% outlook confidence`,
      predictionColor,
      recommendationAction: analysis.recommendation.action,
      recommendationReason: analysis.recommendation.reason,
      recommendationPriority: analysis.recommendation.priority,
      recommendationColor: this.getRecommendationColor(
        analysis.recommendation.priority,
      ),
      variantStatus: variant.status,
      variantLabel:
        variant.status === "verified"
          ? "Variant verified"
          : variant.status === "conflict"
            ? "Variant conflict"
            : variant.status === "review"
              ? "Check variant details"
              : "Limited variant evidence",
      variantSummary: variant.summary,
      variantColor:
        variant.status === "verified"
          ? "bg-emerald-50 text-emerald-700"
          : variant.status === "conflict"
            ? "bg-red-50 text-red-700"
            : "bg-amber-50 text-amber-700",
    };
  }

  /**
   * Converts a marketplace offer returned by the backend
   * into a SearchOfferViewModel.
   */
  private static toOfferViewModel(
    offer: SearchOfferDto,
    formatPrice: (value: number) => string,
  ): SearchOfferViewModel {
    const hasOriginalPrice =
      offer.originalPrice !== undefined &&
      Number.isFinite(offer.originalPrice) &&
      offer.originalPrice > offer.price;
    const reportedDiscount = offer.discountPercentage;
    const discountPercentage =
      reportedDiscount !== undefined &&
      Number.isFinite(reportedDiscount) &&
      reportedDiscount > 0 &&
      reportedDiscount < 100
        ? Math.round(reportedDiscount * 10) / 10
        : hasOriginalPrice
          ? Math.round(
              (((offer.originalPrice as number) - offer.price) /
                (offer.originalPrice as number)) *
                1000,
            ) / 10
          : undefined;
    const originalPrice = hasOriginalPrice ? offer.originalPrice : undefined;

    return {
      id: offer.id,

      productTitle: offer.title,

      brand: offer.brand ?? "",

      imageUrl: offer.imageUrl,

      /**
       * Marketplace acts as the store identifier.
       */
      storeId: offer.marketplace,

      /**
       * Marketplace acts as the display name.
       */
      storeName: offer.marketplace,

      currentPrice: offer.price,

      currentPriceLabel: formatPrice(offer.price),

      originalPrice,

      originalPriceLabel:
        originalPrice !== undefined ? formatPrice(originalPrice) : undefined,

      discountPercentage,

      inStock: offer.inStock,

      productUrl: toExternalMarketplaceProductUrl(
        offer.productUrl,
        offer.marketplace,
      ),

      dataSource: offer.dataSource ?? "live",

      observedAt: offer.observedAt,

      availabilityStatus:
        offer.availabilityStatus ?? (offer.inStock ? "in-stock" : "out-of-stock"),
    };
  }

  /**
   * Converts a grouped marketplace search result
   * into a SearchResultViewModel.
   */
  public static toSearchResultViewModel(
    result: SearchResultDto,
    formatPrice: (value: number) => string,
  ): SearchResultViewModel {
    const offers = [...result.offers]
      .map((offer) => this.toOfferViewModel(offer, formatPrice))
      .sort((left, right) => {
        const availabilityRank = (offer: SearchOfferViewModel) =>
          offer.availabilityStatus === "in-stock"
            ? 0
            : offer.availabilityStatus === "unverified"
              ? 1
              : 2;
        return availabilityRank(left) - availabilityRank(right) ||
          left.currentPrice - right.currentPrice;
      });

    const representativeProduct = result.offers[0];

    return {
      /**
       * Use the comparison key as the stable identifier.
       */
      id: result.comparisonKey,

      /**
       * Display information comes from the first offer.
       */
      title: representativeProduct?.title ?? "",

      brand: representativeProduct?.brand ?? "",

      /**
       * Category is not currently returned by the backend.
       */
      category: "",

      /**
       * Thumbnail comes from the representative offer.
       */
      thumbnail: representativeProduct?.imageUrl ?? "",

      /**
       * The backend currently exposes a single image.
       * Until multiple images are supported, expose it
       * as a one-item gallery.
       */
      images: representativeProduct?.imageUrl
        ? [
            {
              id: `${result.comparisonKey}-primary`,
              url: representativeProduct.imageUrl,
              alt: representativeProduct.title,
            },
          ]
        : [],

      /**
       * Rating will be added later.
       */
      rating: representativeProduct?.rating ?? 0,

      /**
       * Review count is not currently available.
       */
      reviewCount: 0,

      /**
       * Product specifications will be added
       * by the backend later.
       */
      specifications: [],

      offerCount: result.offerCount,

      hasOffers: offers.length > 0,

      lowestOffer:
        offers.find((offer) => offer.availabilityStatus === "in-stock") ?? null,

      offers,

      aiAnalysis: this.toAiAnalysisViewModel(result.aiAnalysis),
    };
  }

  /**
   * Converts backend search results into SearchResultViewModels.
   */
  public static toSearchResultViewModels(
    results: readonly SearchResultDto[],
    formatPrice: (value: number) => string,
  ): SearchResultViewModel[] {
    return results.map((result) =>
      this.toSearchResultViewModel(result, formatPrice),
    );
  }

  public static reformatSearchResultViewModels(
    results: readonly SearchResultViewModel[],
    formatPrice: (value: number) => string,
  ): SearchResultViewModel[] {
    return results.map((result) => {
      const offers = result.offers.map((offer) => ({
        ...offer,
        currentPriceLabel: formatPrice(offer.currentPrice),
        originalPriceLabel:
          offer.originalPrice === undefined
            ? undefined
            : formatPrice(offer.originalPrice),
      }));

      return {
        ...result,
        offers,
        lowestOffer:
          offers.find((offer) => offer.availabilityStatus === "in-stock") ?? null,
      };
    });
  }

  /**
   * Produces the Search Summary ViewModel.
   */
  public static toSearchSummaryViewModel(
    results: readonly SearchResultViewModel[],
    formatPrice: (value: number) => string,
  ): SearchSummaryViewModel {
    if (results.length === 0) {
      return {
        resultCount: 0,
        storeCount: 0,
        lowestPrice: 0,
        lowestPriceLabel: formatPrice(0),
        averagePrice: 0,
        averagePriceLabel: formatPrice(0),
        bestQueryMatch: 0,
        bestQueryMatchLabel: "0%",
      };
    }

    const uniqueStores = new Set<string>();
    const prices: number[] = [];

    for (const result of results) {
      for (const offer of result.offers) {
        uniqueStores.add(offer.storeId);
        prices.push(offer.currentPrice);
      }
    }

    const lowestPrice = Math.min(...prices);

    const averagePrice =
      prices.length === 0
        ? 0
        : Math.round(
            prices.reduce((sum, price) => sum + price, 0) / prices.length,
          );

    const bestQueryMatch = Math.max(
      ...results.map((result) => result.aiAnalysis?.relevanceScore ?? 0),
    );

    return {
      resultCount: results.length,

      storeCount: uniqueStores.size,

      lowestPrice,

      lowestPriceLabel: formatPrice(lowestPrice),

      averagePrice,

      averagePriceLabel: formatPrice(averagePrice),

      bestQueryMatch,

      bestQueryMatchLabel: `${bestQueryMatch.toFixed(0)}%`,
    };
  }
}
