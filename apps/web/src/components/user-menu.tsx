"use client"

import {
  BadgeCheck,
  ChevronsUpDown,
  LoaderCircle,
  LogOut,
} from "lucide-react"
import { startTransition, useState } from "react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@irazz.lol/ui/components/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@irazz.lol/ui/components/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@irazz.lol/ui/components/sidebar"
import { useNavigate } from "@tanstack/react-router"
import { toast } from "sonner"

import { authClient } from "@/lib/auth-client"

export function NavUser({
  user,
}: {
  user: {
    name: string | null
    email: string
    image?: string | null
  }
}) {
  const { isMobile } = useSidebar()
  const navigate = useNavigate()
  const [isSigningOut, setIsSigningOut] = useState(false)
  const name = user.name?.trim() || "Account"
  const email = user.email
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("") || "AC"
  const image = user.image ?? undefined

  async function handleSignOut() {
    if (isSigningOut) {
      return
    }

    try {
      setIsSigningOut(true)
      await authClient.signOut()
      startTransition(() => {
        navigate({
          to: "/login",
        })
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to sign out"
      toast.error(message)
    } finally {
      setIsSigningOut(false)
    }
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger render={
            <SidebarMenuButton
              size="lg"
              className="min-w-0 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={image} alt={name} />
                <AvatarFallback className="">{initials}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{name}</span>
                <span className="truncate text-xs">{email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          } />
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-2 py-2 text-left text-sm">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={image} alt={name} />
                    <AvatarFallback className="">{initials}</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{name}</span>
                    <span className="truncate text-xs">{email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => {
                  navigate({
                    to: "/dashboard",
                  })
                }}
              >
                <BadgeCheck />
                Dashboard
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut} disabled={isSigningOut} variant="destructive">
              {isSigningOut ? <LoaderCircle className="animate-spin" /> : <LogOut />}
              {isSigningOut ? "Signing out" : "Log out"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
