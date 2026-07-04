/**
 * -----------------------------------------------------------------------------
 * File: ProductInformation.tsx
 * Feature: Search
 *
 * Purpose:
 * Displays detailed information about the selected product.
 *
 * Responsibilities:
 * - Product title
 * - Brand
 * - Rating
 * - Pricing
 * - Description
 *
 * Future Enhancements:
 * - Specifications
 * - Seller information
 * - Reviews
 * -----------------------------------------------------------------------------
 */

function ProductInformation() {
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
      {/* Product Header */}

      <section className="space-y-2">
        <div className="h-8 w-3/4 rounded bg-slate-100" />

        <div className="h-5 w-1/3 rounded bg-slate-100" />
      </section>

      {/* Product Price */}

      <section className="mt-8 space-y-3">
        <div className="h-10 w-40 rounded bg-slate-100" />

        <div className="h-5 w-28 rounded bg-slate-100" />
      </section>

      {/* Description */}

      <section className="mt-8 space-y-3">
        <div className="h-4 rounded bg-slate-100" />

        <div className="h-4 rounded bg-slate-100" />

        <div className="h-4 w-4/5 rounded bg-slate-100" />
      </section>

      <div className="flex-1" />

      {/* Action Area */}

      <section className="mt-8">
        <div className="h-12 rounded-2xl bg-slate-100" />
      </section>
    </article>
  );
}

export default ProductInformation;
