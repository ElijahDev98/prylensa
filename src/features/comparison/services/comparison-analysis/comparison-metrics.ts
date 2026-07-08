/**
 * -----------------------------------------------------------------------------
 * File: comparison-metrics.ts
 * Feature: Comparison Analysis
 *
 * Purpose:
 * Calculates numerical comparison metrics.
 *
 * Responsibilities:
 * - Lowest price.
 * - Highest price.
 * - Average price.
 * - Price spread.
 * - Potential savings.
 * - Comparison summary.
 *
 * Does NOT:
 * - Normalize rows.
 * - Rank offers.
 * - Generate insights.
 * -----------------------------------------------------------------------------
 */

import type { AnalysisOffer, ComparisonSummary } from "./comparison-types";

function getValidPrices(offers: AnalysisOffer[]): number[] {
  return offers.flatMap((offer) =>
    typeof offer.price === "number" ? [offer.price] : [],
  );
}

export function calculateLowestPrice(offers: AnalysisOffer[]): number {
  const prices = getValidPrices(offers);

  if (prices.length === 0) {
    return 0;
  }

  return Math.min(...prices);
}

export function calculateHighestPrice(offers: AnalysisOffer[]): number {
  const prices = getValidPrices(offers);

  if (prices.length === 0) {
    return 0;
  }

  return Math.max(...prices);
}

export function calculateAveragePrice(offers: AnalysisOffer[]): number {
  const prices = getValidPrices(offers);

  if (prices.length === 0) {
    return 0;
  }

  const total = prices.reduce((sum, price) => sum + price, 0);

  return total / prices.length;
}

export function calculatePriceSpread(offers: AnalysisOffer[]): number {
  const lowestPrice = calculateLowestPrice(offers);

  const highestPrice = calculateHighestPrice(offers);

  return highestPrice - lowestPrice;
}

export function calculatePotentialSavings(offers: AnalysisOffer[]): number {
  return calculatePriceSpread(offers);
}

export function buildComparisonSummary(
  offers: AnalysisOffer[],
): ComparisonSummary {
  const lowestPrice = calculateLowestPrice(offers);

  const highestPrice = calculateHighestPrice(offers);

  const averagePrice = calculateAveragePrice(offers);

  const priceSpread = highestPrice - lowestPrice;

  return {
    lowestPrice,

    highestPrice,

    averagePrice,

    priceSpread,

    potentialSavings: priceSpread,
  };
}
