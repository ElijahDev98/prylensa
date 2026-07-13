/**
 * -----------------------------------------------------------------------------
 * File: useDashboard.ts
 * Feature: Dashboard
 *
 * Purpose:
 * Orchestrates the Dashboard feature.
 *
 * Responsibilities:
 * - Load dashboard data.
 * - Coordinate Dashboard services.
 * - Map business models to presentation models.
 * - Expose Dashboard view models.
 *
 * Architecture:
 *
 * UI
 *   ↓
 * Hook
 *   ↓
 * Service
 *   ↓
 * Mapper
 *   ↓
 * ViewModel
 *   ↓
 * Model
 *
 * Notes:
 * - Feature orchestrator.
 * - No business rules.
 * -----------------------------------------------------------------------------
 */

import { useMemo } from "react";

import { mapDashboard } from "../mappers/dashboard.mapper";

import { getDashboard } from "../services/dashboard.service";

export default function useDashboard() {
  /**
   * ---------------------------------------------------------------------------
   * Business Model
   * ---------------------------------------------------------------------------
   */

  const dashboard = useMemo(() => {
    return getDashboard();
  }, []);

  /**
   * ---------------------------------------------------------------------------
   * Presentation ViewModel
   * ---------------------------------------------------------------------------
   */

  const viewModel = useMemo(() => {
    return mapDashboard(dashboard);
  }, [dashboard]);

  /**
   * ---------------------------------------------------------------------------
   * Public API
   * ---------------------------------------------------------------------------
   */

  return {
    ...viewModel,
  };
}
