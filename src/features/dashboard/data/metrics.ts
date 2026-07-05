/**
 * -----------------------------------------------------------------------------
 * File: metrics.ts
 * Feature: Dashboard
 * -----------------------------------------------------------------------------
 */

import { Bell, Bookmark, ShoppingBag, Store } from "lucide-react";

import type { DashboardMetric } from "../types/dashboard.types";

export const DASHBOARD_METRICS: DashboardMetric[] = [
  {
    id: "stores",
    label: "Connected Stores",
    value: "12",
    change: "+2 from last month",
    icon: Store,
    iconBackground: "bg-indigo-100",
    iconColor: "text-indigo-600",
    trendColor: "text-green-600",
  },
  {
    id: "products",
    label: "Tracked Products",
    value: "4,382",
    change: "+214 from last month",
    icon: Bookmark,
    iconBackground: "bg-green-100",
    iconColor: "text-green-600",
    trendColor: "text-green-600",
  },
  {
    id: "savings",
    label: "Average Savings",
    value: "₦18,500",
    change: "+12% from last month",
    icon: ShoppingBag,
    iconBackground: "bg-amber-100",
    iconColor: "text-amber-600",
    trendColor: "text-green-600",
  },
  {
    id: "alerts",
    label: "Price Alerts",
    value: "23",
    change: "-3 from last month",
    icon: Bell,
    iconBackground: "bg-red-100",
    iconColor: "text-red-600",
    trendColor: "text-red-600",
  },
];
