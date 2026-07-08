/**
 * -----------------------------------------------------------------------------
 * File: BarChartCard.tsx
 * Layer: Shared UI
 *
 * Purpose:
 * Shared bar chart component.
 * -----------------------------------------------------------------------------
 */

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import ChartCard from "./ChartCard";

interface BarChartCardProps<T> {
  title: string;

  description?: string;

  data: T[];

  xKey: keyof T;

  yKey: keyof T;
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
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey={String(xKey)} />

            <YAxis />

            <Tooltip />

            <Bar dataKey={String(yKey)} radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

export default BarChartCard;
