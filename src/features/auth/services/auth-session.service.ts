/**
 * -----------------------------------------------------------------------------
 * File: auth-session.service.ts
 * Feature: Auth
 *
 * Purpose:
 * Persists the lightweight guest session for the current browser.
 * -----------------------------------------------------------------------------
 */

import {
  readMigratedStorageValue,
  removeMigratedStorageValue,
} from "@/shared/utils/migrated-storage";

export interface GuestUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface GuestSession {
  user: GuestUser;
  accessToken: string;
  expiresAt: string;
}

const SESSION_STORAGE_KEY = "prylensa.guest-session";
const LEGACY_SESSION_STORAGE_KEY = "priciq.guest-session";

export function loadGuestSession(): GuestSession | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawSession = readMigratedStorageValue(
    SESSION_STORAGE_KEY,
    LEGACY_SESSION_STORAGE_KEY,
  );

  if (!rawSession) {
    return null;
  }

  try {
    const session = JSON.parse(rawSession) as GuestSession;
    if (!session.accessToken || Date.parse(session.expiresAt) <= Date.now()) {
      window.localStorage.removeItem(SESSION_STORAGE_KEY);
      return null;
    }
    return session;
  } catch {
    window.localStorage.removeItem(SESSION_STORAGE_KEY);
    return null;
  }
}

export function getAccessToken(): string | null {
  return loadGuestSession()?.accessToken ?? null;
}

export function saveGuestSession(session: GuestSession) {
  window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
}

export function clearGuestSession() {
  removeMigratedStorageValue(
    SESSION_STORAGE_KEY,
    LEGACY_SESSION_STORAGE_KEY,
  );
}
