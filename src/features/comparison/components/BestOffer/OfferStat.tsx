/**
 * -----------------------------------------------------------------------------
 * File: OfferStat.tsx
 * Feature: Comparison
 *
 * Purpose:
 * Displays a key statistic for the recommended offer.
 *
 * Responsibilities:
 * - Present a single offer metric.
 * - Maintain a consistent dashboard appearance.
 *
 * Does NOT:
 * - Execute business logic.
 * -----------------------------------------------------------------------------
 */

interface OfferStatProps {
  label: string;

  value: string;
}

function OfferStat({ label, value }: OfferStatProps) {
  return (
    <article
      className="
        group
        flex
        h-full
        flex-col
        justify-between
        rounded-lg
        border
        border-slate-200
        bg-slate-50
        p-4
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:border-slate-300
        hover:bg-white
        hover:shadow-md
      "
    >
      <div>
        <p
          className="
            text-xs
            font-semibold
            uppercase
          text-slate-500
          "
        >
          {label}
        </p>

        <div
          className="
            mt-2
            h-px
            w-8
            bg-slate-200
            transition-all
            duration-300
            group-hover:w-12
          "
        />
      </div>

      <p
        className="
          mt-4
          wrap-break-word
          text-xl
          font-bold
          tracking-tight
          text-slate-900
        "
      >
        {value}
      </p>
    </article>
  );
}

export default OfferStat;
