/**
 * -----------------------------------------------------------------------------
 * File: ProductPrice.tsx
 * Feature: Search
 *
 * Purpose:
 * Displays pricing information from the lowest available offer.
 * -----------------------------------------------------------------------------
 */

import type { Offer } from "@/features/offer/types/offer.types";

interface ProductPriceProps {
  offer: Offer | null;
}

function ProductPrice({ offer }: ProductPriceProps) {
  if (!offer) {
    return (
      <section className="mt-8">
        <p className="text-slate-500">Price unavailable</p>
      </section>
    );
  }

  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  });

  return (
    <section className="mt-8 space-y-3">
      <div className="flex items-center gap-3">
        <h3 className="text-3xl font-bold text-slate-900">
          {formatter.format(offer.currentPrice)}
        </h3>

        <span
          className="
            rounded-full
            bg-green-100
            px-3
            py-1
            text-sm
            font-semibold
            text-green-700
          "
        >
          -{offer.discount}%
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-base text-slate-400 line-through">
          {formatter.format(offer.previousPrice)}
        </span>

        <span className="text-sm text-slate-500">
          Save {formatter.format(offer.previousPrice - offer.currentPrice)}
        </span>
      </div>
    </section>
  );
}

export default ProductPrice;
