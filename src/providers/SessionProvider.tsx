"use client";

import { SessionProvider as Provider } from "next-auth/react";
import { ReactNode } from "react";

interface ISessionProviderProps {
  children: ReactNode;
}

function SessionProvider({ children }: ISessionProviderProps) {
  return <Provider>{children}</Provider>;
}

export { SessionProvider };
