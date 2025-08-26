import React from "react";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import AppSidebar from "./AppSideBar";
import Header from "./Header";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        <Header />
        {children}
      </SidebarProvider>
    </div>
  );
}
