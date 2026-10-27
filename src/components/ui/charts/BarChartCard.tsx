/**
 * -----------------------------------------------------------------------------
 * File: BarChartCard.tsx
 * Layer: Shared UI
 *
 * Purpose:
 * Shared responsive bar chart component.
 * -----------------------------------------------------------------------------
 */

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ReactNode } from "react";

import ChartCard from "./ChartCard";
import { usePreferences } from "@/features/settings";

interface BarChartCardProps<T extends object> {
  title: string;

  description?: string;

  data: T[];

  xKey: keyof T;

  yKey: keyof T;

  xAxisLabel?: string;

  showValueLabels?: boolean;

  footer?: ReactNode;
}

function truncateLabel(label: string) {
  return label.length > 18 ? `${label.slice(0, 18)}…` : label;
}

function BarChartCard<T extends object>({
  title,
  description,
  data,
  xKey,
  yKey,
  xAxisLabel = "Compared Products",
  showValueLabels = false,
  footer,
}: BarChartCardProps<T>) {
  const { currency, formatPrice } = usePreferences();

  return (
    <ChartCard title={title} description={description}>
      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 24,
              left: 24,
              bottom: 36,
            }}
          >
            <CartesianGrid
              stroke="var(--chart-grid)"
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey={String(xKey)}
              interval={0}
              height={70}
              tickFormatter={(value) => truncateLabel(String(value))}
              tick={{
                fontSize: 16,
                fontWeight: 500,
                fill: "var(--chart-text-muted)",
              }}
            >
              <Label
                value={xAxisLabel}
                position="insideBottom"
                offset={-10}
                style={{
                  fill: "var(--chart-text)",
                  fontSize: 16,
                  fontWeight: 600,
                }}
              />
            </XAxis>

            <YAxis
              width={95}
              tickFormatter={(value) => formatPrice(Number(value))}
              tick={{
                fontSize: 13,
                fontWeight: 500,
                fill: "var(--chart-text-muted)",
              }}
            >
              <Label
                value={`Price (${currency})`}
                angle={-90}
                position="insideLeft"
                style={{
                  fill: "var(--chart-text)",
                  fontSize: 16,
                  fontWeight: 600,
                }}
              />
            </YAxis>

            <Tooltip
              formatter={(value) => formatPrice(Number(value))}
              cursor={{
                fill: "var(--chart-cursor)",
              }}
              contentStyle={{
                borderRadius: 14,
                backgroundColor: "var(--chart-tooltip)",
                color: "var(--chart-text)",
                border: "1px solid var(--chart-border)",
                boxShadow: "0 12px 32px var(--chart-shadow)",
              }}
              labelStyle={{
                fontWeight: 600,
              }}
            />

            <Bar dataKey={String(yKey)} radius={[10, 10, 0, 0]}>
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
              {showValueLabels && (
                <LabelList
                  dataKey={String(yKey)}
                  position="top"
                  formatter={(value: unknown) => formatPrice(Number(value))}
                  style={{
                    fill: "var(--chart-text)",
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                />
              )}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      {footer}
    </ChartCard>
  );
}

export default BarChartCard;
