/**
 * -----------------------------------------------------------------------------
 * File: dashboard.types.ts
 * Feature: Dashboard
 * -----------------------------------------------------------------------------
 */

import type { LucideIcon } from "lucide-react";

export interface DashboardMetric {
  id: string;

  label: string;

  value: string;

  change: string;

  icon: LucideIcon;

  iconBackground: string;

  iconColor: string;

  trendColor: string;
}
