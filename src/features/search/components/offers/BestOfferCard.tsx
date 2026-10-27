/**
 * -----------------------------------------------------------------------------
 * File: BestOfferCard.tsx
 * Feature: Search
 *
 * Purpose:
 * Highlights the best available offer.
 * -----------------------------------------------------------------------------
 */

import { usePreferences } from "@/features/settings";

interface BestOfferCardProps {
  store: string;
  price: number;
}

function BestOfferCard({ store, price }: BestOfferCardProps) {
  const { formatPrice } = usePreferences();

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

      <h3 className="mt-3 text-xl font-bold">{formatPrice(price)}</h3>

      <p className="mt-2 text-sm text-blue-100">{store}</p>
    </section>
  );
}

export default BestOfferCard;
