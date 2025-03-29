export async function getAllResource<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${process.env.API_URL}/${endpoint}/`);
  return response.json() as Promise<T>;
}
