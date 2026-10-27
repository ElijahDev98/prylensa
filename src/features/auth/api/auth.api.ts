/**
 * -----------------------------------------------------------------------------
 * File: auth.api.ts
 * Feature: Auth
 *
 * Purpose:
 * Provides HTTP access to the backend guest session endpoint.
 * -----------------------------------------------------------------------------
 */

import type { GuestSession } from "../services/auth-session.service";

interface GuestSignInApiResponse {
  success: boolean;
  message: string;
  data: GuestSession;
}

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000";

export async function signInGuest(email?: string): Promise<GuestSession> {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/guest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email?.trim() || undefined,
    }),
  });

  if (!response.ok) {
    throw new Error(`Guest sign-in failed (${response.status}).`);
  }

  const body: GuestSignInApiResponse = await response.json();

  if (!body.success) {
    throw new Error("Guest sign-in returned an unsuccessful response.");
  }

  return body.data;
}

export async function signOutGuest(accessToken: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/sign-out`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok && response.status !== 401) {
    throw new Error(`Guest sign-out failed (${response.status}).`);
  }
}
