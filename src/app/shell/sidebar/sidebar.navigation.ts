/**
 * -----------------------------------------------------------------------------
 * File: sidebar.navigation.ts
 * Feature: Sidebar
 *
 * Purpose:
 * Centralized sidebar navigation configuration.
 * -----------------------------------------------------------------------------
 */

import {
  BarChart3,
  Bell,
  History,
  LayoutDashboard,
  Search,
  Settings,
  Sparkles,
} from "lucide-react";

import { ROUTES } from "@/app/router/routes";

import type { SidebarNavigationItem } from "./sidebar.types";

export const SIDEBAR_NAVIGATION: SidebarNavigationItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: ROUTES.HOME,
    icon: LayoutDashboard,
  },
  {
    id: "search",
    label: "Search",
    path: ROUTES.SEARCH,
    icon: Search,
  },
  {
    id: "search-history",
    label: "Recent Searches",
    path: ROUTES.SEARCH_HISTORY,
    icon: History,
  },
  {
    id: "compare",
    label: "Comparison",
    path: ROUTES.COMPARE,
    icon: BarChart3,
  },
  {
    id: "ai-recommendations",
    label: "AI Recommendations",
    path: ROUTES.AI_RECOMMENDATIONS,
    icon: Sparkles,
  },
  {
    id: "alerts",
    label: "Alerts",
    path: ROUTES.ALERTS,
    icon: Bell,
  },
  {
    id: "settings",
    label: "Settings",
    path: ROUTES.SETTINGS,
    icon: Settings,
  },
];
