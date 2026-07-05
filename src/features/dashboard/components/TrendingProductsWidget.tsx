/**
 * -----------------------------------------------------------------------------
 * File: TrendingProductsWidget.tsx
 * Feature: Dashboard
 *
 * Purpose:
 * Displays a compact list of trending products.
 *
 * Responsibilities:
 * - Render widget heading.
 * - Render trending product rows.
 * - Render "View All" action.
 *
 * Does NOT:
 * - Fetch data.
 * - Manage state.
 * -----------------------------------------------------------------------------
 */

import TrendingProductRow from "./TrendingProductRow";

import { TRENDING_PRODUCTS } from "../data/trending-products";

function TrendingProductsWidget() {
  return (
    <section className="flex flex-col">
      {/* ------------------------------------------------------------------ */}
      {/* Header                                                             */}
      {/* ------------------------------------------------------------------ */}

      <header
        className="
          mb-6
          flex
          items-start
          justify-between
          gap-4
        "
      >
        <div>
          <h2
            className="
              text-lg
              font-semibold
              text-slate-900
            "
          >
            Trending Products
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >
            Most active products across connected stores.
          </p>
        </div>

        <button
          type="button"
          className="
            shrink-0
            rounded-xl
            px-3
            py-2
            text-sm
            font-medium
            text-blue-600
            transition-colors
            hover:bg-blue-50
            hover:text-blue-700
          "
        >
          View All
        </button>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* Product List                                                       */}
      {/* ------------------------------------------------------------------ */}

      <div>
        {TRENDING_PRODUCTS.map((product) => (
          <TrendingProductRow key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default TrendingProductsWidget;
