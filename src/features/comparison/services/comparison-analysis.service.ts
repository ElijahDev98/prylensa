/**
 * -----------------------------------------------------------------------------
 * File: comparison-analysis.service.ts
 * Feature: Comparison Domain
 *
 * Purpose:
 * Provides business intelligence for product comparison.
 *
 * Responsibilities:
 * - Lowest price
 * - Highest price
 * - Average price
 * - Price spread
 * - Savings
 *
 * Does NOT:
 * - Render UI
 * - Format values
 * - Manage comparison state
 * -----------------------------------------------------------------------------
 */

export interface ComparisonAnalysis {
  lowestPrice: number;
  highestPrice: number;
  averagePrice: number;
  priceSpread: number;
  potentialSavings: number;
}

function normalize(values: number[]): number[] {
  return values.filter((value) => Number.isFinite(value) && value >= 0);
}

export function calculateLowestPrice(prices: number[]): number {
  const normalized = normalize(prices);

  if (normalized.length === 0) {
    return 0;
  }

  return Math.min(...normalized);
}

export function calculateHighestPrice(prices: number[]): number {
  const normalized = normalize(prices);

  if (normalized.length === 0) {
    return 0;
  }

  return Math.max(...normalized);
}

export function calculateAveragePrice(prices: number[]): number {
  const normalized = normalize(prices);

  if (normalized.length === 0) {
    return 0;
  }

  const total = normalized.reduce((sum, value) => sum + value, 0);

  return total / normalized.length;
}

export function calculatePriceSpread(prices: number[]): number {
  return calculateHighestPrice(prices) - calculateLowestPrice(prices);
}

export function calculatePotentialSavings(prices: number[]): number {
  return calculatePriceSpread(prices);
}

export function analyzePrices(prices: number[]): ComparisonAnalysis {
  const lowestPrice = calculateLowestPrice(prices);

  const highestPrice = calculateHighestPrice(prices);

  const averagePrice = calculateAveragePrice(prices);

  const priceSpread = highestPrice - lowestPrice;

  return {
    lowestPrice,
    highestPrice,
    averagePrice,
    priceSpread,
    potentialSavings: priceSpread,
  };
}
