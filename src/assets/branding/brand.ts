/**
 * -----------------------------------------------------------------------------
 * File: brand.ts
 * Feature: Application Configuration
 *
 * Purpose:
 * Centralized branding configuration.
 * -----------------------------------------------------------------------------
 */

import PrylensaLogo from "@/assets/branding/prylensa-logo.png";

export const BRAND = {
  name: "Prylensa",
  tagline: "AI-Powered Real-Time Price Intelligence",
  fullTitle:
    "AI-powered Real-time E-commerce Price Comparison and Analysis System",
  logo: PrylensaLogo,
} as const;
