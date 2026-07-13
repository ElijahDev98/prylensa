/**
 * -----------------------------------------------------------------------------
 * File: dashboard.mapper.ts
 * Feature: Dashboard
 *
 * Purpose:
 * Maps Dashboard business models to presentation view models.
 *
 * Responsibilities:
 * - Format business values.
 * - Assign UI metadata.
 * - Keep presentation concerns out of models.
 *
 * Architecture:
 *
 * UI
 *   ↓
 * ViewModel
 *   ↓
 * Mapper
 *   ↓
 * Model
 *
 * Notes:
 * - No business rules.
 * - No API calls.
 * -----------------------------------------------------------------------------
 */

import { Activity, Bell, ShoppingCart, TrendingUp } from "lucide-react";

import type {
  DashboardMetricModel,
  TrendingProductModel,
  RecommendationModel,
  PriceAlertModel,
  RecentComparisonModel,
  DashboardModel,
} from "../models/dashboard.model";

import type {
  DashboardMetricViewModel,
  TrendingProductViewModel,
  RecommendationViewModel,
  PriceAlertViewModel,
  RecentComparisonViewModel,
  DashboardViewModel,
} from "../viewmodels/dashboard.viewmodel";

/**
 * Formats a currency value.
 */
function formatCurrency(value: number): string {
  return `₦${value.toLocaleString()}`;
}

/**
 * Formats a percentage.
 */
function formatPercentage(value: number): string {
  return `${value > 0 ? "+" : ""}${value}%`;
}

/**
 * Metric icon configuration.
 */
const METRIC_UI = {
  "Saved Comparisons": {
    icon: Activity,
    iconBackground: "bg-blue-100",
    iconColor: "text-blue-600",
  },

  "Price Alerts": {
    icon: Bell,
    iconBackground: "bg-amber-100",
    iconColor: "text-amber-600",
  },

  "Recent Searches": {
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
  string,
  {
    icon: typeof Activity;
    iconBackground: string;
    iconColor: string;
  }
>;

/**
 * Maps a metric.
 */
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

/**
 * Maps a trending product.
 */
function mapTrendingProduct(
  model: TrendingProductModel,
): TrendingProductViewModel {
  return {
    id: model.id,

    name: model.name,

    category: model.category,

    currentPriceLabel: formatCurrency(model.currentPrice),

    priceChangeLabel: formatPercentage(model.priceChangePercentage),

    trend: model.trend,

    store: model.store,

    thumbnail: model.thumbnail,

    trendColor: model.trend === "up" ? "text-emerald-600" : "text-red-600",
  };
}

/**
 * Maps an AI recommendation.
 */
function mapRecommendation(
  model: RecommendationModel,
): RecommendationViewModel {
  return {
    ...model,

    badgeColor:
      model.priority === "high"
        ? "bg-red-100 text-red-700"
        : model.priority === "medium"
          ? "bg-amber-100 text-amber-700"
          : "bg-blue-100 text-blue-700",
  };
}

/**
 * Maps a price alert.
 */
function mapPriceAlert(model: PriceAlertModel): PriceAlertViewModel {
  return {
    id: model.id,

    product: model.product,

    store: model.store,

    currentPriceLabel: formatCurrency(model.currentPrice),

    previousPriceLabel: formatCurrency(model.previousPrice),

    direction: model.direction,

    directionColor:
      model.direction === "down" ? "text-emerald-600" : "text-red-600",
  };
}

/**
 * Maps a recent comparison.
 */
function mapRecentComparison(
  model: RecentComparisonModel,
): RecentComparisonViewModel {
  return {
    id: model.id,

    product: model.product,

    comparedStoresLabel: model.comparedStores.toString(),

    bestPriceLabel: formatCurrency(model.bestPrice),

    comparedAtLabel: model.comparedAt,
  };
}

/**
 * Maps the complete dashboard.
 */
export function mapDashboard(model: DashboardModel): DashboardViewModel {
  return {
    metrics: model.metrics.map(mapMetric),

    trendingProducts: model.trendingProducts.map(mapTrendingProduct),

    recommendations: model.recommendations.map(mapRecommendation),

    priceAlerts: model.priceAlerts.map(mapPriceAlert),

    recentComparisons: model.recentComparisons.map(mapRecentComparison),
  };
}
