/**
 * -----------------------------------------------------------------------------
 * File: dashboard.service.ts
 * Feature: Dashboard
 *
 * Purpose:
 * Dashboard business service.
 *
 * Responsibilities:
 * - Provide Dashboard business data.
 * - Hide the underlying data source.
 *
 * Architecture:
 *
 * UI
 *   ↓
 * Hook
 *   ↓
 * Service
 *   ↓
 * Data Source
 *
 * Notes:
 * - No React.
 * - No UI logic.
 * - No ViewModel mapping.
 * -----------------------------------------------------------------------------
 */

import { DASHBOARD_MOCK } from "../data/dashboard.mock";

import type { DashboardModel } from "../models/dashboard.model";

/**
 * Returns the complete dashboard.
 *
 * Future:
 * Replace the mock source with an API request.
 */
export function getDashboard(): DashboardModel {
  return DASHBOARD_MOCK;
}
