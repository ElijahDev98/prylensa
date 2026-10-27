/**
 * -----------------------------------------------------------------------------
 * File: dashboard.api.ts
 * Feature: Dashboard
 *
 * Purpose:
 * Fetches dashboard data from the backend Dashboard endpoint.
 * -----------------------------------------------------------------------------
 */

import type { DashboardModel } from "../models/dashboard.model";
import { authenticatedFetch } from "@/features/auth/services/authenticated-fetch";

interface DashboardApiResponse {
  success: boolean;
  message: string;
  data: DashboardModel;
}

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000";

export async function fetchDashboard(): Promise<DashboardModel> {
  const response = await authenticatedFetch(`${API_BASE_URL}/api/v1/dashboard`);

  if (!response.ok) {
    throw new Error(`Dashboard request failed (${response.status}).`);
  }

  const body: DashboardApiResponse = await response.json();

  if (!body.success) {
    throw new Error("Dashboard request returned an unsuccessful response.");
  }

  return body.data;
}
