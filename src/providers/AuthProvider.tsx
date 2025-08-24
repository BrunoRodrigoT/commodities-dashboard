import { getServerSession } from "next-auth";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSideBar";
import Header from "@/components/Header";
import auth from "@/config/auth";

type Props = {
  children: React.ReactNode;
};

export default async function AuthProvider({ children }: Props) {
  const session = await getServerSession(auth);

  if (!session) {
    return (
      <>
        <Header />
        {children}
      </>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <Header />
      {children}
    </SidebarProvider>
  );
}
