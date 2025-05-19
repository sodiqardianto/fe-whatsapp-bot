"use client";
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
import {
  MessageSquare,
  Smartphone,
  Users,
  Send,
  Bot,
  Webhook,
  FileText,
  UserPlus,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { name: "Dashboard", path: "/", icon: MessageSquare },
  { name: "Devices", path: "/devices", icon: Smartphone },
  { name: "Contacts", path: "/contacts", icon: Users },
  { name: "Broadcast", path: "/broadcast", icon: Send },
  { name: "Inbox", path: "/inbox", icon: MessageSquare },
  { name: "Auto Reply", path: "/auto-reply", icon: Bot },
  { name: "Webhook", path: "/webhook", icon: Webhook },
  { name: "Template", path: "/templates", icon: FileText },
  { name: "Logs", path: "/logs", icon: FileText },
  { name: "Users", path: "/users", icon: UserPlus },
  { name: "Settings", path: "/settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();
  const activeItem = items.find((item) => item.path === pathname);

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>WhatsApp Automation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    asChild
                    isActive={activeItem?.path === item.path}
                  >
                    <Link href={item.path}>
                      <item.icon />
                      <span>{item.name}</span>
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
