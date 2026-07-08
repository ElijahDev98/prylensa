/**
 * -----------------------------------------------------------------------------
 * File: comparison-ranking.ts
 * Feature: Comparison Analysis
 *
 * Purpose:
 * Determines the best comparison offer.
 * -----------------------------------------------------------------------------
 */

import type { Store } from "@/features/store/types/store.types";

import { buildStoresIntelligence } from "@/features/store/services/store-intelligence.service";

import type {
  AnalysisOffer,
  ComparisonRecommendation,
} from "./comparison-types";

const PRICE_WEIGHT = 0.45;

const DISCOUNT_WEIGHT = 0.2;

const AVAILABILITY_WEIGHT = 0.2;

const STORE_WEIGHT = 0.15;

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
  return Math.min(offer.discount ?? 0, 50) / 50;
}

function calculateAvailabilityScore(offer: AnalysisOffer): number {
  return offer.availability === "IN_STOCK" ? 1 : 0;
}

function calculateStoreScore(
  offer: AnalysisOffer,
  stores: Map<
    string,
    ReturnType<typeof buildStoresIntelligence> extends Map<string, infer T>
      ? T
      : never
  >,
): number {
  return stores.get(offer.storeId)?.score ?? 0;
}

export function calculateOfferScore(
  offer: AnalysisOffer,
  lowestPrice: number,
  highestPrice: number,
  stores: Map<
    string,
    ReturnType<typeof buildStoresIntelligence> extends Map<string, infer T>
      ? T
      : never
  >,
): number {
  const score =
    calculatePriceScore(offer, lowestPrice, highestPrice) * PRICE_WEIGHT +
    calculateDiscountScore(offer) * DISCOUNT_WEIGHT +
    calculateAvailabilityScore(offer) * AVAILABILITY_WEIGHT +
    calculateStoreScore(offer, stores) * STORE_WEIGHT;

  return Math.min(1, Math.max(0, score));
}

export function buildRecommendation(
  offers: AnalysisOffer[],
  stores: Store[],
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

  const intelligence = buildStoresIntelligence(stores);

  let recommendation: ComparisonRecommendation | undefined;

  for (const offer of offers) {
    const score = calculateOfferScore(
      offer,
      lowestPrice,
      highestPrice,
      intelligence,
    );

    if (recommendation === undefined || score > recommendation.score) {
      recommendation = {
        offer,

        score,
      };
    }
  }

  return recommendation;
}
