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
 * - Keep presentation concerns out of the domain.
 *
 * Does NOT:
 * - Format values.
 * - Apply colours.
 * - Highlight cells.
 * -----------------------------------------------------------------------------
 */

import { getOffersByProductId } from "@/features/offer/services/offer.service";

import type { Product } from "@/features/product/types/product.types";
import type { Store } from "@/features/store/types/store.types";

import type {
  ComparisonProductValuesModel,
  ComparisonRowModel,
} from "../models/comparison-row.model";

interface BuildComparisonRowsOptions {
  products: Product[];

  stores: Store[];
}

export function getComparisonRows({
  products,
}: BuildComparisonRowsOptions): ComparisonRowModel[] {
  return [
    buildPriceRow(products),
    buildDiscountRow(products),
    buildAvailabilityRow(products),
  ];
}

function buildPriceRow(products: Product[]): ComparisonRowModel {
  return {
    id: "price",

    label: "Price",

    products: products.map(buildPriceValues),
  };
}

function buildDiscountRow(products: Product[]): ComparisonRowModel {
  return {
    id: "discount",

    label: "Discount",

    products: products.map(buildDiscountValues),
  };
}

function buildAvailabilityRow(products: Product[]): ComparisonRowModel {
  return {
    id: "availability",

    label: "Availability",

    products: products.map(buildAvailabilityValues),
  };
}

function buildPriceValues(product: Product): ComparisonProductValuesModel {
  const offers = getOffersByProductId(product.id);

  return {
    productId: product.id,

    values: offers.map((offer) => ({
      storeId: offer.storeId,

      value: offer.currentPrice,
    })),
  };
}

function buildDiscountValues(product: Product): ComparisonProductValuesModel {
  const offers = getOffersByProductId(product.id);

  return {
    productId: product.id,

    values: offers.map((offer) => ({
      storeId: offer.storeId,

      value: offer.discount,
    })),
  };
}

function buildAvailabilityValues(
  product: Product,
): ComparisonProductValuesModel {
  const offers = getOffersByProductId(product.id);

  return {
    productId: product.id,

    values: offers.map((offer) => ({
      storeId: offer.storeId,

      value: offer.stockStatus,
    })),
  };
}
