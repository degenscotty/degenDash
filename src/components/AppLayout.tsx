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
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Home,
  Search,
  Star,
  History as HistoryIcon,
  Settings,
  Radio,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NavLink, useLocation } from "react-router-dom";

interface AppLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { to: "/", icon: Home, label: "Dashboard" },
  { to: "/search", icon: Search, label: "Token Search" },
  { to: "/social", icon: Radio, label: "Social Scraping" },
  { to: "/watchlist", icon: Star, label: "Token Watchlist" },
  { to: "/history", icon: HistoryIcon, label: "History" },
];

export function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();

  // Get page title from current route
  const getPageTitle = () => {
    if (location.pathname === "/") return "Dashboard";
    if (location.pathname === "/search") return "Token Search";
    if (location.pathname === "/social") return "Social Scraping";
    if (location.pathname.startsWith("/analysis")) return "Token Analysis";
    if (location.pathname.startsWith("/trade")) return "Trade";
    if (location.pathname === "/watchlist") return "Token Watchlist";
    if (location.pathname === "/history") return "Trade History";
    if (location.pathname === "/settings") return "Settings";
    return "DegenDash";
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2 py-1">
            <Logo className="size-6" />
            <span className="font-bold text-lg">DegenDash</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === item.to}
                    >
                      <NavLink to={item.to}>
                        <item.icon />
                        <span>{item.label}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center justify-between px-2 py-1">
            <span className="text-xs text-muted-foreground">Theme</span>
            <ThemeToggle />
          </div>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={location.pathname === "/settings"}
              >
                <NavLink to="/settings">
                  <Settings />
                  <span>Settings</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-6" />
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-lg font-semibold">{getPageTitle()}</h1>
            <div className="flex items-center gap-2">
              {/* Additional header content can go here */}
            </div>
          </div>
        </header>
        <main className="flex-1 p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
