import { useQuery } from "@tanstack/react-query";
import { storeApi } from "../api/storeApi";

export const STORES_QUERY_KEY = ["stores"];

export function useStores() {
  return useQuery({
    queryKey: STORES_QUERY_KEY,
    queryFn: storeApi.getAll,
  });
}

export function useStore(id) {
  const storesQuery = useStores();
  const cached = storesQuery.data?.find(
    (store) => String(store.id) === String(id),
  );

  const fallbackQuery = useQuery({
    queryKey: [...STORES_QUERY_KEY, "detail", id],
    queryFn: () => storeApi.getById(id),
    enabled: Boolean(id) && !cached,
  });

  if (cached) {
    return {
      ...storesQuery,
      data: cached,
    };
  }

  return fallbackQuery;
}

export default useStores;
