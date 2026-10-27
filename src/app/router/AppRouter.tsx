/**
 * -----------------------------------------------------------------------------
 * File: AppRouter.tsx
 * Feature: Router
 *
 * Purpose:
 * Configures the application's routing hierarchy.
 *
 * Responsibilities:
 * - Register application routes.
 * - Apply the shared application layout.
 * - Render fallback page for unknown routes.
 * *
 * Does NOT:
 * - Manage application state.
 * - Fetch data.
 * -----------------------------------------------------------------------------
 */

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LoaderCircle } from "lucide-react";

import MainLayout from "@/app/shell/MainLayout";

const SearchPage = lazy(() => import("@/features/search").then((module) => ({ default: module.SearchPage })));
const DashboardPage = lazy(() => import("@/features/dashboard").then((module) => ({ default: module.DashboardPage })));
const ComparePage = lazy(() => import("@/features/compare").then((module) => ({ default: module.ComparePage })));
const AIRecommendationsPage = lazy(() => import("@/features/ai-recommendations").then((module) => ({ default: module.AIRecommendationsPage })));
const AlertsPage = lazy(() => import("@/features/alerts").then((module) => ({ default: module.AlertsPage })));
const SettingsPage = lazy(() => import("@/features/settings").then((module) => ({ default: module.SettingsPage })));
const NotFoundPage = lazy(() => import("@/app/pages/NotFoundPage"));

import { ROUTES } from "./routes";

function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><LoaderCircle className="animate-spin text-blue-600" aria-label="Loading" /></div>}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.HOME} element={<DashboardPage />} />

          <Route path={ROUTES.SEARCH} element={<SearchPage />} />

          <Route path={ROUTES.SEARCH_HISTORY} element={<SearchPage />} />

          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />

          <Route path={ROUTES.COMPARE} element={<ComparePage />} />

          <Route
            path={ROUTES.AI_RECOMMENDATIONS}
            element={<AIRecommendationsPage />}
          />

          <Route path={ROUTES.ALERTS} element={<AlertsPage />} />

          <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRouter;
