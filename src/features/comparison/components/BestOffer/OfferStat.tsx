/**
 * -----------------------------------------------------------------------------
 * File: OfferStat.tsx
 * Feature: Comparison
 * -----------------------------------------------------------------------------
 */

interface OfferStatProps {
  label: string;

  value: string;
}

function OfferStat({ label, value }: OfferStatProps) {
  return (
    <div>
      <p
        className="
          text-xs
          font-medium
          uppercase
          tracking-wide
          text-slate-500
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1
          text-lg
          font-semibold
          text-slate-900
        "
      >
        {value}
      </p>
    </div>
  );
}

export default OfferStat;
