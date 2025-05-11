"use client";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

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
  initialItems: T[];
  /** Function to extract the unique ID from an item */
  getId: (item: T) => string;
  /** The context object returned from createResourceContext */
  context: React.Context<ResourceContextType<T> | undefined>;

  /** Optional callback invoked after an item is added */
  onAddItem?: (item: T) => void;
  /** Optional callback invoked after an item is edited */
  onEditItem?: (item: T) => void;
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
  const [items, setItems] = useState<T[]>(initialItems);

  const addItem = useCallback(
    (item: T) => {
      if (item) {
        setItems((prev) => [...prev, item]);
        onAddItem?.(item);
      }
    },
    [onAddItem]
  );

  const deleteItem = useCallback(
    (id: string) => {
      setItems((prev) => prev.filter((item) => getId(item) !== id));
      onDeleteItem?.(id);
    },
    [getId, onDeleteItem]
  );

  const editItem = useCallback(
    (updatedItem: T) => {
      setItems((prev) =>
        prev.map((item) =>
          getId(item) === getId(updatedItem) ? updatedItem : item
        )
      );
      onEditItem?.(updatedItem);
    },
    [getId, onEditItem]
  );

  const contextValue = useMemo(
    () => ({
      items,
      addItem,
      deleteItem,
      editItem,
    }),
    [items, addItem, deleteItem, editItem]
  );

  return <context.Provider value={contextValue}>{children}</context.Provider>;
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
