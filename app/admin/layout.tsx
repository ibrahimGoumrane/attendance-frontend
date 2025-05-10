"use client";

import type React from "react";

import {
  BookOpen,
  Building2,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin",
      active: pathname === "/admin",
    },
    {
      label: "Teachers",
      icon: Users,
      href: "/admin/teachers",
      active: pathname.includes("/admin/teachers"),
    },
    {
      label: "Classes",
      icon: BookOpen,
      href: "/admin/classes",
      active: pathname.includes("/admin/classes"),
    },
    {
      label: "Departments",
      icon: Building2,
      href: "/admin/departments",
      active: pathname.includes("/admin/departments"),
    },
    {
      label: "Students",
      icon: GraduationCap,
      href: "/admin/students",
      active: pathname.includes("/admin/students"),
    },
  ];

  return (
    <div className="h-full relative">
      {/* Sidebar for desktop */}
      <div
        className={cn(
          "hidden md:flex h-full w-64 flex-col fixed inset-y-0 z-50 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300",
          isSidebarOpen ? "left-0" : "-left-64"
        )}
      >
        <div className="p-6">
          <Link
            href="/admin"
            className="flex items-center gap-2 font-bold text-xl"
          >
            <GraduationCap className="h-6 w-6 text-primary dark:text-primary-400" />
            <span className="dark:text-white">FaceTrack</span>
          </Link>
        </div>
        <div className="flex-1 flex flex-col py-4 px-3 space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-gray-100 dark:hover:bg-gray-800",
                route.active
                  ? "bg-primary-50 text-primary dark:bg-gray-800 dark:text-primary-400"
                  : "text-gray-700 dark:text-gray-300"
              )}
            >
              <route.icon
                className={cn(
                  "h-4 w-4",
                  route.active
                    ? "text-primary dark:text-primary-400"
                    : "text-gray-500 dark:text-gray-400"
                )}
              />
              {route.label}
            </Link>
          ))}
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-2 px-2">
            <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-gray-800 flex items-center justify-center">
              <span className="text-primary-700 dark:text-primary-400 font-medium text-sm">
                AD
              </span>
            </div>
            <div>
              <p className="text-sm font-medium dark:text-white">Admin User</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                admin@facetrack.com
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start gap-2 mt-2"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Mobile sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden absolute left-4 top-3 z-50"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="p-6 border-b">
            <Link
              href="/admin"
              className="flex items-center gap-2 font-bold text-xl"
            >
              <GraduationCap className="h-6 w-6 text-primary dark:text-primary-400" />
              <span>FaceTrack</span>
            </Link>
          </div>
          <div className="flex-1 flex flex-col py-4 px-3 space-y-1">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-gray-100 dark:hover:bg-gray-800",
                  route.active
                    ? "bg-primary-50 text-primary dark:bg-gray-800 dark:text-primary-400"
                    : "text-gray-700 dark:text-gray-300"
                )}
              >
                <route.icon
                  className={cn(
                    "h-4 w-4",
                    route.active
                      ? "text-primary dark:text-primary-400"
                      : "text-gray-500 dark:text-gray-400"
                  )}
                />
                {route.label}
              </Link>
            ))}
          </div>
          <div className="p-4 border-t">
            <div className="flex items-center gap-3 mb-2 px-2">
              <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-gray-800 flex items-center justify-center">
                <span className="text-primary-700 dark:text-primary-400 font-medium text-sm">
                  AD
                </span>
              </div>
              <div>
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-gray-500">admin@facetrack.com</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start gap-2 mt-2"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div
        className={cn(
          "min-h-screen bg-gray-50 dark:bg-gray-950 transition-all duration-300",
          isSidebarOpen ? "md:pl-64" : "md:pl-0"
        )}
      >
        {/* Header */}
        <header className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-30 flex items-center gap-4 px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden md:flex"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>

          <div className="ml-auto flex items-center gap-4">
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-gray-800 flex items-center justify-center">
                    <span className="text-primary-700 dark:text-primary-400 font-medium text-sm">
                      AD
                    </span>
                  </div>
                  <span className="sr-only">Open user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
