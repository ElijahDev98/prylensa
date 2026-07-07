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
import HeaderTheme from "./HeaderTheme";

import { useHeaderActions } from "../hooks/useHeaderActions";

function HeaderActions() {
  const { onNotificationClick, onProfileClick, onThemeClick } =
    useHeaderActions();

  return (
    <section
      className="
        flex
        items-center
        gap-3
      "
    >
      <HeaderCompare />

      <HeaderTheme onClick={onThemeClick} />

      <HeaderNotification onClick={onNotificationClick} />

      <HeaderProfile onClick={onProfileClick} />
    </section>
  );
}

export default HeaderActions;
