/**
 * -----------------------------------------------------------------------------
 * File: ProductPrice.tsx
 * Feature: Search
 *
 * Purpose:
 * Displays pricing information for the selected product.
 *
 * Responsibilities:
 * - Render pricing information.
 * - Render discount information.
 * - Render savings information.
 *
 * Architecture:
 * UI
 *   ↓
 * SearchOfferViewModel
 *
 * Notes:
 * - Pure presentation component.
 * - Consumes only SearchOfferViewModel.
 * - No business logic.
 * - No domain model dependencies.
 * -----------------------------------------------------------------------------
 */

import type { SearchOfferViewModel } from "../../viewmodels/search.viewmodel";

interface ProductPriceProps {
  offer: SearchOfferViewModel | null;
}

function ProductPrice({ offer }: ProductPriceProps) {
  if (!offer) {
    return (
      <section className="mt-8">
        <p className="text-slate-500">Price unavailable</p>
      </section>
    );
  }

  const savings =
    (offer.originalPrice ?? offer.currentPrice) - offer.currentPrice;

  return (
    <section className="mt-8 space-y-3">
      <div className="flex items-center gap-3">
        <h3 className="text-3xl font-bold text-slate-900">
          {offer.currentPriceLabel}
        </h3>

        {offer.discountPercentage !== undefined && (
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
            -{offer.discountPercentage}%
          </span>
        )}
      </div>

      {offer.originalPriceLabel && (
        <div className="flex items-center gap-3">
          <span className="text-base text-slate-400 line-through">
            {offer.originalPriceLabel}
          </span>

          <span className="text-sm text-slate-500">
            Save ₦{savings.toLocaleString()}
          </span>
        </div>
      )}
    </section>
  );
}

export default ProductPrice;
