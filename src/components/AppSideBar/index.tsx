import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  SidebarLogo,
  SidebarNavigation,
  SidebarUserProfile,
} from "./sub-components";

export default async function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="mb-2">
        <SidebarLogo />
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarNavigation />

      <SidebarSeparator />

      <SidebarFooter className="mt-2">
        <SidebarUserProfile />
      </SidebarFooter>
    </Sidebar>
  );
}
