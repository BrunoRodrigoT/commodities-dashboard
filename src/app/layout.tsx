import type { Metadata } from "next";
import "@/global/styles/index.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "@/providers/SessionProvider";
import { QueryClientProvider } from "@/providers/QueryClientProvider";
import { Toaster } from "sonner";
import AuthProvider from "@/providers/AuthProvider";
import { ApiKeyProvider } from "@/contexts/ApiKeyContext";

export const metadata: Metadata = {
  title: "AgroData",
  description: "AgroData Application with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <SessionProvider>
        <ApiKeyProvider>
          <QueryClientProvider>
            <body className="antialiased">
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <AuthProvider>
                  {children}
                  <Toaster />
                </AuthProvider>
              </ThemeProvider>
            </body>
          </QueryClientProvider>
        </ApiKeyProvider>
      </SessionProvider>
    </html>
  );
}
