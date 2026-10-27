/**
 * -----------------------------------------------------------------------------
 * File: dashboard.viewmodel.ts
 * Feature: Dashboard
 *
 * Purpose:
 * Defines Dashboard presentation models.
 *
 * Responsibilities:
 * - Represent UI-ready Dashboard data.
 * - Separate presentation concerns from business models.
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
 * - May contain formatted values.
 * - May contain UI metadata.
 * - No business logic.
 * -----------------------------------------------------------------------------
 */

import type { LucideIcon } from "lucide-react";

/**
 * Dashboard metric displayed by KPI cards.
 */
export interface DashboardMetricViewModel {
  id: string;

  label: string;

  valueLabel: string;

  changeLabel: string;

  icon: LucideIcon;

  iconBackground: string;

  iconColor: string;

  trendColor: string;

  isPositiveTrend: boolean;
}

/**
 * Trending product displayed on the dashboard.
 */
export interface TrendingProductViewModel {
  id: string;

  name: string;

  category: string;

  currentPriceLabel: string;

  averagePriceLabel: string;

  priceChangeLabel: string;

  trend: "up" | "down";

  /**
   * Marketplace names.
   */
  stores: string[];

  /**
   * Best-price marketplace.
   */
  bestPriceStoreLabel: string;

  /**
   * Indicates whether this is currently the best market price.
   */
  isBestPrice: boolean;

  /**
   * Historical values for the sparkline.
   */
  trendHistory: number[];

  /**
   * Optional product thumbnail.
   */
  thumbnail?: string;

  qualityScoreLabel: string;

  qualityLabel: string;

  qualityColor: string;

  trendColor: string;
}

/**
 * AI Recommendation displayed by the dashboard.
 */
export interface RecommendationViewModel {
  id: string;

  title: string;

  description: string;

  priority: "high" | "medium" | "low";

  badgeColor: string;

  feedback: "helpful" | "not-helpful" | null;

  feedbackEnabled: boolean;
}

/**
 * Price Alert displayed by the dashboard.
 */
export interface PriceAlertViewModel {
  id: string;

  product: string;

  store: string;

  currentPriceLabel: string;

  previousPriceLabel: string;

  direction: "up" | "down";

  directionColor: string;
}

/**
 * Recent comparison displayed by the dashboard.
 */
export interface RecentComparisonViewModel {
  id: string;

  product: string;

  comparedStoresLabel: string;

  bestPriceLabel: string;

  comparedAtLabel: string;
}

/**
 * Complete Dashboard presentation model.
 */
export interface DashboardViewModel {
  metrics: DashboardMetricViewModel[];

  trendingProducts: TrendingProductViewModel[];

  recommendations: RecommendationViewModel[];

  priceAlerts: PriceAlertViewModel[];

  recentComparisons: RecentComparisonViewModel[];
}
