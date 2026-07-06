/**
 * -----------------------------------------------------------------------------
 * File: comparison-rows.ts
 * Feature: Compare
 *
 * Purpose:
 * Mock comparison data for the comparison matrix.
 *
 * NOTE:
 * This structure mirrors the expected API response.
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
            value: "₦2,090,000",
          },
          {
            storeId: "konga",
            value: "₦2,050,000",
            highlight: true,
            color: "success",
          },
          {
            storeId: "slot",
            value: "₦2,120,000",
          },
          {
            storeId: "amazon",
            value: "₦2,080,000",
          },
        ],
      },

      {
        productId: "3",

        values: [
          {
            storeId: "jumia",
            value: "₦645,000",
          },
          {
            storeId: "konga",
            value: "₦630,000",
            highlight: true,
            color: "success",
          },
          {
            storeId: "slot",
            value: "₦650,000",
          },
          {
            storeId: "amazon",
            value: "₦640,000",
          },
        ],
      },
    ],
  },

  {
    id: "discount",

    label: "Discount",

    products: [
      {
        productId: "1",

        values: [
          { storeId: "jumia", value: "5%" },
          {
            storeId: "konga",
            value: "8%",
            highlight: true,
            color: "success",
          },
          { storeId: "slot", value: "2%" },
          { storeId: "amazon", value: "6%" },
        ],
      },

      {
        productId: "2",

        values: [
          { storeId: "jumia", value: "4%" },
          {
            storeId: "konga",
            value: "9%",
            highlight: true,
            color: "success",
          },
          { storeId: "slot", value: "3%" },
          { storeId: "amazon", value: "5%" },
        ],
      },

      {
        productId: "3",

        values: [
          { storeId: "jumia", value: "6%" },
          {
            storeId: "konga",
            value: "10%",
            highlight: true,
            color: "success",
          },
          { storeId: "slot", value: "2%" },
          { storeId: "amazon", value: "4%" },
        ],
      },
    ],
  },

  {
    id: "savings",

    label: "Savings",

    products: [
      {
        productId: "1",

        values: [
          { storeId: "jumia", value: "₦84,000" },
          {
            storeId: "konga",
            value: "₦128,000",
            highlight: true,
            color: "success",
          },
          { storeId: "slot", value: "₦42,000" },
          { storeId: "amazon", value: "₦96,000" },
        ],
      },

      {
        productId: "2",

        values: [
          { storeId: "jumia", value: "₦88,000" },
          {
            storeId: "konga",
            value: "₦150,000",
            highlight: true,
            color: "success",
          },
          { storeId: "slot", value: "₦62,000" },
          { storeId: "amazon", value: "₦95,000" },
        ],
      },

      {
        productId: "3",

        values: [
          { storeId: "jumia", value: "₦35,000" },
          {
            storeId: "konga",
            value: "₦52,000",
            highlight: true,
            color: "success",
          },
          { storeId: "slot", value: "₦20,000" },
          { storeId: "amazon", value: "₦41,000" },
        ],
      },
    ],
  },
];
