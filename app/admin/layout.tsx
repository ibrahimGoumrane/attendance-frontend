import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { GraduationCap, UsersRound, LibraryBig } from "lucide-react"
import { SidebarItemProps } from "@/lib/types/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  
  const adminSidebarItems : SidebarItemProps[] = [
    {title: 'Classes', url: '/classes', icon: GraduationCap },
    {title: 'Teachers', url: '/teachers', icon: UsersRound},
    {title: 'Departments', url: '/departments', icon: LibraryBig}
  ]
  return (
    <SidebarProvider className="w-full flex">
      <AppSidebar baseUrlPath="/admin" items={adminSidebarItems}/>
      <main className="p-4 flex-1">
        {/* <SidebarTrigger /> */}
        {children}
      </main>
    </SidebarProvider>
  )
}
