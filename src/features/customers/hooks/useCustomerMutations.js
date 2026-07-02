import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  createCustomer,
  updateCustomer,
  deleteCustomer,
  setCustomerBlockedStatus,
} from "../api/customerApi";

// Every mutation below invalidates the "customers" query key on success so
// the table and any open detail page pick up fresh data automatically.

export function useCreateCustomer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => createCustomer(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast.success("Customer added.");
    },
    onError: () => toast.error("Couldn't save customer. Please try again."),
  });
}

export function useUpdateCustomer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ customerId, payload }) => updateCustomer(customerId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast.success("Customer updated.");
    },
    onError: () => toast.error("Couldn't save customer. Please try again."),
  });
}

export function useDeleteCustomer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (customerId) => deleteCustomer(customerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast.success("Customer deleted.");
    },
    onError: () => toast.error("Couldn't delete customer. Please try again."),
  });
}

// Shared by both ban and unban — the modal decides which boolean to send.
export function useSetCustomerBlockedStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ customerId, isblocked }) => setCustomerBlockedStatus(customerId, isblocked),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast.success(variables.isblocked ? "Customer blocked." : "Customer unblocked.");
    },
    onError: () => toast.error("Couldn't update customer status. Please try again."),
  });
}
