/**
 * -----------------------------------------------------------------------------
 * File: stores.ts
 * Feature: Store Domain
 *
 * Purpose:
 * Mock Store catalog.
 *
 * NOTE:
 * Mirrors the future API response.
 * -----------------------------------------------------------------------------
 */

import type { Store } from "../types/store.types";

export const STORES: Store[] = [
  {
    id: "jumia",

    name: "Jumia",

    website: "https://www.jumia.com.ng",

    logoUrl: "/stores/jumia.svg",

    logoAlt: "Jumia",
  },

  {
    id: "konga",

    name: "Konga",

    website: "https://www.konga.com",

    logoUrl: "/stores/konga.svg",

    logoAlt: "Konga",
  },

  {
    id: "slot",

    name: "Slot",

    website: "https://slot.ng",

    logoUrl: "/stores/slot.svg",

    logoAlt: "Slot",
  },

  {
    id: "amazon",

    name: "Amazon",

    website: "https://www.amazon.com",

    logoUrl: "/stores/amazon.svg",

    logoAlt: "Amazon",
  },
];
