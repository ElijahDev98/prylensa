/**
 * -----------------------------------------------------------------------------
 * File: dashboard-user-intelligence.service.ts
 * Feature: Dashboard
 *
 * Purpose:
 * Merges user search/comparison activity into backend dashboard intelligence.
 * -----------------------------------------------------------------------------
 */

import { getProductIntelligenceItems } from "@/features/product-intelligence";

import type {
  DashboardModel,
  PriceAlertModel,
  RecentComparisonModel,
  RecommendationModel,
  TrendingProductModel,
} from "../models/dashboard.model";

import type { ProductIntelligenceItem } from "@/features/product-intelligence";

function toTrendingProduct(item: ProductIntelligenceItem): TrendingProductModel {
  return {
    id: item.id,
    name: item.name,
    category: item.category,
    currentPrice: item.currentPrice,
    averagePrice: item.averagePrice,
    priceChangePercentage: item.priceChangePercentage,
    trend: item.priceChangePercentage > 0 ? "up" : "down",
    stores: item.stores,
    bestPriceStore: item.bestPriceStore,
    isBestPrice: true,
    trendHistory: item.trendHistory,
    thumbnail: item.thumbnail,
    qualityScore: item.qualityScore,
    qualityLabel: item.qualityLabel,
  };
}

function toRecommendation(item: ProductIntelligenceItem): RecommendationModel {
  if (item.aiRecommendation) {
    return {
      id: `${item.id}-user-ai`,
      title: `${item.aiRecommendation.action}: ${item.name}`,
      description:
        item.aiRecommendation.reason || item.aiRecommendation.insight,
      priority: item.aiRecommendation.priority,
    };
  }

  if (item.qualityScore >= 80 && item.priceChangePercentage <= 0) {
    return {
      id: `${item.id}-user-quality`,
      title: `Prioritize ${item.name}`,
      description: `${item.qualityLabel} product quality based on your recent ${item.source}.`,
      priority: "high",
    };
  }

  if (item.priceChangePercentage > 0) {
    return {
      id: `${item.id}-user-watch`,
      title: `Watch ${item.name}`,
      description:
        "The best offer is above its reference price. Compare alternatives before buying.",
      priority: "medium",
    };
  }

  return {
    id: `${item.id}-user-compare`,
    title: `Compare similar offers for ${item.name}`,
    description: `${item.stores.length} marketplace signals were captured from your recent activity.`,
    priority: "low",
  };
}

function toPriceAlert(item: ProductIntelligenceItem): PriceAlertModel | null {
  if (item.priceChangePercentage === 0) {
    return null;
  }

  const previousPrice =
    item.priceChangePercentage === -100
      ? item.currentPrice
      : Math.round(item.currentPrice / (1 + item.priceChangePercentage / 100));

  return {
    id: `${item.id}-user-alert`,
    product: item.name,
    store: item.bestPriceStore,
    currentPrice: item.currentPrice,
    previousPrice,
    direction: item.priceChangePercentage > 0 ? "up" : "down",
  };
}

function toRecentComparison(item: ProductIntelligenceItem): RecentComparisonModel {
  return {
    id: `${item.id}-user-recent`,
    product: item.name,
    comparedStores: item.stores.length,
    bestPrice: item.currentPrice,
    comparedAt: item.source === "comparison" ? "Compared recently" : "Searched recently",
  };
}

function dedupeById<T extends { id: string }>(items: T[]): T[] {
  const seenIds = new Set<string>();

  return items.filter((item) => {
    if (seenIds.has(item.id)) {
      return false;
    }

    seenIds.add(item.id);
    return true;
  });
}

function updateMetrics(
  dashboard: DashboardModel,
  trendingProducts: TrendingProductModel[],
): DashboardModel["metrics"] {
  const stores = new Set(
    trendingProducts.flatMap((product) => product.stores),
  );
  const priceDrops = trendingProducts.filter(
    (product) => product.priceChangePercentage < 0,
  ).length;
  const offers = trendingProducts.reduce(
    (total, product) => total + product.stores.length,
    0,
  );

  return dashboard.metrics.map((metric) => {
    switch (metric.id) {
      case "products":
        return { ...metric, value: trendingProducts.length };

      case "price-drops":
        return {
          ...metric,
          value: priceDrops,
          changePercentage: priceDrops > 0 ? 100 : 0,
        };

      case "offers":
        return { ...metric, value: offers };

      case "stores":
        return { ...metric, value: stores.size };

      default:
        return metric;
    }
  });
}

export function enrichDashboardWithUserIntelligence(
  dashboard: DashboardModel,
  userItems = getProductIntelligenceItems(),
): DashboardModel {
  if (userItems.length === 0) {
    return dashboard;
  }

  const userTrendingProducts = userItems.map(toTrendingProduct);
  const trendingProducts = dedupeById([
    ...userTrendingProducts,
    ...dashboard.trendingProducts,
  ]).slice(0, 8);

  const recommendations = dedupeById([
    ...userItems.map(toRecommendation),
    ...dashboard.recommendations,
  ]).slice(0, 12);

  const userAlerts = userItems
    .map(toPriceAlert)
    .filter((alert): alert is PriceAlertModel => alert !== null);

  const priceAlerts = dedupeById([
    ...userAlerts,
    ...dashboard.priceAlerts,
  ]).slice(0, 8);

  const recentComparisons = dedupeById([
    ...userItems.map(toRecentComparison),
    ...dashboard.recentComparisons,
  ]).slice(0, 8);

  return {
    ...dashboard,
    metrics: updateMetrics(dashboard, trendingProducts),
    trendingProducts,
    recommendations,
    priceAlerts,
    recentComparisons,
  };
}
