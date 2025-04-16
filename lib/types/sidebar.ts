/**
 * Represents a single sidebar item with display info and a route.
 */
export interface SidebarItemProps {
  /** Display title for the sidebar item */
  title: string;
  /** Relative URL path the item links to */
  url: string;
  /** Icon component to display alongside the title */
  icon: React.ElementType;
}

/**
 * Props for the AppSidebar component.
 */
export interface AppSidebarProps {
  /** Array of sidebar items to render */
  items: SidebarItemProps[];
  /** Base URL path to prefix to each item’s relative URL */
  baseUrlPath: string;
}
