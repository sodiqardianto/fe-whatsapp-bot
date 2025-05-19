"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
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
  User2,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import Cookies from "js-cookie";
import { toast } from "sonner";

const items = [
  { name: "Dashboard", path: "/", icon: MessageSquare },
  { name: "Devices", path: "/devices", icon: Smartphone },
  { name: "Contacts", path: "/contacts", icon: Users },
  { name: "Broadcast", path: "/broadcast", icon: Send },
  { name: "Inbox", path: "/inbox", icon: MessageSquare },
  { name: "Auto Reply", path: "/auto-reply", icon: Bot },
  { name: "Webhook/API", path: "/webhook", icon: Webhook },
  { name: "Template", path: "/templates", icon: FileText },
  { name: "Logs", path: "/logs", icon: FileText },
  { name: "Users", path: "/users", icon: UserPlus },
  { name: "Settings", path: "/settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();
  const activeItem = items.find((item) => item.path === pathname);
  const router = useRouter();

  const handleLogout = () => {
    // Remove token from cookies
    Cookies.remove("token", { path: "/" });

    // Show success message
    toast.success("Logged out successfully");

    // Redirect to login page
    router.push("/login");
  };

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
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button variant="destructive" onClick={handleLogout}>
                    Logout
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
