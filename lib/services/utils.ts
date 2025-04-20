import { serverFetch } from "../serverUtils";

/**
 * Fetches all resources from the given endpoint.
 * @param endpoint - The API endpoint to fetch data from.
 * @returns A promise that resolves to the fetched data of type T.
 * @template T - The type of the data returned by the API.
 */
export async function getAllResource<T>(endpoint: string): Promise<T> {
  const response = await serverFetch(`${process.env.API_URL}/${endpoint}`);
  return response.json() as Promise<T>;
}

/*
 * Retrieves resource of specified id from given endpoint
 * @param endpoint - The API endpoint to fetch data from.
 * @param id - The ID of the requested resource
 * @returns A promise that resolves to the fetched data of type T.
 * @template T - The type of the data returned by the API.
 */
export async function getResourceById<T>(
  endpoint: string,
  id: string
): Promise<T> {
  const response = await serverFetch(
    `${process.env.API_URL}/${endpoint}/${id}`
  );
  return response.json() as Promise<T>;
}

/**
 * Adds a new resource to the API.
 * @param endpoint - The API endpoint to send the resource data to.
 * @param formData - The data to be added to the resource.
 * @param rootError - The error message to return in case the creation fails (defaults to "Resource creation failed").
 * @returns A promise that resolves to a success object with the resource data or an error object.
 * @template TFormData - The type of the form data being sent to the API.
 * @template TData - The type of the data returned from the API.
 * @template TError - The type of the error object returned from the API (defaults to `{ root: string }`).
 */
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

/**
 * Edits an existing resource on the API.
 * @param endpoint - The API endpoint for the resource.
 * @param id - The ID of the resource to edit.
 * @param formData - The data to update the resource with.
 * @param rootError - The error message to return in case the update fails (defaults to "Resource update failed").
 * @param method - The HTTP method to use for the update (defaults to "PATCH").
 * @returns A promise that resolves to a success object with the updated data or an error object.
 * @template TFormData - The type of the form data being sent to the API.
 * @template TData - The type of the data returned from the API.
 * @template TError - The type of the error object returned from the API (defaults to `{ root: string }`).
 */
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

/**
 * Deletes a resource from the API.
 * @param endpoint - The API endpoint for the resource.
 * @param id - The ID of the resource to delete.
 * @returns A promise that resolves to `true` if the deletion was successful, or `false` if not.
 */
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
