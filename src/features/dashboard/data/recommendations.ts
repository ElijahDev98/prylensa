/**
 * -----------------------------------------------------------------------------
 * File: recommendations.ts
 * Feature: Dashboard
 * -----------------------------------------------------------------------------
 */

import type { Recommendation } from "../types/recommendation.types";

export const RECOMMENDATIONS: Recommendation[] = [
  {
    id: "1",
    title: "Buy iPhone 16 Pro",
    description: "Current price is lower than the 7-day average.",
    priority: "high",
  },
  {
    id: "2",
    title: "Wait before buying Galaxy S25 Ultra",
    description: "Price history indicates a possible reduction next week.",
    priority: "medium",
  },
  {
    id: "3",
    title: "Compare Sony WH-1000XM6",
    description: "More stores are available for comparison.",
    priority: "low",
  },
];
