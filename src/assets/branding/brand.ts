/**
 * -----------------------------------------------------------------------------
 * File: brand.ts
 * Feature: Branding
 *
 * Purpose:
 * Centralizes the application's branding information.
 *
 * Responsibilities:
 * - Export the logo.
 * - Export the brand name.
 * - Export the brand tagline.
 *
 * Used By:
 * - SidebarBrand
 * - Header
 * - Authentication
 * -----------------------------------------------------------------------------
 */

import PriciqLogo from "./priciq-logo.png";

export const BRAND = {
  name: "Priciq",
  tagline: "Smart Price Intelligence",
  logo: PriciqLogo,
} as const;
