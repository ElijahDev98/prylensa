import Card from "@/components/ui/Card";

import type { MockProduct } from "../data/products";

import ProductDetailsLink from "./ProductDetailsLink";
import ProductFeatureGrid from "./ProductFeatureGrid";
import ProductHeader from "./ProductHeader";
import ProductPrice from "./ProductPrice";

interface ProductInformationProps {
  product: MockProduct;
}

function ProductInformation({ product }: ProductInformationProps) {
  return (
    <Card as="article" className="justify-between p-6">
      <div>
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

        <ProductFeatureGrid features={product.features} />

        <ProductDetailsLink />
      </div>

      <button
        type="button"
        className="
          w-full
          rounded-2xl
          bg-blue-600
          py-3
          font-medium
          text-white
          transition-colors
          hover:bg-blue-700
        "
      >
        Compare Prices
      </button>
    </Card>
  );
}

export default ProductInformation;
