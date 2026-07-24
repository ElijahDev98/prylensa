/**
 * -----------------------------------------------------------------------------
 * File: comparison.service.ts
 * Feature: Comparison Domain
 *
 * Purpose:
 * Owns the Comparison Domain state.
 *
 * Responsibilities:
 * - Create comparison state.
 * - Add products.
 * - Remove products.
 * - Clear comparison.
 * - Reset comparison.
 *
 * NOTE:
 * Product information is no longer owned here.
 * -----------------------------------------------------------------------------
 */

export interface ComparisonState {
  selectedProductIds: string[];

  selectedProducts: ComparisonSelectedProduct[];
}

export interface ComparisonSelectedProductOffer {
  id: string;

  storeId: string;

  currentPrice: number;

  previousPrice: number;

  discount: number;

  shippingFee: number;

  estimatedDelivery: string;

  stockStatus: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";

  productUrl: string;
}

export interface ComparisonSelectedProductSpecification {
  id: string;

  name: string;

  value: string;
}

export interface ComparisonSelectedProduct {
  id: string;

  title: string;

  brand: string;

  category: string;

  description: string;

  imageUrl: string;

  imageAlt: string;

  rating: number;

  reviewCount: number;

  specifications: ComparisonSelectedProductSpecification[];

  offers: ComparisonSelectedProductOffer[];
}

export function createComparisonState(): ComparisonState {
  return {
    selectedProductIds: [],

    selectedProducts: [],
  };
}

export function addProduct(
  state: ComparisonState,
  productId: string,
): ComparisonState {
  if (state.selectedProductIds.includes(productId)) {
    return state;
  }

  return {
    ...state,
    selectedProductIds: [...state.selectedProductIds, productId],
  };
}

export function addSelectedProduct(
  state: ComparisonState,
  product: ComparisonSelectedProduct,
): ComparisonState {
  if (state.selectedProductIds.includes(product.id)) {
    return state;
  }

  return {
    ...state,

    selectedProductIds: [...state.selectedProductIds, product.id],

    selectedProducts: [...state.selectedProducts, product],
  };
}

export function removeProduct(
  state: ComparisonState,
  productId: string,
): ComparisonState {
  return {
    ...state,

    selectedProductIds: state.selectedProductIds.filter(
      (id) => id !== productId,
    ),

    selectedProducts: state.selectedProducts.filter(
      (product) => product.id !== productId,
    ),
  };
}

export function clearComparison(): ComparisonState {
  return {
    selectedProductIds: [],

    selectedProducts: [],
  };
}

export function resetComparison(): ComparisonState {
  return createComparisonState();
}
