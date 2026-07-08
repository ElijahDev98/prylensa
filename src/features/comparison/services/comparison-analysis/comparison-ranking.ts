/**
 * -----------------------------------------------------------------------------
 * File: comparison-ranking.ts
 * Feature: Comparison Analysis
 *
 * Purpose:
 * Determines the best comparison offer.
 *
 * Responsibilities:
 * - Score offers.
 * - Rank offers.
 * - Recommend the best offer.
 *
 * Does NOT:
 * - Normalize comparison rows.
 * - Calculate metrics.
 * - Generate insights.
 * -----------------------------------------------------------------------------
 */

import type {
  AnalysisOffer,
  ComparisonRecommendation,
} from "./comparison-types";

const PRICE_WEIGHT = 0.5;

const DISCOUNT_WEIGHT = 0.3;

const AVAILABILITY_WEIGHT = 0.2;

function calculatePriceScore(
  offer: AnalysisOffer,
  highestPrice: number,
): number {
  if (offer.price === undefined || highestPrice <= 0) {
    return 0;
  }

  return (highestPrice - offer.price) / highestPrice;
}

function calculateDiscountScore(offer: AnalysisOffer): number {
  return (offer.discount ?? 0) / 100;
}

function calculateAvailabilityScore(offer: AnalysisOffer): number {
  return offer.availability === "IN_STOCK" ? 1 : 0;
}

export function calculateOfferScore(
  offer: AnalysisOffer,
  highestPrice: number,
): number {
  return (
    calculatePriceScore(offer, highestPrice) * PRICE_WEIGHT +
    calculateDiscountScore(offer) * DISCOUNT_WEIGHT +
    calculateAvailabilityScore(offer) * AVAILABILITY_WEIGHT
  );
}

export function buildRecommendation(
  offers: AnalysisOffer[],
): ComparisonRecommendation | undefined {
  if (offers.length === 0) {
    return undefined;
  }

  const highestPrice = Math.max(...offers.map((offer) => offer.price ?? 0));

  let recommendation: ComparisonRecommendation | undefined;

  for (const offer of offers) {
    const score = calculateOfferScore(offer, highestPrice);

    if (!recommendation || score > recommendation.score) {
      recommendation = {
        offer,

        score,
      };
    }
  }

  return recommendation;
}
