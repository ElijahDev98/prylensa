/**
 * -----------------------------------------------------------------------------
 * File: ComparisonSortMenu.tsx
 * Feature: Compare (Presentation)
 *
 * Purpose:
 * Displays the comparison sorting menu.
 *
 * Responsibilities:
 * - Display available sort options.
 * - Update comparison preferences.
 *
 * Does NOT:
 * - Execute business logic.
 * - Manage dropdown state.
 * -----------------------------------------------------------------------------
 */

import { ArrowDownUp, Check, ChevronDown } from "lucide-react";

import {
  Dropdown,
  DropdownContent,
  DropdownGroup,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
  DropdownTrigger,
} from "@/components/ui/dropdown";

import useComparison from "@/features/comparison/hooks/useComparison";

import type { ComparisonSortOption } from "@/features/comparison/types/comparison-preferences.types";

interface ComparisonSortMenuProps {
  disabled: boolean;
}

const SORT_OPTIONS: {
  label: string;
  value: ComparisonSortOption;
}[] = [
  {
    label: "Lowest Price",
    value: "price-ascending",
  },
  {
    label: "Highest Price",
    value: "price-descending",
  },
  {
    label: "Highest Discount",
    value: "discount-descending",
  },
  {
    label: "Alphabetical",
    value: "alphabetical",
  },
];

function ComparisonSortMenu({ disabled }: ComparisonSortMenuProps) {
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
          <ArrowDownUp size={16} />
          Sort
          <ChevronDown size={16} />
        </button>
      </DropdownTrigger>

      <DropdownContent align="start" className="w-64">
        <DropdownLabel>Sort Products</DropdownLabel>

        <DropdownSeparator />

        <DropdownGroup>
          {SORT_OPTIONS.map((option) => (
            <DropdownItem
              key={option.value}
              onSelect={() => comparison.setSort(option.value)}
              leftIcon={
                comparison.sortBy === option.value ? (
                  <Check size={16} className="text-blue-600" />
                ) : (
                  <div className="w-4" />
                )
              }
            >
              {option.label}
            </DropdownItem>
          ))}
        </DropdownGroup>
      </DropdownContent>
    </Dropdown>
  );
}

export default ComparisonSortMenu;
