
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addOrder, addOrderItems, cancelOrder, deleteOrder } from "../api/orderApi";
import { useOrderStore } from "./useOrders"; 

export const useOrderMutations = () => {
  const queryClient = useQueryClient();
  const clearDraft = useOrderStore((state) => state.clearDraft);

  const createOrderMutation = useMutation({
    mutationFn: async ({ order, items }) => {
      const { data: newOrder } = await addOrder(order);
      const itemsWithId = items.map(item => ({ ...item, order_id: newOrder.order_id }));
      await addOrderItems(itemsWithId);
      return newOrder;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      clearDraft();
    }
  });

  const cancelOrderMutation = useMutation({
    mutationFn: cancelOrder,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["orders"] })
  });

  const deleteOrderMutation = useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["orders"] })
  });

  return { createOrderMutation, cancelOrderMutation, deleteOrderMutation };
};