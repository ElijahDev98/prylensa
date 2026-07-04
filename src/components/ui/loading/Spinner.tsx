/**
 * -----------------------------------------------------------------------------
 * File: Spinner.tsx
 * Shared Loading Component
 * -----------------------------------------------------------------------------
 */

interface SpinnerProps {
  size?: number;
}

function Spinner({ size = 48 }: SpinnerProps) {
  return (
    <div
      className="
        animate-spin
        rounded-full
        border-4
        border-slate-200
        border-t-blue-600
      "
      style={{
        width: size,
        height: size,
      }}
    />
  );
}

export default Spinner;
