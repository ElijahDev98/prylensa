/**
 * -----------------------------------------------------------------------------
 * File: brand.ts
 * Feature: Application Configuration
 *
 * Purpose:
 * Centralized branding configuration.
 * -----------------------------------------------------------------------------
 */

import PriciqLogo from "@/assets/branding/priciq-logo.png";

export const BRAND = {
  name: "Priciq",
  tagline: "Smart Price Intelligence",
  logo: PriciqLogo,
} as const;
