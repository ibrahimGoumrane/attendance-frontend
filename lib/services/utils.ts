import { serverFetch } from "../serverUtils";

export async function getAllResource<T>(endpoint: string): Promise<T> {
  const response = await serverFetch(`${process.env.API_URL}/${endpoint}/`);
  return response.json() as Promise<T>;
}

export async function deleteResource(endpoint: string, id: string): Promise<boolean> {
  const response = await serverFetch(`${process.env.API_URL}/${endpoint}/${id}`, {
    method: "DELETE",
  });
  return response.ok;
}
