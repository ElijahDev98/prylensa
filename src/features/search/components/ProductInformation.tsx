import Card from "@/components/ui/Card";
import { LAYOUT, SPACING } from "@/design-system";

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
    <Card
      as="article"
      className={`
        flex
        ${LAYOUT.workspacePanel.fullHeight}
        ${LAYOUT.workspacePanel.minHeight}
        ${LAYOUT.workspacePanel.maxHeight}
        flex-col
        justify-between
        ${SPACING.panel}
      `}
    >
      <div className="flex-1">
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

      <div className={SPACING.actionTop}>
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
            duration-200
            hover:bg-blue-700
            focus:outline-none
            focus:ring-2
            focus:ring-blue-200
          "
        >
          Compare Prices
        </button>
      </div>
    </Card>
  );
}

export default ProductInformation;
