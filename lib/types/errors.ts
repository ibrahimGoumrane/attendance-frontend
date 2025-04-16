/**
 * Represents form validation errors for a given type, including an optional root-level error.
 *
 * This type is useful for handling errors in React Hook Form (RHF) when using ShadCN UI wrappers.
 * It allows partial errors for individual fields of the object `T`, as well as a general/root error message.
 *
 * @template T - The type representing the form's data shape (e.g., `Teacher`, `User`, etc.).
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type ErrorWithRoot<T = {}> = Partial<T> & { root?: string };
