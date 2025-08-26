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

const navigationItems = [
  {
    section: "NAVEGAÇÃO PRINCIPAL",
    items: [
      { title: "Dashboard", url: "/", icon: Home },
      { title: "Commodities", url: "/", icon: Wheat },
      { title: "Análises", url: "/", icon: TrendingUp },
      { title: "Relatórios", url: "/", icon: ChartColumn },
      { title: "Câmbio", url: "/", icon: DollarSign },
    ],
  },
  {
    section: "GERENCIAMENTO",
    items: [
      { title: "Perfis", url: "/", icon: Users },
      { title: "Configurações", url: "/", icon: Settings },
    ],
  },
];

export default function SidebarNavigation() {
  return (
    <SidebarContent className="gap-2">
      {navigationItems.map((section) => (
        <SidebarGroup key={section.section}>
          <SidebarGroupLabel>{section.section}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {section.items.map((item) => (
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
      ))}
    </SidebarContent>
  );
}
