import type { Metadata } from "next";
import "@/global/styles/index.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "@/providers/SessionProvider";
import { QueryClientProvider } from "@/providers/QueryClientProvider";
import { Toaster } from "sonner";
import Header from "@/components/Header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSideBar";

export const metadata: Metadata = {
  title: "AgroData",
  description: "AgroData Application with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <SessionProvider>
        <QueryClientProvider>
          <body className={`antialiased`}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <SidebarProvider>
                <AppSidebar />
                <SidebarTrigger />
                <Header />
                {children}
                <Toaster />
              </SidebarProvider>
            </ThemeProvider>
          </body>
        </QueryClientProvider>
      </SessionProvider>
    </html>
  );
}
