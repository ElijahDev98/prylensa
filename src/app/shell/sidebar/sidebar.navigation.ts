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
  ChartColumn,
  LayoutDashboard,
  Search,
  Settings,
} from "lucide-react";

import { ROUTES } from "@/app/router/routes";

import type { SidebarNavigationItem } from "./sidebar.types";

export const SIDEBAR_NAVIGATION: SidebarNavigationItem[] = [
  {
    id: "search",
    label: "Search",
    path: ROUTES.HOME,
    icon: Search,
  },
  {
    id: "dashboard",
    label: "Dashboard",
    path: ROUTES.DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    id: "compare",
    label: "Compare",
    path: ROUTES.COMPARE,
    icon: BarChart3,
  },
  {
    id: "analytics",
    label: "Analytics",
    path: ROUTES.ANALYTICS,
    icon: ChartColumn,
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
