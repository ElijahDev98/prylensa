/**
 * -----------------------------------------------------------------------------
 * File: branding/index.ts
 * Design System
 *
 * Purpose:
 * Centralized branding configuration for the application.
 * -----------------------------------------------------------------------------
 */

import Logo from "@/assets/branding/prylensa-logo.png";

export const branding = {
  name: "Prylensa",

  tagline: "AI-Powered Real-Time Price Intelligence",

  fullTitle:
    "AI-powered Real-time E-commerce Price Comparison and Analysis System",

  loaderMessage: "Preparing your workspace...",

  logo: Logo,

  loader: {
    logoSize: 96,
    ringSize: 140,
  },
} as const;

export default branding;
