import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToastStore } from '@stores/toastStore';
import { inventoryApi } from '../api/inventoryApi';
import { INVENTORY_QUERY_KEY } from './useInventory';


export function useUpdateInventory() {
  const queryClient = useQueryClient();
  const addToast = useToastStore((state) => state.addToast);

  return useMutation({
    mutationFn: (data) => inventoryApi.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INVENTORY_QUERY_KEY });
      addToast({ type: 'success', message: 'Inventory updated.' });
    },
    onError: () => {
      addToast({ type: 'error', message: "Couldn't save inventory. Please try again." });
    },
  });
}

export default useUpdateInventory;
