/**
 * -----------------------------------------------------------------------------
 * File: ProductHeader.tsx
 * Feature: Search
 *
 * Purpose:
 * Displays the primary product identity.
 * -----------------------------------------------------------------------------
 */

import { Star } from "lucide-react";

interface ProductHeaderProps {
  title: string;
  brand: string;
  rating: number;
  reviews: number;
}

function ProductHeader({ title, brand, rating, reviews }: ProductHeaderProps) {
  return (
    <header className="space-y-4">
      <div>
        <p className="text-sm font-medium text-blue-600">{brand}</p>

        <h2
          className="
            mt-2
            text-2xl
            font-bold
            leading-tight
            text-slate-900
          "
        >
          {title}
        </h2>
      </div>

      <div
        className="
          flex
          items-center
          gap-2
          text-sm
          text-slate-500
        "
      >
        <Star size={16} className="fill-yellow-400 text-yellow-400" />

        <span>{rating.toFixed(1)}</span>

        <span>•</span>

        <span>{reviews} reviews</span>
      </div>
    </header>
  );
}

export default ProductHeader;
