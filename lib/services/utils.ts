import { serverFetch } from "../serverUtils";

export async function getAllResource<T>(endpoint: string): Promise<T> {
  const response = await serverFetch(`${process.env.API_URL}/${endpoint}/`);
  return response.json() as Promise<T>;
}

export async function addResource<TFormData, TData, TError = { root: string }>(
  endpoint: string,
  formData: TFormData,
  rootError: string = "Resource creation failed"
): Promise<
  { success: true; data: TData } | { success: false; errors: TError }
> {
  const response = await serverFetch(`${process.env.API_URL}/${endpoint}/`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const jsonResponse = await response.json();
  console.log(jsonResponse);

  if (!response.ok) {
    return {
      success: false,
      errors: jsonResponse.error || { root: rootError },
    };
  }

  return { success: true, data: jsonResponse as TData };
}

export async function editResource<TFormData, TData, TError = { root: string }>(
  endpoint: string,
  id: string,
  formData: TFormData,
  rootError: string = "Resource update failed",
  method: "PATCH" | "PUT" = "PATCH"
): Promise<
  { success: true; data: TData } | { success: false; errors: TError }
> {
  const response = await serverFetch(
    `${process.env.API_URL}/${endpoint}/${id}/`,
    {
      method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );

  const jsonResponse = await response.json();
  console.log(jsonResponse);

  if (!response.ok) {
    return {
      success: false,
      errors: jsonResponse.error || { root: rootError },
    };
  }

  return { success: true, data: jsonResponse as TData };
}

export async function deleteResource(
  endpoint: string,
  id: string
): Promise<boolean> {
  const response = await serverFetch(
    `${process.env.API_URL}/${endpoint}/${id}`,
    {
      method: "DELETE",
    }
  );
  return response.ok;
}
