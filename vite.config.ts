/**
 * -----------------------------------------------------------------------------
 * File: vite.config.ts
 *
 * Purpose:
 * Global Vite configuration for the Priciq frontend.
 *
 * Responsibilities:
 * - Configure React.
 * - Configure project aliases.
 * - Prepare the project for future scalability.
 *
 * -----------------------------------------------------------------------------
 */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
