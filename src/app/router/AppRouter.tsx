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

import { SearchPage } from "@/features/search";
import NotFoundPage from "@/app/pages/NotFoundPage";

import { ROUTES } from "./routes";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.HOME} element={<SearchPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
