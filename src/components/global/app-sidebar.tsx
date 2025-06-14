"use client";

import { Inbox, LogOut, Newspaper } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAlertDialog } from "@/context/alert-dialog-context";
import { useAuth } from "@/context/auth-context";

const items = [
  {
    title: "Articles",
    url: "/admin/article",
    icon: Newspaper,
  },
  {
    title: "Category",
    url: "/admin/category",
    icon: Inbox,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  const { showDialog } = useAlertDialog();

  const { logout } = useAuth();

  const handleLogout = () => {
    showDialog({
      title: "Logout",
      description: "Are you sure you want to logout?",
      actionText: "Logout",

      onAction: () => {
        logout();
      },
    });
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="gap-6">
          <Image
            src={"/app-logo-white.svg"}
            alt="app-logo"
            width={134}
            height={24}
            className="mx-4"
          />

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={pathname.startsWith(item.url)}
                    asChild
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout}>
                  <LogOut />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
