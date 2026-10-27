/**
 * -----------------------------------------------------------------------------
 * File: auth-context.ts
 * Feature: Auth
 *
 * Purpose:
 * Defines the guest-session context contract.
 * -----------------------------------------------------------------------------
 */

import { createContext } from "react";

import type { GuestSession } from "../services/auth-session.service";

export interface AuthContextValue {
  session: GuestSession | null;
  signingIn: boolean;
  error: string | null;
  signInGuest: (email?: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
