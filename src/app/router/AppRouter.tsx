/**
 * -----------------------------------------------------------------------------
 * File: AppRouter.tsx
 * Feature: Router
 *
 * Purpose:
 * Configures the application's routing hierarchy.
 * -----------------------------------------------------------------------------
 */

import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainLayout from "@/app/shell/MainLayout";

import NotFoundPage from "@/app/pages/NotFoundPage";

import { SearchPage } from "@/features/search";
import { DashboardPage } from "@/features/dashboard";

import { ROUTES } from "./routes";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Search */}
          <Route path={ROUTES.HOME} element={<SearchPage />} />

          <Route path={ROUTES.SEARCH} element={<SearchPage />} />

          {/* Dashboard */}
          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
