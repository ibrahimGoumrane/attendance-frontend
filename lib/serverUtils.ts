'use server'

import { cookies } from "next/headers";

export async function serverFetch(url: string, options: RequestInit = {}) {
  const cookieStore = cookies();
  const cookieHeader = (await cookieStore).getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
  });
};