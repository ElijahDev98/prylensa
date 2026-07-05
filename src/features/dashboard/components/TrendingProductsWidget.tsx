/**
 * -----------------------------------------------------------------------------
 * File: TrendingProductsWidget.tsx
 * Feature: Dashboard
 * -----------------------------------------------------------------------------
 */

import TrendingProductCard from "./TrendingProductCard";

import { TRENDING_PRODUCTS } from "../data/trending-products";

function TrendingProductsWidget() {
  return (
    <section className="flex h-full flex-col">
      <h2 className="text-xl font-semibold text-slate-900">
        Trending Products
      </h2>

      <div className="mt-6 space-y-4">
        {TRENDING_PRODUCTS.map((product) => (
          <TrendingProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default TrendingProductsWidget;
