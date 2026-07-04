import { useQuery } from "@tanstack/react-query";
import * as orderApi from "../api/orderApi";

export function useOrders() {
  return useQuery({
    queryKey: ["orders", "list"],
    queryFn: orderApi.getAllOrders,
  });
}

export function useOrder(id) {
  return useQuery({
    queryKey: ["orders", "detail", id],
    queryFn: () => orderApi.getOrder(id),
    enabled: Boolean(id),
  });
}

export function useOrdersByStore(storeName) {
  return useQuery({
    queryKey: ["orders", "by-store", storeName],
    queryFn: () => orderApi.getOrdersByStore(storeName),
    enabled: Boolean(storeName),
  });
}

export function useOrderStatusCounts() {
  return useQuery({
    queryKey: ["orders", "status-counts"],
    queryFn: orderApi.getOrderStatusCounts,
  });
}

export function useOrdersByStatus(status) {
  return useQuery({
    queryKey: ["orders", "by-status", status],
    queryFn: () => orderApi.getOrdersByStatus(status),
    enabled: Boolean(status),
  });
}

export function useOrdersByDateRange(start, end) {
  return useQuery({
    queryKey: ["orders", "by-date-range", start, end],
    queryFn: () => orderApi.getOrdersByDateRange(start, end),
    enabled: Boolean(start && end),
  });
}

export function useOrdersByCustomer(customerIdOrEmail) {
  return useQuery({
    queryKey: ["orders", "by-customer", customerIdOrEmail],
    queryFn: () => orderApi.getOrdersByCustomer(customerIdOrEmail),
    enabled: Boolean(customerIdOrEmail),
  });
}

export default useOrders;
