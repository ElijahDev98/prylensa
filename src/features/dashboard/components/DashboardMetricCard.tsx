/**
 * -----------------------------------------------------------------------------
 * File: DashboardMetricCard.tsx
 * Feature: Dashboard
 *
 * Purpose:
 * Reusable metric card displayed on the dashboard.
 *
 * Responsibilities:
 * - Display metric label.
 * - Display metric value.
 * - Display optional trend.
 *
 * Does NOT:
 * - Fetch data.
 * - Format data.
 * -----------------------------------------------------------------------------
 */

import Card from "@/components/ui/Card";

import type { DashboardMetric } from "../types/dashboard.types";

interface DashboardMetricCardProps {
  metric: DashboardMetric;
}

function DashboardMetricCard({ metric }: DashboardMetricCardProps) {
  return (
    <Card
      className="
        flex
        flex-col
        justify-between
        p-6
        transition-all
        duration-200
        hover:-translate-y-1
        hover:shadow-md
      "
    >
      <div>
        <p
          className="
            text-sm
            font-medium
            text-slate-500
          "
        >
          {metric.label}
        </p>

        <h2
          className="
            mt-3
            text-3xl
            font-bold
            tracking-tight
            text-slate-900
          "
        >
          {metric.value}
        </h2>
      </div>

      {metric.change && (
        <span
          className="
            mt-6
            inline-flex
            w-fit
            rounded-full
            bg-green-100
            px-3
            py-1
            text-xs
            font-semibold
            text-green-700
          "
        >
          {metric.change}
        </span>
      )}
    </Card>
  );
}

export default DashboardMetricCard;
