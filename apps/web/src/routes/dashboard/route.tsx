import { Link, Outlet, createFileRoute, redirect, useLocation } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@irazz.lol/ui/components/sidebar";
import { LayoutDashboardIcon } from "lucide-react";

import { getUser } from "@/functions/get-user";
import { NavUser } from "@/components/user-menu";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async () => {
    const session = await getUser();

    if (!session?.user) {
      throw redirect({
        to: "/login",
      });
    }
  },
  loader: async () => getUser(),
  component: DashboardLayout,
});

function DashboardLayout() {
  const pathname = useLocation({
    select: (location) => location.pathname,
  });
  const session = Route.useLoaderData();

  if (!session?.user) {
    return null;
  }

  const user = session.user;

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="border-b">
          <div className="px-2 py-1 font-mono text-xs uppercase tracking-[0.2em]">
            Dashboard
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    render={<Link to="/dashboard" />}
                    isActive={pathname === "/dashboard"}
                    tooltip="Billing"
                  >
                    <LayoutDashboardIcon />
                    <span>Billing</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarFooter className="mt-auto border-t">
            <NavUser user={user} />
          </SidebarFooter>
        </SidebarContent>
      </Sidebar>
      <SidebarRail />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center gap-3 bg-background/90 px-4 backdrop-blur-sm">
          <SidebarTrigger />
          <div className="font-mono text-xs uppercase tracking-[0.2em]">
            Billing
          </div>
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
