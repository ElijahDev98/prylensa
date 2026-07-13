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
 * - Know where the data comes from.
 * -----------------------------------------------------------------------------
 */

import DashboardWidgetHeader from "./DashboardWidgetHeader";
import TrendingProductRow from "./TrendingProductRow";

import type { TrendingProductViewModel } from "../viewmodels/dashboard.viewmodel";

interface TrendingProductsWidgetProps {
  products: TrendingProductViewModel[];
}

function TrendingProductsWidget({ products }: TrendingProductsWidgetProps) {
  return (
    <section>
      <DashboardWidgetHeader
        title="Trending Products"
        description="Most active products across connected stores."
        actionLabel="View All"
      />

      <div>
        {products.map((product) => (
          <TrendingProductRow key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default TrendingProductsWidget;
