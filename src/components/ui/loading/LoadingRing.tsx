/**
 * -----------------------------------------------------------------------------
 * File: LoadingRing.tsx
 * Shared Loading Component
 * -----------------------------------------------------------------------------
 */

import { branding, colors, animation } from "@/design-system";

interface LoadingRingProps {
  size?: number;
}

function LoadingRing({ size = branding.loader.ringSize }: LoadingRingProps) {
  const radius = (size - 20) / 2;
  const center = size / 2;

  return (
    <svg
      className={animation.loader.spinClass}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
    >
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke={colors.primaryLight}
        strokeWidth="4"
      />

      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke={colors.primary}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="110 280"
        transform={`rotate(-90 ${center} ${center})`}
      />
    </svg>
  );
}

export default LoadingRing;
