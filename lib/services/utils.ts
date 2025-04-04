import { serverFetch } from "../serverUtils";

export async function getAllResource<T>(endpoint: string): Promise<T> {
  const response = await serverFetch(`${process.env.API_URL}/${endpoint}/`);
  return response.json() as Promise<T>;
}
