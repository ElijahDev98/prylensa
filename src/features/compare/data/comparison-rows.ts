/**
 * -----------------------------------------------------------------------------
 * File: comparison-rows.ts
 * Feature: Compare
 * -----------------------------------------------------------------------------
 */

import type { ComparisonRow } from "../types/comparison-row.types";

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    id: "price",

    label: "Price",

    values: [
      [
        {
          value: "₦1,699,000",
        },
        {
          value: "₦1,655,000",
          highlight: true,
          color: "green",
        },
        {
          value: "₦1,720,000",
        },
        {
          value: "₦1,680,000",
        },
      ],

      [
        {
          value: "₦1,299,000",
        },
        {
          value: "₦1,265,000",
          highlight: true,
          color: "green",
        },
        {
          value: "₦1,310,000",
        },
        {
          value: "₦1,280,000",
        },
      ],

      [
        {
          value: "₦1,045,000",
        },
        {
          value: "₦995,000",
          highlight: true,
          color: "green",
        },
        {
          value: "₦1,050,000",
        },
        {
          value: "₦1,020,000",
        },
      ],
    ],
  },
];
