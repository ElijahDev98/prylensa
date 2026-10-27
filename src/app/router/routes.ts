/**
 * -----------------------------------------------------------------------------
 * File: routes.ts
 * Feature: Router
 *
 * Purpose:
 * Centralized route definitions for the application.
 * -----------------------------------------------------------------------------
 */

export const ROUTES = {
  HOME: "/",

  SEARCH: "/search",

  SEARCH_HISTORY: "/search/history",

  DASHBOARD: "/dashboard",

  COMPARE: "/compare",

  AI_RECOMMENDATIONS: "/ai-recommendations",

  ALERTS: "/alerts",

  SETTINGS: "/settings",
} as const;
