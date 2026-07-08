/**
 * -----------------------------------------------------------------------------
 * File: BarChartCard.tsx
 * Layer: Shared UI
 *
 * Purpose:
 * Reusable responsive bar chart.
 *
 * Responsibilities:
 * - Render categorical bar charts.
 * - Display formatted tooltips.
 * - Remain presentation-only.
 *
 * Does NOT:
 * - Execute business logic.
 * - Know comparison rules.
 * -----------------------------------------------------------------------------
 */

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import ChartCard from "./ChartCard";

interface BarChartCardProps<T extends object> {
  title: string;

  description?: string;

  data: T[];

  xKey: keyof T;

  yKey: keyof T;
}

function formatCurrency(value: number) {
  return `₦${value.toLocaleString()}`;
}

function truncateLabel(label: string) {
  if (label.length <= 18) {
    return label;
  }

  return `${label.slice(0, 18)}…`;
}

function BarChartCard<T extends object>({
  title,
  description,
  data,
  xKey,
  yKey,
}: BarChartCardProps<T>) {
  return (
    <ChartCard title={title} description={description}>
      <div
        className="
          h-80
          w-full
        "
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 12,
              right: 20,
              left: 8,
              bottom: 24,
            }}
          >
            <CartesianGrid
              stroke="#E2E8F0"
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey={String(xKey)}
              tickFormatter={(value) => truncateLabel(String(value))}
              tick={{
                fontSize: 12,
              }}
              interval={0}
            />

            <YAxis
              tickFormatter={(value) => formatCurrency(Number(value))}
              tick={{
                fontSize: 12,
              }}
            />

            <Tooltip
              formatter={(value) => formatCurrency(Number(value))}
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #E2E8F0",
                boxShadow: "0 10px 30px rgba(15,23,42,0.08)",
              }}
            />

            <Bar dataKey={String(yKey)} radius={[8, 8, 0, 0]}>
              {data.map((entry, index) => {
                const item = entry as {
                  isLowest?: boolean;
                  isHighest?: boolean;
                };

                let fill = "#64748B";

                if (item.isLowest) {
                  fill = "#16A34A";
                }

                if (item.isHighest) {
                  fill = "#DC2626";
                }

                return <Cell key={index} fill={fill} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

export default BarChartCard;
