/**
 * -----------------------------------------------------------------------------
 * File: dashboard.mapper.ts
 * Feature: Dashboard
 *
 * Purpose:
 * Maps Dashboard business models to presentation view models.
 * -----------------------------------------------------------------------------
 */

import { Activity, Bell, ShoppingCart, TrendingUp } from "lucide-react";

import type {
  DashboardMetricModel,
  DashboardModel,
  PriceAlertModel,
  RecentComparisonModel,
  RecommendationModel,
  TrendingProductModel,
} from "../models/dashboard.model";

import type {
  DashboardMetricViewModel,
  DashboardViewModel,
  PriceAlertViewModel,
  RecentComparisonViewModel,
  RecommendationViewModel,
  TrendingProductViewModel,
} from "../viewmodels/dashboard.viewmodel";

type PriceFormatter = (valueInNgn: number) => string;

function formatPercentage(value: number): string {
  return `${value > 0 ? "+" : ""}${value}%`;
}

const METRIC_UI = {
  "Products Tracked": {
    icon: Activity,
    iconBackground: "bg-blue-100",
    iconColor: "text-blue-600",
  },

  "Price Drops": {
    icon: Bell,
    iconBackground: "bg-amber-100",
    iconColor: "text-amber-600",
  },

  "Marketplace Offers": {
    icon: TrendingUp,
    iconBackground: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },

  "Stores Monitored": {
    icon: ShoppingCart,
    iconBackground: "bg-purple-100",
    iconColor: "text-purple-600",
  },
} satisfies Record<
  DashboardMetricModel["label"],
  {
    icon: typeof Activity;
    iconBackground: string;
    iconColor: string;
  }
>;

function getQualityColor(score: number): string {
  if (score >= 85) {
    return "bg-emerald-50 text-emerald-700";
  }

  if (score >= 70) {
    return "bg-blue-50 text-blue-700";
  }

  if (score >= 50) {
    return "bg-amber-50 text-amber-700";
  }

  return "bg-slate-100 text-slate-600";
}

function mapMetric(model: DashboardMetricModel): DashboardMetricViewModel {
  const ui = METRIC_UI[model.label];

  return {
    id: model.id,
    label: model.label,
    valueLabel: model.value.toLocaleString(),
    changeLabel: formatPercentage(model.changePercentage),
    icon: ui.icon,
    iconBackground: ui.iconBackground,
    iconColor: ui.iconColor,
    trendColor:
      model.changePercentage >= 0 ? "text-emerald-600" : "text-red-600",
    isPositiveTrend: model.changePercentage >= 0,
  };
}

function mapTrendingProduct(
  model: TrendingProductModel,
  formatPrice: PriceFormatter,
): TrendingProductViewModel {
  return {
    id: model.id,
    name: model.name,
    category: model.category,
    currentPriceLabel: formatPrice(model.currentPrice),
    averagePriceLabel: formatPrice(model.averagePrice),
    priceChangeLabel: formatPercentage(model.priceChangePercentage),
    trend: model.trend,
    stores: model.stores,
    bestPriceStoreLabel: model.bestPriceStore,
    isBestPrice: model.isBestPrice,
    trendHistory: model.trendHistory,
    thumbnail: model.thumbnail,
    qualityScoreLabel: `${model.qualityScore}/100`,
    qualityLabel: model.qualityLabel,
    qualityColor: getQualityColor(model.qualityScore),
    trendColor: model.trend === "up" ? "text-emerald-600" : "text-red-600",
  };
}

function mapRecommendation(
  model: RecommendationModel,
): RecommendationViewModel {
  return {
    ...model,
    feedback: model.feedback ?? null,
    feedbackEnabled: model.feedback !== undefined,
    badgeColor:
      model.priority === "high"
        ? "bg-red-100 text-red-700"
        : model.priority === "medium"
          ? "bg-amber-100 text-amber-700"
          : "bg-blue-100 text-blue-700",
  };
}

function mapPriceAlert(
  model: PriceAlertModel,
  formatPrice: PriceFormatter,
): PriceAlertViewModel {
  return {
    id: model.id,
    product: model.product,
    store: model.store,
    currentPriceLabel: formatPrice(model.currentPrice),
    previousPriceLabel: formatPrice(model.previousPrice),
    direction: model.direction,
    directionColor:
      model.direction === "down" ? "text-emerald-600" : "text-red-600",
  };
}

function mapRecentComparison(
  model: RecentComparisonModel,
  formatPrice: PriceFormatter,
): RecentComparisonViewModel {
  return {
    id: model.id,
    product: model.product,
    comparedStoresLabel: `${model.comparedStores} Stores`,
    bestPriceLabel: formatPrice(model.bestPrice),
    comparedAtLabel: model.comparedAt,
  };
}

export function mapDashboard(
  model: DashboardModel,
  formatPrice: PriceFormatter,
): DashboardViewModel {
  return {
    metrics: model.metrics.map(mapMetric),
    trendingProducts: model.trendingProducts.map((item) =>
      mapTrendingProduct(item, formatPrice),
    ),
    recommendations: model.recommendations.map(mapRecommendation),
    priceAlerts: model.priceAlerts.map((item) =>
      mapPriceAlert(item, formatPrice),
    ),
    recentComparisons: model.recentComparisons.map((item) =>
      mapRecentComparison(item, formatPrice),
    ),
  };
}
