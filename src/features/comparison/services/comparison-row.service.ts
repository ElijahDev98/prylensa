/**
 * -----------------------------------------------------------------------------
 * File: comparison-row.service.ts
 * Feature: Comparison Domain
 *
 * Purpose:
 * Builds Comparison business rows from Product, Offer and Store domains.
 *
 * Responsibilities:
 * - Build comparison business models.
 * - Resolve Offer data.
 * - Respect selected stores.
 * - Keep presentation concerns out of the domain.
 *
 * Does NOT:
 * - Format values.
 * - Apply colours.
 * - Highlight cells.
 * -----------------------------------------------------------------------------
 */

import type { Offer } from "@/features/offer/types/offer.types";
import type { Product } from "@/features/product/types/product.types";
import type { Store } from "@/features/store/types/store.types";

import { COMPARISON_ROW_ID } from "../constants/comparison-row.constants";

import type {
  ComparisonProductValuesModel,
  ComparisonRowModel,
} from "../models/comparison-row.model";

interface BuildComparisonRowsOptions {
  products: Product[];

  stores: Store[];

  offers?: Offer[];
}

export function getComparisonRows({
  products,
  stores,
  offers,
}: BuildComparisonRowsOptions): ComparisonRowModel[] {
  return [
    buildPriceRow(products, stores, offers),
    buildDiscountRow(products, stores, offers),
    buildAvailabilityRow(products, stores, offers),
  ];
}

function buildPriceRow(
  products: Product[],
  stores: Store[],
  offers?: Offer[],
): ComparisonRowModel {
  return {
    id: COMPARISON_ROW_ID.PRICE,

    label: "Price",

    products: products.map((product) => buildPriceValues(product, stores, offers)),
  };
}

function buildDiscountRow(
  products: Product[],
  stores: Store[],
  offers?: Offer[],
): ComparisonRowModel {
  return {
    id: COMPARISON_ROW_ID.DISCOUNT,

    label: "Discount",

    products: products.map((product) =>
      buildDiscountValues(product, stores, offers),
    ),
  };
}

function buildAvailabilityRow(
  products: Product[],
  stores: Store[],
  offers?: Offer[],
): ComparisonRowModel {
  return {
    id: COMPARISON_ROW_ID.AVAILABILITY,

    label: "Availability",

    products: products.map((product) =>
      buildAvailabilityValues(product, stores, offers),
    ),
  };
}

function getProductOffers(productId: string, offers: Offer[] = []): Offer[] {
  return offers.filter((offer) => offer.productId === productId);
}

function getBestStoreOffers(
  productId: string,
  stores: Store[],
  offers: Offer[] = [],
): Offer[] {
  const productOffers = getProductOffers(productId, offers);

  return stores.flatMap((store) => {
    const storeOffers = productOffers
      .filter(
        (offer) =>
          offer.storeId === store.id &&
          Number.isFinite(offer.currentPrice) &&
          offer.currentPrice > 0,
      )
      .sort((left, right) => {
        const leftAvailable = left.stockStatus === "IN_STOCK" ||
          left.stockStatus === "LOW_STOCK";
        const rightAvailable = right.stockStatus === "IN_STOCK" ||
          right.stockStatus === "LOW_STOCK";

        if (leftAvailable !== rightAvailable) {
          return leftAvailable ? -1 : 1;
        }

        return left.currentPrice - right.currentPrice;
      });

    return storeOffers.length > 0 ? [storeOffers[0]] : [];
  });
}

function buildPriceValues(
  product: Product,
  stores: Store[],
  offers?: Offer[],
): ComparisonProductValuesModel {
  const productOffers = getBestStoreOffers(product.id, stores, offers);

  return {
    productId: product.id,

    values: productOffers.map((offer) => ({
      storeId: offer.storeId,

      value: offer.currentPrice,
    })),
  };
}

function buildDiscountValues(
  product: Product,
  stores: Store[],
  offers?: Offer[],
): ComparisonProductValuesModel {
  const productOffers = getBestStoreOffers(product.id, stores, offers);

  return {
    productId: product.id,

    values: productOffers.map((offer) => ({
      storeId: offer.storeId,

      value: offer.discount,
    })),
  };
}

function buildAvailabilityValues(
  product: Product,
  stores: Store[],
  offers?: Offer[],
): ComparisonProductValuesModel {
  const productOffers = getBestStoreOffers(product.id, stores, offers);

  return {
    productId: product.id,

    values: productOffers.map((offer) => ({
      storeId: offer.storeId,

      value: offer.stockStatus,
    })),
  };
}
