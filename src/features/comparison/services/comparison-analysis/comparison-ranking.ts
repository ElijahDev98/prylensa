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

const PRICE_WEIGHT = 0.55;

const DISCOUNT_WEIGHT = 0.25;

const AVAILABILITY_WEIGHT = 0.2;

function calculatePriceScore(
  offer: AnalysisOffer,
  lowestPrice: number,
  highestPrice: number,
): number {
  if (offer.price === undefined || highestPrice <= lowestPrice) {
    return 0;
  }

  return (highestPrice - offer.price) / (highestPrice - lowestPrice);
}

function calculateDiscountScore(offer: AnalysisOffer): number {
  const discount = Math.min(offer.discount ?? 0, 50);

  return discount / 50;
}

function calculateAvailabilityScore(offer: AnalysisOffer): number {
  return offer.availability === "IN_STOCK" ? 1 : 0;
}

export function calculateOfferScore(
  offer: AnalysisOffer,
  lowestPrice: number,
  highestPrice: number,
): number {
  const score =
    calculatePriceScore(offer, lowestPrice, highestPrice) * PRICE_WEIGHT +
    calculateDiscountScore(offer) * DISCOUNT_WEIGHT +
    calculateAvailabilityScore(offer) * AVAILABILITY_WEIGHT;

  return Math.max(0, Math.min(score, 1));
}

export function buildRecommendation(
  offers: AnalysisOffer[],
): ComparisonRecommendation | undefined {
  if (offers.length === 0) {
    return undefined;
  }

  const prices = offers
    .map((offer) => offer.price)
    .filter((price): price is number => price !== undefined);

  if (prices.length === 0) {
    return undefined;
  }

  const lowestPrice = Math.min(...prices);

  const highestPrice = Math.max(...prices);

  let recommendation: ComparisonRecommendation | undefined;

  for (const offer of offers) {
    const score = calculateOfferScore(offer, lowestPrice, highestPrice);

    if (recommendation === undefined || score > recommendation.score) {
      recommendation = {
        offer,

        score,
      };
    }
  }

  return recommendation;
}
