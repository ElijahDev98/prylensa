/**
 * -----------------------------------------------------------------------------
 * File: StoreHeaderCell.tsx
 * Feature: Compare
 * -----------------------------------------------------------------------------
 */

import type { Store } from "../types/store.types";

interface StoreHeaderCellProps {
  store: Store;
}

function StoreHeaderCell({ store }: StoreHeaderCellProps) {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        gap-2
      "
    >
      <div
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          bg-slate-100
          text-xs
          font-bold
          text-slate-700
        "
      >
        {store.name.charAt(0)}
      </div>

      <span
        className="
          text-sm
          text-slate-700
        "
      >
        {store.name}
      </span>
    </div>
  );
}

export default StoreHeaderCell;
