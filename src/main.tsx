/**
 * -----------------------------------------------------------------------------
 * File: main.tsx
 * Feature: Application Bootstrap
 *
 * Purpose:
 * Entry point of the Priciq application.
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

import App from "@/app/App";

import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
