/**
 * -----------------------------------------------------------------------------
 * File: dashboard.service.ts
 * Feature: Dashboard
 *
 * Purpose:
 * Dashboard business service.
 * -----------------------------------------------------------------------------
 */

import { fetchDashboard } from "../api/dashboard.api";

import type { DashboardModel } from "../models/dashboard.model";

export async function getDashboard(): Promise<DashboardModel> {
  return fetchDashboard();
}
