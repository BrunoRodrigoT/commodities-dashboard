"use client";

import { QueryClient } from "@tanstack/react-query";
import {
  persistQueryClient,
} from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false,
    },
    queries: {
      refetchInterval: 1000 * 60 * 5, // 5 minutos
      retry: false,
      refetchOnWindowFocus: false,
      gcTime: 1000 * 60 * 60 * 24, // 24h
    },
  },
});

if (typeof window !== "undefined") {
  const localStoragePersister = createSyncStoragePersister({
    storage: window.localStorage,
  });

  persistQueryClient({
    queryClient,
    persister: localStoragePersister,
    maxAge: 1000 * 60 * 60 * 24, // 24h
  });
}

export default queryClient;
