/**
 * -----------------------------------------------------------------------------
 * File: useOfferDialog.ts
 * Feature: Search
 *
 * Purpose:
 * Encapsulates Offer Dialog state.
 *
 * Responsibilities:
 * - Open Offer Dialog.
 * - Close Offer Dialog.
 * - Expose dialog state.
 *
 * Architecture:
 * UI
 *   ↓
 * Hook
 *
 * Notes:
 * - UI state only.
 * - No business logic.
 * -----------------------------------------------------------------------------
 */

import { useCallback, useState } from "react";

export default function useOfferDialog() {
  const [offerDialogOpen, setOfferDialogOpen] = useState(false);

  const openOfferDialog = useCallback(() => {
    setOfferDialogOpen(true);
  }, []);

  const closeOfferDialog = useCallback(() => {
    setOfferDialogOpen(false);
  }, []);

  return {
    offerDialogOpen,
    openOfferDialog,
    closeOfferDialog,
  };
}
