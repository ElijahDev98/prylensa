/**
 * -----------------------------------------------------------------------------
 * File: ProductPrice.tsx
 * Feature: Search
 *
 * Purpose:
 * Displays product pricing information.
 * -----------------------------------------------------------------------------
 */

interface ProductPriceProps {
  currentPrice: number;
  previousPrice: number;
  discount: number;
  currency: string;
}

function ProductPrice({
  currentPrice,
  previousPrice,
  discount,
  currency,
}: ProductPriceProps) {
  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  });

  return (
    <section className="mt-8 space-y-3">
      <div className="flex items-center gap-3">
        <h3 className="text-3xl font-bold text-slate-900">
          {formatter.format(currentPrice)}
        </h3>

        <span
          className="
            rounded-full
            bg-green-100
            px-3
            py-1
            text-sm
            font-semibold
            text-green-700
          "
        >
          -{discount}%
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-base text-slate-400 line-through">
          {formatter.format(previousPrice)}
        </span>

        <span className="text-sm text-slate-500">
          Save {formatter.format(previousPrice - currentPrice)}
        </span>
      </div>
    </section>
  );
}

export default ProductPrice;
