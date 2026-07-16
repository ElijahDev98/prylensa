/**
 * -----------------------------------------------------------------------------
 * File: dashboard.model.ts
 * Feature: Dashboard
 *
 * Purpose:
 * Defines the Dashboard business models.
 *
 * Responsibilities:
 * - Represent Dashboard domain entities.
 * - Remain UI-agnostic.
 * - Contain raw business data only.
 *
 * Architecture:
 *
 * UI
 *   ↓
 * ViewModel
 *   ↓
 * Model
 *
 * Notes:
 * - No presentation concerns.
 * - No icons.
 * - No Tailwind classes.
 * - No formatted currency strings.
 * -----------------------------------------------------------------------------
 */

/**
 * Supported dashboard metric labels.
 *
 * Restricts metrics to known business concepts.
 */
export type DashboardMetricLabel =
  "Saved Comparisons" | "Price Alerts" | "Recent Searches" | "Stores Monitored";

/**
 * Dashboard metric.
 */
export interface DashboardMetricModel {
  id: string;

  label: DashboardMetricLabel;

  value: number;

  changePercentage: number;
}

/**
 * Supported product trends.
 */
export type ProductTrend = "up" | "down";

/**
 * Trending product.
 */
export interface TrendingProductModel {
  id: string;

  name: string;

  category: string;

  currentPrice: number;

  priceChangePercentage: number;

  trend: ProductTrend;

  /**
   * Stores currently selling this product.
   */
  stores: string[];

  /**
   * Store currently offering the best price.
   */
  bestPriceStore: string;

  /**
   * Indicates whether the current price is the best available.
   */
  isBestPrice: boolean;

  /**
   * Historical prices used for trend visualization.
   *
   * Ordered from oldest → newest.
   */
  trendHistory: number[];

  /**
   * Optional product thumbnail.
   */
  thumbnail?: string;
}

/**
 * Supported alert directions.
 */
export type AlertDirection = "up" | "down";

/**
 * Price alert.
 */
export interface PriceAlertModel {
  id: string;

  product: string;

  store: string;

  currentPrice: number;

  previousPrice: number;

  direction: AlertDirection;
}

/**
 * Recommendation priority.
 */
export type RecommendationPriority = "high" | "medium" | "low";

/**
 * AI recommendation.
 */
export interface RecommendationModel {
  id: string;

  title: string;

  description: string;

  priority: RecommendationPriority;
}

/**
 * Recent comparison.
 */
export interface RecentComparisonModel {
  id: string;

  product: string;

  comparedStores: number;

  bestPrice: number;

  comparedAt: string;
}

/**
 * Dashboard aggregate model.
 *
 * Represents the complete Dashboard business state.
 */
export interface DashboardModel {
  metrics: DashboardMetricModel[];

  trendingProducts: TrendingProductModel[];

  recommendations: RecommendationModel[];

  priceAlerts: PriceAlertModel[];

  recentComparisons: RecentComparisonModel[];
}
