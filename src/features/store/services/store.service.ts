/**
 * -----------------------------------------------------------------------------
 * File: store.service.ts
 * Feature: Store Domain
 *
 * Purpose:
 * Read-only access to the Store catalog.
 *
 * Responsibilities:
 * - Return all stores.
 * - Return a store by ID.
 * -----------------------------------------------------------------------------
 */

import { STORES } from "../data/stores";

import type { Store } from "../types/store.types";

export function getStores(): Store[] {
  return STORES;
}

export function getStoreById(storeId: string): Store | undefined {
  return STORES.find((store) => store.id === storeId);
}
