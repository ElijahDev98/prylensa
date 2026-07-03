/**
 * -----------------------------------------------------------------------------
 * File: HeaderProfile.tsx
 * Feature: Header
 *
 * Purpose:
 * User profile placeholder.
 *
 * Future Integration:
 * - Authentication
 * - User avatar
 * - Profile menu
 * -----------------------------------------------------------------------------
 */

import { UserCircle2 } from "lucide-react";

interface HeaderProfileProps {
  onClick: () => void;
}

function HeaderProfile({ onClick }: HeaderProfileProps) {
  return (
    <button
      type="button"
      aria-label="User profile"
      onClick={onClick}
      className="
        flex
        items-center
        gap-2
        rounded-xl
        border
        border-slate-200
        bg-white
        px-3
        py-2
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
          text-slate-700
          xl:block
        "
      >
        Guest
      </span>
    </button>
  );
}

export default HeaderProfile;
