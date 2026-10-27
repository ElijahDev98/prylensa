/**
 * -----------------------------------------------------------------------------
 * File: HeaderWorkspaceActions.tsx
 * Feature: Header
 *
 * Purpose:
 * Exposes actions for the active comparison workspace.
 * -----------------------------------------------------------------------------
 */

import { Download, MoreHorizontal, Plus, Scale, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "@/app/router/routes";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownTrigger,
} from "@/components/ui/dropdown";
import useComparison from "@/features/comparison/hooks/useComparison";

function HeaderWorkspaceActions() {
  const comparison = useComparison();

  const navigate = useNavigate();

  const hasComparison = comparison.selectedCount > 0;

  return (
    <Dropdown>
      <DropdownTrigger asChild>
        <button
          type="button"
          aria-label="Workspace actions"
          className="
            inline-flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-slate-200
            bg-white
            text-slate-700
            transition-colors
            hover:bg-slate-100
          "
        >
          <MoreHorizontal size={18} />
        </button>
      </DropdownTrigger>

      <DropdownContent>
        <DropdownLabel>Workspace</DropdownLabel>

        <DropdownItem
          leftIcon={<Scale size={16} />}
          onSelect={() => navigate(ROUTES.COMPARE)}
        >
          Open comparison
        </DropdownItem>

        <DropdownItem
          leftIcon={<Plus size={16} />}
          onSelect={() => navigate(`${ROUTES.SEARCH}?mode=comparison`)}
        >
          Add product
        </DropdownItem>

        <DropdownItem
          disabled={comparison.isExportingDataset}
          leftIcon={<Download size={16} />}
          onSelect={() => void comparison.exportDataset()}
        >
          {comparison.isExportingDataset ? "Preparing AI dataset" : "Export AI dataset"}
        </DropdownItem>

        <DropdownItem
          disabled={!hasComparison}
          leftIcon={<Trash2 size={16} />}
          variant="destructive"
          onSelect={comparison.clearComparison}
        >
          Clear comparison
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
}

export default HeaderWorkspaceActions;
