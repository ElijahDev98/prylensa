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

      <section className="mt-8 space-y-3">
        <div className="h-4 rounded bg-slate-100" />
        <div className="h-4 rounded bg-slate-100" />
        <div className="h-4 w-4/5 rounded bg-slate-100" />
      </section>

      <div className="flex-1" />

      <section className="mt-8">
        <div className="h-12 rounded-2xl bg-slate-100" />
      </section>
    </article>
  );
}

export default ProductInformation;
