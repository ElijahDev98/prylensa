/**
 * -----------------------------------------------------------------------------
 * File: comparison-rows.ts
 * Feature: Compare
 *
 * Purpose:
 * Mock comparison data.
 *
 * This structure is intentionally designed to match the expected API response.
 * -----------------------------------------------------------------------------
 */

import type { ComparisonRow } from "../types/comparison-data.types";

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    id: "price",

    label: "Price",

    products: [
      {
        productId: "1",

        values: [
          {
            storeId: "jumia",
            value: "₦1,699,000",
          },
          {
            storeId: "konga",
            value: "₦1,655,000",
            highlight: true,
            color: "success",
          },
          {
            storeId: "slot",
            value: "₦1,720,000",
          },
          {
            storeId: "amazon",
            value: "₦1,680,000",
          },
        ],
      },

      {
        productId: "2",

        values: [
          {
            storeId: "jumia",
            value: "₦1,299,000",
          },
          {
            storeId: "konga",
            value: "₦1,265,000",
            highlight: true,
            color: "success",
          },
          {
            storeId: "slot",
            value: "₦1,310,000",
          },
          {
            storeId: "amazon",
            value: "₦1,280,000",
          },
        ],
      },

      {
        productId: "3",

        values: [
          {
            storeId: "jumia",
            value: "₦1,045,000",
          },
          {
            storeId: "konga",
            value: "₦995,000",
            highlight: true,
            color: "success",
          },
          {
            storeId: "slot",
            value: "₦1,050,000",
          },
          {
            storeId: "amazon",
            value: "₦1,020,000",
          },
        ],
      },
    ],
  },
];
