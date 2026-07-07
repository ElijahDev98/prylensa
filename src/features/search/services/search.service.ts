/**
 * -----------------------------------------------------------------------------
 * File: search.service.ts
 * Feature: Search
 *
 * Purpose:
 * Search orchestrator.
 *
 * Responsibilities:
 * - Search products.
 * - Resolve product offers.
 * - Resolve store information.
 * - Build SearchResultViewModel.
 *
 * Does NOT:
 * - Manage React state.
 * - Render UI.
 * -----------------------------------------------------------------------------
 */

import { getProducts } from "@/features/product";

import { getLowestOffer, getOffersByProductId } from "@/features/offer";

import { getStoreById } from "@/features/store";

import type {
  SearchOfferViewModel,
  SearchResultViewModel,
} from "../viewmodels/search.viewmodel";

export function searchProducts(query: string): SearchResultViewModel[] {
  const keyword = query.trim().toLowerCase();

  /**
   * Empty query.
   */
  if (keyword.length < 2) {
    return [];
  }

  return getProducts()
    .filter(
      (product) =>
        product.title.toLowerCase().includes(keyword) ||
        product.brand.toLowerCase().includes(keyword),
    )
    .map((product) => {
      const offers: SearchOfferViewModel[] = getOffersByProductId(product.id)
        .map((offer) => {
          const store = getStoreById(offer.storeId);

          if (!store) {
            return null;
          }

          return {
            offer,
            store,
          };
        })
        .filter((offer): offer is SearchOfferViewModel => offer !== null);

      const lowestOfferEntity = getLowestOffer(product.id);

      const lowestOffer =
        offers.find((item) => item.offer.id === lowestOfferEntity?.id) ?? null;

      return {
        product,

        offers,

        lowestOffer,
      };
    });
}
