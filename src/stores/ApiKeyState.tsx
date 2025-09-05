"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ApiKeyState {
  apiKey: string;
  limitExceeded: boolean;
  setApiKey: (key: string) => void;
  clearApiKey: () => void;
  setLimitExceeded: (limitExceded: boolean) => void;
}

export const useApiKey = create<ApiKeyState>()(
  persist(
    (set) => ({
      apiKey: "",
      limitExceeded: false,
      setApiKey: (key: string) => set({ apiKey: key }),
      clearApiKey: () => set({ apiKey: "" }),
      setLimitExceeded: (limitExceeded: boolean) => set({ limitExceeded }),
    }),
    {
      name: "alphaVantageApiKey",
    }
  )
);
