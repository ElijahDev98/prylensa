/**
 * -----------------------------------------------------------------------------
 * File: product-category-icons.ts
 * Shared Icons
 *
 * Purpose:
 * Centralized product category icon mapping.
 *
 * Responsibilities:
 * - Map product categories to presentation icons.
 * - Keep business models UI-agnostic.
 *
 * Does NOT:
 * - Fetch data.
 * - Store business data.
 * -----------------------------------------------------------------------------
 */

import {
  Headphones,
  Laptop,
  Package,
  Smartphone,
  Tv,
  Watch,
} from "lucide-react";

export const PRODUCT_CATEGORY_ICONS = {
  Smartphones: Smartphone,

  Laptop: Laptop,

  Audio: Headphones,

  Television: Tv,

  Wearables: Watch,
} as const;

/**
 * Default icon used when a category
 * has not yet been mapped.
 */
export const DEFAULT_PRODUCT_CATEGORY_ICON = Package;
