/**
 * -----------------------------------------------------------------------------
 * File: useGuestSession.ts
 * Feature: Auth
 *
 * Purpose:
 * Reads the current guest-session context.
 * -----------------------------------------------------------------------------
 */

import { useContext } from "react";

import { AuthContext } from "../context/auth-context";

export function useGuestSession() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useGuestSession must be used inside AuthProvider.");
  }

  return context;
}
