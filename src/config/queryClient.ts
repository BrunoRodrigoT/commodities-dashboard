import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false,
    },
    queries: {
      refetchInterval: 5000,
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export default queryClient;
