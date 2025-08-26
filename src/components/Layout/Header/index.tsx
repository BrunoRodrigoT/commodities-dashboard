import React from "react";
import ModeToggle from "../ModeToggle";
import LogoutToggle from "../LogoutToggle";

export default function Header() {
  return (
    <div className="fixed top-4 right-4 flex items-center gap-2">
      <ModeToggle />
      <LogoutToggle />
    </div>
  );
}
