/**
 * -----------------------------------------------------------------------------
 * File: HeaderActions.tsx
 * Feature: Header
 *
 * Purpose:
 * Renders the right-side action controls.
 * -----------------------------------------------------------------------------
 */

import HeaderCompare from "./HeaderCompare";
import HeaderNotification from "./HeaderNotification";
import HeaderProfile from "./HeaderProfile";
import HeaderQuickActions from "./HeaderQuickActions";
import HeaderTheme from "./HeaderTheme";
import HeaderWorkspaceActions from "./HeaderWorkspaceActions";

function HeaderActions() {
  return (
    <section
      aria-label="Header actions"
      className="
        flex
        w-full
        items-center
        justify-end
        gap-2
        sm:gap-3
        md:w-auto
      "
    >
      <div className="hidden sm:block">
        <HeaderCompare />
      </div>

      <div className="hidden sm:block">
        <HeaderQuickActions />
      </div>

      <HeaderTheme />

      <div className="hidden sm:block">
        <HeaderNotification />
      </div>

      <HeaderWorkspaceActions />

      <HeaderProfile />
    </section>
  );
}

export default HeaderActions;
