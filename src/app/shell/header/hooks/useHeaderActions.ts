/**
 * -----------------------------------------------------------------------------
 * File: useHeaderActions.ts
 * Feature: Header
 *
 * Purpose:
 * Encapsulates header action behaviour.
 *
 * Future:
 * - Notifications
 * - Theme
 * - Profile Menu
 * -----------------------------------------------------------------------------
 */

import { useCallback } from "react";

export function useHeaderActions() {
  const onNotificationClick = useCallback(() => {
    console.log("Notification panel - planned");
  }, []);

  const onThemeClick = useCallback(() => {
    console.log("Theme toggle - planned");
  }, []);

  const onProfileClick = useCallback(() => {
    console.log("Profile menu - planned");
  }, []);

  return {
    onNotificationClick,
    onThemeClick,
    onProfileClick,
  };
}
