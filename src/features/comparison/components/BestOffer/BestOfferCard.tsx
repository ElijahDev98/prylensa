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
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:shadow-lg
      "
    >
      <div className="p-8">
        {/* --------------------------------------------------------------- */}
        {/* Header */}
        {/* --------------------------------------------------------------- */}

        <header className="flex items-start gap-4">
          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-blue-100
              shadow-sm
            "
          >
            <ShoppingBag size={28} className="text-blue-600" />
          </div>

          <div className="flex-1">
            <p
              className="
                text-sm
                font-semibold
                uppercase
                tracking-wide
                text-blue-600
              "
            >
              Best Available Offer
            </p>

            <h2
              className="
                mt-1
                text-3xl
                font-bold
                tracking-tight
                text-slate-900
              "
            >
              {bestOffer.store}
            </h2>

            <p
              className="
                mt-3
                leading-7
                text-slate-600
              "
            >
              The comparison engine identified this store as the strongest
              overall offer based on price, discount and availability.
            </p>
          </div>
        </header>

        {/* --------------------------------------------------------------- */}
        {/* Divider */}
        {/* --------------------------------------------------------------- */}

        <div
          className="
            my-8
            border-t
            border-slate-200
          "
        />

        {/* --------------------------------------------------------------- */}
        {/* Product */}
        {/* --------------------------------------------------------------- */}

        <section>
          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-wider
              text-slate-500
            "
          >
            Recommended Product
          </p>

          <h3
            className="
              mt-2
              text-xl
              font-semibold
              leading-8
              text-slate-900
            "
          >
            {bestOffer.product}
          </h3>
        </section>

        {/* --------------------------------------------------------------- */}
        {/* Statistics */}
        {/* --------------------------------------------------------------- */}

        <section
          className="
            mt-8
            grid
            gap-5
            sm:grid-cols-3
          "
        >
          <OfferStat
            label="Price"
            value={`₦${bestOffer.price.toLocaleString()}`}
          />

          <OfferStat label="Discount" value={bestOffer.discount} />

          <OfferStat label="Availability" value={bestOffer.availability} />
        </section>

        {/* --------------------------------------------------------------- */}
        {/* Action */}
        {/* --------------------------------------------------------------- */}

        <div className="mt-8">
          <button
            type="button"
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-blue-600
              px-6
              py-3
              text-sm
              font-semibold
              text-white
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:bg-blue-700
            "
          >
            Visit Store
            <ExternalLink size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default BestOfferCard;
