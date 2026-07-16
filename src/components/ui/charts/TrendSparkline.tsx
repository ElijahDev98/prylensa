/**
 * -----------------------------------------------------------------------------
 * File: TrendSparkline.tsx
 * Layer: Shared UI
 *
 * Purpose:
 * Displays a compact sparkline for visualizing short trends.
 *
 * Responsibilities:
 * - Render lightweight SVG trend lines.
 * - Support reusable color variants.
 * - Remain presentation-only.
 *
 * Does NOT:
 * - Fetch data.
 * - Format business values.
 * - Know about products.
 * - Know about dashboard state.
 * -----------------------------------------------------------------------------
 */

import { useMemo } from "react";

export type TrendSparklineColor = "success" | "danger" | "primary" | "neutral";

interface TrendSparklineProps {
  data: number[];

  color?: TrendSparklineColor;

  width?: number;

  height?: number;

  strokeWidth?: number;

  className?: string;
}

const STROKE_COLORS: Record<TrendSparklineColor, string> = {
  success: "#16A34A",
  danger: "#DC2626",
  primary: "#2563EB",
  neutral: "#64748B",
};

function TrendSparkline({
  data,
  color = "primary",
  width = 120,
  height = 36,
  strokeWidth = 2,
  className,
}: TrendSparklineProps) {
  const points = useMemo(() => {
    if (data.length < 2) {
      return "";
    }

    const minimum = Math.min(...data);
    const maximum = Math.max(...data);

    const range = maximum - minimum || 1;

    return data
      .map((value, index) => {
        const x = (index / (data.length - 1)) * width;

        const y = height - ((value - minimum) / range) * height;

        return `${x},${y}`;
      })
      .join(" ");
  }, [data, width, height]);

  if (data.length < 2) {
    return null;
  }

  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <polyline
        points={points}
        fill="none"
        stroke={STROKE_COLORS[color]}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default TrendSparkline;
