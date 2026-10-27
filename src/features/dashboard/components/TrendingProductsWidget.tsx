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

import { useState } from "react";

import type { TrendingProductViewModel } from "../viewmodels/dashboard.viewmodel";

interface TrendingProductsWidgetProps {
  products: TrendingProductViewModel[];
}

function TrendingProductsWidget({ products }: TrendingProductsWidgetProps) {
  const [expanded, setExpanded] = useState(false);

  const visibleProducts = expanded ? products : products.slice(0, 2);

  const canToggle = products.length > 2;

  return (
    <section>
      <DashboardWidgetHeader
        title="Trending Products"
        description="Most active products across connected stores."
        actionLabel={canToggle ? (expanded ? "Show Less" : "View All") : undefined}
        onAction={() => setExpanded((current) => !current)}
      />

      {products.length === 0 ? (
        <p className="text-sm text-slate-500">
          No live marketplace products are available yet.
        </p>
      ) : (
        <div>
          {visibleProducts.map((product) => (
            <TrendingProductRow key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

export default TrendingProductsWidget;
