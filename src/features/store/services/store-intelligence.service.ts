/**
 * -----------------------------------------------------------------------------
 * File: store-intelligence.service.ts
 * Feature: Store Domain
 *
 * Purpose:
 * Builds business intelligence for stores.
 *
 * Responsibilities:
 * - Evaluate store trust.
 * - Evaluate customer reputation.
 * - Evaluate review confidence.
 * - Produce an overall intelligence score.
 *
 * Does NOT:
 * - Compare offers.
 * - Rank products.
 * - Execute comparison logic.
 * -----------------------------------------------------------------------------
 */

import type { Store } from "../types/store.types";

export interface StoreIntelligence {
  /**
   * Store identifier.
   */
  storeId: string;

  /**
   * Overall intelligence score.
   *
   * Range:
   * 0 - 1
   */
  score: number;
}

const TRUST_WEIGHT = 0.45;

const RATING_WEIGHT = 0.3;

const REVIEW_WEIGHT = 0.15;

const VERIFIED_WEIGHT = 0.1;

function calculateTrustScore(store: Store): number {
  return store.trustScore / 100;
}

function calculateRatingScore(store: Store): number {
  return store.rating / 5;
}

function calculateReviewScore(store: Store): number {
  const confidence = Math.min(store.reviewCount, 100000);

  return confidence / 100000;
}

function calculateVerificationScore(store: Store): number {
  return store.verified ? 1 : 0;
}

export function buildStoreIntelligence(store: Store): StoreIntelligence {
  const score =
    calculateTrustScore(store) * TRUST_WEIGHT +
    calculateRatingScore(store) * RATING_WEIGHT +
    calculateReviewScore(store) * REVIEW_WEIGHT +
    calculateVerificationScore(store) * VERIFIED_WEIGHT;

  return {
    storeId: store.id,

    score: Math.min(1, Math.max(0, score)),
  };
}

export function buildStoresIntelligence(
  stores: Store[],
): Map<string, StoreIntelligence> {
  return new Map(
    stores.map((store) => [store.id, buildStoreIntelligence(store)]),
  );
}
