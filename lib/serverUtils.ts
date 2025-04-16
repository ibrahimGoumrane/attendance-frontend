"use server";

/**
  * @file serverUtils.ts
 * @description File for utility functions meant to be used in server actions.
 */

import { cookies } from "next/headers";

/**
 * A wrapper around the native `fetch` API to include session cookies and CSRF tokens
 * when making server-side requests in Next.js Server Actions or Route Handlers.
 *
 * This function extracts cookies from the current request context and adds them to
 * the `Cookie` header of the outgoing request. If a CSRF token is found under the
 * `csrftoken` cookie name, it will also be included in the `X-CSRFToken` header.
 *
 * @param url - The URL to request.
 * @param options - Optional fetch configuration (e.g., method, headers, body).
 * @returns A `Promise<Response>` from the `fetch` call.
 *
 * @example
 * const response = await serverFetch("https://api.myapp.com/data", {
 *   method: "POST",
 *   body: JSON.stringify({ key: "value" }),
 *   headers: { "Content-Type": "application/json" }
 * });
 */
export async function serverFetch(url: string, options: RequestInit = {}) {
  const cookieStore = cookies();

  // Get all cookies as a formatted string
  const allCookies = (await cookieStore).getAll();
  const cookieHeader = allCookies
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  // Get CSRF token directly
  const csrfToken = (await cookieStore).get("csrftoken")?.value;

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
      ...(csrfToken ? { "X-CSRFToken": csrfToken } : {}),
    },
  });
}
