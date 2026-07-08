/**
 * -----------------------------------------------------------------------------
 * File: BestOfferCard.tsx
 * Feature: Comparison
 *
 * Purpose:
 * Displays the best available offer identified by the comparison engine.
 * -----------------------------------------------------------------------------
 */

import { ExternalLink, ShoppingBag } from "lucide-react";

import OfferStat from "./OfferStat";

import useComparison from "@/features/comparison/hooks/useComparison";

function BestOfferCard() {
  const comparison = useComparison();

  /**
   * Temporary.
   * Will later come from the comparison analysis engine.
   */
  const bestOffer = {
    store: "Jumia",
    product: comparison.recommendation.title,
    price: comparison.summary.lowestPrice,
    discount: "18%",
    availability: "In Stock",
  };

  return (
    <section
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-8
        shadow-sm
      "
    >
      <div className="flex items-center gap-4">
        <div
          className="
            rounded-2xl
            bg-blue-100
            p-3
          "
        >
          <ShoppingBag size={24} className="text-blue-600" />
        </div>

        <div>
          <p
            className="
              text-sm
              font-medium
              text-blue-600
            "
          >
            Best Offer
          </p>

          <h2
            className="
              text-2xl
              font-bold
              text-slate-900
            "
          >
            {bestOffer.store}
          </h2>
        </div>
      </div>

      <p
        className="
          mt-6
          text-lg
          font-semibold
          text-slate-900
        "
      >
        {bestOffer.product}
      </p>

      <div
        className="
          mt-8
          grid
          gap-6
          sm:grid-cols-3
        "
      >
        <OfferStat
          label="Price"
          value={`₦${bestOffer.price.toLocaleString()}`}
        />

        <OfferStat label="Discount" value={bestOffer.discount} />

        <OfferStat label="Availability" value={bestOffer.availability} />
      </div>

      <button
        type="button"
        className="
          mt-8
          inline-flex
          items-center
          gap-2
          rounded-xl
          bg-blue-600
          px-5
          py-3
          text-sm
          font-semibold
          text-white
          transition-colors
          hover:bg-blue-700
        "
      >
        View Store
        <ExternalLink size={16} />
      </button>
    </section>
  );
}

export default BestOfferCard;
