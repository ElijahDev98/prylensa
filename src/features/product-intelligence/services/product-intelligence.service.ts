/**
 * -----------------------------------------------------------------------------
 * File: product-intelligence.service.ts
 * Feature: Product Intelligence
 *
 * Purpose:
 * Stores lightweight product intelligence derived from user search and
 * comparison activity.
 * -----------------------------------------------------------------------------
 */

import type { ComparisonSelectedProduct } from "@/features/comparison/services/comparison.service";
import type { SearchResultViewModel } from "@/features/search/viewmodels/search.viewmodel";

import { loadGuestSession } from "@/features/auth/services/auth-session.service";
import { authenticatedFetch } from "@/features/auth/services/authenticated-fetch";
import { readMigratedStorageValue } from "@/shared/utils/migrated-storage";

export interface ProductIntelligenceItem {
  id: string;
  name: string;
  category: string;
  currentPrice: number;
  averagePrice: number;
  priceChangePercentage: number;
  stores: string[];
  bestPriceStore: string;
  trendHistory: number[];
  thumbnail?: string;
  qualityScore: number;
  qualityLabel: string;
  aiRecommendation?: {
    action: string;
    reason: string;
    insight: string;
    priority: "high" | "medium" | "low";
  };
  source: "search" | "comparison";
  updatedAt: string;
}

const STORAGE_KEY = "prylensa.product-intelligence";
const LEGACY_STORAGE_KEY = "priciq.product-intelligence";
const MAX_ITEMS = 12;
const MAX_PLAUSIBLE_PRICE_MOVEMENT_PERCENTAGE = 80;
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000";

let lastRecordedSearchKey = "";
const intelligenceListeners = new Set<() => void>();

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readItems(): ProductIntelligenceItem[] {
  if (!canUseStorage()) {
    return [];
  }

  try {
    const rawValue = readMigratedStorageValue(
      STORAGE_KEY,
      LEGACY_STORAGE_KEY,
    );

    if (!rawValue) {
      return [];
    }

    const value = JSON.parse(rawValue);

    return Array.isArray(value) ? (value as ProductIntelligenceItem[]) : [];
  } catch {
    return [];
  }
}

function writeItems(items: ProductIntelligenceItem[]): void {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function notifyIntelligenceUpdated(): void {
  intelligenceListeners.forEach((listener) => listener());
}

function getAveragePrice(prices: number[]): number {
  if (prices.length === 0) {
    return 0;
  }

  return Math.round(prices.reduce((sum, price) => sum + price, 0) / prices.length);
}

function getQualityLabel(score: number): string {
  if (score >= 85) {
    return "Excellent";
  }

  if (score >= 70) {
    return "Strong";
  }

  if (score >= 50) {
    return "Fair";
  }

  return "Limited";
}

function getTrendHistory(currentPrice: number, previousPrice?: number): number[] {
  const rawMovement = previousPrice && previousPrice > 0
    ? Math.abs(((currentPrice - previousPrice) / previousPrice) * 100)
    : 0;
  const startPrice = previousPrice && previousPrice > 0 &&
    rawMovement <= MAX_PLAUSIBLE_PRICE_MOVEMENT_PERCENTAGE
    ? previousPrice
    : currentPrice;

  return startPrice === currentPrice
    ? [currentPrice]
    : [startPrice, currentPrice];
}

function getPriceChangePercentage(currentPrice: number, previousPrice?: number): number {
  if (!previousPrice || previousPrice <= 0) return 0;

  const change = Math.round(((currentPrice - previousPrice) / previousPrice) * 100);
  return Math.abs(change) <= MAX_PLAUSIBLE_PRICE_MOVEMENT_PERCENTAGE ? change : 0;
}

function mergeItems(nextItems: ProductIntelligenceItem[]): void {
  const existingItems = readItems();
  const mergedById = new Map<string, ProductIntelligenceItem>();

  for (const item of [...nextItems, ...existingItems]) {
    if (!mergedById.has(item.id)) {
      mergedById.set(item.id, item);
    }
  }

  const mergedItems = [...mergedById.values()]
    .sort(
      (left, right) =>
        new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime(),
    )
    .slice(0, MAX_ITEMS);

  writeItems(mergedItems);
  notifyIntelligenceUpdated();
}

export function subscribeProductIntelligence(
  listener: () => void,
): () => void {
  intelligenceListeners.add(listener);

  return () => {
    intelligenceListeners.delete(listener);
  };
}

function syncSearchActivity(query: string): void {
  const session = loadGuestSession();

  if (!session) {
    return;
  }

  const recordKey = `${session.user.id}:${query.toLowerCase()}`;

  if (recordKey === lastRecordedSearchKey) {
    return;
  }

  lastRecordedSearchKey = recordKey;

  void authenticatedFetch(`${API_BASE_URL}/api/v1/intelligence/searches`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
    }),
  }).catch(() => {
    lastRecordedSearchKey = "";
  });
}

