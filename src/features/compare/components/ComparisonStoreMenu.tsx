/**
 * -----------------------------------------------------------------------------
 * File: ComparisonStoreMenu.tsx
 * Feature: Compare (Presentation)
 *
 * Purpose:
 * Displays the store filter menu.
 *
 * Responsibilities:
 * - Display available stores.
 * - Toggle visible stores.
 * - Clear store filters.
 *
 * Does NOT:
 * - Execute business logic.
 * - Manage dropdown state.
 * -----------------------------------------------------------------------------
 */

import { ChevronDown, Store } from "lucide-react";

import {
  Dropdown,
  DropdownCheckboxItem,
  DropdownContent,
  DropdownGroup,
  DropdownLabel,
  DropdownSeparator,
  DropdownTrigger,
} from "@/components/ui/dropdown";

import useComparison from "@/features/comparison/hooks/useComparison";

interface ComparisonStoreMenuProps {
  disabled: boolean;
}

function ComparisonStoreMenu({ disabled }: ComparisonStoreMenuProps) {
  const comparison = useComparison();

  return (
    <Dropdown>
      <DropdownTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            border-slate-200
            bg-white
            px-4
            py-3
            text-sm
            font-medium
            text-slate-700
            transition-colors
            hover:bg-slate-50
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <Store size={16} />
          Stores
          <ChevronDown size={16} />
        </button>
      </DropdownTrigger>

      <DropdownContent align="start" className="w-72">
        <DropdownLabel>Filter Stores</DropdownLabel>

        <DropdownSeparator />

        <DropdownGroup>
          {comparison.stores.map((store) => {
            const checked =
              comparison.selectedStoreIds.length === 0 ||
              comparison.selectedStoreIds.includes(store.id);

            return (
              <DropdownCheckboxItem
                key={store.id}
                checked={checked}
                onCheckedChange={() => comparison.toggleStore(store.id)}
              >
                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >
                  <img
                    src={store.logoUrl}
                    alt={store.logoAlt}
                    className="
                      h-8
                      w-8
                      rounded-md
                      border
                      border-slate-200
                      bg-white
                      object-contain
                      p-1
                    "
                  />

                  <span>{store.name}</span>
                </div>
              </DropdownCheckboxItem>
            );
          })}
        </DropdownGroup>

        <DropdownSeparator />

        <DropdownGroup>
          <button
            type="button"
            onClick={comparison.clearStores}
            className="
              w-full
              rounded-lg
              px-3
              py-2
              text-left
              text-sm
              font-medium
              text-blue-600
              transition-colors
              hover:bg-slate-100
            "
          >
            Clear Filter
          </button>
        </DropdownGroup>
      </DropdownContent>
    </Dropdown>
  );
}

export default ComparisonStoreMenu;
