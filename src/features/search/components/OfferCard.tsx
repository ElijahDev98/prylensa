/**
 * -----------------------------------------------------------------------------
 * File: OfferCard.tsx
 * Feature: Search
 *
 * Purpose:
 * Displays a single store offer.
 *
 * Responsibilities:
 * - Render one offer.
 * - Display pricing.
 * - Display stock status.
 * - Display visit store action.
 *
 * Does NOT:
 * - Manage state.
 * - Fetch data.
 * -----------------------------------------------------------------------------
 */

import type { SearchOfferViewModel } from "../viewmodels/search.viewmodel";

interface OfferCardProps {
  offer: SearchOfferViewModel;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(price);
}

function OfferCard({ offer }: OfferCardProps) {
  const { store, offer: productOffer } = offer;

  return (
    <article
      className="
        rounded-2xl
        border
        border-slate-200
        p-5
        transition-shadow
        hover:shadow-md
      "
    >
      <div className="flex items-start justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={store.logoUrl}
            alt={store.logoAlt}
            className="
              h-12
              w-12
              rounded-lg
              border
              border-slate-200
              bg-white
              object-contain
              p-2
            "
          />

          <div>
            <h3 className="font-semibold text-slate-900">{store.name}</h3>

            <p className="text-sm text-slate-500">{productOffer.stockStatus}</p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-2xl font-bold text-blue-600">
            {formatPrice(productOffer.currentPrice)}
          </p>

          <p className="text-sm text-green-600">
            Save {productOffer.discount}%
          </p>
        </div>
      </div>

      <div className="mt-5 flex justify-end">
        <a
          href={store.website}
          target="_blank"
          rel="noopener noreferrer"
          className="
            rounded-xl
            bg-blue-600
            px-5
            py-2.5
            text-sm
            font-medium
            text-white
            transition-colors
            hover:bg-blue-700
          "
        >
          Visit Store
        </a>
      </div>
    </article>
  );
}

export default OfferCard;