export function getProductIntelligenceItems(): ProductIntelligenceItem[] {
  return readItems();
}

export function recordSearchIntelligence(
  query: string,
  results: SearchResultViewModel[],
): void {
  const trimmedQuery = query.trim();

  if (trimmedQuery.length === 0 || results.length === 0) {
    return;
  }

  syncSearchActivity(trimmedQuery);

  const now = new Date().toISOString();

  const items = results.slice(0, 6).flatMap((result) => {
    const bestOffer = result.lowestOffer;

    if (!bestOffer) {
      return [];
    }

    const prices = result.offers.map((offer) => offer.currentPrice);
    const stores = [...new Set(result.offers.map((offer) => offer.storeName))];
    const inStockRatio =
      result.offers.filter((offer) => offer.inStock).length /
      Math.max(result.offers.length, 1);
    const coverageScore = Math.min(stores.length / 4, 1) * 25;
    const ratingScore = (result.rating > 0 ? result.rating / 5 : 0.7) * 25;
    const stockScore = inStockRatio * 35;
    const discountScore = Math.min((bestOffer.discountPercentage ?? 0) / 30, 1) * 15;
    const qualityScore = Math.round(
      stockScore + ratingScore + coverageScore + discountScore,
    );
    const priceChangePercentage = getPriceChangePercentage(
      bestOffer.currentPrice,
      bestOffer.originalPrice,
    );

    return [
      {
        id: result.id,
        name: result.title,
        category: result.brand || result.category || trimmedQuery,
        currentPrice: bestOffer.currentPrice,
        averagePrice: getAveragePrice(prices),
        priceChangePercentage,
        stores,
        bestPriceStore: bestOffer.storeName,
        trendHistory: getTrendHistory(
          bestOffer.currentPrice,
          bestOffer.originalPrice,
        ),
        thumbnail: result.thumbnail,
        qualityScore,
        qualityLabel: getQualityLabel(qualityScore),
        aiRecommendation: result.aiAnalysis
          ? {
              action: result.aiAnalysis.recommendationAction,
              reason: result.aiAnalysis.recommendationReason,
              insight: result.aiAnalysis.insight,
              priority: result.aiAnalysis.recommendationPriority,
            }
          : undefined,
        source: "search" as const,
        updatedAt: now,
      },
    ];
  });

  mergeItems(items);
}

export function recordComparisonIntelligence(
  product: ComparisonSelectedProduct,
): void {
  if (product.offers.length === 0) {
    return;
  }

  const bestOffer = [...product.offers].sort(
    (left, right) => left.currentPrice - right.currentPrice,
  )[0];

  if (!bestOffer) {
    return;
  }

  const prices = product.offers.map((offer) => offer.currentPrice);
  const stores = [...new Set(product.offers.map((offer) => offer.storeId))];
  const inStockRatio =
    product.offers.filter((offer) => offer.stockStatus === "IN_STOCK").length /
    Math.max(product.offers.length, 1);
  const coverageScore = Math.min(stores.length / 4, 1) * 25;
  const ratingScore = (product.rating > 0 ? product.rating / 5 : 0.7) * 25;
  const stockScore = inStockRatio * 35;
  const discountScore = Math.min(bestOffer.discount / 30, 1) * 15;
  const qualityScore = Math.round(
    stockScore + ratingScore + coverageScore + discountScore,
  );
  const priceChangePercentage = getPriceChangePercentage(
    bestOffer.currentPrice,
    bestOffer.previousPrice,
  );

  mergeItems([
    {
      id: product.id,
      name: product.title,
      category: product.brand || product.category,
      currentPrice: bestOffer.currentPrice,
      averagePrice: getAveragePrice(prices),
      priceChangePercentage,
      stores,
      bestPriceStore: bestOffer.storeId,
      trendHistory: getTrendHistory(bestOffer.currentPrice, bestOffer.previousPrice),
      thumbnail: product.imageUrl,
      qualityScore,
      qualityLabel: getQualityLabel(qualityScore),
      source: "comparison",
      updatedAt: new Date().toISOString(),
    },
  ]);
}
