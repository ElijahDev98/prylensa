/**
 * -----------------------------------------------------------------------------
 * File: TrendingProductCard.tsx
 * Feature: Dashboard
 * -----------------------------------------------------------------------------
 */

import Card from "@/components/ui/Card";

import type { TrendingProduct } from "../data/trending-products";

interface TrendingProductCardProps {
  product: TrendingProduct;
}

function TrendingProductCard({ product }: TrendingProductCardProps) {
  return (
    <Card
      className="
        flex
        items-center
        justify-between
        p-4
        transition-all
        duration-200
        hover:shadow-md
      "
    >
      <div>
        <h3 className="font-semibold text-slate-900">{product.name}</h3>

        <p className="text-sm text-slate-500">{product.category}</p>
      </div>

      <div className="text-right">
        <p className="font-semibold text-slate-900">{product.currentPrice}</p>

        <span
          className="
            text-sm
            font-medium
            text-green-600
          "
        >
          {product.priceChange}
        </span>
      </div>
    </Card>
  );
}

export default TrendingProductCard;
