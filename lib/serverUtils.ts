"use server";

import { cookies } from "next/headers";

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
