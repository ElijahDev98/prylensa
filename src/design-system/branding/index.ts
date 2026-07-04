/**
 * -----------------------------------------------------------------------------
 * File: branding/index.ts
 * Design System
 *
 * Purpose:
 * Centralized branding configuration for the application.
 * -----------------------------------------------------------------------------
 */

import Logo from "@/assets/branding/priciq-logo.png";

export const branding = {
  name: "Priciq",

  tagline: "Smart Price Intelligence",

  loaderMessage: "Preparing your workspace...",

  logo: Logo,

  loader: {
    logoSize: 96,
    ringSize: 140,
  },
} as const;

export default branding;
