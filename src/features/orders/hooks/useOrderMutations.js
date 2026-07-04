import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@shared/api/axios";
import endpoints from "@shared/api/endpoints";
import { useToastStore } from "@stores/toastStore";
import * as orderApi from "../api/orderApi";

export function useCreateOrder() {
  const queryClient = useQueryClient();
  const addToast = useToastStore((state) => state.addToast);

  return useMutation({
    mutationFn: async ({ customerId, storeId, items }) => {
      const order_tms = new Date().toISOString().slice(0, 19).replace("T", " ");

      const { data: createdOrder } = await axios.post(
        endpoints.orders.create(),
        {
          customer_id: customerId,
          store_id: storeId,
          order_status: "PENDING",
          order_tms,
        },
      );

      if (createdOrder && createdOrder.order_id === undefined) {
        await axios.patch(endpoints.orders.update(createdOrder.id), {
          order_id: createdOrder.id,
        });
        createdOrder.order_id = createdOrder.id;
      }

      await Promise.all(
        (items || []).map((item) =>
          axios.post(endpoints.orderItems.create(), {
            order_id: createdOrder.id,
            product_id: item.productId,
            unit_price: item.unitPrice,
            quantity: item.quantity,
            shipment_id: null,
          }),
        ),
      );

      return createdOrder;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      addToast({ type: "success", message: "Order placed." });
    },
    onError: () => {
      addToast({
        type: "error",
        message: "Couldn't save order. Please try again.",
      });
    },
  });
}

export function useUpdateOrder() {
  const queryClient = useQueryClient();
  const addToast = useToastStore((state) => state.addToast);

  return useMutation({
    mutationFn: (payload) => orderApi.updateOrder(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      addToast({ type: "success", message: "Order updated." });
    },
    onError: () => {
      addToast({
        type: "error",
        message: "Couldn't update order. Please try again.",
      });
    },
  });
}

export function useCancelOrder(id) {
  const queryClient = useQueryClient();
  const addToast = useToastStore((state) => state.addToast);

  return useMutation({
    mutationFn: () => orderApi.cancelOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["orders", "detail", id] });
      addToast({ type: "success", message: "Order cancelled." });
    },
    onError: () => {
      addToast({
        type: "error",
        message: "Couldn't cancel order. Please try again.",
      });
    },
  });
}

export function useDeleteOrder() {
  const queryClient = useQueryClient();
  const addToast = useToastStore((state) => state.addToast);

  return useMutation({
    mutationFn: (id) => orderApi.deleteOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      addToast({ type: "success", message: "Order deleted." });
    },
    onError: () => {
      addToast({
        type: "error",
        message: "Couldn't delete order. Please try again.",
      });
    },
  });
}
