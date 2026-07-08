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
  return label.length > 18 ? `${label.slice(0, 18)}…` : label;
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
              stroke="#E5E7EB"
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
                fill: "#475569",
              }}
            >
              <Label
                value="Compared Products"
                position="insideBottom"
                offset={-10}
                style={{
                  fill: "#334155",
                  fontSize: 16,
                  fontWeight: 600,
                }}
              />
            </XAxis>

            <YAxis
              width={95}
              tickFormatter={(value) => formatCurrency(Number(value))}
              tick={{
                fontSize: 13,
                fontWeight: 500,
                fill: "#475569",
              }}
            >
              <Label
                value="Price (₦)"
                angle={-90}
                position="insideLeft"
                style={{
                  fill: "#334155",
                  fontSize: 16,
                  fontWeight: 600,
                }}
              />
            </YAxis>

            <Tooltip
              formatter={(value) => formatCurrency(Number(value))}
              cursor={{
                fill: "rgba(15,23,42,0.04)",
              }}
              contentStyle={{
                borderRadius: 14,
                border: "1px solid #E2E8F0",
                boxShadow: "0 12px 32px rgba(15,23,42,0.10)",
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
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

export default BarChartCard;
