/**
 * -----------------------------------------------------------------------------
 * File: main.tsx
 * Feature: Application Bootstrap
 *
 * Purpose:
 * Entry point of the Prylensa application.
 *
 * Responsibilities:
 * - Initialize React.
 * - Mount the root application.
 * - Load global styles.
 *
 * -----------------------------------------------------------------------------
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "@/App";
import { applyAppTheme, readStoredTheme } from "@/features/settings/theme/app-theme";

import "./styles/index.css";

applyAppTheme(readStoredTheme());

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
