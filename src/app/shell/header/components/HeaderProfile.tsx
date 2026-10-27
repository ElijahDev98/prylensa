/**
 * -----------------------------------------------------------------------------
 * File: HeaderProfile.tsx
 * Feature: Header
 *
 * Purpose:
 * Displays the current user and account menu.
 * -----------------------------------------------------------------------------
 */

import { LogOut, Settings, Shield, UserCircle2 } from "lucide-react";
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
import { useGuestSession } from "@/features/auth";

function HeaderProfile() {
  const navigate = useNavigate();
  const { signOut } = useGuestSession();

  return (
    <Dropdown>
      <DropdownTrigger asChild>
        <button
          type="button"
          aria-label="User profile menu"
          className="
            flex
            h-10
            items-center
            gap-2
            rounded-xl
            border
            border-slate-200
            bg-white
            px-2.5
            text-slate-700
            transition-colors
            hover:bg-slate-100
          "
        >
          <UserCircle2 size={20} />

          <span
            className="
              hidden
              text-sm
              font-medium
              xl:block
            "
          >
            Guest
          </span>
        </button>
      </DropdownTrigger>

      <DropdownContent>
        <DropdownLabel>Account</DropdownLabel>

        <DropdownItem
          leftIcon={<UserCircle2 size={16} />}
          onSelect={() => navigate(ROUTES.SETTINGS)}
        >
          Profile
        </DropdownItem>

        <DropdownItem
          leftIcon={<Settings size={16} />}
          onSelect={() => navigate(ROUTES.SETTINGS)}
        >
          Preferences
        </DropdownItem>

        <DropdownItem
          leftIcon={<Shield size={16} />}
          onSelect={() => navigate(ROUTES.SETTINGS)}
        >
          Security
        </DropdownItem>

        <DropdownSeparator />

        <DropdownItem
          variant="destructive"
          leftIcon={<LogOut size={16} />}
          onSelect={signOut}
        >
          Sign out
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
}

export default HeaderProfile;
