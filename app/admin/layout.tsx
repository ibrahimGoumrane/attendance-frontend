import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "../components/AppSidebar"
import { GraduationCap } from "lucide-react"
import { SidebarItemProps } from "@/lib/types/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  const adminSidebarItems : SidebarItemProps[] = [
    {title: 'Classes', url: '/classes', icon: GraduationCap }
  ]
  return (
    <SidebarProvider>
      <AppSidebar items={adminSidebarItems}/>
      <main>
        {/* <SidebarTrigger /> */}
        {children}
      </main>
    </SidebarProvider>
  )
}
