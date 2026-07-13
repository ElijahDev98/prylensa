/**
 * -----------------------------------------------------------------------------
 * File: dashboard.mock.ts
 * Feature: Dashboard
 *
 * Purpose:
 * Mock Dashboard data.
 *
 * Responsibilities:
 * - Provide DashboardModel data.
 * - Simulate future backend responses.
 *
 * Notes:
 * - Temporary until backend integration.
 * -----------------------------------------------------------------------------
 */

import type { DashboardModel } from "../models/dashboard.model";

export const DASHBOARD_MOCK: DashboardModel = {
  metrics: [
    {
      id: "comparisons",
      label: "Saved Comparisons",
      value: 12,
      changePercentage: 18,
    },

    {
      id: "alerts",
      label: "Price Alerts",
      value: 23,
      changePercentage: -3,
    },

    {
      id: "searches",
      label: "Recent Searches",
      value: 4382,
      changePercentage: 12,
    },

    {
      id: "stores",
      label: "Stores Monitored",
      value: 12,
      changePercentage: 2,
    },
  ],

  trendingProducts: [
    {
      id: "1",
      name: "Apple iPhone 16 Pro",
      category: "Smartphones",
      currentPrice: 1999000,
      priceChangePercentage: -5,
      trend: "down",
      store: "Jumia",
    },

    {
      id: "2",
      name: "Samsung Galaxy S25 Ultra",
      category: "Smartphones",
      currentPrice: 2050000,
      priceChangePercentage: -3,
      trend: "down",
      store: "Konga",
    },

    {
      id: "3",
      name: "Sony WH-1000XM6",
      category: "Audio",
      currentPrice: 645000,
      priceChangePercentage: -7,
      trend: "down",
      store: "Slot",
    },

    {
      id: "4",
      name: "MacBook Pro M5",
      category: "Laptop",
      currentPrice: 4250000,
      priceChangePercentage: -2,
      trend: "down",
      store: "iStore",
    },
  ],

  recommendations: [
    {
      id: "1",
      title: "Buy iPhone 16 Pro",
      description: "Current price is lower than the 7-day average.",
      priority: "high",
    },

    {
      id: "2",
      title: "Wait before buying Galaxy S25 Ultra",
      description: "Price history indicates a possible reduction next week.",
      priority: "medium",
    },

    {
      id: "3",
      title: "Compare Sony WH-1000XM6",
      description: "More stores are available for comparison.",
      priority: "low",
    },
  ],

  priceAlerts: [
    {
      id: "1",
      product: "Apple iPhone 16 Pro",
      store: "Jumia",
      currentPrice: 1999000,
      previousPrice: 2050000,
      direction: "down",
    },

    {
      id: "2",
      product: "MacBook Pro M5",
      store: "iStore",
      currentPrice: 4250000,
      previousPrice: 4180000,
      direction: "up",
    },

    {
      id: "3",
      product: "Sony WH-1000XM6",
      store: "Slot",
      currentPrice: 645000,
      previousPrice: 699000,
      direction: "down",
    },
  ],

  recentComparisons: [
    {
      id: "1",
      product: "Apple iPhone 16 Pro",
      comparedStores: 6,
      bestPrice: 1999000,
      comparedAt: "2 minutes ago",
    },

    {
      id: "2",
      product: "Samsung Galaxy S25 Ultra",
      comparedStores: 5,
      bestPrice: 2050000,
      comparedAt: "15 minutes ago",
    },

    {
      id: "3",
      product: "Sony WH-1000XM6",
      comparedStores: 4,
      bestPrice: 645000,
      comparedAt: "1 hour ago",
    },
  ],
};
