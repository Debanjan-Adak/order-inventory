import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5,  //within 5 mins if I visit the same page then it will use the cashed data and not make a new request to the server
      gcTime: 1000 * 60 * 10,  //remove from cache after 10 mins if not used
      refetchOnWindowFocus: false, //
      refetchOnReconnect: true 
    },
    mutations: {
      retry: 1,
    }
  }
});