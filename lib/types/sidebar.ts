export interface SidebarItemProps {
  title: string;
  url: string;
  icon: React.ElementType;
}

export interface AppSidebarProps {
  items: SidebarItemProps[];
  baseUrlPath: string
}