/**
 * -----------------------------------------------------------------------------
 * File: OfferCard.tsx
 * Feature: Search
 *
 * Purpose:
 * Displays a single store offer.
 *
 * Responsibilities:
 * - Render one SearchOfferViewModel.
 * - Display pricing.
 * - Display stock status.
 * - Navigate to the merchant product page.
 *
 * Architecture:
 * UI
 *   ↓
 * SearchOfferViewModel
 *
 * Notes:
 * - Pure presentation component.
 * - Must never access domain models.
 * - All formatting is supplied by the SearchMapper.
 * -----------------------------------------------------------------------------
 */

import type { SearchOfferViewModel } from "../viewmodels/search.viewmodel";

interface OfferCardProps {
  offer: SearchOfferViewModel;
}

function OfferCard({ offer }: OfferCardProps) {
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
        <div>
          <h3 className="font-semibold text-slate-900">{offer.storeName}</h3>

          <p className="text-sm text-slate-500">
            {offer.inStock ? "In Stock" : "Out of Stock"}
          </p>
        </div>

        <div className="text-right">
          <p className="text-2xl font-bold text-blue-600">
            {offer.currentPriceLabel}
          </p>

          {offer.discountPercentage !== undefined && (
            <p className="text-sm text-green-600">
              Save {offer.discountPercentage}%
            </p>
          )}

          {offer.originalPriceLabel && (
            <p className="text-sm text-slate-400 line-through">
              {offer.originalPriceLabel}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5 flex justify-end">
        <a
          href={offer.productUrl}
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
