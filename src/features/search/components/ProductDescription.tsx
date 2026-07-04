/**
 * -----------------------------------------------------------------------------
 * File: ProductDescription.tsx
 * Feature: Search
 *
 * Purpose:
 * Displays the product description.
 * -----------------------------------------------------------------------------
 */

interface ProductDescriptionProps {
  description: string;
}

function ProductDescription({ description }: ProductDescriptionProps) {
  return (
    <section
      aria-labelledby="product-description-heading"
      className="mt-8 space-y-3"
    >
      <h3
        id="product-description-heading"
        className="text-lg font-semibold text-slate-900"
      >
        Description
      </h3>

      <p
        className="
          text-sm
          leading-7
          text-slate-600
        "
      >
        {description}
      </p>
    </section>
  );
}

export default ProductDescription;
