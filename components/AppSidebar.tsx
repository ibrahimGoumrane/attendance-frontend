import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { AppSidebarProps } from "@/lib/types/sidebar";
import Link from "next/link";

/**
 * Renders the application sidebar with navigation items.
 *
 * Typically used on admin pages or dashboard layouts.
 *
 * Each `item` should have the following shape:
 * {
 *   title: string;      // Display text
 *   url: string;        // Relative route
 *   icon: ReactElement; // Icon component
 * }
 *
 * @param items - Array of sidebar items with title, icon, and relative URL.
 * @param baseUrlPath - The base path to prepend to each item's URL.
 */
export function AppSidebar({ items, baseUrlPath }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={baseUrlPath + item.url}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
