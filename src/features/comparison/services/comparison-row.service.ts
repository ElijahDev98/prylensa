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

import { getOffersByProductId } from "@/features/offer/services/offer.service";

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

function getProductOffers(productId: string, offers?: Offer[]): Offer[] {
  const sourceOffers = offers ?? getOffersByProductId(productId);

  return sourceOffers.filter((offer) => offer.productId === productId);
}

function buildPriceValues(
  product: Product,
  stores: Store[],
  offers?: Offer[],
): ComparisonProductValuesModel {
  const productOffers = getProductOffers(product.id, offers).filter((offer) =>
    stores.some((store) => store.id === offer.storeId),
  );

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
  const productOffers = getProductOffers(product.id, offers).filter((offer) =>
    stores.some((store) => store.id === offer.storeId),
  );

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
  const productOffers = getProductOffers(product.id, offers).filter((offer) =>
    stores.some((store) => store.id === offer.storeId),
  );

  return {
    productId: product.id,

    values: productOffers.map((offer) => ({
      storeId: offer.storeId,

      value: offer.stockStatus,
    })),
  };
}
