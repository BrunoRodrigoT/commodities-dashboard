"use client";

import queryClient from "@/config/queryClient";
import { QueryClientProvider as Provider } from "@tanstack/react-query";
import { ReactNode } from "react";

interface IQueryClientProviderProps {
  children: ReactNode;
}

function QueryClientProvider({ children }: IQueryClientProviderProps) {
  return <Provider client={queryClient}>{children}</Provider>;
}

export { QueryClientProvider };
