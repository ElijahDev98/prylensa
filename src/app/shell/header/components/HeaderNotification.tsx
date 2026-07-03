/**
 * -----------------------------------------------------------------------------
 * File: HeaderNotification.tsx
 * Feature: Header
 *
 * Purpose:
 * Notification trigger placeholder.
 *
 * Future Integration:
 * - Notification panel
 * - Notification badge
 * -----------------------------------------------------------------------------
 */

import { Bell } from "lucide-react";

interface HeaderNotificationProps {
  onClick: () => void;
}

function HeaderNotification({ onClick }: HeaderNotificationProps) {
  return (
    <button
      type="button"
      aria-label="Notifications"
      onClick={onClick}
      className="
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-xl
        border
        border-slate-200
        bg-white
        transition-colors
        hover:bg-slate-100
      "
    >
      <Bell size={18} />
    </button>
  );
}

export default HeaderNotification;
