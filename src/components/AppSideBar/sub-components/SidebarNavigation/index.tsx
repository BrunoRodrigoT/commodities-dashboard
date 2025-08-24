import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
} from "@/components/ui/sidebar";
import {
  Home,
  Settings,
  Users,
  DollarSign,
  ChartColumn,
  TrendingUp,
  Wheat,
} from "lucide-react";

const mainNavigationItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Commodities", url: "/", icon: Wheat },
  { title: "Análises", url: "/", icon: TrendingUp },
  { title: "Relatórios", url: "/", icon: ChartColumn },
  { title: "Câmbio", url: "/", icon: DollarSign },
];

const secondaryNavigationItems = [
  { title: "Perfis", url: "/", icon: Users },
  { title: "Configurações", url: "/", icon: Settings },
];

export default function SidebarNavigation() {
  return (
    <SidebarContent className="gap-2">
      <SidebarGroup>
        <SidebarGroupLabel>NAVEGAÇÃO PRINCIPAL</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {mainNavigationItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>GERENCIAMENTO</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {secondaryNavigationItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}
