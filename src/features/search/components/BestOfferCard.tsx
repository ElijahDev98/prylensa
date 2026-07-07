/**
 * -----------------------------------------------------------------------------
 * File: BestOfferCard.tsx
 * Feature: Search
 *
 * Purpose:
 * Highlights the best available offer.
 * -----------------------------------------------------------------------------
 */

interface BestOfferCardProps {
  store: string;
  price: number;
  currency: string;
}

function BestOfferCard({ store, price, currency }: BestOfferCardProps) {
  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  });

  return (
    <section
      className="
        rounded-2xl
        bg-linear-to-br
        from-blue-600
        to-blue-700
        p-5
        text-white
      "
    >
      <p className="text-xs uppercase tracking-wide text-blue-100">
        Best Offer
      </p>

      <h3 className="mt-3 text-xl font-bold">{formatter.format(price)}</h3>

      <p className="mt-2 text-sm text-blue-100">{store}</p>
    </section>
  );
}

export default BestOfferCard;
