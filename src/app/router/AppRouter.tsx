/**
 * -----------------------------------------------------------------------------
 * File: AppRouter.tsx
 * Feature: Router
 *
 * Purpose:
 * Configures the application's route hierarchy.
 * -----------------------------------------------------------------------------
 */

import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "@/app/pages/HomePage";
import NotFoundPage from "@/app/pages/NotFoundPage";

import { ROUTES } from "./routes";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
