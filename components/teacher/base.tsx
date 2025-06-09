"use client";

import type React from "react";

import {
  BookOpen,
  BookText,
  Building2,
  CalendarCheck,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  Scan,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

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
import type { User } from "@/lib/types/user";

interface LayoutProps {
  children: React.ReactNode;
  user: User;
}

export default function Layout({ children, user }: LayoutProps) {
  console.log(user);
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/teacher",
      active: pathname === "/teacher",
    },
    {
      label: "Classes",
      icon: BookOpen,
      href: "/teacher/classes",
      active: pathname.includes("/teacher/classes"),
    },
    {
      label: "Departments",
      icon: Building2,
      href: "/teacher/departments",
      active: pathname.includes("/teacher/departments"),
    },
    {
      label: "Students",
      icon: GraduationCap,
      href: "/teacher/students",
      active: pathname.includes("/teacher/students"),
    },
    {
      label: "Subjects",
      icon: BookText,
      href: "/teacher/subjects",
      active: pathname.includes("/teacher/subjects"),
    },
    {
      label: "Attendance",
      icon: CalendarCheck,
      href: "/teacher/attendances",
      active: pathname.includes("/teacher/attendance"),
    },
  ];

  return (
    <div className="h-full relative">
      {/* Sidebar for desktop */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: -256 }}
            animate={{ x: 0 }}
            exit={{ x: -256 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="hidden md:flex h-full w-64 flex-col fixed inset-y-0 z-50 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800"
          >
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="p-6">
              <Link href="/teacher" className="flex items-center gap-2 font-bold text-xl">
                <motion.div whileHover={{ rotate: 10 }} transition={{ duration: 0.2 }}>
                  <Scan className="h-6 w-6 text-primary" />
                </motion.div>
                <span className="dark:text-white">FaceTrack</span>
              </Link>
            </motion.div>
            <div className="flex-1 flex flex-col py-4 px-3 space-y-1">
              {routes.map((route, index) => (
                <motion.div
                  key={route.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <Link
                    href={route.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-gray-100 dark:hover:bg-gray-800",
                      route.active
                        ? "bg-primary-50 text-primary dark:bg-gray-800 dark:text-primary-400"
                        : "text-gray-700 dark:text-gray-300"
                    )}
                  >
                    <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                      <route.icon
                        className={cn(
                          "h-4 w-4",
                          route.active ? "text-primary dark:text-primary-400" : "text-gray-500 dark:text-gray-400"
                        )}
                      />
                    </motion.div>
                    {route.label}
                  </Link>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-4 border-t border-gray-200 dark:border-gray-800"
            >
              <div className="flex items-center gap-3 mb-2 px-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-8 h-8 rounded-full bg-primary-100 dark:bg-gray-800 flex items-center justify-center"
                >
                  <span className="text-primary-700 dark:text-primary-400 font-medium text-sm">
                    {user.firstName?.charAt(0)}
                    {user.lastName?.charAt(0)}
                  </span>
                </motion.div>
                <div>
                  <p className="text-sm font-medium dark:text-white">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                </div>
              </div>
              <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                <Button variant="outline" size="sm" className="w-full justify-start gap-2 mt-2">
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" size="icon" className="md:hidden absolute left-4 top-3 z-50">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </motion.div>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-6 border-b"
          >
            <Link href="/teacher" className="flex items-center gap-2 font-bold text-xl">
              <motion.div whileHover={{ rotate: 10 }} transition={{ duration: 0.2 }}>
                <GraduationCap className="h-6 w-6 text-primary dark:text-primary-400" />
              </motion.div>
              <span>FaceTrack</span>
            </Link>
          </motion.div>
          <div className="flex-1 flex flex-col py-4 px-3 space-y-1">
            {routes.map((route, index) => (
              <motion.div
                key={route.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <Link
                  href={route.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-gray-100 dark:hover:bg-gray-800",
                    route.active
                      ? "bg-primary-50 text-primary dark:bg-gray-800 dark:text-primary-400"
                      : "text-gray-700 dark:text-gray-300"
                  )}
                >
                  <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                    <route.icon
                      className={cn(
                        "h-4 w-4",
                        route.active ? "text-primary dark:text-primary-400" : "text-gray-500 dark:text-gray-400"
                      )}
                    />
                  </motion.div>
                  {route.label}
                </Link>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-4 border-t"
          >
            <div className="flex items-center gap-3 mb-2 px-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-8 h-8 rounded-full bg-primary-100 dark:bg-gray-800 flex items-center justify-center"
              >
                <span className="text-primary-700 dark:text-primary-400 font-medium text-sm">
                  {user.firstName?.charAt(0)}
                  {user.lastName?.charAt(0)}
                </span>
              </motion.div>
              <div>
                <p className="text-sm font-medium">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
              <Button variant="outline" size="sm" className="w-full justify-start gap-2 mt-2">
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </motion.div>
          </motion.div>
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "min-h-screen bg-gray-50 dark:bg-gray-950 transition-all duration-300 flex flex-col",
          isSidebarOpen ? "md:pl-64" : "md:pl-0"
        )}
      >
        {/* Header */}
        <header className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-30 flex items-center gap-4 px-4 sm:px-6 lg:px-8">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hidden md:flex"
            >
              <motion.div animate={{ rotate: isSidebarOpen ? 0 : 180 }} transition={{ duration: 0.3 }}>
                <Menu className="h-5 w-5" />
              </motion.div>
              <span className="sr-only">Toggle Sidebar</span>
            </Button>
          </motion.div>

          <div className="ml-auto flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <ThemeToggle />
            </motion.div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <div className="relative w-8 h-8 rounded-full bg-primary-100 dark:bg-gray-800 flex items-center justify-center">
                      <span className="text-primary-700 dark:text-primary-400 font-medium text-sm">
                        {user.firstName?.charAt(0)}
                        {user.lastName?.charAt(0)}
                      </span>
                      <span className="sr-only">Open user menu</span>
                    </div>
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>
                      {user.firstName} {user.lastName}
                    </span>
                    <span className="text-xs text-muted-foreground">{user.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <motion.div whileHover={{ x: 2 }}>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </motion.div>
                <motion.div whileHover={{ x: 2 }}>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                </motion.div>
                <DropdownMenuSeparator />
                <motion.div whileHover={{ x: 2 }}>
                  <DropdownMenuItem>Sign out</DropdownMenuItem>
                </motion.div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content */}
        <motion.main
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="p-4 sm:p-6 lg:p-8 flex-1 flex flex-col"
        >
          {children}
        </motion.main>
      </motion.div>
    </div>
  );
}
