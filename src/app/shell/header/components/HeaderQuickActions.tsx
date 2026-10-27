/**
 * -----------------------------------------------------------------------------
 * File: HeaderQuickActions.tsx
 * Feature: Header
 *
 * Purpose:
 * Provides high-frequency workspace navigation actions.
 * -----------------------------------------------------------------------------
 */

import { Bell, History, Plus, Search, Settings, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "@/app/router/routes";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
  DropdownTrigger,
} from "@/components/ui/dropdown";

function HeaderQuickActions() {
  const navigate = useNavigate();

  return (
    <Dropdown>
      <DropdownTrigger asChild>
        <button
          type="button"
          aria-label="Quick actions"
          className="
            inline-flex
            h-10
            items-center
            gap-2
            rounded-xl
            bg-blue-600
            px-3
            text-sm
            font-semibold
            text-white
            transition-colors
            hover:bg-blue-700
          "
        >
          <Plus size={17} />
          <span className="hidden lg:inline">Quick</span>
        </button>
      </DropdownTrigger>

      <DropdownContent>
        <DropdownLabel>Quick actions</DropdownLabel>

        <DropdownItem
          leftIcon={<Search size={16} />}
          onSelect={() => navigate(ROUTES.SEARCH)}
        >
          New product search
        </DropdownItem>

        <DropdownItem
          leftIcon={<History size={16} />}
          onSelect={() => navigate(ROUTES.SEARCH_HISTORY)}
        >
          Recent searches
        </DropdownItem>

        <DropdownItem
          leftIcon={<Sparkles size={16} />}
          onSelect={() => navigate(ROUTES.AI_RECOMMENDATIONS)}
        >
          View AI recommendations
        </DropdownItem>

        <DropdownItem
          leftIcon={<Bell size={16} />}
          onSelect={() => navigate(ROUTES.ALERTS)}
        >
          Create price alert
        </DropdownItem>

        <DropdownSeparator />

        <DropdownItem
          leftIcon={<Settings size={16} />}
          onSelect={() => navigate(ROUTES.SETTINGS)}
        >
          Workspace settings
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
}

export default HeaderQuickActions;
