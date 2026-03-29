import { Link, Outlet, createFileRoute, redirect, useLocation } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
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
      <Sidebar className="mt-14 h-[100svh-3.5rem]">
        <SidebarHeader className="border-b">
          <div className="px-2 py-1 font-mono text-xs">
            dashboard
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    render={<Link to="/dashboard" />}
                    isActive={pathname === "/dashboard"}
                    tooltip="overview"
                    className="items-center"
                  >
                    <LayoutDashboardIcon />
                    <span className="leading-none">overview</span>
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
        <header className="fixed w-full top-10.25 z-10 flex h-14 border-b items-center gap-3 bg-background/30 px-2 backdrop-blur-sm justify-between">
          <div className="flex items-center gap-4 mt-3.5">
            <SidebarTrigger />
            <div className="font-mono text-xs leading-none">
              Overview
            </div>
          </div>
          <div className="mr-79 mt-3.75 md:flex hidden">
            <div className="flex items-center p-2 border-l h-10 w-15.5" />
            <div className="flex items-center p-2 border-x h-10 w-22.75" />
            <div className="flex items-center p-2 border-r h-10 w-25.25" />
          </div>
        </header>
        <div className="mt-10">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
