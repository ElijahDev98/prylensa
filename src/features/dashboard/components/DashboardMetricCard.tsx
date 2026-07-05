/**
 * -----------------------------------------------------------------------------
 * File: DashboardMetricCard.tsx
 * Feature: Dashboard
 *
 * Purpose:
 * Compact dashboard metric card.
 * -----------------------------------------------------------------------------
 */

import Card from "@/components/ui/Card";

import { TrendingDown, TrendingUp } from "lucide-react";

import type { DashboardMetric } from "../types/dashboard.types";

interface DashboardMetricCardProps {
  metric: DashboardMetric;
}

function DashboardMetricCard({ metric }: DashboardMetricCardProps) {
  const Icon = metric.icon;

  const isPositive = metric.trendColor.includes("green");

  return (
    <Card
      className="
        rounded-3xl
        p-5
        transition-all
        duration-200
        hover:-translate-y-1
        hover:shadow-md
      "
    >
      {/* Header */}

      <div className="flex items-center gap-3">
        <div
          className={`
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-2xl
            ${metric.iconBackground}
          `}
        >
          <Icon size={22} className={metric.iconColor} />
        </div>

        <p
          className="
            text-sm
            font-medium
            text-slate-500
          "
        >
          {metric.label}
        </p>
      </div>

      {/* Value */}

      <h2
        className="
          mt-5
          text-3xl
          font-bold
          tracking-tight
          text-slate-900
        "
      >
        {metric.value}
      </h2>

      {/* Trend */}

      <div
        className={`
          mt-4
          inline-flex
          items-center
          gap-2
          text-sm
          font-medium
          ${metric.trendColor}
        `}
      >
        {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}

        <span>{metric.change}</span>
      </div>
    </Card>
  );
}

export default DashboardMetricCard;
