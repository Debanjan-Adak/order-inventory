import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "@stores/toastStore";
import { customerApi } from "../api/customerApi";
import { CUSTOMERS_QUERY_KEY } from "./useCustomers";

const SAVE_ERROR_MESSAGE = "Couldn't save customer. Please try again.";

export function useCreateCustomer() {
  const queryClient = useQueryClient();
  const addToast = useToastStore((state) => state.addToast);

  return useMutation({
    mutationFn: (data) => customerApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CUSTOMERS_QUERY_KEY });
      addToast({ type: "success", message: "Customer added." });
    },
    onError: () => {
      addToast({ type: "error", message: SAVE_ERROR_MESSAGE });
    },
  });
}

export function useUpdateCustomer() {
  const queryClient = useQueryClient();
  const addToast = useToastStore((state) => state.addToast);

  return useMutation({
    mutationFn: (data) => customerApi.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CUSTOMERS_QUERY_KEY });
      addToast({ type: "success", message: "Customer updated." });
    },
    onError: () => {
      addToast({ type: "error", message: SAVE_ERROR_MESSAGE });
    },
  });
}

export function useDeleteCustomer() {
  const queryClient = useQueryClient();
  const addToast = useToastStore((state) => state.addToast);

  return useMutation({
    mutationFn: (customerId) => customerApi.remove(customerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CUSTOMERS_QUERY_KEY });
      addToast({ type: "success", message: "Customer deleted." });
    },
    onError: () => {
      addToast({
        type: "error",
        message: "Couldn't delete customer. Please try again.",
      });
    },
  });
}
