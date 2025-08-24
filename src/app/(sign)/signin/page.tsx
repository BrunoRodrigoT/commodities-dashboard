import { Metadata } from "next";
import React from "react";
import { Tabs } from "@/components/ui/tabs";
import SignInTab from "./components/SignInTab";
import { Title } from "@/components";

export const metadata: Metadata = {
  title: "Login",
};

export default function SignIn() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <Title />
        <Tabs defaultValue="login">
          <SignInTab />
        </Tabs>
      </div>
    </main>
  );
}
