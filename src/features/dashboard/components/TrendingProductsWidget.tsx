/**
 * -----------------------------------------------------------------------------
 * File: TrendingProductsWidget.tsx
 * Feature: Dashboard
 *
 * Purpose:
 * Displays trending products.
 *
 * Responsibilities:
 * - Render widget header.
 * - Render trending products.
 *
 * Does NOT:
 * - Fetch data.
 * - Manage state.
 * -----------------------------------------------------------------------------
 */

import DashboardWidgetHeader from "./DashboardWidgetHeader";
import TrendingProductRow from "./TrendingProductRow";

import { TRENDING_PRODUCTS } from "../data/trending-products";

function TrendingProductsWidget() {
  return (
    <section>
      <DashboardWidgetHeader
        title="Trending Products"
        description="Most active products across connected stores."
        actionLabel="View All"
      />

      <div>
        {TRENDING_PRODUCTS.map((product) => (
          <TrendingProductRow key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default TrendingProductsWidget;
