/**
 * -----------------------------------------------------------------------------
 * File: search.viewmodel.ts
 * Feature: Search
 *
 * Purpose:
 * UI model returned by the Search Domain.
 *
 * NOTE:
 * This is the only model consumed by the Search presentation layer.
 * -----------------------------------------------------------------------------
 */

import type { Product } from "@/features/product";
import type { Offer } from "@/features/offer";
import type { Store } from "@/features/store";

export interface SearchOfferViewModel {
  offer: Offer;

  store: Store;
}

export interface SearchResultViewModel {
  product: Product;

  offers: SearchOfferViewModel[];

  lowestOffer: SearchOfferViewModel | null;
}
