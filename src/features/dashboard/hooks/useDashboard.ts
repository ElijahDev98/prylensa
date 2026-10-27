/**
 * -----------------------------------------------------------------------------
 * File: useDashboard.ts
 * Feature: Dashboard
 *
 * Purpose:
 * Orchestrates the Dashboard feature.
 * -----------------------------------------------------------------------------
 */

import { useMemo } from "react";

import { getProductIntelligenceItems } from "@/features/product-intelligence";
import { usePreferences } from "@/features/settings";

import { useDashboardContext } from "./useDashboardContext";
import { mapDashboard } from "../mappers/dashboard.mapper";
import { enrichDashboardWithUserIntelligence } from "../services/dashboard-user-intelligence.service";

import type { DashboardModel } from "../models/dashboard.model";

const EMPTY_DASHBOARD_MODEL: DashboardModel = {
  metrics: [
    {
      id: "products",
      label: "Products Tracked",
      value: 0,
      changePercentage: 0,
    },
    {
      id: "price-drops",
      label: "Price Drops",
      value: 0,
      changePercentage: 0,
    },
    {
      id: "offers",
      label: "Marketplace Offers",
      value: 0,
      changePercentage: 0,
    },
    {
      id: "stores",
      label: "Stores Monitored",
      value: 0,
      changePercentage: 0,
    },
  ],
  trendingProducts: [],
  recommendations: [],
  priceAlerts: [],
  recentComparisons: [],
  generatedAt: new Date(0).toISOString(),
};

export default function useDashboard() {
  const { formatPrice } = usePreferences();
  const context = useDashboardContext();
  const productIntelligenceItems = useMemo(
    () => {
      void context.intelligenceRevision;
      return getProductIntelligenceItems();
    },
    [context.intelligenceRevision],
  );

  const viewModel = useMemo(() => {
    const dashboardModel = context.dashboard ?? EMPTY_DASHBOARD_MODEL;

    return mapDashboard(
      enrichDashboardWithUserIntelligence(
        dashboardModel,
        productIntelligenceItems,
      ),
      formatPrice,
    );
  }, [context.dashboard, formatPrice, productIntelligenceItems]);

  const hasImmediateIntelligence = productIntelligenceItems.length > 0;

  return {
    ...viewModel,
    loading: context.loading && !hasImmediateIntelligence,
    refreshing: context.refreshing,
    error: context.error,
    lastUpdated: context.lastUpdated,
    refreshDashboard: context.refreshDashboard,
  };
}
