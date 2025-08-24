"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import AuthService from "@/services/auth.service";
import TooltipWrapper from "../TooltipWrapper";

export default function LogoutButton() {
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
