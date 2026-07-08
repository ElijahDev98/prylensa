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

    trustScore: 92,

    rating: 4.5,

    reviewCount: 185342,

    verified: true,
  },

  {
    id: "konga",

    name: "Konga",

    website: "https://www.konga.com",

    logoUrl: "/stores/konga.svg",

    logoAlt: "Konga",

    trustScore: 88,

    rating: 4.4,

    reviewCount: 142518,

    verified: true,
  },

  {
    id: "slot",

    name: "Slot",

    website: "https://slot.ng",

    logoUrl: "/stores/slot.svg",

    logoAlt: "Slot",

    trustScore: 90,

    rating: 4.6,

    reviewCount: 76354,

    verified: true,
  },

  {
    id: "amazon",

    name: "Amazon",

    website: "https://www.amazon.com",

    logoUrl: "/stores/amazon.svg",

    logoAlt: "Amazon",

    trustScore: 98,

    rating: 4.8,

    reviewCount: 2431851,

    verified: true,
  },
];
