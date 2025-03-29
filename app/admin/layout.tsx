import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "../components/AppSidebar"
import { GraduationCap, UsersRound } from "lucide-react"
import { SidebarItemProps } from "@/lib/types/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  
  const adminSidebarItems : SidebarItemProps[] = [
    {title: 'Classes', url: '/classes', icon: GraduationCap },
    {title: 'Teachers', url: '/teachers', icon: UsersRound}
  ]
  return (
    <SidebarProvider>
      <AppSidebar baseUrlPath="/admin" items={adminSidebarItems}/>
      <main className="p-4">
        {/* <SidebarTrigger /> */}
        {children}
      </main>
    </SidebarProvider>
  )
}
