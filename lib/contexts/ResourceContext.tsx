"use client";
import { createContext, ReactNode, useContext, useState } from "react";

/**
 * A generic context type to manage a list of items with basic CRUD operations.
 */
export interface ResourceContextType<T> {
  items: T[];
  addItem: (item: T) => void;
  deleteItem: (id: string) => void;
  editItem: (item: T) => void;
}

/**
 * Props for the ResourceProvider component.
 */
interface ResourceProviderProps<T> {
  /** React children */
  children: ReactNode;
  /** Initial items to populate the context */
  initialItems: Partial<T>[];
  /** Function to extract the unique ID from an item */
  getId: (item: Partial<T>) => string;
  /** The context object returned from createResourceContext */
  context: React.Context<ResourceContextType<Partial<T>> | undefined>;

  /** Optional callback invoked after an item is added */
  onAddItem?: (item: Partial<T>) => void;
  /** Optional callback invoked after an item is edited */
  onEditItem?: (item: Partial<T>) => void;
  /** Optional callback invoked after an item is deleted */
  onDeleteItem?: (id: string) => void;
}

/**
 * A generic provider component to manage a list of resources.
 * @template T - The type of the items managed by this context.
 */
export function ResourceProvider<T>({
  children,
  initialItems,
  getId,
  context,
  onAddItem,
  onEditItem,
  onDeleteItem,
}: ResourceProviderProps<T>) {
  const [items, setItems] = useState<Partial<T>[]>(initialItems);

  /**
   * Adds an item to the list and optionally calls `onAddItem`.
   */
  const addItem = (item: Partial<T>) => {
    if (item) {
      setItems((prev) => [...prev, item]);
      onAddItem?.(item);
    }
  };

  /**
   * Deletes an item by ID and optionally calls `onDeleteItem`.
   */
  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => getId(item) !== id));
    onDeleteItem?.(id);
  };

  /**
   * Replaces an item with the same ID and optionally calls `onEditItem`.
   */
  const editItem = (updatedItem: Partial<T>) => {
    setItems((prev) =>
      prev.map((item) =>
        getId(item) === getId(updatedItem) ? updatedItem : item
      )
    );
    onEditItem?.(updatedItem);
  };

  return (
    <context.Provider
      value={{
        items,
        addItem,
        deleteItem,
        editItem,
      }}
    >
      {children}
    </context.Provider>
  );
}

/**
 * Creates a new resource context and hook for accessing it.
 * Useful for defining and consuming reusable CRUD-based contexts for various item types.
 *
 * @template T - The type of the items managed by this context.
 * @returns A tuple containing:
 *   - the created React context object
 *   - a custom hook to access the context
 *
 * @example
 * const [UserContext, useUserContext] = createResourceContext<User>();
 */
export function createResourceContext<T>() {
  const context = createContext<ResourceContextType<T> | undefined>(undefined);

  /**
   * Custom hook to safely consume the resource context.
   * Throws an error if used outside of the provider.
   */
  const useResourceContext = () => {
    const ctx = useContext(context);
    if (!ctx) {
      throw new Error(
        "useResourceContext must be used within a ResourceProvider"
      );
    }
    return ctx;
  };

  return [context, useResourceContext] as const;
}
