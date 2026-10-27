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

  stockStatus: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK" | "UNVERIFIED";

  productUrl: string;

  dataSource: "live" | "persisted-snapshot";

  observedAt?: string;

  availabilityStatus?: "in-stock" | "out-of-stock" | "unverified";
}

export interface ComparisonSelectedProductSpecification {
  id: string;

  name: string;

  value: string;
}

export interface ComparisonSelectedProductAnalysis {
  confidenceLabel: string;
  evaluationLabel: string;
  riskLabel: string;
  predictionLabel: string;
  predictionEvidenceLabel: string;
  recommendationAction: string;
  recommendationReason: string;
  insight: string;
  variantStatus: "verified" | "review" | "conflict" | "insufficient";
  variantLabel: string;
  variantSummary: string;
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

  aiAnalysis?: ComparisonSelectedProductAnalysis;

  offers: ComparisonSelectedProductOffer[];
}

export function createComparisonState(): ComparisonState {
  return {
    selectedProductIds: [],

    selectedProducts: [],
  };
}

export function addSelectedProduct(
  state: ComparisonState,
  product: ComparisonSelectedProduct,
): ComparisonState {
  if (state.selectedProductIds.includes(product.id)) {
    return {
      ...state,
      selectedProducts: state.selectedProducts.map((selectedProduct) =>
        selectedProduct.id === product.id ? product : selectedProduct,
      ),
    };
  }

  return {
    ...state,

    selectedProductIds: [...state.selectedProductIds, product.id],

    selectedProducts: [...state.selectedProducts, product],
  };
}

export function replaceSelectedProductGroup(
  _state: ComparisonState,
  _groupId: string,
  products: ComparisonSelectedProduct[],
): ComparisonState {
  return {
    selectedProductIds: products.map((product) => product.id),
    selectedProducts: products,
  };
}

export function normalizeSelectedProductGroups(
  products: ComparisonSelectedProduct[],
): ComparisonSelectedProduct[] {
  return products.flatMap((product) => {
    const offersByStore = new Map<string, ComparisonSelectedProductOffer[]>();

    for (const offer of product.offers) {
      const storeOffers = offersByStore.get(offer.storeId) ?? [];
      storeOffers.push(offer);
      offersByStore.set(offer.storeId, storeOffers);
    }

    if (offersByStore.size <= 1) {
      return [product];
    }

    return [...offersByStore.entries()].map(([storeId, offers]) => ({
      ...product,
      id: `${product.id}::${storeId}`,
      description: `${product.description} Marketplace: ${storeId}.`,
      specifications: [
        ...product.specifications.filter(
          (specification) => specification.name.toLowerCase() !== "marketplace",
        ),
        {
          id: `${product.id}-${storeId}-marketplace`,
          name: "Marketplace",
          value: storeId.charAt(0).toUpperCase() + storeId.slice(1),
        },
      ],
      offers,
    }));
  });
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
