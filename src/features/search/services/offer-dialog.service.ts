/**
 * -----------------------------------------------------------------------------
 * File: offer-dialog.service.ts
 * -----------------------------------------------------------------------------
 */

import type { SearchOfferViewModel } from "../viewmodels/search.viewmodel";
import type { OfferSortOption } from "../types/offer-dialog.types";

export function sortOffers(
  offers: SearchOfferViewModel[],
  sort: OfferSortOption,
): SearchOfferViewModel[] {
  const sorted = [...offers];

  switch (sort) {
    case "lowest-price":
      return sorted.sort((a, b) => a.offer.currentPrice - b.offer.currentPrice);

    case "highest-discount":
      return sorted.sort((a, b) => b.offer.discount - a.offer.discount);

    case "store":
      return sorted.sort((a, b) => a.store.name.localeCompare(b.store.name));

    default:
      return sorted;
  }
}
