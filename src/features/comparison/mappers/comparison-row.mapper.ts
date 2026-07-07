/**
 * -----------------------------------------------------------------------------
 * File: comparison-row.mapper.ts
 * Feature: Comparison Domain
 *
 * Purpose:
 * Maps Comparison business models into Comparison presentation ViewModels.
 *
 * Responsibilities:
 * - Transform business models into ViewModels.
 * - Preserve raw business values.
 * - Determine presentation metadata.
 *
 * Does NOT:
 * - Execute business logic.
 * - Format values.
 * -----------------------------------------------------------------------------
 */

import type {
  ComparisonProductValuesModel,
  ComparisonRowModel,
  ComparisonStoreValueModel,
} from "../models/comparison-row.model";

import type {
  ComparisonProductValuesViewModel,
  ComparisonRowType,
  ComparisonRowViewModel,
  ComparisonStoreValueViewModel,
  ComparisonValueColor,
} from "../viewmodels/comparison-row.viewmodel";

function getRowType(rowId: string): ComparisonRowType {
  switch (rowId) {
    case "price":
      return "price";

    case "discount":
      return "discount";

    case "availability":
      return "availability";

    default:
      throw new Error(`Unsupported comparison row: ${rowId}`);
  }
}

function getLowestPrice(product: ComparisonProductValuesModel): number | null {
  const prices = product.values
    .map((value) => value.value)
    .filter((value): value is number => typeof value === "number");

  if (prices.length === 0) {
    return null;
  }

  return Math.min(...prices);
}

function getColor(
  rowType: ComparisonRowType,
  highlight: boolean,
): ComparisonValueColor {
  if (!highlight) {
    return "default";
  }

  switch (rowType) {
    case "price":
      return "success";

    case "availability":
      return "success";

    case "discount":
      return "warning";

    default:
      return "default";
  }
}

function toStoreValueViewModel(
  rowType: ComparisonRowType,
  value: ComparisonStoreValueModel,
  lowestPrice: number | null,
): ComparisonStoreValueViewModel {
  const highlight =
    rowType === "price" &&
    typeof value.value === "number" &&
    lowestPrice !== null &&
    value.value === lowestPrice;

  return {
    storeId: value.storeId,

    value: value.value,

    highlight,

    color: getColor(rowType, highlight),
  };
}

function toProductValuesViewModel(
  rowType: ComparisonRowType,
  product: ComparisonProductValuesModel,
): ComparisonProductValuesViewModel {
  const lowestPrice = rowType === "price" ? getLowestPrice(product) : null;

  return {
    productId: product.productId,

    values: product.values.map((value) =>
      toStoreValueViewModel(rowType, value, lowestPrice),
    ),
  };
}

export function toComparisonRowViewModel(
  row: ComparisonRowModel,
): ComparisonRowViewModel {
  const rowType = getRowType(row.id);

  return {
    id: row.id,

    label: row.label,

    type: rowType,

    products: row.products.map((product) =>
      toProductValuesViewModel(rowType, product),
    ),
  };
}

export function toComparisonRowViewModels(
  rows: ComparisonRowModel[],
): ComparisonRowViewModel[] {
  return rows.map(toComparisonRowViewModel);
}
