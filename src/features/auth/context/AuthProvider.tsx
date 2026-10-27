/**
 * -----------------------------------------------------------------------------
 * File: AuthProvider.tsx
 * Feature: Auth
 *
 * Purpose:
 * Shares the backend-backed guest session across the application.
 * -----------------------------------------------------------------------------
 */

import { useCallback, useMemo, useState } from "react";

import { signInGuest as requestGuestSignIn } from "../api/auth.api";
import { signOutGuest } from "../api/auth.api";
import {
  clearGuestSession,
  loadGuestSession,
  saveGuestSession,
} from "../services/auth-session.service";
import { AuthContext } from "./auth-context";

import type { ReactNode } from "react";
import type { GuestSession } from "../services/auth-session.service";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<GuestSession | null>(() =>
    loadGuestSession(),
  );
  const [signingIn, setSigningIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signInGuest = useCallback(async (email?: string) => {
    setSigningIn(true);
    setError(null);

    try {
      const nextSession = await requestGuestSignIn(email);

      saveGuestSession(nextSession);
      setSession(nextSession);
    } catch {
      setError("Unable to create a guest session. Check the backend database.");
    } finally {
      setSigningIn(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    const currentSession = session;
    clearGuestSession();
    setSession(null);
    if (currentSession) {
      await signOutGuest(currentSession.accessToken).catch(() => undefined);
    }
  }, [session]);

  const value = useMemo(
    () => ({
      session,
      signingIn,
      error,
      signInGuest,
      signOut,
    }),
    [session, signingIn, error, signInGuest, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
