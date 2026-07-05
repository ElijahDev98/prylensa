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

import MainLayout from "@/app/shell/MainLayout";

import { SearchPage } from "@/features/search";
import { DashboardPage } from "@/features/dashboard";
import { ComparePage } from "@/features/compare";

import NotFoundPage from "@/app/pages/NotFoundPage";

import { ROUTES } from "./routes";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.HOME} element={<SearchPage />} />

          <Route path={ROUTES.SEARCH} element={<SearchPage />} />

          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />

          <Route path={ROUTES.COMPARE} element={<ComparePage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
