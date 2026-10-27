import { getAccessToken } from "./auth-session.service";

export function authenticatedFetch(
  input: RequestInfo | URL,
  init: RequestInit = {},
): Promise<Response> {
  const token = getAccessToken();
  if (!token) return Promise.reject(new Error("Authentication is required."));

  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${token}`);

  return fetch(input, { ...init, headers });
}
