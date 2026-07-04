/**
 * -----------------------------------------------------------------------------
 * File: ProductInformation.tsx
 * Feature: Search
 *
 * Purpose:
 * Displays detailed information about the selected product.
 * -----------------------------------------------------------------------------
 */

import type { MockProduct } from "../data/products";

import ProductDescription from "./ProductDescription";
import ProductHeader from "./ProductHeader";
import ProductPrice from "./ProductPrice";

interface ProductInformationProps {
  product: MockProduct;
}

function ProductInformation({ product }: ProductInformationProps) {
  return (
    <article
      className="
        flex
        min-h-[500px]
        flex-col
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-8
        shadow-sm
      "
    >
      <ProductHeader
        title={product.title}
        brand={product.brand}
        rating={product.rating}
        reviews={product.reviews}
      />

      <ProductPrice
        currentPrice={product.currentPrice}
        previousPrice={product.previousPrice}
        discount={product.discount}
        currency={product.currency}
      />

      <ProductDescription description={product.description} />

      <div className="flex-1" />

      <section className="mt-8">
        <button
          type="button"
          className="
            w-full
            rounded-2xl
            bg-blue-600
            px-5
            py-3
            font-medium
            text-white
            transition-colors
            hover:bg-blue-700
          "
        >
          Compare Prices
        </button>
      </section>
    </article>
  );
}

export default ProductInformation;
