"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import AuthService from "@/services/auth.service";
import { useSession } from "next-auth/react";
import TooltipWrapper from "../TooltipWrapper";

export default function LogoutToggle() {
  const session = useSession();

  if (!session.data) {
    return null;
  }

  return (
    <TooltipWrapper content={<p>Sair</p>}>
      <Button
        variant="outline"
        size="icon"
        onClick={() => AuthService.signOut()}
      >
        <LogOut />
      </Button>
    </TooltipWrapper>
  );
}
