/**
 * -----------------------------------------------------------------------------
 * File: OfferList.tsx
 * Feature: Search
 *
 * Purpose:
 * Displays all available offers.
 *
 * Responsibilities:
 * - Render a list of OfferCards.
 *
 * Does NOT:
 * - Execute business logic.
 * -----------------------------------------------------------------------------
 */

import OfferCard from "./OfferCard";

import type { SearchOfferViewModel } from "../viewmodels/search.viewmodel";

interface OfferListProps {
  offers: SearchOfferViewModel[];
}

function OfferList({ offers }: OfferListProps) {
  if (offers.length === 0) {
    return <p className="text-center text-slate-500">No offers available.</p>;
  }

  return (
    <div
      className="
        flex
        flex-col
        gap-4
      "
    >
      {offers.map((offer) => (
        <OfferCard key={offer.offer.id} offer={offer} />
      ))}
    </div>
  );
}

export default OfferList;
