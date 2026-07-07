/**
 * -----------------------------------------------------------------------------
 * File: index.ts
 * Feature: Product Domain
 *
 * Purpose:
 * Public API for the Product Domain.
 * -----------------------------------------------------------------------------
 */

/**
 * Product data.
 */
export * from "./data/products";

/**
 * Product services.
 */
export * from "./services/product.service";

/**
 * Product domain types.
 */
export type {
  Product,
  ProductImage,
  ProductSpecification,
} from "./types/product.types";
